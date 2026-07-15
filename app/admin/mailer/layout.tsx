'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { getFirebaseAuth } from '@/lib/firebase'
import { MailerDataProvider } from '@/lib/admin/MailerDataContext'

function NavLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className="cursor-pointer bg-transparent px-3 py-2 font-sans text-[14px] font-medium flex flex-col items-center gap-[5px]"
      style={{ color: active ? '#FBFCF5' : 'rgba(251,252,245,0.6)' }}
    >
      {label}
      <span className="h-[2px] w-5 rounded-full" style={{ background: active ? '#EFC75E' : 'transparent' }} />
    </Link>
  )
}

export default function MailerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <MailerDataProvider>
      <div className="min-h-screen bg-bg font-sans text-text">
        <div className="sticky top-0 z-30 bg-[rgba(8,8,10,0.86)] backdrop-blur-[14px] border-b border-[rgba(239,199,94,0.12)]">
          <div className="max-w-[1140px] mx-auto px-6 py-[13px] flex items-center gap-4 flex-wrap">
            <Link
              href="/admin"
              title="Back to Admin tools"
              className="cursor-pointer bg-transparent border-none text-[13px] font-sans text-[rgba(251,252,245,0.45)] hover:text-accent transition"
            >
              ← Admin
            </Link>
            <Link href="/admin/mailer" className="flex items-center gap-[11px] mr-auto">
              <Image src="/admin/aiecc-logo.png" width={34} height={34} alt="AIECC" className="block h-auto" />
              <div className="font-display font-extrabold text-[16px] tracking-[-0.01em] leading-none">
                AIECC <span className="text-accent">Mailer</span>
              </div>
            </Link>
            <div className="flex gap-0.5 flex-nowrap">
              <NavLink label="Dashboard" href="/admin/mailer" active={pathname === '/admin/mailer'} />
              <NavLink
                label="Templates"
                href="/admin/mailer/templates"
                active={pathname.startsWith('/admin/mailer/templates')}
              />
              <NavLink
                label="Contacts"
                href="/admin/mailer/contacts"
                active={pathname.startsWith('/admin/mailer/contacts')}
              />
            </div>
            <Link
              href="/admin/mailer/send"
              className="cursor-pointer border-none rounded-full bg-accent text-[#0a0a0a] font-sans font-semibold text-[14px] px-5 py-2.5 shadow-[0_8px_24px_rgba(239,199,94,0.24)] hover:bg-[#f2d072] hover:-translate-y-px transition"
            >
              New send
            </Link>
            <button
              onClick={() => signOut(getFirebaseAuth())}
              className="cursor-pointer bg-transparent border-none text-[13px] font-sans text-[rgba(251,252,245,0.45)] hover:text-accent transition"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="max-w-[1140px] mx-auto px-6 pt-[34px] pb-[90px]">{children}</div>
      </div>
    </MailerDataProvider>
  )
}
