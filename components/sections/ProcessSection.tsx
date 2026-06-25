import { processSteps } from '@/constants/data'

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="max-w-[1180px] mx-auto"
      style={{ padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,56px)' }}
    >
      <div data-reveal className="max-w-[680px] mb-10">
        <p className="text-[12px] tracking-[.22em] text-accent font-medium">HOW WE LAND YOUR DREAM JOB</p>
        <h2
          className="font-display font-extrabold leading-[1.06] tracking-[-0.02em] mt-4"
          style={{ fontSize: 'clamp(30px,4.4vw,52px)' }}
        >
          Six steps. One outcome.
        </h2>
        <p className="mt-[18px] text-[16px] leading-[1.6] text-[rgba(251,252,245,.66)] font-light">
          No fluff, no generic templates. Every step is built around your experience and the roles you
          actually want, over a focused 90 days.
        </p>
      </div>

      <div className="border-t border-[rgba(239,199,94,.14)]">
        {processSteps.map((step, i) => (
          <div
            key={step.number}
            data-reveal="from-left"
            data-delay={i + 1}
            className="group grid border-b border-[rgba(239,199,94,.14)] py-7 transition-colors duration-200 hover:border-[rgba(239,199,94,.35)] gap-y-2"
            style={{ gridTemplateColumns: '3rem 1fr', columnGap: 'clamp(16px,3vw,48px)' }}
          >
            {/* Step number */}
            <span className="font-display font-black text-[13px] tracking-[.1em] text-accent pt-[3px] group-hover:text-[#efc75e]">
              {step.number}
            </span>

            {/* Content: title + description side-by-side on md+ */}
            <div className="flex flex-col md:flex-row md:gap-12">
              <h3
                className="font-display font-bold leading-snug text-text shrink-0 self-start"
                style={{ fontSize: 'clamp(17px,1.6vw,21px)', width: '240px' }}
              >
                {step.title}
              </h3>
              <p className="mt-2 md:mt-0 text-[14.5px] leading-[1.7] text-[rgba(251,252,245,.55)] font-light m-0">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
