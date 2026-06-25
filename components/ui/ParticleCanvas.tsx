'use client'

import { useRef, useEffect } from 'react'

interface ParticleCanvasProps {
  animationStyle?: 'waves' | 'neural' | 'calm'
  particleDensity?: 'low' | 'medium' | 'high'
  showConnections?: boolean
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  baseAlpha: number
}

const DENSITY_MAP: Record<string, number> = { low: 0.00006, medium: 0.0001, high: 0.00015 }

export default function ParticleCanvas({
  animationStyle = 'waves',
  particleDensity = 'medium',
  showConnections = true,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const density = DENSITY_MAP[particleDensity] ?? 0.0001
    let w = 0, h = 0, dpr = 1
    let particles: Particle[] = []
    let rafId = 0

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      if (!w || !h) return
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(40, Math.min(150, Math.floor(w * h * density)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        size: 0.6 + Math.random() * 1.9,
        life: Math.random(),
        baseAlpha: 0.22 + Math.random() * 0.5,
      }))
    }

    window.addEventListener('resize', init)
    init()

    let t = 0
    const TAU = Math.PI * 2
    const maxD = animationStyle === 'neural' ? 132 : 102
    const maxD2 = maxD * maxD
    const speed = animationStyle === 'calm' ? 0.26 : animationStyle === 'neural' ? 0.42 : 0.66

    const flow = (x: number, y: number): number => {
      if (animationStyle === 'neural') {
        return Math.sin(x * 0.0013 + t * 0.0004) * Math.cos(y * 0.0015 - t * 0.0003) * TAU
      }
      if (animationStyle === 'calm') {
        return Math.sin(x * 0.0006 + y * 0.0006 + t * 0.0002) * Math.PI
      }
      return (Math.sin(x * 0.0018 + t * 0.0005) + Math.cos(y * 0.0022 - t * 0.0004)) * Math.PI
    }

    const draw = () => {
      t += 16
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        const a = flow(p.x, p.y)
        p.vx = (p.vx + Math.cos(a) * 0.06) * 0.92
        p.vy = (p.vy + Math.sin(a) * 0.06) * 0.92
        p.x += p.vx * speed * 2.4
        p.y += p.vy * speed * 2.4
        if (p.x < -24) p.x = w + 24
        if (p.x > w + 24) p.x = -24
        if (p.y < -24) p.y = h + 24
        if (p.y > h + 24) p.y = -24
      }

      if (showConnections) {
        ctx.lineWidth = 0.6
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const d2 = dx * dx + dy * dy
            if (d2 < maxD2) {
              const alpha = (1 - Math.sqrt(d2) / maxD) * 0.13
              ctx.strokeStyle = `rgba(239,199,94,${alpha.toFixed(3)})`
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }
        }
      }

      for (const p of particles) {
        const pulse = 0.6 + 0.4 * Math.sin(t * 0.002 + p.life * 6.28)
        ctx.fillStyle = `rgba(239,199,94,${(p.baseAlpha * pulse).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, TAU)
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', init)
    }
  }, [animationStyle, particleDensity, showConnections])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
}
