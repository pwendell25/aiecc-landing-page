import LinkedInIcon from '@/components/icons/LinkedInIcon'
import { heroOutcomes, heroProof, LINKEDIN_URL } from '@/constants/data'
import type { HeroOutcome } from '@/types'

/* Desktop positions for the outcome constellation, one per card. */
const placements = [
  { top: '4%', left: '1%', dx: '-16px', d: '500ms' },
  { top: '2%', right: '0%', dx: '16px', d: '620ms' },
  { top: '38%', left: '0%', dx: '-16px', d: '740ms' },
  { top: '40%', right: '2%', dx: '16px', d: '860ms' },
  { top: '72%', left: '3%', dx: '-10px', d: '980ms' },
  { top: '74%', right: '0%', dx: '10px', d: '1100ms' },
] as const

function OutcomeCard({ o, className = '', style }: { o: HeroOutcome; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`card card-lift p-4 w-[236px] shrink-0 ${className}`} style={style}>
      <p className="m-0 font-serif text-[17px] leading-[1.3] text-ink">{o.result}</p>
      <p className="m-0 mt-3 t-small text-stone">
        <span className="text-ink font-medium">{o.name}</span>
        <span className="block">{o.title}</span>
      </p>
    </div>
  )
}

export default function HeroSection() {
  return (
    <header id="top" className="relative overflow-hidden">
      <div className="relative max-w-[1180px] mx-auto px-6 sm:px-10 py-[clamp(48px,6vw,80px)] min-h-[calc(100svh-68px)] flex flex-col justify-center">
        {/* Outcome constellation — desktop only */}
        <div className="hidden xl:block absolute inset-0 pointer-events-none" aria-hidden="true">
          {heroOutcomes.map((o, i) => {
            const { dx, d, ...pos } = placements[i]
            return (
              <OutcomeCard
                key={i}
                o={o}
                className="hero-card absolute pointer-events-auto"
                style={{ ...pos, ['--dx' as string]: dx, ['--d' as string]: d }}
              />
            )
          })}
        </div>

        {/* Headline block */}
        <div className="relative max-w-[660px] mx-auto text-center">
          <p className="m-0 mb-5 t-small font-medium uppercase tracking-[0.14em] text-gold-deep hero-rise" style={{ ['--d' as string]: '0ms' }}>
            For defense &amp; GovCon leaders, manager to director
          </p>
          <h1 className="t-display m-0 text-ink hero-rise" style={{ ['--d' as string]: '60ms' }}>
            You have the record. The market just can&apos;t see it yet.
          </h1>
          <p className="t-lead mt-6 mx-auto max-w-[560px] hero-rise" style={{ ['--d' as string]: '120ms' }}>
            A 90-day, AI-enhanced coaching program that repositions you so the right roles come to
            you, instead of you disappearing into another applicant portal. Your career
            breakthrough, in 90 days or less.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 hero-rise" style={{ ['--d' as string]: '220ms' }}>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener" className="btn btn-gold">
              <LinkedInIcon size={16} />
              Tell me where you&apos;re stuck
            </a>
            <a href="#testimonials" className="btn btn-linen">
              Review my A+ testimonials
            </a>
          </div>
          <ul className="m-0 mt-7 p-0 list-none flex flex-wrap justify-center gap-x-5 gap-y-1.5 t-small text-stone hero-rise" style={{ ['--d' as string]: '320ms' }}>
            {heroProof.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold-deep" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Outcome strip — below xl, the cards become a scrollable row */}
        <div
          className="xl:hidden mt-12 -mx-6 sm:-mx-10 px-6 sm:px-10 flex gap-3 overflow-x-auto pb-2 hero-rise"
          style={{ ['--d' as string]: '420ms', scrollbarWidth: 'none' }}
        >
          {heroOutcomes.map((o, i) => (
            <OutcomeCard key={i} o={o} />
          ))}
        </div>
      </div>
    </header>
  )
}
