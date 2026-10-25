import Link from 'next/link'
import Image from 'next/image'
import { LINKEDIN_URL, SUPPORT_EMAIL } from '@/constants/data'

export default function Footer() {
  return (
    <footer className="border-t border-hair">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-14 pb-10">
        <div className="flex flex-wrap gap-x-16 gap-y-10 justify-between items-start">
          <div className="max-w-[300px]">
            <Link href="/" className="flex items-center gap-3 no-underline text-ink">
              <Image
                src="/assets/images/AI-Driven Career Coaching Logo (1).png"
                alt=""
                width={36}
                height={36}
                className="object-contain"
                unoptimized
              />
              <span className="font-serif text-[18px] leading-none whitespace-nowrap">AI-Enhanced Career Coaching</span>
            </Link>
            <p className="t-small text-stone mt-4">
              A 90-day, AI-enhanced coaching program for defense and GovCon leaders, manager to
              director. A better offer in 90 days or less, or your money back.
            </p>
          </div>

          <div className="flex gap-16">
            <nav className="flex flex-col gap-2.5" aria-label="Sections">
              <a href="#process" className="no-underline text-[15px] text-ink hover:text-gold-deep transition-colors">The program</a>
              <a href="#about" className="no-underline text-[15px] text-ink hover:text-gold-deep transition-colors">Your coach</a>
              <a href="#proof" className="no-underline text-[15px] text-ink hover:text-gold-deep transition-colors">Results</a>
              <a href="#testimonials" className="no-underline text-[15px] text-ink hover:text-gold-deep transition-colors">Testimonials</a>
              <a href="#faq" className="no-underline text-[15px] text-ink hover:text-gold-deep transition-colors">FAQ</a>
            </nav>
            <div className="flex flex-col gap-2.5">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener" className="no-underline text-[15px] text-ink hover:text-gold-deep transition-colors">LinkedIn</a>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="no-underline text-[15px] text-ink hover:text-gold-deep transition-colors">{SUPPORT_EMAIL}</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-5 border-t border-hair flex flex-wrap gap-3 justify-between">
          <span className="t-small text-stone">© 2026 Randall Re II. All rights reserved.</span>
          <span className="t-small text-stone">Serving defense, GovCon, and federal professionals.</span>
        </div>
      </div>
    </footer>
  )
}
