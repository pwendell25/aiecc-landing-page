import Image from 'next/image'
import { rehookCase } from '@/constants/data'
import CaseCard from '@/components/ui/CaseCard'

/* The rehook: for visitors who think they're doing fine. */
export default function RehookSection() {
  return (
    <section>
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-[clamp(72px,9vw,120px)]">
        <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 lg:gap-20 items-center">
          {/* Placeholder image from Randall's Lovable draft, until a real photo replaces it */}
          <div className="relative aspect-[4/3] md:aspect-[4/5] rounded-2xl overflow-hidden bg-hair">
            <Image
              src="/assets/images/leaders-duo.jpg"
              alt="Two defense industry leaders in an office overlooking the U.S. Capitol"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-[50%_25%]"
              unoptimized
            />
          </div>

          <div>
            <p className="m-0 mb-4 t-small font-medium uppercase tracking-[0.14em] text-gold-deep">Already getting interviews?</p>
            <h2 className="t-heading m-0 text-ink">Activity isn&apos;t the same as winning.</h2>
            <p className="t-lead mt-6 m-0 !text-ink">
              Plenty of people tell me they&apos;re doing fine. One told me he&apos;d applied to 20
              jobs, landed one interview, and that interview went nowhere. That&apos;s a 5%
              interview rate and a 0% offer rate. He called it success.
            </p>
            <p className="t-lead mt-5 m-0">
              Interviews coming in doesn&apos;t mean they&apos;re the right ones, at the right
              level, for the right number. Deon thought the same thing.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <CaseCard c={rehookCase} wide />
        </div>
      </div>
    </section>
  )
}
