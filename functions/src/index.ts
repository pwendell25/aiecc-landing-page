import { createHmac, timingSafeEqual } from 'node:crypto'
import { onCall, onRequest, HttpsError } from 'firebase-functions/v2/https'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { defineSecret, defineString } from 'firebase-functions/params'
import * as logger from 'firebase-functions/logger'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { Resend } from 'resend'
import Stripe from 'stripe'

initializeApp()

const resendApiKey = defineSecret('RESEND_API_KEY')
const mailFrom = defineString('MAIL_FROM', { default: 'AIECC <onboarding@resend.dev>' })
const mailReplyTo = defineString('MAIL_REPLY_TO', { default: '' })
const mailUnsubscribeTo = defineString('MAIL_UNSUBSCRIBE_TO', { default: '' })

const stripeWebhookSecret = defineSecret('STRIPE_WEBHOOK_SECRET')
// Firestore ID of the mailerTemplates doc sent after a successful Stripe payment. Loaded at send
// time, so edits (including renames) made in /admin/mailer apply immediately.
const welcomeTemplateId = defineString('WELCOME_TEMPLATE_ID')
// Optional comma-separated Stripe Payment Link IDs (plink_...). Empty = every completed checkout.
const welcomePaymentLinks = defineString('WELCOME_PAYMENT_LINKS', { default: '' })

const calendlySigningKey = defineSecret('CALENDLY_SIGNING_KEY')
// Firestore ID of the "Clarity Call Prep Email - 48 hours before" mailer template.
const clarityPrepTemplateId = defineString('CLARITY_PREP_TEMPLATE_ID')
// Calendly bookings whose event name contains this text (case-insensitive) get the prep email.
const clarityEventMatch = defineString('CLARITY_EVENT_NAME_MATCH', { default: 'clarity' })

const openaiApiKey = defineSecret('OPENAI_API_KEY')
const openaiModel = defineString('OPENAI_MODEL', { default: 'gpt-5.4' })

interface MailRecipient {
  to: string
  name?: string
  subject: string
  html: string
  attachmentUrl?: string
  attachmentName?: string
}

// Resend's batch endpoint doesn't support attachments, so each email is sent
// individually; sent sequentially with a small gap to stay under Resend's rate limit.
async function sendViaResend(recipients: MailRecipient[]): Promise<number> {
  const resend = new Resend(resendApiKey.value())
  const from = mailFrom.value()
  const replyTo = mailReplyTo.value() || undefined
  const unsubscribeTo = mailUnsubscribeTo.value() || undefined

  let sent = 0
  for (const r of recipients) {
    const { error } = await resend.emails.send({
      from,
      to: r.to,
      subject: r.subject,
      html: r.html,
      ...(r.attachmentUrl
        ? { attachments: [{ filename: r.attachmentName || 'attachment.pdf', path: r.attachmentUrl }] }
        : {}),
      ...(replyTo ? { replyTo } : {}),
      ...(unsubscribeTo
        ? {
            headers: {
              'List-Unsubscribe': `<mailto:${unsubscribeTo}?subject=unsubscribe>`,
              'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
            },
          }
        : {}),
    })

    if (error) {
      throw new Error(error.message || 'Resend failed to send.')
    }
    sent++

    if (sent < recipients.length) {
      await new Promise((resolve) => setTimeout(resolve, 550))
    }
  }
  return sent
}

export const sendMail = onCall({ secrets: [resendApiKey] }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Sign in required.')
  }

  const recipients = request.data?.recipients as MailRecipient[] | undefined
  if (!Array.isArray(recipients) || recipients.length === 0) {
    throw new HttpsError('invalid-argument', 'At least one recipient is required.')
  }
  for (const r of recipients) {
    if (!r?.to || !r?.subject || !r?.html) {
      throw new HttpsError('invalid-argument', 'Each recipient needs to, subject, and html.')
    }
  }

  try {
    return { sent: await sendViaResend(recipients) }
  } catch (err) {
    throw new HttpsError('internal', (err as Error).message)
  }
})

// Mirrors merge() in lib/admin/mailerData.ts.
function mergeFirstName(text: string, name: string): string {
  const fn = (name || '').trim().split(/\s+/)[0] || 'there'
  return text.split('[FIRST NAME]').join(fn).split('[FIRSTNAME]').join(fn)
}

