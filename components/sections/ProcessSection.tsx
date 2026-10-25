import { processSteps, LINKEDIN_URL } from '@/constants/data'

export default function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-16">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-[clamp(72px,9vw,120px)] grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {/* Intro — sticks while the steps scroll */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="t-heading m-0 text-ink">Six steps over ninety days, with one outcome.</h2>
          <p className="t-lead mt-5 max-w-[440px]">
            It&apos;s self-paced: the faster you work, the faster you get results. Some clients land
            in 30 days. Every step is built around your experience and the roles you actually want,
            never a generic template.
          </p>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener" className="btn btn-linen mt-8">
            Ask whether it fits your search
          </a>
        </div>

        {/* Steps */}
        <ol className="m-0 p-0 list-none border-t border-hair">
          {processSteps.map((step) => (
            <li
              key={step.number}
              className="grid grid-cols-[2.75rem_1fr] gap-x-4 sm:gap-x-8 py-7 border-b border-hair"
            >
              <span className="font-serif text-[22px] leading-[1.15] text-gold-deep tabular-nums">
                {step.number}
              </span>
              <div>
                <h3 className="t-heading-sm m-0 text-ink">{step.title}</h3>
                <p className="t-body m-0 mt-2 text-stone max-w-[52ch]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
