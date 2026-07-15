'use client'

interface Props {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', danger, onConfirm, onCancel }: Props) {
  if (!open) return null

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
            className={
              danger
                ? 'cursor-pointer border-none rounded-full bg-[#ff5c5c] text-[#1a0a0a] font-semibold text-[14px] px-4 py-2.5 font-sans hover:bg-[#ff7373] transition'
                : 'cursor-pointer border-none rounded-full bg-accent text-[#0a0a0a] font-semibold text-[14px] px-4 py-2.5 font-sans hover:bg-[#f2d072] transition'
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
