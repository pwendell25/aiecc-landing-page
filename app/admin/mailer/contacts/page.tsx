'use client'

import { useMailerData } from '@/lib/admin/MailerDataContext'
import ContactsView from '@/components/admin/ContactsView'

export default function ContactsPage() {
  const { contacts, showToast } = useMailerData()

  return <ContactsView contacts={contacts} onToast={showToast} />
}
