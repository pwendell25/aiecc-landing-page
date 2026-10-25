import { caseResults } from '@/constants/data'
import CaseCard from '@/components/ui/CaseCard'

/* Results, short: each client as problem → what we did → result. */
export default function TestimonialSection() {
  return (
    <section id="proof" className="scroll-mt-16">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-[clamp(72px,9vw,120px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="max-w-[600px]">
            <p className="m-0 mb-4 t-small font-medium uppercase tracking-[0.14em] text-gold-deep">Results</p>
            <h2 className="t-heading m-0 text-ink">The problem, what we did, what happened.</h2>
          </div>
          <a
            href="#testimonials"
            className="text-[15px] font-medium text-ink underline underline-offset-4 decoration-hair hover:decoration-ink"
          >
            Read every testimonial
          </a>
        </div>

        <ul className="m-0 mt-12 p-0 list-none grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {caseResults.map((c) => (
            <li key={c.name + c.result}>
              <CaseCard c={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
