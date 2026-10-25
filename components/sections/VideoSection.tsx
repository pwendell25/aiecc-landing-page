'use client'

import { useState } from 'react'
import { videos } from '@/constants/data'
import type { Video } from '@/types'

/* Thumbnail first; the YouTube iframe only loads once someone presses play. */
function VideoFacade({ v }: { v: Video }) {
  const [playing, setPlaying] = useState(false)

  return (
    <figure className="m-0">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-night">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full p-0 border-0 cursor-pointer bg-transparent"
            aria-label={`Play: ${v.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-gold text-ink flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                  <path d="M5 3.2v11.6c0 .5.6.8 1 .5l9-5.8c.4-.3.4-.8 0-1.1L6 2.7c-.4-.3-1 0-1 .5Z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 t-small text-stone">{v.title}</figcaption>
    </figure>
  )
}

export default function VideoSection() {
  return (
    <section id="speaking" className="bg-linen scroll-mt-16">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-[clamp(72px,9vw,120px)]">
        <div className="max-w-[600px]">
          <p className="m-0 mb-4 t-small font-medium uppercase tracking-[0.14em] text-gold-deep">Featured speaker</p>
          <h2 className="t-heading m-0 text-ink">Live on 7 Eagle Academy.</h2>
          <p className="t-lead mt-5">
            Sessions with 7 Eagle Group on positioning, AI, and how leadership roles really get
            filled. Hear how Randall thinks before you message him.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {videos.map((v) => (
            <VideoFacade key={v.id} v={v} />
          ))}
        </div>
      </div>
    </section>
  )
}
