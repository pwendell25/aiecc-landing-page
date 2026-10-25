'use client'

import { useState } from 'react'

interface Props {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  danger?: boolean
  // When set, the confirm button stays disabled until this exact text is typed.
  requireText?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog(props: Props) {
  if (!props.open) return null
  // Remount per open so the typed confirmation starts empty each time.
  return <DialogPanel {...props} />
}

function DialogPanel({ title, message, confirmLabel = 'Confirm', danger, requireText, onConfirm, onCancel }: Props) {
  const [typed, setTyped] = useState('')
  const blocked = !!requireText && typed.trim() !== requireText.trim()

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
      style={{ animation: 'dialogBackdropIn 0.18s ease' }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[380px] bg-bg-alt border border-[rgba(239,199,94,0.2)] rounded-2xl p-6"
        style={{ animation: 'dialogPanelIn 0.22s cubic-bezier(0.16,1,0.3,1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-display font-extrabold text-[18px]">{title}</div>
        <div className="text-[14px] text-[rgba(251,252,245,0.65)] mt-2 leading-relaxed">{message}</div>
        {requireText && (
          <input
            autoFocus
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !blocked) onConfirm()
            }}
            placeholder={requireText}
            className="w-full mt-3.5 bg-bg border border-[rgba(239,199,94,0.2)] rounded-[11px] text-text font-sans text-[14px] px-3.5 py-2.5 outline-none focus:border-accent"
          />
        )}
        <div className="flex gap-2.5 mt-5 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer border border-[rgba(239,199,94,0.3)] rounded-full bg-transparent text-accent font-medium text-[14px] px-4 py-2.5 font-sans hover:bg-[rgba(239,199,94,0.1)] transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={blocked}
            className={
              (danger
                ? 'cursor-pointer border-none rounded-full bg-[#ff5c5c] text-[#1a0a0a] font-semibold text-[14px] px-4 py-2.5 font-sans hover:bg-[#ff7373] transition'
                : 'cursor-pointer border-none rounded-full bg-accent text-[#0a0a0a] font-semibold text-[14px] px-4 py-2.5 font-sans hover:bg-[#f2d072] transition') +
              ' disabled:opacity-40 disabled:cursor-not-allowed'
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
