import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { defineSecret, defineString } from 'firebase-functions/params'
import { Resend } from 'resend'

const resendApiKey = defineSecret('RESEND_API_KEY')
const mailFrom = defineString('MAIL_FROM', { default: 'AIECC <onboarding@resend.dev>' })
const mailReplyTo = defineString('MAIL_REPLY_TO', { default: '' })
const mailUnsubscribeTo = defineString('MAIL_UNSUBSCRIBE_TO', { default: '' })

interface MailRecipient {
  to: string
  name?: string
  subject: string
  html: string
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

  const resend = new Resend(resendApiKey.value())
  const from = mailFrom.value()
  const replyTo = mailReplyTo.value() || undefined
  const unsubscribeTo = mailUnsubscribeTo.value() || undefined

  const { error } = await resend.batch.send(
    recipients.map((r) => ({
      from,
      to: r.to,
      subject: r.subject,
      html: r.html,
      ...(replyTo ? { reply_to: replyTo } : {}),
      ...(unsubscribeTo
        ? {
            headers: {
              'List-Unsubscribe': `<mailto:${unsubscribeTo}?subject=unsubscribe>`,
              'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
            },
          }
        : {}),
    }))
  )

  if (error) {
    throw new HttpsError('internal', error.message || 'Resend failed to send.')
  }

  return { sent: recipients.length }
})
