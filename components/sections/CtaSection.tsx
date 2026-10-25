import LinkedInIcon from '@/components/icons/LinkedInIcon'
import { LINKEDIN_URL } from '@/constants/data'

export default function CtaSection() {
  return (
    <section className="bg-night text-night-text">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-[clamp(80px,10vw,140px)] grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20 items-end">
        <div>
          <h2 className="t-display m-0">
            No pitch. Just tell me where you&apos;re stuck.
          </h2>
          <p className="t-lead mt-6 max-w-[520px] !text-[rgba(244,237,224,0.7)]">
            Send me a message on LinkedIn with your current role, where you want to go, and where
            your search is stalling. If it&apos;s a fit, I&apos;ll send you a link to book a
            discovery call. If it isn&apos;t, I&apos;ll tell you that too.
          </p>
        </div>

        <div className="flex flex-col items-start gap-5">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener" className="btn btn-gold !text-[16px] !px-6 !py-4">
            <LinkedInIcon size={18} />
            Message me on LinkedIn
          </a>
          <p className="m-0 mt-2 t-small text-[rgba(244,237,224,0.55)] max-w-[300px]">
            Every engagement carries a 100% money-back guarantee: a better offer within 90 days, or
            you don&apos;t pay.
          </p>
        </div>
      </div>
    </section>
  )
}
