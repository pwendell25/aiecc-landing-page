import { onCall, onRequest, HttpsError } from 'firebase-functions/v2/https'
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
