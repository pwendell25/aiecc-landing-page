import { faqs } from '@/constants/data'

/* Native <details> so the static export needs no JavaScript here. */
export default function FaqSection() {
  return (
    <section id="faq" className="bg-linen scroll-mt-16">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-[clamp(72px,9vw,120px)] grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <p className="m-0 mb-4 t-small font-medium uppercase tracking-[0.14em] text-gold-deep">Questions</p>
          <h2 className="t-heading m-0 text-ink">Before you reach out.</h2>
        </div>

        <div className="border-t border-hair">
          {faqs.map((f) => (
            <details key={f.question} className="group border-b border-hair">
              <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="t-heading-sm text-ink">{f.question}</span>
                <span
                  className="shrink-0 w-7 h-7 rounded-full border border-hair flex items-center justify-center text-ink transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M5 1v8M1 5h8" />
                  </svg>
                </span>
              </summary>
              <p className="t-body m-0 pb-6 pr-12 text-stone max-w-[62ch]">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
