import { httpsCallable } from 'firebase/functions'
import { getFirebaseFunctions } from '@/lib/firebase'

export interface SendMailRecipient {
  to: string
  name: string
  subject: string
  html: string
  attachmentUrl?: string
  attachmentName?: string
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

// Asks the generateTransformation function to write the [MENTION TRANSFORMATION] phrase from a call transcript.
export async function generateTransformation(transcript: string) {
  const callable = httpsCallable<{ transcript: string }, { text: string }>(
    getFirebaseFunctions(),
    'generateTransformation'
  )
  const res = await callable({ transcript })
  return res.data.text
}
