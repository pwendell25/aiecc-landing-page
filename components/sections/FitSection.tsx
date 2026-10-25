import { fitFor, fitNotFor } from '@/constants/data'

function Mark({ yes }: { yes: boolean }) {
  return (
    <span
      className={`mt-[3px] shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
        yes ? 'bg-gold text-ink' : 'border border-[rgba(244,237,224,0.35)] text-[rgba(244,237,224,0.7)]'
      }`}
      aria-hidden="true"
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        {yes ? <path d="M2 5.2 4.2 7.4 8 3" /> : <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" />}
      </svg>
    </span>
  )
}

/* Who I work with — and who I don't. Randall is the one doing the choosing. */
export default function FitSection() {
  return (
    <section id="fit" className="bg-night text-night-text scroll-mt-16">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-[clamp(72px,9vw,120px)]">
        <div className="max-w-[680px]">
          <p className="m-0 mb-4 t-small font-medium uppercase tracking-[0.14em] text-gold">Who I work with</p>
          <h2 className="t-heading m-0">This is a two-way interview.</h2>
          <p className="t-lead mt-5 !text-[rgba(244,237,224,0.7)]">
            You&apos;re deciding whether I&apos;m the right coach. I&apos;m deciding whether
            you&apos;re the right client. Not everyone gets in. I take a limited number of people
            into the program each month, because this is one-on-one work and I don&apos;t water it
            down.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="t-heading-sm m-0">I work with you if&hellip;</h3>
            <ul className="m-0 mt-6 p-0 list-none flex flex-col gap-4">
              {fitFor.map((item) => (
                <li key={item} className="flex gap-3 t-body">
                  <Mark yes />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="t-heading-sm m-0">I&apos;m not the right fit if&hellip;</h3>
            <ul className="m-0 mt-6 p-0 list-none flex flex-col gap-4">
              {fitNotFor.map((item) => (
                <li key={item} className="flex gap-3 t-body text-[rgba(244,237,224,0.8)]">
                  <Mark yes={false} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <blockquote className="m-0 mt-14 pt-8 border-t border-[rgba(244,237,224,0.15)] max-w-[760px] font-serif font-light text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.4] tracking-[-0.01em]">
          A doctor can&apos;t help the patient who keeps eating the food that makes him sick and
          expects to feel better tomorrow. Applying the same way for two years and expecting a
          different result works the same way.
        </blockquote>
      </div>
    </section>
  )
}
