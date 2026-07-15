'use client'

import { MailerTemplate, MailerContact, MailerCampaign, timeAgo, dateLabel } from '@/lib/admin/mailerData'

interface Props {
  templates: MailerTemplate[]
  contacts: MailerContact[]
  campaigns: MailerCampaign[]
  onNewTemplate: () => void
  onGoContacts: () => void
  onStartSend: () => void
}

function StatTile({ value, label, gold }: { value: number; label: string; gold?: boolean }) {
  return (
    <div className="bg-bg-alt border border-[rgba(239,199,94,0.14)] rounded-2xl px-[22px] py-[22px]">
      <div
        className="font-display font-extrabold text-[34px] leading-none"
        style={{ color: gold ? '#EFC75E' : '#FBFCF5' }}
      >
        {value}
      </div>
      <div className="text-[13px] font-normal text-[rgba(251,252,245,0.6)] mt-2">{label}</div>
    </div>
  )
}

export default function DashboardView({ templates, contacts, campaigns, onNewTemplate, onGoContacts, onStartSend }: Props) {
  const totalSent = campaigns.reduce((a, c) => a + c.recipientCount, 0)
  const recent = campaigns.slice(0, 5)

  return (
    <div>
      <div className="text-[12px] font-semibold tracking-[0.2em] uppercase text-accent">Overview</div>
      <div className="font-display font-extrabold text-[30px] tracking-[-0.02em] mt-2">Welcome back, Randall</div>
      <div className="text-[15px] font-light text-[rgba(251,252,245,0.6)] mt-1.5">
        Paste a design, save it, and send it to your clients.
      </div>

      <div className="grid gap-4 mt-[26px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <StatTile value={templates.length} label="Saved templates" gold />
        <StatTile value={contacts.length} label="Contacts" />
        <StatTile value={totalSent} label="Emails sent" />
        <StatTile value={campaigns.length} label="Sends" />
      </div>

      <div className="flex gap-5 flex-wrap mt-6 items-start">
        <div className="flex-[2_1_380px] bg-bg-alt border border-[rgba(239,199,94,0.14)] rounded-2xl px-6 py-[22px]">
          <div className="font-display font-extrabold text-[17px]">Recent sends</div>
          {recent.length > 0 ? (
            <div className="mt-3.5">
              {recent.map((c) => (
                <div key={c.id} className="flex items-center gap-3.5 py-3 border-t border-[rgba(239,199,94,0.10)]">
                  <div className="w-[38px] h-[38px] rounded-[10px] bg-[rgba(239,199,94,0.10)] border border-[rgba(239,199,94,0.22)] flex items-center justify-center flex-none text-accent font-bold">
                    ↗
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                      {c.templateName}
                    </div>
                    <div className="text-[12px] text-[rgba(251,252,245,0.5)] mt-0.5">
                      {timeAgo(c.sentAt)} · {dateLabel(c.sentAt)}
                    </div>
                  </div>
                  <div className="text-[13px] text-[rgba(251,252,245,0.7)] whitespace-nowrap">
                    {c.recipientCount} {c.recipientCount === 1 ? 'recipient' : 'recipients'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3.5 py-[26px] text-center border border-dashed border-[rgba(239,199,94,0.2)] rounded-xl text-[rgba(251,252,245,0.5)] text-[14px]">
              No sends yet. Pick a template and reach your clients.
            </div>
          )}
        </div>

        <div className="flex-[1_1_240px] bg-bg-alt border border-[rgba(239,199,94,0.14)] rounded-2xl px-6 py-[22px]">
          <div className="font-display font-extrabold text-[17px]">Quick actions</div>
          <div className="flex flex-col gap-2.5 mt-4">
            <button
              onClick={onNewTemplate}
              className="cursor-pointer text-left border border-[rgba(239,199,94,0.22)] rounded-xl bg-[rgba(239,199,94,0.05)] text-text px-4 py-[13px] font-sans text-[14px] font-medium hover:bg-[rgba(239,199,94,0.12)] transition"
            >
              ＋ Paste a new template
            </button>
            <button
              onClick={onGoContacts}
              className="cursor-pointer text-left border border-[rgba(239,199,94,0.22)] rounded-xl bg-[rgba(239,199,94,0.05)] text-text px-4 py-[13px] font-sans text-[14px] font-medium hover:bg-[rgba(239,199,94,0.12)] transition"
            >
              ＋ Add a contact
            </button>
            <button
              onClick={onStartSend}
              className="cursor-pointer text-left border-none rounded-xl bg-accent text-[#0a0a0a] px-4 py-[13px] font-sans text-[14px] font-semibold hover:bg-[#f2d072] transition"
            >
              → Start a send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
