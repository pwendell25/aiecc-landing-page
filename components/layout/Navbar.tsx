import Image from 'next/image'
import LinkedInIcon from '@/components/icons/LinkedInIcon'
import { LINKEDIN_URL } from '@/constants/data'

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between border-b border-[rgba(239,199,94,0.14)]"
      style={{
        padding: '12px clamp(20px,5vw,56px)',
        background: 'rgba(8,8,10,0.72)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <a href="/" className="flex items-center gap-3 no-underline">
        <Image
          src="/assets/images/AI-Driven Career Coaching Logo (1).png"
          alt="AI-Driven Career Coaching"
          width={52}
          height={52}
          className="object-contain"
          priority
        />
        <span className="hidden sm:block text-accent font-semibold text-[13px] tracking-[0.08em] uppercase leading-tight">
          AI-Enhanced<br />Career Coaching
        </span>
      </a>

      <div className="flex items-center gap-4 sm:gap-[30px]">
        <a
          href="#about"
          className="hidden sm:block no-underline text-[rgba(251,252,245,0.66)] text-[13.5px] tracking-[0.02em] hover:text-text transition-colors"
        >
          About
        </a>
        <a
          href="#proof"
          className="hidden sm:block no-underline text-[rgba(251,252,245,0.66)] text-[13.5px] tracking-[0.02em] hover:text-text transition-colors"
        >
          Results
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 no-underline bg-accent text-[#0a0a0a] font-semibold text-[12px] sm:text-[13.5px] px-[14px] sm:px-[18px] py-[8px] sm:py-[10px] rounded-full hover:opacity-90 transition-opacity"
        >
          <LinkedInIcon size={14} />
          <span>DM on LinkedIn</span>
        </a>
      </div>
    </nav>
  )
}
