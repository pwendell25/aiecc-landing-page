'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMailerData } from '@/lib/admin/MailerDataContext'
import SendView from '@/components/admin/SendView'

function SendPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { templates, contacts, showToast } = useMailerData()
  const [sendTemplateId, setSendTemplateId] = useState<string | null>(searchParams.get('template'))

  return (
    <SendView
      templates={templates}
      contacts={contacts}
      sendTemplateId={sendTemplateId}
      setSendTemplateId={setSendTemplateId}
      onNewTemplate={() => router.push('/admin/mailer/templates/editor')}
      onGoContacts={() => router.push('/admin/mailer/contacts')}
      onToast={showToast}
      onDashboard={() => router.push('/admin/mailer')}
    />
  )
}

export default function SendPage() {
  return (
    <Suspense fallback={null}>
      <SendPageInner />
    </Suspense>
  )
}
