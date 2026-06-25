import Image from 'next/image'
import LinkedInIcon from '@/components/icons/LinkedInIcon'
import { LINKEDIN_URL, SUPPORT_EMAIL } from '@/constants/data'

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(239,199,94,0.12)] bg-bg-alt">
      <div
        className="max-w-[1180px] mx-auto"
        style={{ padding: '56px clamp(20px,5vw,56px) 36px' }}
      >
        {/* Top row */}
        <div className="flex flex-wrap gap-10 justify-between items-start">
          {/* Brand block */}
          <div className="flex flex-col gap-4 max-w-[300px]">
            <a href="/" className="flex items-center gap-3 no-underline">
              <Image
                src="/assets/images/AI-Driven Career Coaching Logo (1).png"
                alt="AI-Enhanced Career Coaching"
                width={40}
                height={40}
                className="object-contain"
                unoptimized
              />
              <span className="text-accent font-semibold text-[12px] tracking-[0.08em] uppercase leading-tight">
                AI-Enhanced<br />Career Coaching
              </span>
            </a>
            <p className="text-[13px] leading-[1.7] text-[rgba(251,252,245,0.48)]">
              Land a competitive offer in under 90 days, or your money back.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] tracking-[0.18em] text-[rgba(251,252,245,0.35)] uppercase mb-1">
              Navigation
            </p>
            <a href="#about" className="no-underline text-[13px] text-[rgba(251,252,245,0.55)] hover:text-accent transition-colors">
              About
            </a>
            <a href="#proof" className="no-underline text-[13px] text-[rgba(251,252,245,0.55)] hover:text-accent transition-colors">
              Results
            </a>
          </div>

          {/* Contact + CTA */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] tracking-[0.18em] text-[rgba(251,252,245,0.35)] uppercase mb-1">
              Contact
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="no-underline text-[13px] text-[rgba(251,252,245,0.55)] hover:text-accent transition-colors"
            >
              {SUPPORT_EMAIL}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 no-underline bg-accent text-[#0a0a0a] font-semibold text-[13px] px-[18px] py-[10px] rounded-full hover:opacity-90 transition-opacity w-fit mt-1"
            >
              <LinkedInIcon size={14} />
              DM on LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[rgba(239,199,94,0.08)] flex flex-wrap gap-3 items-center justify-between">
          <span className="text-[11.5px] text-[rgba(251,252,245,0.3)]">© 2026 Randall Re II · All rights reserved.</span>
          <span className="text-[11.5px] text-[rgba(251,252,245,0.3)]">AI-Enhanced Career Coaching</span>
        </div>
      </div>
    </footer>
  )
}
