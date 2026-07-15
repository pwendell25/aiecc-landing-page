'use client'

import { useState } from 'react'
import { MailerTemplate, MailerContact, merge, addCampaign } from '@/lib/admin/mailerData'
import { sendMail } from '@/lib/admin/sendMail'
import ConfirmDialog from './ConfirmDialog'

interface Props {
  templates: MailerTemplate[]
  contacts: MailerContact[]
  sendTemplateId: string | null
  setSendTemplateId: (id: string | null) => void
  onNewTemplate: () => void
  onGoContacts: () => void
  onToast: (msg: string) => void
  onDashboard: () => void
}

export default function SendView({
  templates,
  contacts,
  sendTemplateId,
  setSendTemplateId,
  onNewTemplate,
  onGoContacts,
  onToast,
  onDashboard,
}: Props) {
  const [sendRecipients, setSendRecipients] = useState<string[]>([])
  const [sendSubject, setSendSubject] = useState('')
  const [testEmail, setTestEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [testSending, setTestSending] = useState(false)
  const [sendResult, setSendResult] = useState<{ count: number; name: string } | null>(null)
  const [confirmSend, setConfirmSend] = useState(false)

  const sendTpl = templates.find((t) => t.id === sendTemplateId) || null
  const firstRecip = contacts.find((c) => sendRecipients.includes(c.id)) || null
  const canSend = !!sendTemplateId && sendRecipients.length > 0
  const allSelected = contacts.length > 0 && sendRecipients.length === contacts.length

  const personalizedHtml = sendTpl
    ? merge(sendTpl.html, firstRecip)
    : '<div style="padding:40px;font-family:sans-serif;color:#888;text-align:center;">Select a template to preview it here.</div>'
  const personalizedSubject = merge(sendSubject, firstRecip) || '(no subject)'

  function pickTemplate(t: MailerTemplate) {
    setSendTemplateId(t.id)
    setSendSubject((prev) => prev || t.subject || '')
  }

  function toggleRecipient(id: string) {
    setSendRecipients((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function toggleAll() {
    setSendRecipients(allSelected ? [] : contacts.map((c) => c.id))
  }

  async function handleSendTest() {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(testEmail.trim())) {
      onToast('Enter a valid test email')
      return
    }
    if (!sendTpl) {
      onToast('Pick a template first')
      return
    }
    setTestSending(true)
    try {
      await sendMail([
        {
          to: testEmail.trim(),
          name: 'there',
          subject: merge(sendSubject, null) || '(no subject)',
          html: merge(sendTpl.html, null),
        },
      ])
      onToast('Test sent to ' + testEmail.trim())
    } catch {
      onToast('Test send failed. Check your mail setup.')
    } finally {
      setTestSending(false)
    }
  }

  async function handleSend() {
    if (!canSend || !sendTpl) {
      onToast('Pick a template and at least one recipient')
      return
    }
    setConfirmSend(true)
  }

  async function handleConfirmSend() {
    setConfirmSend(false)
    if (!sendTpl) return
    const recipientContacts = contacts.filter((c) => sendRecipients.includes(c.id))
    setSending(true)
    try {
      await sendMail(
        recipientContacts.map((c) => ({
          to: c.email,
          name: c.name,
          subject: merge(sendSubject, c) || '(no subject)',
          html: merge(sendTpl.html, c),
        }))
      )
      await addCampaign({
        templateId: sendTpl.id,
        templateName: sendTpl.name,
        subject: sendSubject,
        recipientCount: recipientContacts.length,
      })
      setSendResult({ count: recipientContacts.length, name: sendTpl.name })
      setSendRecipients([])
    } catch {
      onToast('Send failed. Check your mail setup.')
    } finally {
      setSending(false)
    }
  }

  if (sendResult) {
    return (
      <div className="max-w-[520px] mx-auto mt-10 text-center bg-bg-alt border border-[rgba(239,199,94,0.2)] rounded-[20px] px-8 py-11">
        <div className="w-[66px] h-[66px] rounded-full bg-[rgba(239,199,94,0.12)] border border-[rgba(239,199,94,0.35)] flex items-center justify-center mx-auto text-accent text-[30px]">
          ✓
        </div>
        <div className="font-display font-extrabold text-[24px] mt-5">
          Sent to {sendResult.count} {sendResult.count === 1 ? 'client' : 'clients'}
        </div>
        <div className="text-[15px] font-light text-[rgba(251,252,245,0.65)] mt-2.5">
          &ldquo;{sendResult.name}&rdquo; is on its way. Personalized for each recipient.
        </div>
        <div className="flex gap-3 justify-center mt-[26px] flex-wrap">
          <button
            onClick={onDashboard}
            className="cursor-pointer border-none rounded-full bg-accent text-[#0a0a0a] font-semibold text-[15px] px-6 py-[13px] font-sans hover:bg-[#f2d072] transition"
          >
            Back to dashboard
          </button>
          <button
            onClick={() => setSendResult(null)}
            className="cursor-pointer border border-[rgba(239,199,94,0.3)] rounded-full bg-transparent text-accent font-medium text-[15px] px-[22px] py-[13px] font-sans hover:bg-[rgba(239,199,94,0.1)] transition"
          >
            Send another
          </button>
        </div>
      </div>
    )
  }

  const cardClass = 'bg-bg-alt border border-[rgba(239,199,94,0.14)] rounded-2xl px-[22px] py-5'
  const cardLabel = 'text-[13px] font-semibold tracking-[0.04em] uppercase text-[rgba(251,252,245,0.6)] mb-[13px]'
  const inputClass =
    'w-full bg-bg border border-[rgba(239,199,94,0.2)] rounded-[11px] text-text font-sans text-[15px] px-3.5 py-3 outline-none focus:border-accent'

  return (
    <div>
      <div className="text-[12px] font-semibold tracking-[0.2em] uppercase text-accent">Compose</div>
      <div className="font-display font-extrabold text-[30px] tracking-[-0.02em] mt-2">Send an email</div>

      <div className="flex gap-[22px] flex-wrap mt-6 items-start">
        <div className="flex-[1_1_380px] min-w-[300px] flex flex-col gap-5">
          <div className={cardClass}>
            <div className={cardLabel}>1 · Choose a template</div>
            {templates.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                {templates.map((t) => {
                  const sel = t.id === sendTemplateId
                  return (
                    <button
                      key={t.id}
                      onClick={() => pickTemplate(t)}
                      className="cursor-pointer text-left flex items-center gap-3 rounded-xl px-3.5 py-3 font-sans text-text border"
                      style={{
                        borderColor: sel ? '#EFC75E' : 'rgba(239,199,94,0.18)',
                        background: sel ? 'rgba(239,199,94,0.10)' : '#08080a',
                      }}
                    >
                      <div
                        className="w-[18px] h-[18px] rounded-full flex-none border-2"
                        style={{
                          borderColor: sel ? '#EFC75E' : 'rgba(251,252,245,0.35)',
                          background: sel ? '#EFC75E' : 'transparent',
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-medium">{t.name}</div>
                        <div className="text-[12px] text-[rgba(251,252,245,0.5)]">{t.category}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="text-[13px] text-[rgba(251,252,245,0.5)]">
                No templates yet.{' '}
                <span onClick={onNewTemplate} className="text-accent cursor-pointer underline">
                  Paste one first.
                </span>
              </div>
            )}
          </div>

          <div className={cardClass}>
            <div className={cardLabel}>2 · Subject line</div>
            <input
              value={sendSubject}
              onChange={(e) => setSendSubject(e.target.value)}
              placeholder="Subject…"
              className={inputClass}
            />
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between mb-[13px]">
              <div className="text-[13px] font-semibold tracking-[0.04em] uppercase text-[rgba(251,252,245,0.6)]">
                3 · Recipients
              </div>
              {contacts.length > 0 && (
                <button
                  onClick={toggleAll}
                  className="cursor-pointer bg-transparent border-none text-accent text-[13px] font-sans hover:underline"
                >
                  {allSelected ? 'Clear all' : 'Select all'}
                </button>
              )}
            </div>
            {contacts.length > 0 ? (
              <div className="flex flex-col gap-2 max-h-[230px] overflow-auto">
                {contacts.map((c) => {
                  const sel = sendRecipients.includes(c.id)
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleRecipient(c.id)}
                      className="cursor-pointer text-left flex items-center gap-3 rounded-[11px] px-3.5 py-2.5 font-sans text-text border"
                      style={{
                        borderColor: sel ? '#EFC75E' : 'rgba(239,199,94,0.16)',
                        background: sel ? 'rgba(239,199,94,0.08)' : '#08080a',
                      }}
                    >
                      <div
                        className="w-[18px] h-[18px] rounded-[6px] flex-none border-2 flex items-center justify-center text-[#0a0a0a] text-[12px] font-extrabold"
                        style={{
                          borderColor: sel ? '#EFC75E' : 'rgba(251,252,245,0.3)',
                          background: sel ? '#EFC75E' : 'transparent',
                        }}
                      >
                        {sel ? '✓' : ''}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-medium">{c.name}</div>
                        <div className="text-[12px] text-[rgba(251,252,245,0.5)] whitespace-nowrap overflow-hidden text-ellipsis">
                          {c.email}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="text-[13px] text-[rgba(251,252,245,0.5)]">
                No contacts yet.{' '}
                <span onClick={onGoContacts} className="text-accent cursor-pointer underline">
                  Add one first.
                </span>
              </div>
            )}
          </div>

          <div className={cardClass}>
            <div className={cardLabel}>Send a test to yourself</div>
            <div className="flex gap-2.5 flex-wrap">
              <input
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="you@aiecc.com"
                className="flex-[1_1_180px] bg-bg border border-[rgba(239,199,94,0.2)] rounded-[11px] text-text font-sans text-[14px] px-3.5 py-[11px] outline-none focus:border-accent"
              />
              <button
                onClick={handleSendTest}
                disabled={testSending}
                className="cursor-pointer border border-[rgba(239,199,94,0.3)] rounded-[11px] bg-[rgba(239,199,94,0.06)] text-accent font-medium text-[14px] px-[18px] py-[11px] font-sans whitespace-nowrap hover:bg-[rgba(239,199,94,0.14)] transition disabled:opacity-60"
              >
                {testSending ? 'Sending…' : 'Send test'}
              </button>
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={!canSend || sending}
            className="border-none rounded-full font-semibold text-[16px] px-[26px] py-[15px] font-sans transition"
            style={{
              cursor: canSend && !sending ? 'pointer' : 'not-allowed',
              background: canSend ? '#EFC75E' : 'rgba(239,199,94,0.18)',
              color: canSend ? '#0a0a0a' : 'rgba(251,252,245,0.4)',
              boxShadow: canSend ? '0 12px 32px rgba(239,199,94,0.26)' : 'none',
            }}
          >
            {sending
              ? 'Sending…'
              : canSend
                ? `Send to ${sendRecipients.length} ${sendRecipients.length === 1 ? 'client' : 'clients'}`
                : 'Send'}
          </button>
        </div>

        <div className="flex-[1_1_360px] min-w-[300px]">
          <div className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[rgba(251,252,245,0.6)] mb-[9px]">
            Preview {firstRecip ? `· ${firstRecip.name.trim().split(/\s+/)[0]}` : ''}
          </div>
          <div className="border border-[rgba(239,199,94,0.16)] rounded-[14px] overflow-hidden bg-bg">
            <div className="px-4 py-3 border-b border-[rgba(239,199,94,0.1)] bg-bg-alt">
              <div className="text-[11px] text-[rgba(251,252,245,0.45)]">Subject</div>
              <div className="text-[14px] font-medium mt-0.5">{personalizedSubject}</div>
            </div>
            <iframe srcDoc={personalizedHtml} title="send preview" className="w-full block bg-bg" style={{ height: 640, border: 'none' }} />
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmSend}
        title="Send this email?"
        message={`"${sendTpl?.name}" will be sent to ${sendRecipients.length} ${sendRecipients.length === 1 ? 'client' : 'clients'} right now. This can't be undone.`}
        confirmLabel="Send"
        onConfirm={handleConfirmSend}
        onCancel={() => setConfirmSend(false)}
      />
    </div>
  )
}