// Stripe calls this after a Payment Link checkout completes; it sends the welcome template.
export const stripeWebhook = onRequest(
  { secrets: [resendApiKey, stripeWebhookSecret] },
  async (req, res) => {
    let event: Stripe.Event
    try {
      event = Stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers['stripe-signature'] as string,
        stripeWebhookSecret.value()
      )
    } catch (err) {
      logger.warn('Stripe signature verification failed', err)
      res.status(400).send('Invalid signature')
      return
    }

    if (event.type !== 'checkout.session.completed') {
      res.status(200).send('Ignored')
      return
    }

    const session = event.data.object as Stripe.Checkout.Session
    const allowedLinks = welcomePaymentLinks
      .value()
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const paymentLink = typeof session.payment_link === 'string' ? session.payment_link : session.payment_link?.id
    if (allowedLinks.length && (!paymentLink || !allowedLinks.includes(paymentLink))) {
      res.status(200).send('Not a welcome payment link')
      return
    }
    if (session.payment_status === 'unpaid') {
      res.status(200).send('Not paid yet')
      return
    }

    const email = session.customer_details?.email
    const name = session.customer_details?.name || ''
    if (!email) {
      logger.error('Checkout session has no customer email', { sessionId: session.id })
      res.status(200).send('No email')
      return
    }

    const db = getFirestore()
    // Stripe may deliver the same event more than once; create() fails if it was already handled.
    const eventRef = db.collection('stripeEvents').doc(event.id)
    try {
      await eventRef.create({ email, name, sessionId: session.id, receivedAt: Date.now() })
    } catch {
      res.status(200).send('Already handled')
      return
    }

    try {
      const templateDoc = await db.collection('mailerTemplates').doc(welcomeTemplateId.value()).get()
      const tpl = templateDoc.data()
      if (!tpl) throw new Error(`Template ${welcomeTemplateId.value()} not found`)

      const subject = mergeFirstName(tpl.subject, name)
      await sendViaResend([
        {
          to: email,
          name,
          subject,
          html: mergeFirstName(tpl.html, name),
          attachmentUrl: tpl.attachmentUrl,
          attachmentName: tpl.attachmentName,
        },
      ])

      await db.collection('mailerCampaigns').add({
        templateId: templateDoc.id,
        templateName: `${tpl.name} (Stripe: ${email})`,
        subject,
        recipientCount: 1,
        sentAt: Date.now(),
      })
      await eventRef.update({ sentAt: Date.now() })
      logger.info('Welcome email sent', { email, sessionId: session.id })
      res.status(200).send('Sent')
    } catch (err) {
      // Release the event so Stripe's automatic retry can try again.
      await eventRef.delete().catch(() => undefined)
      logger.error('Welcome email failed', err)
      res.status(500).send('Send failed')
    }
  }
)

// Fills [MENTION TRANSFORMATION] in the After Discovery Call email. The template wraps it as
// "Together, we'll work to improve ___." so the model writes only the words for the blank.
const TRANSFORMATION_PROMPT = `You help career coach Randall Re II (AI-Enhanced Career Coaching) write one line of a follow-up email sent right after a discovery call.

The email contains this sentence: "Together, we'll work to improve ___."

The line must show the client that Randall understood the ONE thing they most need help with. Before writing, work out silently:
1. The client's main problem: what is actually holding them back, in their own words. Give the most weight to (a) what the client says when asked what they need help with or what concerns them most, and (b) Randall's summary near the end of the call that the client confirms ("does that sound about right?" / "that sounds exactly right"). A problem the client repeats or calls their "biggest" or "only" concern outranks everything else.
2. The outcome they want: the kind of work, role or level, and any specific target company, industry or location they named.
Ignore small talk, travel stories, Randall's stories about other clients, program details and payment talk.

Then write ONLY the words that fill the blank, as 2 or 3 SHORT sentences. It must sound like Randall talking to the client, easy to read in one breath per sentence:
- Sentence 1 finishes "Together, we'll work to improve ___" in 12 words or fewer: just the thing we'll fix (for example "how your resume and LinkedIn tell your story").
- Sentence 2 (under 18 words): the outcome they care about, e.g. being seen and valued, the kind of work or company they want. Only use a job title or level (like "director") if the CLIENT said that is the role they want; otherwise describe the work they love, in their words.
- Optional sentence 3, starting "We'll also" (under 18 words): use it when the client named a big worry (their "biggest", "only" or repeated concern). Name the worry plainly, without labels like "your only concern" or "your biggest fear", and end on the hopeful result, never on the worry (good: "We'll also tackle age bias head-on, so your experience reads as a strength"; bad: "...without age bias getting in the way"), because the next line of the email talks about investing in yourself.
- One idea per sentence. At most one "so" per sentence. No lists of three or more things. No stacked phrases like "position you as the kind of X that Y companies like Z want to hire".
- Plain spoken words, no business jargon ("position", "leverage", "growth-stage", "synergy").
- Sensitive topics (age, a layoff, a career gap, health, family, money): name one ONLY if the client brought it up themselves as a major concern, and then say it plainly but kindly (for example "age bias", never "being old"). If they only hinted at it, leave it out.
- Be specific to this client. Generic lines like "your job search" or "your career" are not acceptable. Mention a target company only if it fits naturally.
- Read the full sentence "Together, we'll work to improve [your words]." to yourself: it must be grammatical and natural (start with "how your ..." or "your ...").
- Start lowercase. No period at the very end (the email adds it). 25 to 45 words in total. Second person ("your", "you").
- Do not start with the word "improve".
- Warm and confident, not salesy. No prices, and no promises of specific salaries, offers or timelines.
- If the transcript doesn't make their goal clear, write an honest line about the transition they described.
- Output the words only: no quotes, labels, em dashes or explanation.

Example output (for a different client): how your resume and LinkedIn tell your leadership story. You'll be seen as ready for a senior cybersecurity role at a defense prime. We'll also tackle the degree question head-on, so your 15 years of results speak first`

