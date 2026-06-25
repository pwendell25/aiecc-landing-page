import LinkedInIcon from '@/components/icons/LinkedInIcon'
import { LINKEDIN_URL, SUPPORT_EMAIL } from '@/constants/data'

const ShieldCheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#EFC75E"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
)

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-[rgba(239,199,94,.14)]">
      {/* Radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          width: '760px',
          height: '760px',
          maxWidth: '120vw',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle,rgba(239,199,94,.14),transparent 62%)',
        }}
      />

      <div
        className="relative max-w-[820px] mx-auto text-center"
        style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,56px)' }}
      >
        <p data-reveal className="text-[12px] tracking-[.22em] text-accent font-medium">LET&apos;S TALK FIRST</p>
        <h2
          data-reveal data-delay="1"
          className="font-display font-extrabold leading-[1.04] tracking-[-0.02em] mt-[18px]"
          style={{ fontSize: 'clamp(32px,5vw,60px)' }}
        >
          No pitch. Just tell me
          <br />
          where you&apos;re stuck.
        </h2>
        <p data-reveal data-delay="2" className="max-w-[560px] mx-auto mt-[22px] text-[17px] leading-[1.65] text-[rgba(251,252,245,.72)] font-light">
          Before any discovery call, I want to understand your situation. Send me a DM on LinkedIn with
          where your search is stalling. I&apos;ll tell you, honestly, whether the 90-day program is the
          right fit.
        </p>

        <div data-reveal data-delay="3" className="mt-[38px] flex flex-wrap gap-4 items-center justify-center">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener"
            className="btn-pulse inline-flex items-center gap-[11px] no-underline bg-accent text-[#0a0a0a] font-semibold text-[17px] px-[34px] py-[18px] rounded-full transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_22px_58px_rgba(239,199,94,.45)]"
          >
            <LinkedInIcon size={20} />
            DM me on LinkedIn
          </a>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-flex items-center gap-[10px] no-underline text-text font-medium text-[15px] py-[18px] px-2 border-b border-[rgba(239,199,94,.4)] transition-colors duration-[200ms] hover:text-accent"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>

        {/* Money-back guarantee badge */}
        <div data-reveal data-delay="4" className="mt-[34px] inline-flex items-center gap-3 px-5 py-[11px] border border-[rgba(239,199,94,.32)] rounded-full bg-[rgba(239,199,94,.05)]">
          <ShieldCheckIcon />
          <span className="text-[13.5px] font-medium text-text">
            100% money-back guarantee: a better offer in 90 days, or you don&apos;t pay.
          </span>
        </div>
      </div>
    </section>
  )
}
