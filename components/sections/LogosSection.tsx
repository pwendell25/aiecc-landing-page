import Image from 'next/image'
import { companies } from '@/constants/data'

export default function LogosSection() {
  const track = [...companies, ...companies]

  return (
    <section className="bg-bg border-b border-[rgba(239,199,94,.1)]">
      <div style={{ padding: '54px 0 60px' }}>
        <p className="text-center text-[11.5px] tracking-[.24em] text-[rgba(251,252,245,.5)] font-medium mb-[34px]">
          CLIENTS HAVE LANDED &amp; ADVANCED ROLES AT
        </p>

        {/* Marquee wrapper */}
        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{ width: '80px', background: 'linear-gradient(to right, #08080a, transparent)' }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{ width: '80px', background: 'linear-gradient(to left, #08080a, transparent)' }}
          />

          {/* Scrolling track — logos duplicated for seamless loop */}
          <div
            className="flex"
            style={{
              width: 'max-content',
              gap: '14px',
              animation: 'marquee 32s linear infinite',
            }}
          >
            {track.map((company, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center bg-[#FBFCF5] rounded-[12px]"
                style={{
                  width: '176px',
                  height: '74px',
                  padding: '14px 20px',
                  boxShadow: '0 6px 18px rgba(0,0,0,.28)',
                }}
              >
                {company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={120}
                    height={46}
                    className="max-w-full max-h-full object-contain"
                    unoptimized
                  />
                ) : (
                  <span className="text-[13px] font-semibold text-[#08080a] text-center leading-tight">
                    {company.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
