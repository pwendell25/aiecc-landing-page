type Testimonial = {
  quote: string
  name: string
  title: string
  badge?: string
  initial: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "For six months after separating from the Army, I made effectively no progress. After restarting with Randall's guidance, I went from failing screening over 90% of the time to passing almost every time. I received two solid job offers within 1.5 months.",
    name: 'Kevin Lamm',
    title: 'IT Security Operations Analyst',
    badge: '2 OFFERS · 6 WEEKS',
    initial: 'K',
  },
  {
    quote:
      "Randall didn't treat this like a resume writing process. He approached it strategically. I had a major realization that many experienced professionals are unintentionally underselling themselves because they're using outdated strategies in a market that has fundamentally changed.",
    name: 'Emily Stilwell',
    title: 'Manager, Change Management & Training',
    initial: 'E',
  },
  {
    quote:
      'Working with Randall while I was at the Pentagon completely changed how I approached my career. Using AI the right way, I was able to confidently increase my consulting rates beyond what I initially planned and approach opportunities at a much higher level.',
    name: 'Connie Clay',
    title: 'CEO, C Clay Consulting',
    badge: 'CONSULTING RATES INCREASED',
    initial: 'C',
  },
  {
    quote:
      'The recruiter mentioned they had been searching for two months with over 2,000 applicants for this position. The work that was done helped me stand out. I had three interviews: with the recruiter, COO, and CFO.',
    name: 'Verified Client',
    title: 'Defense Industry Professional',
    badge: '2,000+ APPLICANTS · SHORTLISTED',
    initial: '✓',
  },
  {
    quote:
      '1 post and a 150% increase in profile views, messages, comments, and post impressions. I sat down and mapped out an entire content series with the help of AI.',
    name: 'Verified Client',
    title: 'Program Professional',
    badge: '+150% PROFILE VIEWS',
    initial: '✓',
  },
  {
    quote:
      "Your STAR method helped me tremendously. I have landed a GS-13 position.",
    name: 'Verified Client',
    title: 'Federal Government Professional',
    badge: 'LANDED GS-13',
    initial: '✓',
  },
  {
    quote:
      "They took my outdated résumé and transformed it into a polished, modern document that truly reflects my skills and experience. I've already seen a noticeable increase in interview requests.",
    name: 'Stuart Sellears',
    title: 'Senior Contracts Specialist',
    initial: 'S',
  },
  {
    quote:
      "Randall forced me to realize something important: I had been running my career search in a highly inefficient way by shortchanging networking. His guidance pushed me to improve in the area I knew I lacked but could never get myself to work on.",
    name: 'Brandon Ellingson',
    title: 'Director of Analytics',
    initial: 'B',
  },
  {
    quote:
      "Before his help, my profile was bland and I had trouble communicating my military experience in civilian language. He helped me expertly portray what I've accomplished. My profile is already getting more views and I'm quickly increasing my connections.",
    name: 'Hannah Potter',
    title: 'Engineering Project Manager, US Army',
    initial: 'H',
  },
]

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="flex flex-col gap-4 rounded-[16px] border border-[rgba(239,199,94,.16)] h-full"
      style={{
        padding: 'clamp(22px,2.8vw,32px)',
        background: 'linear-gradient(160deg,rgba(239,199,94,.05) 0%,rgba(8,8,10,0) 60%)',
      }}
    >
      {/* Opening quote */}
      <div className="font-display font-black text-[36px] leading-[.5] text-accent">&ldquo;</div>

      {/* Quote */}
      <p className="flex-1 text-[14.5px] leading-[1.72] text-[rgba(251,252,245,.72)] font-light">
        {t.quote}
      </p>

      {/* Badge */}
      {t.badge && (
        <span className="self-start text-[10.5px] tracking-[.1em] font-semibold text-accent border border-[rgba(239,199,94,.35)] rounded-full px-[12px] py-[5px]">
          {t.badge}
        </span>
      )}

      {/* Divider */}
      <div className="border-t border-[rgba(239,199,94,.1)]" />

      {/* Attribution */}
      <div className="flex items-center gap-3">
        <span className="shrink-0 w-9 h-9 rounded-full bg-[rgba(239,199,94,.12)] border border-[rgba(239,199,94,.35)] flex items-center justify-center font-display font-extrabold text-[13px] text-accent">
          {t.initial}
        </span>
        <span>
          <span className="block text-[13.5px] font-medium text-text">{t.name}</span>
          <span className="block text-[12px] text-[rgba(251,252,245,.45)] leading-snug">{t.title}</span>
        </span>
      </div>
    </div>
  )
}

