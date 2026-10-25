import type { CaseResult } from '@/types'
import Avatar from '@/components/ui/Avatar'

/* A client result in three beats: problem → what we did → result.
   `wide` lays the beats out side by side for a single featured case. */
export default function CaseCard({ c, wide = false }: { c: CaseResult; wide?: boolean }) {
  const beats = [
    { label: 'The problem', text: c.problem },
    { label: 'What we did', text: c.action },
    { label: 'The result', text: c.result },
  ]

  return (
    <figure className="card card-lift m-0 p-6 sm:p-7 flex flex-col h-full">
      <dl className={`m-0 grid gap-5 ${wide ? 'md:grid-cols-3 md:gap-8' : ''}`}>
        {beats.map((b, i) => {
          const isResult = i === beats.length - 1
          return (
            <div key={b.label}>
              <dt className="t-small font-medium uppercase tracking-[0.12em] text-gold-deep">{b.label}</dt>
              <dd
                className={`m-0 mt-1.5 ${
                  isResult ? 'font-serif text-[19px] leading-[1.3] text-ink' : 't-body text-stone'
                }`}
              >
                {b.text}
              </dd>
            </div>
          )
        })}
      </dl>
      <figcaption className="mt-auto pt-6 t-small flex items-center gap-3">
        <Avatar name={c.name} src={c.avatar} size={40} />
        <span>
          <span className="block text-ink font-medium">{c.name}</span>
          <span className="block text-stone">{c.title}</span>
        </span>
      </figcaption>
    </figure>
  )
}
