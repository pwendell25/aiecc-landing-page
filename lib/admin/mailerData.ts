import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  getDocs,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface MailerTemplate {
  id: string
  name: string
  subject: string
  category: string
  html: string
  createdAt: number
}

export interface MailerContact {
  id: string
  name: string
  email: string
  addedAt: number
}

export interface EditDraft {
  id: string | null
  name: string
  subject: string
  category: string
  html: string
}

export interface MailerCampaign {
  id: string
  templateId: string
  templateName: string
  subject: string
  recipientCount: number
  sentAt: number
}

const templatesRef = collection(db, 'mailerTemplates')
const contactsRef = collection(db, 'mailerContacts')
const campaignsRef = collection(db, 'mailerCampaigns')

export function subscribeTemplates(cb: (templates: MailerTemplate[]) => void) {
  const q = query(templatesRef, orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() } as MailerTemplate)))
  })
}

export function subscribeContacts(cb: (contacts: MailerContact[]) => void) {
  const q = query(contactsRef, orderBy('addedAt', 'asc'))
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() } as MailerContact)))
  })
}

export function subscribeCampaigns(cb: (campaigns: MailerCampaign[]) => void) {
  const q = query(campaignsRef, orderBy('sentAt', 'desc'))
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() } as MailerCampaign)))
  })
}

export async function saveTemplate(
  id: string | null,
  data: { name: string; subject: string; category: string; html: string }
) {
  if (id) {
    await updateDoc(doc(templatesRef, id), data)
  } else {
    await addDoc(templatesRef, { ...data, createdAt: Date.now() })
  }
}

export async function deleteTemplate(id: string) {
  await deleteDoc(doc(templatesRef, id))
}

export async function addContact(name: string, email: string) {
  await addDoc(contactsRef, { name, email, addedAt: Date.now() })
}

export async function deleteContact(id: string) {
  await deleteDoc(doc(contactsRef, id))
}

export async function addCampaign(data: {
  templateId: string
  templateName: string
  subject: string
  recipientCount: number
}) {
  await addDoc(campaignsRef, { ...data, sentAt: Date.now() })
}

export async function seedIfEmpty() {
  const existing = await getDocs(templatesRef)
  if (!existing.empty) return

  const html = await fetch('/admin/welcome-email.html').then((r) => r.text())
  await addDoc(templatesRef, {
    name: 'Welcome Email',
    subject: 'Welcome to the team, [FIRST NAME]. Here is your first step.',
    category: 'Onboarding',
    html,
    createdAt: Date.now(),
  })
  await addDoc(contactsRef, { name: 'Jordan Ellis', email: 'jordan.ellis@email.com', addedAt: Date.now() })
  await addDoc(contactsRef, { name: 'Maya Chen', email: 'maya.chen@email.com', addedAt: Date.now() + 1 })
}

export function firstName(name: string): string {
  return (name || '').trim().split(/\s+/)[0] || 'there'
}

export function merge(html: string, contact?: { name: string } | null): string {
  if (!html) return html
  const fn = contact ? firstName(contact.name) : 'there'
  return html.split('[FIRST NAME]').join(fn).split('[FIRSTNAME]').join(fn)
}

export function detectTags(html: string): string[] {
  const set = new Set<string>()
  const re = /\[[A-Z][A-Z]*(?: [A-Z]+)*\]/g
  let m: RegExpExecArray | null
  while ((m = re.exec(html || '')) !== null) set.add(m[0])
  return [...set]
}

export interface DetectedImage {
  src: string
  alt: string
  isDataUri: boolean
}

export function detectImages(html: string): DetectedImage[] {
  const seen = new Set<string>()
  const images: DetectedImage[] = []
  const re = /<img\b[^>]*>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html || '')) !== null) {
    const tag = m[0]
    const srcMatch = tag.match(/src=["']([^"']+)["']/i)
    if (!srcMatch || seen.has(srcMatch[1])) continue
    seen.add(srcMatch[1])
    const altMatch = tag.match(/alt=["']([^"']*)["']/i)
    images.push({
      src: srcMatch[1],
      alt: altMatch ? altMatch[1] : '',
      isDataUri: srcMatch[1].startsWith('data:'),
    })
  }
  return images
}

export function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return Math.floor(s / 60) + 'm ago'
  if (s < 86400) return Math.floor(s / 3600) + 'h ago'
  return Math.floor(s / 86400) + 'd ago'
}

export function dateLabel(ts: number): string {
  try {
    return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}