export default function TestimonialSection() {
  return (
    <section
      id="proof"
      className="border-t border-[rgba(239,199,94,.12)]"
      style={{ background: '#08080a' }}
    >
      <div
        className="max-w-[1180px] mx-auto"
        style={{ padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,56px)' }}
      >
        {/* Header */}
        <div data-reveal className="text-center max-w-[640px] mx-auto mb-[52px]">
          <p className="text-[12px] tracking-[.22em] text-accent font-medium">IN THEIR WORDS</p>
          <h2
            className="font-display font-extrabold leading-[1.06] tracking-[-0.02em] mt-4"
            style={{ fontSize: 'clamp(30px,4.4vw,52px)' }}
          >
            A 63% higher offer.
            <br />
            $70k more in salary.
          </h2>
        </div>

        {/* Hero testimonial */}
        <figure
          data-reveal="scale"
          data-delay="1"
          className="m-0 max-w-[860px] mx-auto border border-[rgba(239,199,94,.28)] rounded-[22px] relative overflow-hidden mb-[52px]"
          style={{
            padding: 'clamp(34px,5vw,56px)',
            background: 'linear-gradient(180deg,rgba(239,199,94,.07),rgba(239,199,94,0))',
          }}
        >
          <div
            className="absolute pointer-events-none font-display font-black leading-none text-[rgba(239,199,94,.07)]"
            style={{ top: '-40px', right: '-10px', fontSize: '200px' }}
            aria-hidden="true"
          >
            &rdquo;
          </div>

          <div className="relative">
            <div className="font-display font-black text-[52px] leading-[.5] text-accent">&ldquo;</div>
            <blockquote
              className="m-0 mt-[18px] leading-[1.55] text-text font-light"
              style={{ fontSize: 'clamp(18px,2.2vw,24px)' }}
            >
              After completing the program, I landed three contractor job offers. One came in at $110K, and
              with the negotiation coaching I received, I was able to secure it at{' '}
              <span className="text-accent font-medium">$130K</span>. I also used the same resume to land a
              higher-paying government position. Overall, I would have paid more for the results I got.
            </blockquote>

            <figcaption className="mt-[30px] flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-[13px]">
                <span className="w-11 h-11 rounded-full bg-[rgba(239,199,94,.16)] border border-[rgba(239,199,94,.4)] flex items-center justify-center font-display font-extrabold text-[16px] text-accent">
                  D
                </span>
                <span>
                  <span className="block text-[15px] font-medium text-text">Deon Coleman</span>
                  <span className="block text-[13px] text-[rgba(251,252,245,.55)]">
                    Satellite Communications Manager
                  </span>
                </span>
              </div>
              <span className="font-display font-bold text-[13.5px] tracking-[.04em] text-accent border border-[rgba(239,199,94,.35)] rounded-full px-[18px] py-[9px]">
                +63% OFFER · +$70K SALARY
              </span>
            </figcaption>
          </div>
        </figure>

        {/* Grid of additional testimonials */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))' }}
        >
          {testimonials.map((t, i) => (
            <div key={i} data-reveal data-delay={Math.min(i + 1, 9)}>
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>

        <div data-reveal className="text-center mt-[40px] flex flex-col items-center gap-4">
          <p className="text-[14px] text-[rgba(251,252,245,.45)]">
            Join the 80+ professionals who&apos;ve left verified recommendations and testimonials.
          </p>
          <a
            href="https://testimonial.to/ai-enhanced-career-coaching/all"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 no-underline text-accent border border-[rgba(239,199,94,.35)] rounded-full px-[22px] py-[10px] text-[13.5px] font-medium tracking-[.02em] hover:bg-[rgba(239,199,94,.08)] transition-colors"
          >
            See all testimonials
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
