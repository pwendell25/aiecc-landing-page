'use client'

import { useRouter } from 'next/navigation'
import { useMailerData } from '@/lib/admin/MailerDataContext'
import TemplatesView from '@/components/admin/TemplatesView'
import { MailerTemplate } from '@/lib/admin/mailerData'

export default function TemplatesPage() {
  const router = useRouter()
  const { templates, showToast } = useMailerData()

  return (
    <TemplatesView
      templates={templates}
      onNewTemplate={() => router.push('/admin/mailer/templates/editor')}
      onOpen={(id) => router.push(`/admin/mailer/templates/preview?id=${id}`)}
      onUse={(id) => router.push(`/admin/mailer/send?template=${id}`)}
      onEdit={(t: MailerTemplate) => router.push(`/admin/mailer/templates/editor?id=${t.id}`)}
      onDelete={showToast}
    />
  )
}
