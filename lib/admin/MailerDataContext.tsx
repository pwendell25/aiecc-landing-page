'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import {
  MailerTemplate,
  MailerContact,
  MailerCampaign,
  subscribeTemplates,
  subscribeContacts,
  subscribeCampaigns,
  seedIfEmpty,
} from './mailerData'

interface MailerDataValue {
  templates: MailerTemplate[]
  contacts: MailerContact[]
  campaigns: MailerCampaign[]
  showToast: (msg: string) => void
}

const MailerDataContext = createContext<MailerDataValue | null>(null)

export function MailerDataProvider({ children }: { children: React.ReactNode }) {
  const [templates, setTemplates] = useState<MailerTemplate[]>([])
  const [contacts, setContacts] = useState<MailerContact[]>([])
  const [campaigns, setCampaigns] = useState<MailerCampaign[]>([])
  const [toast, setToast] = useState('')
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    seedIfEmpty()
    const unsubT = subscribeTemplates(setTemplates)
    const unsubC = subscribeContacts(setContacts)
    const unsubCa = subscribeCampaigns(setCampaigns)
    return () => {
      unsubT()
      unsubC()
      unsubCa()
    }
  }, [])

  function showToast(msg: string) {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2600)
  }

  return (
    <MailerDataContext.Provider value={{ templates, contacts, campaigns, showToast }}>
      {children}
      {toast && (
        <div
          className="fixed left-1/2 bottom-7 -translate-x-1/2 z-50 bg-accent text-[#0a0a0a] font-sans font-semibold text-[14px] px-[22px] py-3 rounded-full shadow-[0_12px_34px_rgba(0,0,0,0.5)]"
          style={{ animation: 'toastIn 0.25s ease' }}
        >
          {toast}
        </div>
      )}
    </MailerDataContext.Provider>
  )
}

export function useMailerData() {
  const ctx = useContext(MailerDataContext)
  if (!ctx) throw new Error('useMailerData must be used within MailerDataProvider')
  return ctx
}
