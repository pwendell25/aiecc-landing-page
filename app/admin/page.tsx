'use client'

import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'firebase/auth'
import { getFirebaseAuth } from '@/lib/firebase'

const TOOLS = [
  {
    name: 'AIECC Mailer',
    description: 'Paste a design, save it as a template, and send it to your clients.',
    href: '/admin/mailer',
  },
]

export default function AdminHubPage() {
  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      <div className="sticky top-0 z-30 bg-[rgba(8,8,10,0.86)] backdrop-blur-[14px] border-b border-[rgba(239,199,94,0.12)]">
        <div className="max-w-[1140px] mx-auto px-6 py-[13px] flex items-center gap-4">
          <div className="flex items-center gap-[11px] mr-auto">
            <Image src="/admin/aiecc-logo.png" width={34} height={34} alt="AIECC" className="block h-auto" />
            <div className="font-display font-extrabold text-[16px] tracking-[-0.01em] leading-none">
              AIECC <span className="text-accent">Admin</span>
            </div>
          </div>
          <button
            onClick={() => signOut(getFirebaseAuth())}
            className="cursor-pointer bg-transparent border-none text-[13px] font-sans text-[rgba(251,252,245,0.45)] hover:text-accent transition"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-6 pt-[34px] pb-[90px]">
        <div className="text-[12px] font-semibold tracking-[0.2em] uppercase text-accent">AIECC</div>
        <div className="font-display font-extrabold text-[30px] tracking-[-0.02em] mt-2">Admin tools</div>
        <div className="text-[15px] font-light text-[rgba(251,252,245,0.6)] mt-1.5">Pick a tool to open.</div>

        <div className="grid gap-4 mt-[26px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block bg-bg-alt border border-[rgba(239,199,94,0.14)] rounded-2xl px-6 py-6 hover:border-[rgba(239,199,94,0.35)] transition"
            >
              <div className="font-display font-extrabold text-[18px]">{tool.name}</div>
              <div className="text-[13px] text-[rgba(251,252,245,0.55)] mt-2">{tool.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
