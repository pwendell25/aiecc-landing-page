import Image from 'next/image'
import { stats, aboutBullets, LINKEDIN_URL } from '@/constants/data'
import LinkedInBadge from '@/components/ui/LinkedInBadge'

export default function AboutSection() {
  return (
    <section id="about" className="bg-linen scroll-mt-16">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-[clamp(72px,9vw,120px)] grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 lg:gap-24 items-start">
        {/* Photo as proof — tight crop, no overlays */}
        <figure className="m-0 md:sticky md:top-28">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-hair">
            <Image
              src="/assets/randall-headshot/Randall Headshot.png"
              alt="Randall Re II, career coach"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-[50%_20%]"
              unoptimized
            />
          </div>
          <figcaption className="mt-4 t-small text-stone">
            Randall Re II. LinkedIn Top Voice in Career Coaching, 2024 and 2025. U.S. military veteran.
          </figcaption>
        </figure>

        {/* Bio */}
        <div>
          <p className="m-0 mb-4 t-small font-medium uppercase tracking-[0.14em] text-gold-deep">Why listen to Randall</p>
          <h2 className="t-heading m-0 text-ink">
            Not a resume writer. A strategist who&apos;s sat on both sides of the hiring table.
          </h2>
          <ul className="m-0 mt-8 p-0 list-none flex flex-col gap-3.5 max-w-[60ch]">
            {aboutBullets.map((b) => (
              <li key={b} className="flex gap-3 t-body text-ink">
                <span className="mt-[9px] shrink-0 w-1.5 h-1.5 rounded-full bg-gold-deep" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
          <p className="t-body mt-6 text-stone max-w-[62ch]">
            His clients aren&apos;t underqualified. They&apos;re underpositioned. The work fixes
            that, with one outcome in mind: a better offer in 90 days.
          </p>

          {/* The facts, as a ledger beside the person they belong to */}
          <dl className="mt-10 m-0 grid grid-cols-2 gap-x-8 border-t border-hair">
            {stats.map((stat) => (
              <div key={stat.value} className="py-5 border-b border-hair">
                <dt className="font-serif font-light text-ink leading-none text-[clamp(1.75rem,2.6vw,2.25rem)] tracking-[-0.02em]">
                  {stat.value}
                </dt>
                <dd className="m-0 mt-2 t-small text-stone max-w-[24ch]">{stat.description}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <LinkedInBadge name="Randall Re II" subtitle="8,000+ followers on LinkedIn" url={LINKEDIN_URL} />
          </div>
        </div>
      </div>
    </section>
  )
}
