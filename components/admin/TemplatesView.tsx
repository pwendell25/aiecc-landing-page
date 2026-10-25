'use client'

import { useState } from 'react'
import { MailerTemplate, detectTags, dateLabel, deleteTemplate } from '@/lib/admin/mailerData'
import ConfirmDialog from './ConfirmDialog'

interface Props {
  templates: MailerTemplate[]
  onNewTemplate: () => void
  onOpen: (id: string) => void
  onUse: (id: string) => void
  onEdit: (t: MailerTemplate) => void
  onDelete: (msg: string) => void
}

export default function TemplatesView({ templates, onNewTemplate, onOpen, onUse, onEdit, onDelete }: Props) {
  const [confirmDelete, setConfirmDelete] = useState<MailerTemplate | null>(null)

  async function handleConfirmDelete() {
    if (!confirmDelete) return
    const t = confirmDelete
    setConfirmDelete(null)
    try {
      await deleteTemplate(t.id, !!t.protected)
      onDelete('Template deleted')
    } catch {
      onDelete("Couldn't delete the template")
    }
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[12px] font-semibold tracking-[0.2em] uppercase text-accent">Library</div>
          <div className="font-display font-extrabold text-[30px] tracking-[-0.02em] mt-2">Templates</div>
        </div>
        <button
          onClick={onNewTemplate}
          className="cursor-pointer border-none rounded-full bg-accent text-[#0a0a0a] font-semibold text-[14px] px-5 py-[11px] font-sans hover:bg-[#f2d072] transition"
        >
          ＋ New template
        </button>
      </div>

      {templates.length > 0 ? (
        <div
          className="grid gap-5 mt-[26px]"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))' }}
        >
          {templates.map((t) => {
            const tagCount = detectTags(t.html).length
            return (
              <div
                key={t.id}
                className="bg-bg-alt border border-[rgba(239,199,94,0.14)] rounded-2xl overflow-hidden flex flex-col"
              >
                <div
                  className="relative h-[158px] overflow-hidden bg-bg cursor-pointer border-b border-[rgba(239,199,94,0.10)]"
                  onClick={() => onOpen(t.id)}
                >
                  <iframe
                    srcDoc={t.html}
                    scrolling="no"
                    title={t.name}
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{ width: 600, height: 660, border: 'none', transform: 'scale(0.47)', transformOrigin: 'top left' }}
                  />
                </div>
                <div className="px-4 pt-[15px] pb-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-[15px] font-semibold flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
                      {t.protected && (
                        <span title="Protected template" className="mr-1.5">
                          🔒
                        </span>
                      )}
                      {t.name}
                    </div>
                    <div className="text-[10px] font-semibold tracking-[0.08em] uppercase text-accent bg-[rgba(239,199,94,0.10)] border border-[rgba(239,199,94,0.25)] rounded-full px-[9px] py-[3px] whitespace-nowrap">
                      {t.category}
                    </div>
                  </div>
                  <div className="text-[12px] text-[rgba(251,252,245,0.5)] mt-1.5">
                    {tagCount} merge tag{tagCount === 1 ? '' : 's'} · {dateLabel(t.createdAt)}
                  </div>
                  <div className="flex gap-2 mt-3.5">
                    <button
                      onClick={() => onUse(t.id)}
                      className="cursor-pointer flex-1 border-none rounded-[9px] bg-accent text-[#0a0a0a] font-semibold text-[13px] px-2.5 py-2.5 font-sans hover:bg-[#f2d072] transition"
                    >
                      Use
                    </button>
                    <button
                      onClick={() => onEdit(t)}
                      className="cursor-pointer border border-[rgba(239,199,94,0.3)] rounded-[9px] bg-[rgba(239,199,94,0.06)] text-accent font-medium text-[13px] px-3 py-2.5 font-sans hover:bg-[rgba(239,199,94,0.14)] transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setConfirmDelete(t)}
                      title={t.protected ? 'Protected – type its name to delete' : 'Delete'}
                      className="cursor-pointer border border-[rgba(251,252,245,0.14)] rounded-[9px] bg-transparent text-[rgba(251,252,245,0.55)] text-[14px] px-[11px] py-2.5 font-sans hover:border-[rgba(255,120,120,0.5)] hover:text-[#ff8080] transition"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="mt-[26px] px-[26px] py-14 text-center border border-dashed border-[rgba(239,199,94,0.22)] rounded-2xl">
          <div className="font-display font-extrabold text-[20px]">No templates yet</div>
          <div className="text-[14px] text-[rgba(251,252,245,0.55)] mt-2 max-w-[420px] mx-auto">
            Design an email in Claude, copy its HTML, then paste it here to save it for reuse.
          </div>
          <button
            onClick={onNewTemplate}
            className="cursor-pointer mt-5 border-none rounded-full bg-accent text-[#0a0a0a] font-semibold text-[14px] px-[22px] py-[11px] font-sans hover:bg-[#f2d072] transition"
          >
            ＋ Paste your first template
          </button>
        </div>
      )}

      <ConfirmDialog
        open={confirmDelete !== null}
        title={confirmDelete?.protected ? 'Delete a protected template?' : 'Delete this template?'}
        message={
          confirmDelete?.protected
            ? `"${confirmDelete.name}" is protected because it's used for important or automatic emails. Type its name to unlock and permanently delete it. This can't be undone.`
            : `"${confirmDelete?.name}" will be permanently deleted. This can't be undone.`
        }
        confirmLabel={confirmDelete?.protected ? 'Unlock & delete' : 'Delete'}
        danger
        requireText={confirmDelete?.protected ? confirmDelete.name : undefined}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  )
}
