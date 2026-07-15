'use client'

import { useState, useRef } from 'react'
import { EditDraft, detectTags, detectImages, saveTemplate } from '@/lib/admin/mailerData'
import { uploadMailerImage } from '@/lib/admin/uploadImage'
import ConfirmDialog from './ConfirmDialog'

interface Props {
  draft: EditDraft
  setDraft: (d: EditDraft) => void
  onCancel: () => void
  onSaved: () => void
  onError: (msg: string) => void
}

const PERSONALIZATION_TAG = /^\[FIRST\s*NAME\]$/i

type UploadTarget = { type: 'replace'; src: string } | { type: 'insert'; selStart: number; selEnd: number }

export default function TemplateEditorView({ draft, setDraft, onCancel, onSaved, onError }: Props) {
  const tags = detectTags(draft.html)
  const personalizationTags = tags.filter((t) => PERSONALIZATION_TAG.test(t))
  const fillInTags = tags.filter((t) => !PERSONALIZATION_TAG.test(t))
  const images = detectImages(draft.html)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({})
  const [uploading, setUploading] = useState(false)
  const [uploadTarget, setUploadTarget] = useState<UploadTarget | null>(null)
  const [confirmReplaceSrc, setConfirmReplaceSrc] = useState<string | null>(null)

  function jumpToTag(tag: string) {
    const el = textareaRef.current
    const idx = draft.html.indexOf(tag)
    if (!el || idx === -1) return
    el.focus()
    el.setSelectionRange(idx, idx + tag.length)
  }

  function confirmReplaceImage() {
    if (!confirmReplaceSrc) return
    setUploadTarget({ type: 'replace', src: confirmReplaceSrc })
    setConfirmReplaceSrc(null)
    fileInputRef.current?.click()
  }

  function startInsertImage() {
    const el = textareaRef.current
    const selStart = el?.selectionStart ?? draft.html.length
    const selEnd = el?.selectionEnd ?? draft.html.length
    setUploadTarget({ type: 'insert', selStart, selEnd })
    fileInputRef.current?.click()
  }

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    const target = uploadTarget
    if (!file || !target) return
    setUploading(true)
    try {
      const url = await uploadMailerImage(file)
      if (target.type === 'replace') {
        setDraft({ ...draft, html: draft.html.split(target.src).join(url) })
      } else {
        setDraft({ ...draft, html: draft.html.slice(0, target.selStart) + url + draft.html.slice(target.selEnd) })
      }
    } catch {
      onError('Image upload failed')
    } finally {
      setUploading(false)
      setUploadTarget(null)
    }
  }

  function applyTag(tag: string) {
    let value = (tagInputs[tag] || '').trim()
    if (!value) return
    // Tags ending in "LINK]" become href values — auto-add a protocol if the user
    // pasted a bare domain like "calendly.com/x", since that would otherwise resolve
    // as a broken relative link instead of a working URL.
    if (/LINK\]$/i.test(tag) && !/^(https?:|mailto:|tel:)/i.test(value)) {
      value = 'https://' + value
    }
    setDraft({ ...draft, html: draft.html.split(tag).join(value) })
    setTagInputs((prev) => {
      const next = { ...prev }
      delete next[tag]
      return next
    })
  }

  async function handleSave() {
    if (!draft.name.trim()) {
      onError('Add a template name')
      return
    }
    if (!draft.html.trim()) {
      onError('Paste some HTML first')
      return
    }
    await saveTemplate(draft.id, {
      name: draft.name.trim(),
      subject: draft.subject.trim(),
      category: draft.category.trim() || 'General',
      html: draft.html,
    })
    onSaved()
  }

  const inputClass =
    'w-full bg-bg border border-[rgba(239,199,94,0.2)] rounded-[11px] text-text font-sans text-[15px] px-3.5 py-3 outline-none focus:border-accent'
  const labelClass =
    'block text-[12px] font-semibold tracking-[0.06em] uppercase text-[rgba(251,252,245,0.6)] mb-[7px]'

  return (
    <div>
      <button
        onClick={onCancel}
        className="cursor-pointer bg-transparent border-none text-[rgba(251,252,245,0.6)] text-[13px] font-sans p-0 mb-3.5 hover:text-accent transition"
      >
        ← Back to templates
      </button>
      <div className="font-display font-extrabold text-[26px] tracking-[-0.02em]">
        {draft.id ? 'Edit template' : 'New template'}
      </div>

      <div className="flex gap-[22px] flex-wrap mt-[22px] items-start">
        <div className="flex-[1_1_380px] min-w-[300px] flex flex-col gap-4">
          <div>
            <label className={labelClass}>Template name</label>
            <input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="Follow-up Email"
              className={inputClass}
            />
          </div>
          <div className="flex gap-3.5 flex-wrap">
            <div className="flex-[2_1_200px]">
              <label className={labelClass}>Subject line</label>
              <input
                value={draft.subject}
                onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
                placeholder="Following up, [FIRST NAME]"
                className={inputClass}
              />
            </div>
            <div className="flex-[1_1_120px]">
              <label className={labelClass}>Category</label>
              <input
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                placeholder="Onboarding"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Paste HTML from Claude</label>
            <textarea
              ref={textareaRef}
              value={draft.html}
              onChange={(e) => setDraft({ ...draft, html: e.target.value })}
              placeholder="Paste your full email HTML here…"
              className="w-full h-[260px] resize-y bg-bg border border-[rgba(239,199,94,0.2)] rounded-[11px] text-[#cfe3c8] font-mono text-[12px] leading-normal p-3.5 outline-none focus:border-accent"
            />
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelected} className="hidden" />
          </div>
          <div>
            <div className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[rgba(251,252,245,0.6)] mb-[9px]">
              Images in this template
            </div>
            {images.length > 0 ? (
              <div className="flex flex-col gap-2">
                {images.map((img) => {
                  const isThisUploading =
                    uploading && uploadTarget?.type === 'replace' && uploadTarget.src === img.src
                  return (
                    <div
                      key={img.src}
                      className="flex items-center gap-3 bg-bg border border-[rgba(239,199,94,0.16)] rounded-[11px] p-2.5"
                    >
                      {img.isDataUri ? (
                        <div className="w-12 h-12 rounded-[8px] bg-bg-alt flex items-center justify-center flex-none text-[9px] leading-tight text-center px-1 text-[rgba(251,252,245,0.4)]">
                          embedded
                        </div>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element -- arbitrary remote thumbnail, next/image needs domain config we don't want for a small preview
                        <img src={img.src} alt="" className="w-12 h-12 rounded-[8px] object-cover flex-none bg-bg-alt" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium truncate">{img.alt || 'Untitled image'}</div>
                        <div className="text-[11px] text-[rgba(251,252,245,0.4)] truncate font-mono">
                          {img.isDataUri ? 'Embedded (base64) — replace to host it properly' : img.src}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setConfirmReplaceSrc(img.src)}
                        disabled={uploading}
                        className="cursor-pointer flex-none border border-[rgba(239,199,94,0.3)] rounded-full bg-[rgba(239,199,94,0.06)] text-accent font-medium text-[12px] px-3 py-[7px] font-sans hover:bg-[rgba(239,199,94,0.14)] transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isThisUploading ? 'Uploading…' : 'Replace'}
                      </button>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-[13px] text-[rgba(251,252,245,0.45)]">No images detected in this template.</div>
            )}
            <button
              type="button"
              onClick={startInsertImage}
              disabled={uploading}
              className="cursor-pointer bg-transparent border-none text-[12px] font-sans text-accent mt-2 p-0 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Insert a brand-new image at the cursor position
            </button>
          </div>
          <div>
            <div className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[rgba(251,252,245,0.6)] mb-[9px]">
              Detected merge tags
            </div>
            {tags.length > 0 ? (
              <div className="flex flex-col gap-3">
                {personalizationTags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {personalizationTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => jumpToTag(tag)}
                        title="Jump to this tag in the HTML"
                        className="cursor-pointer text-[12px] font-medium text-accent bg-[rgba(239,199,94,0.10)] border border-[rgba(239,199,94,0.28)] rounded-full px-3 py-[5px] font-mono hover:bg-[rgba(239,199,94,0.2)] transition"
                      >
                        {tag}
                      </button>
                    ))}
                    <span className="text-[12px] text-[rgba(251,252,245,0.45)]">
                      Personalized automatically per recipient — leave as-is.
                    </span>
                  </div>
                )}
                {fillInTags.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <div className="text-[12px] text-[rgba(251,252,245,0.45)]">
                      One-time placeholders — type a value and press Enter to fill it in everywhere it appears.
                    </div>
                    {fillInTags.map((tag) => (
                      <div key={tag} className="flex gap-2 items-center">
                        <button
                          type="button"
                          onClick={() => jumpToTag(tag)}
                          title="Jump to this tag in the HTML"
                          className="cursor-pointer flex-none text-[12px] font-medium text-accent bg-[rgba(239,199,94,0.10)] border border-[rgba(239,199,94,0.28)] rounded-full px-3 py-[5px] font-mono hover:bg-[rgba(239,199,94,0.2)] transition"
                        >
                          {tag}
                        </button>
                        <input
                          value={tagInputs[tag] || ''}
                          onChange={(e) => setTagInputs((prev) => ({ ...prev, [tag]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') applyTag(tag)
                          }}
                          placeholder="Paste the real value…"
                          className="flex-1 bg-bg border border-[rgba(239,199,94,0.2)] rounded-[9px] text-text font-sans text-[13px] px-3 py-[7px] outline-none focus:border-accent"
                        />
                        <button
                          type="button"
                          onClick={() => applyTag(tag)}
                          disabled={!(tagInputs[tag] || '').trim()}
                          className="cursor-pointer flex-none border-none rounded-[9px] bg-accent text-[#0a0a0a] font-semibold text-[12px] px-3 py-[7px] font-sans hover:bg-[#f2d072] transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Fill in
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-[13px] text-[rgba(251,252,245,0.45)]">
                None detected. Use [FIRST NAME] anywhere and it will be personalized on send.
              </div>
            )}
          </div>
          <div className="flex gap-2.5 mt-1">
            <button
              onClick={handleSave}
              className="cursor-pointer border-none rounded-full bg-accent text-[#0a0a0a] font-semibold text-[15px] px-[26px] py-[13px] font-sans shadow-[0_8px_24px_rgba(239,199,94,0.22)] hover:bg-[#f2d072] transition"
            >
              Save template
            </button>
            <button
              onClick={onCancel}
              className="cursor-pointer border border-[rgba(239,199,94,0.3)] rounded-full bg-transparent text-accent font-medium text-[15px] px-[22px] py-[13px] font-sans hover:bg-[rgba(239,199,94,0.1)] transition"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="flex-[1_1_360px] min-w-[300px]">
          <div className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[rgba(251,252,245,0.6)] mb-[9px]">
            Live preview
          </div>
          <div className="border border-[rgba(239,199,94,0.16)] rounded-[14px] overflow-hidden bg-bg">
            <div className="flex items-center gap-[7px] px-3.5 py-2.5 border-b border-[rgba(239,199,94,0.1)] bg-bg-alt">
              <span className="w-2.5 h-2.5 rounded-full bg-[rgba(251,252,245,0.16)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[rgba(251,252,245,0.16)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[rgba(251,252,245,0.16)]" />
            </div>
            <iframe srcDoc={draft.html} title="live preview" className="w-full block bg-bg" style={{ height: 620, border: 'none' }} />
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmReplaceSrc !== null}
        title="Replace this image?"
        message="The current image will be swapped out everywhere it appears in this template. This can't be undone."
        confirmLabel="Replace"
        onConfirm={confirmReplaceImage}
        onCancel={() => setConfirmReplaceSrc(null)}
      />
    </div>
  )
}
