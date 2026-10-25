import { problems } from '@/constants/data'

/* The hook: nothing about Randall yet, only what the visitor is running into. */
export default function ProblemSection() {
  return (
    <section id="challenge" className="bg-linen scroll-mt-16">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-[clamp(72px,9vw,120px)]">
        <div className="max-w-[640px]">
          <p className="m-0 mb-4 t-small font-medium uppercase tracking-[0.14em] text-gold-deep">The honest diagnosis</p>
          <h2 className="t-heading m-0 text-ink">
            Being overlooked isn&apos;t a talent problem. It&apos;s a positioning problem.
          </h2>
        </div>

        <ol className="m-0 mt-12 p-0 list-none grid gap-x-12 sm:grid-cols-2 border-t border-hair">
          {problems.map((p, i) => (
            <li key={p.title} className="grid grid-cols-[2.75rem_1fr] gap-x-4 py-7 border-b border-hair">
              <span className="font-serif text-[22px] leading-[1.15] text-gold-deep tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="t-heading-sm m-0 text-ink">{p.title}</h3>
                <p className="t-body m-0 mt-2 text-stone max-w-[46ch]">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
