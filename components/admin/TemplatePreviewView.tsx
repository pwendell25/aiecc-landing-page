'use client'

import { MailerTemplate } from '@/lib/admin/mailerData'

interface Props {
  template: MailerTemplate | null
  onBack: () => void
  onEdit: (t: MailerTemplate) => void
  onUse: (id: string) => void
}

export default function TemplatePreviewView({ template, onBack, onEdit, onUse }: Props) {
  if (!template) {
    return (
      <div>
        <button
          onClick={onBack}
          className="cursor-pointer bg-transparent border-none text-[rgba(251,252,245,0.6)] text-[13px] font-sans p-0 mb-3.5 hover:text-accent transition"
        >
          ← Back to templates
        </button>
        <div className="text-[14px] text-[rgba(251,252,245,0.5)]">Template not found.</div>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="cursor-pointer bg-transparent border-none text-[rgba(251,252,245,0.6)] text-[13px] font-sans p-0 mb-3.5 hover:text-accent transition"
      >
        ← Back to templates
      </button>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="font-display font-extrabold text-[26px] tracking-[-0.02em]">{template.name}</div>
          <div className="text-[14px] text-[rgba(251,252,245,0.6)] mt-[5px]">
            Subject: {template.subject || '(no subject)'}
          </div>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={() => onEdit(template)}
            className="cursor-pointer border border-[rgba(239,199,94,0.3)] rounded-full bg-[rgba(239,199,94,0.06)] text-accent font-medium text-[14px] px-[18px] py-2.5 font-sans hover:bg-[rgba(239,199,94,0.14)] transition"
          >
            Edit
          </button>
          <button
            onClick={() => onUse(template.id)}
            className="cursor-pointer border-none rounded-full bg-accent text-[#0a0a0a] font-semibold text-[14px] px-5 py-2.5 font-sans hover:bg-[#f2d072] transition"
          >
            Use in send →
          </button>
        </div>
      </div>
      <div className="mt-5 border border-[rgba(239,199,94,0.16)] rounded-2xl overflow-hidden bg-bg max-w-[640px]">
        <iframe srcDoc={template.html} title="full preview" className="w-full block bg-bg" style={{ height: 760, border: 'none' }} />
      </div>
    </div>
  )
}