const MAX_TRANSCRIPT_CHARS = 200_000

export const generateTransformation = onCall(
  { secrets: [openaiApiKey], timeoutSeconds: 120 },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Sign in required.')
    }
    const transcript = String(request.data?.transcript || '').trim()
    if (transcript.length < 50) {
      throw new HttpsError('invalid-argument', 'Paste the call transcript first.')
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openaiApiKey.value()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: openaiModel.value(),
        max_completion_tokens: 4000,
        messages: [
          { role: 'system', content: TRANSFORMATION_PROMPT },
          { role: 'user', content: `Call transcript:\n\n${transcript.slice(0, MAX_TRANSCRIPT_CHARS)}` },
        ],
      }),
    })
    const body = (await res.json().catch(() => null)) as
      | { choices?: { message?: { content?: string } }[]; error?: { type?: string; code?: string } }
      | null
    if (!res.ok) {
      logger.error('OpenAI request failed', { status: res.status, type: body?.error?.type, code: body?.error?.code })
      // OpenAI's message can echo part of the key, so it stays in the server log only.
      throw new HttpsError('internal', 'AI request failed. Please try again.')
    }

    const text = (body?.choices?.[0]?.message?.content || '')
      .trim()
      .replace(/^["'“”]+|["'“”]+$/g, '')
      .replace(/^improve\s+/i, '')
      .replace(/\.+$/, '')
      .trim()
    if (!text) {
      throw new HttpsError('internal', 'The AI returned an empty answer. Try again.')
    }
    return { text }
  }
)

// ---------------------------------------------------------------------------------------------
// Clarity Call prep email: Calendly booking -> email 48 hours before the call (or right away if
// the call is sooner). Bookings are queued in `scheduledEmails`; sendScheduledEmails sends them.

const PREP_LEAD_MS = 48 * 60 * 60 * 1000
// Calendly signs `${t}.${rawBody}`; reject deliveries older than this to stop replays.
const CALENDLY_TOLERANCE_MS = 5 * 60 * 1000

function verifyCalendlySignature(header: string | undefined, rawBody: Buffer, key: string): boolean {
  if (!header) return false
  const parts = Object.fromEntries(header.split(',').map((p) => p.trim().split('=') as [string, string]))
  const t = parts.t
  const v1 = parts.v1
  if (!t || !v1) return false
  if (Math.abs(Date.now() - Number(t) * 1000) > CALENDLY_TOLERANCE_MS) return false
  const expected = createHmac('sha256', key).update(`${t}.${rawBody.toString('utf8')}`).digest('hex')
  const a = Buffer.from(expected, 'hex')
  const b = Buffer.from(v1, 'hex')
  return a.length === b.length && timingSafeEqual(a, b)
}

// "Monday, October 20" / "10:00 AM" / "EDT", shown in the client's own time zone.
function formatCallTime(iso: string, timeZone: string) {
  const d = new Date(iso)
  const tz = timeZone || 'America/New_York'
  return {
    date: d.toLocaleDateString('en-US', { timeZone: tz, weekday: 'long', month: 'long', day: 'numeric' }),
    time: d.toLocaleTimeString('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit' }),
    zone:
      new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' })
        .formatToParts(d)
        .find((p) => p.type === 'timeZoneName')?.value || tz,
  }
}

function fillAllTags(text: string, name: string, values: Record<string, string>): string {
  let out = mergeFirstName(text, name)
  for (const [tag, value] of Object.entries(values)) out = out.split(tag).join(value)
  return out
}

interface ScheduledEmail {
  templateId: string
  email: string
  name: string
  tags: Record<string, string>
  sendAt: number
  status: 'pending' | 'sending' | 'sent' | 'canceled' | 'failed'
}

