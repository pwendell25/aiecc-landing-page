import { httpsCallable } from 'firebase/functions'
import { getFirebaseFunctions } from '@/lib/firebase'

export interface SendMailRecipient {
  to: string
  name: string
  subject: string
  html: string
}

interface SendMailResult {
  sent: number
}

export async function sendMail(recipients: SendMailRecipient[]) {
  const sendMailCallable = httpsCallable<{ recipients: SendMailRecipient[] }, SendMailResult>(
    getFirebaseFunctions(),
    'sendMail'
  )
  const res = await sendMailCallable({ recipients })
  return res.data
}
