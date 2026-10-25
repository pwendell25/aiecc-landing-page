import type { Metadata } from 'next'
import Image from 'next/image'
import LinkedInIcon from '@/components/icons/LinkedInIcon'
import DocumentIcon from '@/components/icons/DocumentIcon'
import CalendarIcon from '@/components/icons/CalendarIcon'
import type { Testimonial } from '@/types'
import {
  RESUME_URL,
  PORTFOLIO_LINKEDIN_URL,
  NETWORKING_CALL_URL,
  RECOMMENDATIONS_URL,
  portfolioImages,
  targetRoles,
  workPreferences,
  proofSummary,
  capabilities,
  aiImpactMetrics,
  careerImpact,
  leadershipPrinciples,
  recommendations,
  founderMetrics,
  founderHighlights,
  founderCapabilities,
  valueAreas,
} from '@/constants/randall'

export const metadata: Metadata = {
  title: 'Randall Re II | Program, Operations & AI Adoption Leader',
  description:
    'Defense and GovCon leader with experience in site operations, program management, AI adoption, process improvement, customer relationships, and operational leadership. Open to U.S.-based opportunities starting January 2027.',
}

const container = 'max-w-[1180px] mx-auto px-6 sm:px-10'
const sectionPad = 'py-[clamp(72px,9vw,120px)]'

/* ── Shared bits ─────────────────────────────────────────── */

function ActionButtons({ order, night = false }: { order: ('call' | 'linkedin' | 'resume')[]; night?: boolean }) {
  const secondary = night ? 'btn-ghost-night' : 'btn-linen'
  const buttons = {
    resume: (
      <a key="resume" href={RESUME_URL} target="_blank" rel="noopener" className={`btn ${secondary} justify-center`}>
        <DocumentIcon size={16} />
        View resume
      </a>
    ),
    linkedin: (
      <a key="linkedin" href={PORTFOLIO_LINKEDIN_URL} target="_blank" rel="noopener" className={`btn ${secondary} justify-center`}>
        <LinkedInIcon size={16} />
        Connect on LinkedIn
      </a>
    ),
    call: (
      <a key="call" href={NETWORKING_CALL_URL} target="_blank" rel="noopener" className="btn btn-gold justify-center">
        <CalendarIcon size={16} />
        Schedule a conversation
      </a>
    ),
  }
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
      {order.map((key) => buttons[key])}
    </div>
  )
}

