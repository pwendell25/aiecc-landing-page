'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMailerData } from '@/lib/admin/MailerDataContext'
import TemplateEditorView from '@/components/admin/TemplateEditorView'
import { EditDraft, MailerTemplate } from '@/lib/admin/mailerData'

function draftFromTemplate(t: MailerTemplate | undefined): EditDraft {
  if (!t) return { id: null, name: '', subject: '', category: '', html: '' }
  return { id: t.id, name: t.name, subject: t.subject, category: t.category, html: t.html }
}

function EditorPageInner({ id }: { id: string | null }) {
  const router = useRouter()
  const { templates, showToast } = useMailerData()
  const [draft, setDraft] = useState<EditDraft>(() => draftFromTemplate(templates.find((t) => t.id === id)))

  useEffect(() => {
    if (!id || draft.id) return
    const t = templates.find((x) => x.id === id)
    // templates arrives asynchronously from the Firestore subscription; this syncs
    // the local draft once it shows up (e.g. on a direct page load/refresh).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (t) setDraft(draftFromTemplate(t))
  }, [id, templates, draft.id])

  return (
    <TemplateEditorView
      draft={draft}
      setDraft={setDraft}
      onCancel={() => router.push('/admin/mailer/templates')}
      onSaved={() => {
        router.push('/admin/mailer/templates')
        showToast('Template saved')
      }}
      onError={showToast}
    />
  )
}

function EditorPageKeyed() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  return <EditorPageInner key={id ?? 'new'} id={id} />
}

export default function EditorPage() {
  return (
    <Suspense fallback={null}>
      <EditorPageKeyed />
    </Suspense>
  )
}
