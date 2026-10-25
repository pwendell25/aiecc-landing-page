'use client'

import { useState, type ReactNode } from 'react'
import {
  MailerTemplate,
  MailerContact,
  PERSONALIZATION_TAG,
  merge,
  fillTags,
  detectTags,
  addCampaign,
  missingRequiredTags,
} from '@/lib/admin/mailerData'
import { sendMail, generateTransformation } from '@/lib/admin/sendMail'
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

const OFFER_EXPIRATION_TAG = '[OFFER EXPIRATION DATE]'
// Can be written by AI from a pasted sales-call transcript.
const TRANSFORMATION_TAG = '[MENTION TRANSFORMATION]'
const OFFER_DAYS = 5

// e.g. "Monday, October 19, 2026"
function offerExpirationDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + OFFER_DAYS)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

function StepHeader({
  n,
  label,
  done,
  children,
}: {
  n: number
  label: string
  done: boolean
  children?: ReactNode
}) {
  return (
    <div className="flex items-center justify-between mb-[13px] gap-3">
      <div className="flex items-center gap-2.5">
        <div
          className="w-[22px] h-[22px] rounded-full flex-none flex items-center justify-center text-[11px] font-bold border transition"
          style={
            done
              ? { background: '#EFC75E', borderColor: '#EFC75E', color: '#0a0a0a' }
              : { borderColor: 'rgba(239,199,94,0.35)', color: 'rgba(251,252,245,0.6)' }
          }
        >
          {done ? '✓' : n}
        </div>
        <div className="text-[13px] font-semibold tracking-[0.04em] uppercase text-[rgba(251,252,245,0.6)]">
          {label}
        </div>
      </div>
      {children}
    </div>
  )
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
  // Send-time merge tag values: shared defaults plus optional per-recipient overrides.
  const [tagDefaults, setTagDefaults] = useState<Record<string, string>>({})
  const [tagOverrides, setTagOverrides] = useState<Record<string, Record<string, string>>>({})
  const [tagScope, setTagScope] = useState<string>('all')
  // Per-recipient tag values are tucked away until the user asks for them.
  const [perPerson, setPerPerson] = useState(false)
  const [testSent, setTestSent] = useState(false)
  const [transcriptOpen, setTranscriptOpen] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [generating, setGenerating] = useState(false)

  const sendTpl = templates.find((t) => t.id === sendTemplateId) || null

  // Seed the subject from a template preselected via ?template= ("Use" button) once templates have loaded.
  const [seededTemplateId, setSeededTemplateId] = useState<string | null>(null)
  if (sendTpl && seededTemplateId !== sendTpl.id) {
    setSeededTemplateId(sendTpl.id)
    setSendSubject(sendTpl.subject || '')
    seedAutoTags(sendTpl)
  }

  // Tags with a computed default (still editable), e.g. the offer deadline 5 days from today.
  function seedAutoTags(t: MailerTemplate) {
    const tags = detectTags(t.html + '\n' + (t.subject || ''))
    if (!tags.includes(OFFER_EXPIRATION_TAG)) return
    setTagDefaults((prev) =>
      prev[OFFER_EXPIRATION_TAG]?.trim() ? prev : { ...prev, [OFFER_EXPIRATION_TAG]: offerExpirationDate() }
    )
  }

  const missingRequired = sendTpl?.protected ? missingRequiredTags(sendTpl) : []
  const recipientContacts = contacts.filter((c) => sendRecipients.includes(c.id))
  const canSend = !!sendTemplateId && sendRecipients.length > 0
  const allSelected = contacts.length > 0 && sendRecipients.length === contacts.length

  const fillInTags = sendTpl
    ? detectTags(sendTpl.html + '\n' + sendSubject).filter((t) => !PERSONALIZATION_TAG.test(t))
    : []
  const scope = perPerson && sendRecipients.includes(tagScope) ? tagScope : 'all'
  const scopeContact = recipientContacts.find((c) => c.id === scope) || null
  const previewRecip = scopeContact || recipientContacts[0] || null

  function tagValuesFor(contactId: string | null): Record<string, string> {
    const overrides = (contactId && tagOverrides[contactId]) || {}
    const values: Record<string, string> = {}
    for (const tag of fillInTags) {
      const v = (overrides[tag] || '').trim() || (tagDefaults[tag] || '').trim()
      if (v) values[tag] = v
    }
    return values
  }

  function personalize(text: string, contact: MailerContact | null, isHtml: boolean): string {
    return fillTags(merge(text, contact), tagValuesFor(contact?.id ?? null), isHtml)
  }

  // Tags that would still go out as literal "[TAG]" for at least one selected recipient.
  const unfilledTags = fillInTags.filter((tag) =>
    (recipientContacts.length ? recipientContacts : [null]).some((c) => !tagValuesFor(c?.id ?? null)[tag])
  )

  function setTagValue(tag: string, value: string) {
    if (scope === 'all') {
      setTagDefaults((prev) => ({ ...prev, [tag]: value }))
    } else {
      setTagOverrides((prev) => ({ ...prev, [scope]: { ...prev[scope], [tag]: value } }))
    }
  }

  function hasOverrides(contactId: string): boolean {
    const o = tagOverrides[contactId]
    return !!o && fillInTags.some((t) => (o[t] || '').trim())
  }

  const personalizedHtml = sendTpl
    ? personalize(sendTpl.html, previewRecip, true)
    : '<div style="padding:40px;font-family:sans-serif;color:#888;text-align:center;">Select a template to preview it here.</div>'
  const personalizedSubject = personalize(sendSubject, previewRecip, false) || '(no subject)'

  function pickTemplate(t: MailerTemplate) {
    setSendTemplateId(t.id)
    setSeededTemplateId(t.id)
    setSendSubject(t.subject || '')
    seedAutoTags(t)
  }

  function toggleRecipient(id: string) {
    setSendRecipients((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function toggleAll() {
    setSendRecipients(allSelected ? [] : contacts.map((c) => c.id))
  }

  async function handleGenerateTransformation() {
    if (transcript.trim().length < 50) {
      onToast('Paste the call transcript first')
      return
    }
    setGenerating(true)
    try {
      // Goes into whichever scope is selected (Everyone or one person), like typing it by hand.
      setTagValue(TRANSFORMATION_TAG, await generateTransformation(transcript))
      onToast('Transformation written. Review it before sending.')
    } catch (err) {
      onToast((err as Error).message || 'Could not generate from the transcript')
    } finally {
      setGenerating(false)
    }
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
          name: previewRecip?.name || 'there',
          subject: personalizedSubject,
          html: personalizedHtml,
          attachmentUrl: sendTpl.attachmentUrl,
          attachmentName: sendTpl.attachmentName,
        },
      ])
      setTestSent(true)
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
    setSending(true)
    try {
      await sendMail(
        recipientContacts.map((c) => ({
          to: c.email,
          name: c.name,
          subject: personalize(sendSubject, c, false) || '(no subject)',
          html: personalize(sendTpl.html, c, true),
          attachmentUrl: sendTpl.attachmentUrl,
          attachmentName: sendTpl.attachmentName,
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
  const testStep = fillInTags.length > 0 ? 5 : 4
  const overrideCount = recipientContacts.filter((c) => hasOverrides(c.id)).length

  // What's done / missing before sending. 'todo' blocks sending; 'warn' doesn't.
  const checklist: { target: string; state: 'done' | 'todo' | 'warn'; text: string }[] = [
    {
      target: 'send-step-template',
      state: sendTpl ? 'done' : 'todo',
      text: sendTpl ? `Template: ${sendTpl.name}` : 'Choose a template',
    },
    {
      target: 'send-step-subject',
      state: sendSubject.trim() ? 'done' : 'warn',
      text: sendSubject.trim() ? 'Subject line added' : 'No subject line yet',
    },
    {
      target: 'send-step-recipients',
      state: sendRecipients.length ? 'done' : 'todo',
      text: sendRecipients.length
        ? `${sendRecipients.length} ${sendRecipients.length === 1 ? 'recipient' : 'recipients'} selected`
        : 'Pick at least one recipient',
    },
    ...(fillInTags.length
      ? [
          {
            target: 'send-step-tags',
            state: unfilledTags.length ? ('warn' as const) : ('done' as const),
            text: unfilledTags.length
              ? `${unfilledTags.length} merge ${unfilledTags.length === 1 ? 'tag' : 'tags'} still blank`
              : 'All merge tags filled in',
          },
        ]
      : []),
  ]
  const hasWarnings = checklist.some((i) => i.state === 'warn')

  function scrollToStep(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const inputClass =
    'w-full bg-bg border border-[rgba(239,199,94,0.2)] rounded-[11px] text-text font-sans text-[15px] px-3.5 py-3 outline-none focus:border-accent'

  return (
    <div>
      <div className="text-[12px] font-semibold tracking-[0.2em] uppercase text-accent">Compose</div>
      <div className="font-display font-extrabold text-[30px] tracking-[-0.02em] mt-2">Send an email</div>

      <div className="flex gap-[22px] flex-wrap mt-6 items-start">
        <div className="flex-[1_1_380px] min-w-[300px] flex flex-col gap-5">
          <div id="send-step-template" className={cardClass}>
            <StepHeader n={1} label="Choose a template" done={!!sendTpl} />
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
            {missingRequired.length > 0 && (
              <div className="mt-3 text-[12px] text-[#ff8080] bg-[rgba(255,92,92,0.08)] border border-[rgba(255,120,120,0.35)] rounded-[10px] px-3 py-2.5">
                This template is missing required {missingRequired.length === 1 ? 'tag' : 'tags'}{' '}
                {missingRequired.join(', ')}. Fix the template before sending.
              </div>
            )}
          </div>

          <div id="send-step-subject" className={cardClass}>
            <StepHeader n={2} label="Subject line" done={!!sendSubject.trim()} />
            <input
              value={sendSubject}
              onChange={(e) => setSendSubject(e.target.value)}
              placeholder="Subject…"
              className={inputClass}
            />
          </div>

          <div id="send-step-recipients" className={cardClass}>
            <StepHeader n={3} label="Recipients" done={sendRecipients.length > 0}>
              {contacts.length > 0 && (
                <button
                  onClick={toggleAll}
                  className="cursor-pointer bg-transparent border-none text-accent text-[13px] font-sans hover:underline"
                >
                  {allSelected ? 'Clear all' : 'Select all'}
                </button>
              )}
            </StepHeader>
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

          {fillInTags.length > 0 && (
            <div id="send-step-tags" className={cardClass}>
              <StepHeader n={4} label="Merge tags" done={unfilledTags.length === 0}>
                {unfilledTags.length > 0 && (
                  <div className="text-[12px] text-[#f0a35e]">{unfilledTags.length} still blank</div>
                )}
              </StepHeader>
              <div className="text-[12px] text-[rgba(251,252,245,0.45)] mb-3">
                {perPerson ? (
                  <>
                    Values under <span className="text-text">Everyone</span> apply to all recipients. Pick a person to
                    give them their own value — leave it blank to use the Everyone value.
                  </>
                ) : (
                  'This template has blanks to fill in. What you type here goes out to everyone you send to.'
                )}
              </div>

              {perPerson && (
                <>
                  <div className="flex flex-wrap gap-2 mb-3.5">
                    {[
                      { id: 'all', label: 'Everyone' },
                      ...recipientContacts.map((c) => ({ id: c.id, label: c.name.trim().split(/\s+/)[0] || c.email })),
                    ].map((opt) => {
                      const sel = opt.id === scope
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setTagScope(opt.id)}
                          className="cursor-pointer text-[12px] font-medium rounded-full px-3 py-[5px] font-sans border transition inline-flex items-center gap-1.5"
                          style={{
                            borderColor: sel ? '#EFC75E' : 'rgba(239,199,94,0.22)',
                            background: sel ? '#EFC75E' : 'transparent',
                            color: sel ? '#0a0a0a' : 'rgba(251,252,245,0.75)',
                          }}
                        >
                          {opt.label}
                          {opt.id !== 'all' && hasOverrides(opt.id) && (
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: sel ? '#0a0a0a' : '#EFC75E' }}
                              title="Has custom values"
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>
                  {recipientContacts.length === 0 && (
                    <div className="text-[12px] text-[rgba(251,252,245,0.45)] -mt-1.5 mb-3">
                      Select recipients above to set values per person.
                    </div>
                  )}
                </>
              )}

              <div className="flex flex-col gap-2">
                {fillInTags.map((tag) => {
                  const own = scope === 'all' ? tagDefaults[tag] || '' : tagOverrides[scope]?.[tag] || ''
                  const fallback = (tagDefaults[tag] || '').trim()
                  const blank = !own.trim() && (scope === 'all' || !fallback)
                  return (
                    <div key={tag}>
                      <div className="flex gap-2 items-center">
                        <div className="flex-none min-w-[120px] text-[12px] font-medium text-accent bg-[rgba(239,199,94,0.10)] border border-[rgba(239,199,94,0.28)] rounded-full px-3 py-[5px] font-mono text-center">
                          {tag}
                        </div>
                        <input
                          value={own}
                          onChange={(e) => setTagValue(tag, e.target.value)}
                          placeholder={
                            scope === 'all'
                              ? /LINK\]$/i.test(tag)
                                ? 'https://…'
                                : 'Value for everyone…'
                              : fallback
                                ? `Using: ${fallback}`
                                : `Value for ${scopeContact?.name.trim().split(/\s+/)[0]}…`
                          }
                          className="flex-1 min-w-0 bg-bg border rounded-[9px] text-text font-sans text-[13px] px-3 py-[7px] outline-none focus:border-accent"
                          style={{ borderColor: blank ? 'rgba(240,163,94,0.55)' : 'rgba(239,199,94,0.2)' }}
                        />
                      </div>
                      {tag === TRANSFORMATION_TAG && (
                        <div className="mt-2 ml-[128px] max-sm:ml-0">
                          {transcriptOpen ? (
                            <div className="flex flex-col gap-2">
                              <textarea
                                value={transcript}
                                onChange={(e) => setTranscript(e.target.value)}
                                placeholder="Paste the sales call transcript here…"
                                className="w-full h-[140px] resize-y bg-bg border border-[rgba(239,199,94,0.2)] rounded-[9px] text-text font-sans text-[13px] p-3 outline-none focus:border-accent"
                              />
                              <div className="flex items-center gap-2 flex-wrap">
                                <button
                                  type="button"
                                  onClick={handleGenerateTransformation}
                                  disabled={generating}
                                  className="cursor-pointer border-none rounded-[9px] bg-accent text-[#0a0a0a] font-semibold text-[12px] px-3 py-[7px] font-sans hover:bg-[#f2d072] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {generating ? 'Writing…' : own.trim() ? '✨ Regenerate' : '✨ Write it for me'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setTranscriptOpen(false)}
                                  className="cursor-pointer bg-transparent border-none text-[12px] font-sans text-[rgba(251,252,245,0.5)] hover:text-accent"
                                >
                                  Hide transcript
                                </button>
                                <span className="text-[11px] text-[rgba(251,252,245,0.4)]">
                                  Finishes “Together, we&apos;ll work to improve ___.” Always review before sending.
                                </span>
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setTranscriptOpen(true)}
                              className="cursor-pointer bg-transparent border-none text-[12px] font-sans text-accent p-0 hover:underline"
                            >
                              ✨ Write this from a call transcript
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-3.5 flex items-center gap-2 flex-wrap text-[12px]">
                {perPerson ? (
                  <button
                    type="button"
                    onClick={() => {
                      setPerPerson(false)
                      setTagScope('all')
                    }}
                    className="cursor-pointer bg-transparent border-none p-0 text-accent font-sans text-[12px] hover:underline"
                  >
                    ← Done customizing
                  </button>
                ) : recipientContacts.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setPerPerson(true)}
                    className="cursor-pointer bg-transparent border-none p-0 text-accent font-sans text-[12px] hover:underline"
                  >
                    Need different values for some people? Customize per recipient →
                  </button>
                ) : (
                  <span className="text-[rgba(251,252,245,0.4)]">
                    Need different values for some people? Select recipients first.
                  </span>
                )}
                {!perPerson && overrideCount > 0 && (
                  <span className="text-[rgba(251,252,245,0.5)]">
                    · Custom values set for {overrideCount} {overrideCount === 1 ? 'person' : 'people'}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className={cardClass}>
            <StepHeader n={testStep} label="Send a test (optional)" done={testSent} />
            <div className="text-[12px] text-[rgba(251,252,245,0.45)] -mt-1.5 mb-2.5">
              {previewRecip
                ? `Sends exactly what the preview shows (${previewRecip.name.trim().split(/\s+/)[0]}'s version) to your own inbox.`
                : 'Check how it looks in a real inbox before sending to clients.'}
            </div>
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

          <div className={cardClass}>
            <div className="text-[13px] font-semibold tracking-[0.04em] uppercase text-[rgba(251,252,245,0.6)] mb-3">
              {!canSend ? 'Before you can send' : hasWarnings ? 'Ready to send — double-check' : 'Ready to send'}
            </div>
            <div className="flex flex-col gap-1.5">
              {checklist.map((item) => (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => scrollToStep(item.target)}
                  className="cursor-pointer text-left flex items-center gap-2.5 bg-transparent border-none p-0 font-sans text-[14px] hover:underline"
                  style={{
                    color:
                      item.state === 'done'
                        ? 'rgba(251,252,245,0.75)'
                        : item.state === 'warn'
                          ? '#f0a35e'
                          : '#FBFCF5',
                  }}
                >
                  <span
                    className="w-[18px] h-[18px] rounded-full flex-none flex items-center justify-center text-[11px] font-bold border"
                    style={
                      item.state === 'done'
                        ? { background: '#EFC75E', borderColor: '#EFC75E', color: '#0a0a0a' }
                        : item.state === 'warn'
                          ? { borderColor: '#f0a35e', color: '#f0a35e' }
                          : { borderColor: 'rgba(251,252,245,0.4)', color: 'transparent' }
                    }
                  >
                    {item.state === 'done' ? '✓' : item.state === 'warn' ? '!' : ''}
                  </span>
                  {item.text}
                </button>
              ))}
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
            Preview {previewRecip ? `· ${previewRecip.name.trim().split(/\s+/)[0]}` : ''}
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
        message={
          `"${sendTpl?.name}" will be sent to ${sendRecipients.length} ${sendRecipients.length === 1 ? 'client' : 'clients'} right now. This can't be undone.` +
          (unfilledTags.length
            ? ` Heads up: ${unfilledTags.join(', ')} ${unfilledTags.length === 1 ? 'is' : 'are'} still blank for some recipients and will go out as-is.`
            : '')
        }
        confirmLabel="Send"
        onConfirm={handleConfirmSend}
        onCancel={() => setConfirmSend(false)}
      />
    </div>
  )
}
