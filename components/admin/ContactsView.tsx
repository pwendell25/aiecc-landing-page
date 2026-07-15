'use client'

import { useState } from 'react'
import { MailerContact, addContact, deleteContact } from '@/lib/admin/mailerData'
import ConfirmDialog from './ConfirmDialog'

interface Props {
  contacts: MailerContact[]
  onToast: (msg: string) => void
}

export default function ContactsView({ contacts, onToast }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [err, setErr] = useState('')
  const [confirmDelete, setConfirmDelete] = useState<MailerContact | null>(null)

  async function handleAdd() {
    const n = name.trim()
    const e = email.trim()
    if (!n) {
      setErr('Enter a name.')
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) {
      setErr('Enter a valid email address.')
      return
    }
    await addContact(n, e)
    setName('')
    setEmail('')
    setErr('')
    onToast('Contact added')
  }

  async function handleConfirmDelete() {
    if (!confirmDelete) return
    await deleteContact(confirmDelete.id)
    onToast('Contact removed')
    setConfirmDelete(null)
  }

  const inputClass =
    'bg-bg border border-[rgba(239,199,94,0.2)] rounded-[11px] text-text font-sans text-[15px] px-3.5 py-3 outline-none focus:border-accent'

  return (
    <div>
      <div className="text-[12px] font-semibold tracking-[0.2em] uppercase text-accent">Audience</div>
      <div className="font-display font-extrabold text-[30px] tracking-[-0.02em] mt-2">Contacts</div>

      <div className="bg-bg-alt border border-[rgba(239,199,94,0.14)] rounded-2xl px-[22px] py-5 mt-[22px]">
        <div className="text-[13px] font-semibold tracking-[0.04em] uppercase text-[rgba(251,252,245,0.6)] mb-[13px]">
          Add a contact
        </div>
        <div className="flex gap-3 flex-wrap items-start">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setErr('')
            }}
            placeholder="Full name"
            className={`flex-[1_1_180px] ${inputClass}`}
          />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setErr('')
            }}
            placeholder="name@email.com"
            className={`flex-[1_1_220px] ${inputClass}`}
          />
          <button
            onClick={handleAdd}
            className="cursor-pointer border-none rounded-[11px] bg-accent text-[#0a0a0a] font-semibold text-[15px] px-6 py-3 font-sans whitespace-nowrap hover:bg-[#f2d072] transition"
          >
            Add
          </button>
        </div>
        {err && <div className="text-[#ff8f8f] text-[13px] mt-2.5">{err}</div>}
      </div>

      {contacts.length > 0 ? (
        <div className="bg-bg-alt border border-[rgba(239,199,94,0.14)] rounded-2xl mt-5 overflow-hidden">
          <div className="px-[22px] py-3.5 border-b border-[rgba(239,199,94,0.1)] text-[13px] text-[rgba(251,252,245,0.55)]">
            {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}
          </div>
          {contacts.map((c) => (
            <div key={c.id} className="flex items-center gap-3.5 px-[22px] py-[13px] border-t border-[rgba(239,199,94,0.07)]">
              <div className="w-10 h-10 rounded-full bg-[rgba(239,199,94,0.12)] border border-[rgba(239,199,94,0.3)] flex items-center justify-center flex-none font-display font-extrabold text-accent">
                {(c.name || '?').trim().charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-medium">{c.name}</div>
                <div className="text-[13px] text-[rgba(251,252,245,0.55)] whitespace-nowrap overflow-hidden text-ellipsis">
                  {c.email}
                </div>
              </div>
              <button
                onClick={() => setConfirmDelete(c)}
                title="Remove"
                className="cursor-pointer border border-[rgba(251,252,245,0.14)] rounded-[9px] bg-transparent text-[rgba(251,252,245,0.5)] text-[13px] px-[11px] py-2 font-sans hover:border-[rgba(255,120,120,0.5)] hover:text-[#ff8080] transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 px-[26px] py-11 text-center border border-dashed border-[rgba(239,199,94,0.2)] rounded-2xl text-[rgba(251,252,245,0.5)] text-[14px]">
          No contacts yet. Add your clients above to send to them.
        </div>
      )}

      <ConfirmDialog
        open={confirmDelete !== null}
        title="Remove this contact?"
        message={`${confirmDelete?.name} (${confirmDelete?.email}) will be removed from your contacts.`}
        confirmLabel="Remove"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  )
}
