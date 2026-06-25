'use client'
import { useState, useEffect, useRef } from 'react'
import { stats } from '@/constants/data'

function parseValue(value: string) {
  const match = value.match(/^([^0-9]*)(\d+)(.*)$/)
  if (match) return { prefix: match[1], num: parseInt(match[2]), suffix: match[3] }
  return { prefix: '', num: 0, suffix: value }
}

function useCountUp(target: number, duration = 1500, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active || target === 0) return
    let startTime: number | null = null
    const tick = (now: number) => {
      if (!startTime) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return count
}

function StatItem({ value, description, delay }: { value: string; description: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const { prefix, num, suffix } = parseValue(value)
  const count = useCountUp(num, 1500, active)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-reveal
      data-delay={delay}
      className="border-r border-[rgba(239,199,94,.1)] last:border-r-0"
      style={{ padding: '40px clamp(20px,4vw,44px)' }}
    >
      <div
        className="font-display font-black text-accent leading-none tabular-nums"
        style={{ fontSize: 'clamp(34px,4vw,46px)' }}
      >
        {num > 0 ? `${prefix}${count}${suffix}` : value}
      </div>
      <div className="mt-[10px] text-[13.5px] text-[rgba(251,252,245,.62)] leading-[1.5]">
        {description}
      </div>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="border-t border-b border-[rgba(239,199,94,.12)] bg-bg-alt">
      <div
        className="max-w-[1180px] mx-auto grid"
        style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}
      >
        {stats.map((stat, i) => (
          <StatItem key={i} value={stat.value} description={stat.description} delay={i + 1} />
        ))}
      </div>
    </section>
  )
}
