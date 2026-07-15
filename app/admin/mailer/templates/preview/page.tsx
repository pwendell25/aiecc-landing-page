'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMailerData } from '@/lib/admin/MailerDataContext'
import TemplatePreviewView from '@/components/admin/TemplatePreviewView'
import { MailerTemplate } from '@/lib/admin/mailerData'

function PreviewPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { templates } = useMailerData()
  const template = templates.find((t) => t.id === id) || null

  return (
    <TemplatePreviewView
      template={template}
      onBack={() => router.push('/admin/mailer/templates')}
      onEdit={(t: MailerTemplate) => router.push(`/admin/mailer/templates/editor?id=${t.id}`)}
      onUse={(templateId) => router.push(`/admin/mailer/send?template=${templateId}`)}
    />
  )
}

export default function PreviewPage() {
  return (
    <Suspense fallback={null}>
      <PreviewPageInner />
    </Suspense>
  )
}
