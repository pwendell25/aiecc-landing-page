import Image from 'next/image'
import LinkedInIcon from '@/components/icons/LinkedInIcon'
import { LINKEDIN_URL } from '@/constants/data'

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#EFC75E"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function HeroSection() {
  return (
    <header
      id="top"
      className="relative min-h-[92vh] overflow-hidden"
      style={{ backgroundColor: '#08080a' }}
    >
      {/* Background image */}
      <Image
        src="/assets/images/hero.png"
        alt=""
        fill
        className="object-cover object-center"
        unoptimized
        priority
      />

      {/* Overlay: opaque dark on left → transparent on right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, rgba(8,8,10,0.62) 35%, rgba(8,8,10,0.28) 70%, rgba(8,8,10,0.08) 100%)',
        }}
      />

      {/* 2-column content */}
      <div
        className="relative z-10 max-w-[1240px] mx-auto flex items-center min-h-[92vh]"
        style={{ padding: 'clamp(80px,9vw,120px) clamp(20px,5vw,56px)', gap: 'clamp(40px,6vw,80px)' }}
      >
        {/* LEFT — text */}
        <div className="flex-1 min-w-0">

          {/* Headline */}
          <h1
            className="font-display font-extrabold leading-[1.02] tracking-[-0.02em] mt-[26px] animate-[riseIn_.8s_ease_.08s_both]"
            style={{ fontSize: 'clamp(38px,4.8vw,72px)' }}
          >
            Your career breakthrough
            <br />
            <span className="text-gradient-gold">starts in 90 days.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="mt-[24px] leading-[1.7] text-[rgba(251,252,245,.72)] font-light animate-[riseIn_.8s_ease_.16s_both]"
            style={{ fontSize: 'clamp(15px,1.4vw,17.5px)', maxWidth: '540px' }}
          >
            The job market doesn&apos;t reward the hardest workers.{' '}
            <span className="text-text font-medium">It rewards the best-positioned ones.</span>{' '}
            I built this program to fix that. A 90-day, AI-enhanced coaching experience for defense
            professionals and career-driven leaders. Land a competitive offer, or your money back.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center mt-9 animate-[riseIn_.8s_ease_.24s_both]">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-[10px] no-underline bg-accent text-[#0a0a0a] font-semibold text-[16px] px-[30px] py-4 rounded-full transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(239,199,94,.42)]"
              style={{ boxShadow: '0 14px 40px rgba(239,199,94,.28)' }}
            >
              <LinkedInIcon size={18} />
              Tell me where you&apos;re stuck
            </a>
            <a
              href="#process"
              className="inline-flex items-center gap-[9px] no-underline text-text font-semibold text-[16px] px-7 py-4 rounded-full border border-[rgba(239,199,94,.45)] bg-[rgba(239,199,94,.04)] transition-all duration-[250ms] hover:border-[rgba(239,199,94,.85)] hover:bg-[rgba(239,199,94,.1)] hover:-translate-y-1"
            >
              See the 90-day plan
              <ArrowRightIcon />
            </a>
          </div>

          {/* Credibility line */}
          <p className="mt-7 text-[12.5px] tracking-[.06em] text-[rgba(251,252,245,.5)] animate-[riseIn_.8s_ease_.32s_both]">
            LINKEDIN TOP VOICE IN CAREER COACHING&nbsp;·&nbsp;2024 &amp; 2025&nbsp;·&nbsp;U.S. MILITARY VETERAN
          </p>
        </div>

        {/* RIGHT — headshot */}
     
      </div>
    </header>
  )
}
