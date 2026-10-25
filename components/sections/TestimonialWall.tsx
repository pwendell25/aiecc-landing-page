'use client'

import { useState } from 'react'
import { testimonialWall } from '@/constants/data'
import Avatar from '@/components/ui/Avatar'

/* Every testimonial, in the clients' own words. Collapsed to a few rows so the
   page stays short until someone asks for more. */
export default function TestimonialWall() {
  const [open, setOpen] = useState(false)

  return (
    <section id="testimonials" className="scroll-mt-16">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-[clamp(72px,9vw,120px)]">
        <div className="max-w-[640px]">
          <p className="m-0 mb-4 t-small font-medium uppercase tracking-[0.14em] text-gold-deep">Testimonials</p>
          <h2 className="t-heading m-0 text-ink">In their own words.</h2>
          <p className="t-lead mt-5">
            {testimonialWall.length} client testimonials, trimmed for length. 80+ across
            LinkedIn recommendations and testimonials.
          </p>
        </div>

        <div className="relative mt-12">
          <div
            id="testimonial-wall"
            className={`columns-1 sm:columns-2 lg:columns-3 gap-4 ${open ? '' : 'max-h-[880px] overflow-hidden'}`}
          >
            {testimonialWall.map((t, i) => (
              <figure key={i} className="card m-0 mb-4 p-6 break-inside-avoid">
                <blockquote className="m-0 t-body text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 t-small flex items-center gap-3">
                  <Avatar name={t.name} src={t.avatar} size={40} />
                  <span>
                    <span className="block text-ink font-medium">{t.name}</span>
                    {t.title && <span className="block text-stone">{t.title}</span>}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          {!open && (
            <div
              className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-b from-transparent to-paper pointer-events-none"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="testimonial-wall"
            className="btn btn-linen cursor-pointer"
          >
            {open ? 'Show fewer' : `Show all ${testimonialWall.length} testimonials`}
          </button>
        </div>
      </div>
    </section>
  )
}
