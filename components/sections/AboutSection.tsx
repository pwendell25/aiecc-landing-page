import Image from 'next/image'
import { coachSkills } from '@/constants/data'

export default function AboutSection() {
  return (
    <section id="about" className="bg-bg-alt border-t border-[rgba(239,199,94,.12)]">
      <div
        className="max-w-[1180px] mx-auto grid items-center"
        style={{
          padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,56px)',
          gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
          gap: 'clamp(36px,5vw,72px)',
        }}
      >
        {/* Coach photo */}
        <div data-reveal="from-left" className="relative">
          <div className="relative rounded-[20px] border border-[rgba(239,199,94,.3)] bg-[#0a0a0c] overflow-hidden aspect-[4/5]">
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg,#0f0f12 0%,#1a1a1f 100%)' }}
            />
            <Image
              src="/assets/randall-headshot/Randall Headshot.png"
              alt="Randall Re II"
              fill
              className="object-cover object-[50%_22%]"
              unoptimized
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(180deg,rgba(8,8,10,0) 40%,rgba(8,8,10,.82))' }}
            />
            <div className="absolute bottom-[18px] left-[18px] right-[18px] flex gap-2 flex-wrap">
              <span className="text-[11px] tracking-[.08em] text-accent bg-[rgba(8,8,10,.7)] border border-[rgba(239,199,94,.3)] rounded-full px-[11px] py-[5px]">
                LINKEDIN TOP VOICE · 2024 &amp; 2025
              </span>
              <span className="text-[11px] tracking-[.08em] text-accent bg-[rgba(8,8,10,.7)] border border-[rgba(239,199,94,.3)] rounded-full px-[11px] py-[5px]">
                U.S. MILITARY VETERAN
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div data-reveal="from-right" data-delay="1">
          <p className="text-[12px] tracking-[.22em] text-accent font-medium">MEET YOUR COACH</p>
          <h2
            className="font-display font-extrabold leading-[1.08] tracking-[-0.02em] mt-4"
            style={{ fontSize: 'clamp(28px,4vw,46px)' }}
          >
            Randall Re II
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-[rgba(251,252,245,.72)] font-light">
            Randall is a U.S. Military Veteran, defense industry professional, and{' '}
            <span className="text-text">
              LinkedIn Top Voice in Career Coaching for 2024 and 2025.
            </span>{' '}
            That recognition is held by only the top 1% of career coaches, awarded for credibility,
            authority, results, strategy, and influence.
          </p>
          <p className="mt-4 text-[16px] leading-[1.7] text-[rgba(251,252,245,.72)] font-light">
            He is not a resume writer. He&apos;s a career strategist who uses AI and real relationships to
            get professionals job offers. His clients aren&apos;t underqualified. They&apos;re{' '}
            <span className="text-text">underpositioned</span>. The work fixes that, with one outcome in
            mind: a better offer in 90 days.
          </p>
          <div className="flex flex-wrap gap-[10px] mt-[26px]">
            {coachSkills.map((skill) => (
              <span
                key={skill}
                className="text-[13px] text-[rgba(251,252,245,.78)] border border-[rgba(239,199,94,.22)] rounded-full px-4 py-2"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
