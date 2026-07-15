'use client'

import { useRouter } from 'next/navigation'
import { useMailerData } from '@/lib/admin/MailerDataContext'
import DashboardView from '@/components/admin/DashboardView'

export default function MailerDashboardPage() {
  const router = useRouter()
  const { templates, contacts, campaigns } = useMailerData()

  return (
    <DashboardView
      templates={templates}
      contacts={contacts}
      campaigns={campaigns}
      onNewTemplate={() => router.push('/admin/mailer/templates/editor')}
      onGoContacts={() => router.push('/admin/mailer/contacts')}
      onStartSend={() => router.push('/admin/mailer/send')}
    />
  )
}