function Preferences({ className = '' }: { className?: string }) {
  return (
    <ul className={`m-0 p-0 list-none flex flex-wrap gap-x-5 gap-y-1 t-small ${className}`}>
      {workPreferences.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  )
}

function Attribution({ t, size = 36 }: { t: Testimonial; size?: number }) {
  return (
    <div className="flex items-center gap-3">
      {t.avatar ? (
        <Image
          src={t.avatar}
          alt=""
          width={size}
          height={size}
          className="rounded-full object-cover shrink-0"
          style={{ width: size, height: size }}
          unoptimized
        />
      ) : (
        <span
          className="shrink-0 rounded-full bg-paper border border-hair flex items-center justify-center font-serif text-ink"
          style={{ width: size, height: size, fontSize: size * 0.42 }}
          aria-hidden="true"
        >
          {t.initial}
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-[15px] font-medium text-ink leading-tight">{t.name}</span>
        <span className="block t-small text-stone leading-tight [overflow-wrap:anywhere]">{t.title}</span>
      </span>
    </div>
  )
}

/* Page-specific bar: keeps QR visitors on this page instead of the coaching site. */
function PortfolioHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-paper/90 backdrop-blur-md">
      <div className={`${container} flex items-center justify-between h-[60px]`}>
        <a href="#top" className="no-underline font-serif text-[19px] leading-none tracking-[-0.01em] text-ink">
          Randall Re II
        </a>
        <a href="#contact" className="btn btn-ink !px-4 !py-2.5 text-[14px]">
          Let&apos;s talk
        </a>
      </div>
    </header>
  )
}

/* ── Sections ────────────────────────────────────────────── */

function Hero() {
  return (
    <section id="top" aria-label="Introduction">
      <div className={`${container} pt-[clamp(40px,8vw,112px)] pb-[clamp(56px,8vw,112px)] grid gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16 lg:gap-24 items-center`}>
        <div>
          {/* Compact headshot for phones, where most QR visitors land */}
          <Image
            src={portfolioImages.headshot}
            alt="Randall Re II"
            width={96}
            height={96}
            className="md:hidden rounded-full object-cover object-[50%_20%] w-24 h-24 mb-6 hero-rise"
            priority
            unoptimized
          />
          <h1 className="t-display m-0 text-ink hero-rise">Randall Re II</h1>
          <p className="t-heading-sm m-0 mt-4 text-ink hero-rise" style={{ ['--d' as string]: '60ms' }}>
            Defense &amp; GovCon Operations Leader
          </p>
          <p className="t-lead mt-5 hero-rise" style={{ ['--d' as string]: '120ms' }}>
            Program Management | AI Adoption | Customer Leadership
          </p>
          <p className="t-body m-0 mt-2 text-ink font-medium hero-rise" style={{ ['--d' as string]: '120ms' }}>
            Open to U.S.-based opportunities starting January 2027
          </p>

          <div className="mt-7 hero-rise" style={{ ['--d' as string]: '160ms' }}>
            <ActionButtons order={['resume', 'linkedin', 'call']} />
          </div>

          <div className="mt-10 hero-rise" style={{ ['--d' as string]: '200ms' }}>
            <h2 className="m-0 t-small text-stone font-normal">Target opportunities</h2>
            <ul className="m-0 mt-3 p-0 list-none border-t border-hair">
              {targetRoles.map((role) => (
                <li key={role} className="py-3 border-b border-hair font-serif text-[19px] leading-tight text-ink">
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 font-serif italic text-[19px] text-ink hero-rise" style={{ ['--d' as string]: '240ms' }}>
            Practicing what I preach.
          </p>

          <Preferences className="mt-4 text-stone hero-rise" />
        </div>

        <figure className="hidden md:block m-0 hero-card" style={{ ['--d' as string]: '200ms' }}>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-hair">
            <Image
              src={portfolioImages.headshot}
              alt="Randall Re II"
              fill
              sizes="40vw"
              className="object-cover object-[50%_20%]"
              unoptimized
            />
          </div>
        </figure>
      </div>
    </section>
  )
}

function ProofSummary() {
  return (
    <section aria-label="Career proof summary" className="border-y border-hair">
      <dl className={`${container} m-0 grid grid-cols-2 lg:grid-cols-4 gap-x-8`}>
        {proofSummary.map((s) => (
          <div key={s.value} className="py-6">
            <dt className="font-serif font-light text-ink leading-none text-[clamp(1.5rem,2.6vw,2.25rem)] tracking-[-0.02em]">
              {s.value}
            </dt>
            <dd className="m-0 mt-2 t-small text-stone">{s.description}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function WhatIBring() {
  return (
    <section>
      <div className={`${container} ${sectionPad}`}>
        <div className="max-w-[640px]">
          <h2 className="t-heading m-0 text-ink">What I bring</h2>
          <p className="t-body mt-6 text-ink">
            U.S. Navy veteran and experienced Defense/GovCon leader with a background spanning site
            operations, program execution, customer relationships, process improvement, technical
            operations, and AI adoption.
          </p>
          <p className="t-body mt-4 text-ink">
            I am strongest in environments where organizations need someone who can connect strategy
            with execution, improve how work gets done, lead teams, solve customer problems, and
            introduce technology without losing sight of the mission.
          </p>
        </div>

        <ul className="m-0 mt-12 p-0 list-none grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <li key={c} className="bg-linen rounded-2xl p-6 sm:p-7">
              <h3 className="t-heading-sm m-0 text-ink">{c}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CareerImpact() {
  return (
    <section className="bg-linen">
      <div className={`${container} ${sectionPad}`}>
        <h2 className="t-heading m-0 text-ink">Selected career impact</h2>

        {/* AI adoption leads: it carries the approved numbers */}
        <article className="card card-lift mt-12 p-6 sm:p-8">
          <h3 className="t-heading-sm m-0 text-ink">AI Adoption &amp; Process Improvement</h3>
          <dl className="m-0 mt-6 grid grid-cols-2 lg:grid-cols-5 gap-x-6 border-t border-hair">
            {aiImpactMetrics.map((m) => (
              <div key={m.value} className="pt-5 pb-1 lg:pb-0">
                <dt className="font-serif font-light text-ink leading-none text-[clamp(1.5rem,2.4vw,2rem)] tracking-[-0.02em]">
                  {m.value}
                </dt>
                <dd className="m-0 mt-2 t-small text-stone">{m.label}</dd>
              </div>
            ))}
          </dl>
        </article>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {careerImpact.map((item) => (
            <article key={item.title} className="card p-6 sm:p-7 flex flex-col">
              <h3 className="t-heading-sm m-0 text-ink">{item.title}</h3>
              {item.text && <p className="t-body m-0 mt-3 text-stone">{item.text}</p>}
              {(item.supporting || item.result) && (
                <p className="t-body m-0 mt-auto pt-5">
                  <span className="block pt-4 border-t border-hair text-ink font-medium">
                    {item.supporting ?? item.result}
                  </span>
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedStory() {
  return (
    <section className="bg-night text-night-text">
      <div className={`${container} ${sectionPad} grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20 items-end`}>
        <div>
          <h2 className="t-heading m-0">When operations are under pressure, I build systems</h2>
          <p className="t-body mt-6 max-w-[58ch] text-[rgba(244,237,224,0.75)]">
            At one organization, Randall was operating in an environment that was understaffed and
            over budget.
          </p>
          <p className="t-body mt-4 max-w-[58ch] text-[rgba(244,237,224,0.75)]">
            He took on responsibilities across multiple functions and developed AI, automation,
            dashboarding, and workflow capabilities to improve how the operation ran.
          </p>
          {portfolioImages.aiOrDashboard && (
            <div className="relative mt-10 aspect-[16/10] rounded-2xl overflow-hidden">
              <Image
                src={portfolioImages.aiOrDashboard}
                alt="An AI dashboard built by Randall Re II"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
                unoptimized
              />
            </div>
          )}
        </div>

        <div className="border-t border-[rgba(244,237,224,0.2)] pt-6">
          <p className="m-0 t-small text-[rgba(244,237,224,0.7)]">Estimated annual operational savings impact</p>
          <p className="m-0 mt-3 font-serif font-light text-gold leading-none text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.02em]">
            $800K to $1.2M
          </p>
          <p className="m-0 mt-4 t-small text-[rgba(244,237,224,0.55)] max-w-[340px]">
            Based on process improvement, automation, labor reduction, and operational efficiency
            initiatives.
          </p>
        </div>
      </div>
    </section>
  )
}

function HowILead() {
  return (
    <section>
      <div className={`${container} ${sectionPad}`}>
        <h2 className="t-heading m-0 text-ink">How I lead</h2>
        <ol className="m-0 mt-12 p-0 list-none grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {leadershipPrinciples.map((p, i) => (
            <li key={p} className="border-t-2 border-gold pt-5">
              <span className="block font-serif font-light text-[clamp(2rem,3vw,2.5rem)] leading-none text-gold-deep tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="m-0 mt-4 t-heading-sm text-ink">{p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Recommendations() {
  const featured = recommendations.find((t) => t.featured)
  const rows = recommendations.filter((t) => !t.featured)

  return (
    <section className="bg-linen">
      <div className={`${container} ${sectionPad}`}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16 items-start">
          <div>
            <h2 className="t-heading m-0 text-ink">
              <span className="block font-light text-[clamp(3.5rem,7vw,5.5rem)] leading-none tracking-[-0.03em]">33+</span>
              <span className="block mt-3">Career recommendations</span>
            </h2>
            <p className="t-lead mt-5">From leaders, customers, peers, employees, and military leadership.</p>
            <a
              href={RECOMMENDATIONS_URL}
              target="_blank"
              rel="noopener"
              className="btn btn-ink mt-7 justify-center w-full sm:w-auto"
            >
              <LinkedInIcon size={16} />
              Read all recommendations
            </a>
          </div>

          {featured && (
            <figure className="card card-lift m-0 p-6 sm:p-9">
              <blockquote className="m-0 font-serif font-light text-ink text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.4] tracking-[-0.01em]">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7 pt-5 border-t border-hair">
                <Attribution t={featured} size={44} />
              </figcaption>
            </figure>
          )}
        </div>

        <h3 className="m-0 mt-16 t-small font-medium text-stone">What other leaders say</h3>
        <ul className="m-0 mt-4 p-0 list-none grid gap-4 lg:grid-cols-3">
          {rows.map((t) => (
            <li key={t.name}>
              <figure className="card m-0 h-full p-6 flex flex-col">
                <blockquote className="m-0 t-body text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-auto pt-6">
                  <Attribution t={t} />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FounderExperience() {
  return (
    <section>
      <div className={`${container} py-[clamp(56px,7vw,88px)] grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20`}>
        <div>
          <h2 className="t-heading-sm m-0 text-ink">Founder &amp; operator experience</h2>
          <p className="t-body mt-4 text-stone max-w-[46ch]">
            Alongside his Defense/GovCon career, Randall built and operates an AI-enhanced career
            coaching business.
          </p>
          <p className="m-0 mt-6 t-small text-stone">This experience has strengthened his capabilities in:</p>
          <ul className="m-0 mt-3 p-0 list-none flex flex-wrap gap-2">
            {founderCapabilities.map((c) => (
              <li key={c} className="bg-linen rounded-full px-3 py-1.5 t-small text-ink">{c}</li>
            ))}
          </ul>
        </div>
        <div>
          <dl className="m-0 grid grid-cols-2 gap-x-8 border-t border-hair">
            {founderMetrics.map((m) => (
              <div key={m.value} className="py-5 border-b border-hair">
                <dt className="font-serif font-light text-ink leading-none text-[clamp(1.5rem,2.4vw,2rem)] tracking-[-0.02em]">
                  {m.value}
                </dt>
                <dd className="m-0 mt-2 t-small text-stone">{m.description}</dd>
              </div>
            ))}
          </dl>
          <ul className="m-0 mt-6 pl-5 list-disc marker:text-gold-deep t-body text-stone">
            {founderHighlights.map((h) => (
              <li key={h} className="mt-3 first:mt-0">{h}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function WhereICanAddValue() {
  return (
    <section className="bg-linen">
      <div className={`${container} ${sectionPad}`}>
        <h2 className="t-heading m-0 text-ink">Where I can add value</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {valueAreas.map((area) => (
            <div key={area.title} className="card p-6 sm:p-7">
              <h3 className="t-heading-sm m-0 text-ink">{area.title}</h3>
              <ul className="m-0 mt-4 p-0 list-none">
                {area.items.map((item) => (
                  <li key={item} className="py-2 border-t border-hair t-body text-stone">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Resume() {
  return (
    <section>
      <div className={`${container} ${sectionPad} grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20 items-end`}>
        <div>
          <h2 className="t-heading m-0 text-ink">View my full experience</h2>
          <p className="t-lead mt-5 max-w-[560px]">
            For detailed employment history, scope, responsibilities, education, certifications, and
            accomplishments, view Randall&apos;s current resume.
          </p>
        </div>
        <div>
          <a href={RESUME_URL} target="_blank" rel="noopener" className="btn btn-ink justify-center w-full sm:w-auto">
            <DocumentIcon size={16} />
            View / download resume
          </a>
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section id="contact" className="bg-night text-night-text scroll-mt-16">
      <div className={`${container} py-[clamp(80px,10vw,140px)] grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20 items-end`}>
        <div>
          <h2 className="t-display m-0">Let&apos;s talk</h2>
          <p className="t-lead mt-6 max-w-[560px] !text-[rgba(244,237,224,0.7)]">
            I am preparing to return to the United States and am open to U.S.-based opportunities
            starting January 2027.
          </p>
          <p className="t-lead mt-4 max-w-[560px] !text-[rgba(244,237,224,0.7)]">
            If my background aligns with a program, operation, customer account, or AI adoption
            initiative you are working on, I would welcome a conversation.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <ActionButtons order={['call', 'linkedin', 'resume']} night />
          <Preferences className="text-[rgba(244,237,224,0.7)]" />
          <p className="m-0 pt-5 border-t border-[rgba(244,237,224,0.2)] t-small text-[rgba(244,237,224,0.55)]">
            <span className="block text-night-text font-medium">Randall Re II</span>
            <span className="block">U.S. Navy Veteran</span>
            <span className="block">Defense &amp; GovCon Operations Leader</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default function RandallRePortfolio() {
  return (
    <>
      <PortfolioHeader />
      <main>
        <Hero />
        <ProofSummary />
        <WhatIBring />
        <CareerImpact />
        <FeaturedStory />
        <HowILead />
        <Recommendations />
        <FounderExperience />
        <WhereICanAddValue />
        <Resume />
        <FinalCta />
      </main>
      <footer className="border-t border-hair">
        <div className={`${container} py-6 flex flex-wrap gap-x-6 gap-y-2 justify-between`}>
          <span className="t-small text-stone">&copy; 2026 Randall Re II</span>
          <span className="t-small text-stone">U.S. Navy Veteran. Defense &amp; GovCon Operations Leader.</span>
        </div>
      </footer>
    </>
  )
}