// Claims a pending email (so two runs can't both send it), sends it, and records the result.
async function sendScheduled(id: string): Promise<void> {
  const db = getFirestore()
  const ref = db.collection('scheduledEmails').doc(id)
  const job = await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref)
    const data = snap.data() as ScheduledEmail | undefined
    if (!data || data.status !== 'pending') return null
    tx.update(ref, { status: 'sending' })
    return data
  })
  if (!job) return

  try {
    const tpl = (await db.collection('mailerTemplates').doc(job.templateId).get()).data()
    if (!tpl) throw new Error(`Template ${job.templateId} not found`)
    const subject = fillAllTags(tpl.subject, job.name, job.tags)
    await sendViaResend([
      {
        to: job.email,
        name: job.name,
        subject,
        html: fillAllTags(tpl.html, job.name, job.tags),
        attachmentUrl: tpl.attachmentUrl,
        attachmentName: tpl.attachmentName,
      },
    ])
    await db.collection('mailerCampaigns').add({
      templateId: job.templateId,
      templateName: `${tpl.name} (Calendly: ${job.email})`,
      subject,
      recipientCount: 1,
      sentAt: Date.now(),
    })
    await ref.update({ status: 'sent', sentAt: Date.now() })
    logger.info('Clarity prep email sent', { id, email: job.email })
  } catch (err) {
    // Back to pending so the next scheduled run retries it.
    await ref.update({ status: 'pending', lastError: (err as Error).message }).catch(() => undefined)
    logger.error('Clarity prep email failed', { id, err })
  }
}

// Calendly calls this on invitee.created / invitee.canceled (a reschedule is a cancel + create).
export const calendlyWebhook = onRequest(
  { secrets: [resendApiKey, calendlySigningKey] },
  async (req, res) => {
    if (!verifyCalendlySignature(req.headers['calendly-webhook-signature'] as string, req.rawBody, calendlySigningKey.value())) {
      logger.warn('Calendly signature verification failed')
      res.status(400).send('Invalid signature')
      return
    }

    const event = req.body?.event as string | undefined
    const p = req.body?.payload || {}
    const scheduled = p.scheduled_event || {}
    const inviteeUri = String(p.uri || '')
    // Calendly invitee URIs end in a unique ID; it keys the queued email so retries are no-ops.
    const id = inviteeUri.split('/').pop()
    if (!id) {
      res.status(200).send('No invitee')
      return
    }
    const ref = getFirestore().collection('scheduledEmails').doc(id)

    if (event === 'invitee.canceled') {
      await ref.update({ status: 'canceled', canceledAt: Date.now() }).catch(() => undefined)
      res.status(200).send('Canceled')
      return
    }
    if (event !== 'invitee.created') {
      res.status(200).send('Ignored')
      return
    }

    const eventName = String(scheduled.name || '')
    if (!eventName.toLowerCase().includes(clarityEventMatch.value().toLowerCase())) {
      res.status(200).send('Not a Clarity Call')
      return
    }
    const email = p.email as string | undefined
    const startTime = scheduled.start_time as string | undefined
    if (!email || !startTime) {
      logger.error('Calendly booking missing email or start time', { id })
      res.status(200).send('Missing data')
      return
    }

    const when = formatCallTime(startTime, p.timezone)
    const job: ScheduledEmail = {
      templateId: clarityPrepTemplateId.value(),
      email,
      name: p.name || p.first_name || '',
      tags: {
        '[CLARITY CALL DATE]': when.date,
        '[CLARITY CALL TIME]': when.time,
        '[TIME ZONE]': when.zone,
      },
      sendAt: new Date(startTime).getTime() - PREP_LEAD_MS,
      status: 'pending',
    }
    try {
      await ref.create({ ...job, eventName, startTime, createdAt: Date.now() })
    } catch {
      res.status(200).send('Already queued')
      return
    }

    // Booked with less than 48 hours to go: send now instead of waiting for the scheduler.
    if (job.sendAt <= Date.now()) await sendScheduled(id)
    logger.info('Clarity prep email queued', { id, email, sendAt: new Date(job.sendAt).toISOString() })
    res.status(200).send('Queued')
  }
)

export const sendScheduledEmails = onSchedule(
  { schedule: 'every 15 minutes', secrets: [resendApiKey] },
  async () => {
    const pending = await getFirestore().collection('scheduledEmails').where('status', '==', 'pending').get()
    const due = pending.docs.filter((d) => (d.data() as ScheduledEmail).sendAt <= Date.now())
    for (const d of due) await sendScheduled(d.id)
    if (due.length) logger.info('Scheduled emails processed', { count: due.length })
  }
)
