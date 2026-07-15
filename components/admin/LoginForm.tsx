'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getFirebaseAuth } from '@/lib/firebase'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password)
    } catch {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg font-sans text-text px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[380px] bg-bg-alt border border-[rgba(239,199,94,0.14)] rounded-2xl p-8"
      >
        <div className="text-[12px] font-semibold tracking-[0.2em] uppercase text-accent">AIECC</div>
        <div className="font-display font-extrabold text-[26px] tracking-[-0.02em] mt-2">
          Mailer sign in
        </div>
        <div className="text-[14px] font-light text-[rgba(251,252,245,0.6)] mt-1.5 mb-6">
          Admin access only.
        </div>

        <label className="block text-[12px] font-semibold tracking-[0.06em] uppercase text-[rgba(251,252,245,0.6)] mb-1.5">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@aiecc.com"
          required
          className="w-full bg-bg border border-[rgba(239,199,94,0.2)] rounded-[11px] text-text font-sans text-[15px] px-3.5 py-3 outline-none focus:border-accent mb-4"
        />

        <label className="block text-[12px] font-semibold tracking-[0.06em] uppercase text-[rgba(251,252,245,0.6)] mb-1.5">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full bg-bg border border-[rgba(239,199,94,0.2)] rounded-[11px] text-text font-sans text-[15px] px-3.5 py-3 outline-none focus:border-accent mb-2"
        />

        {error && <div className="text-[#ff8f8f] text-[13px] mt-2">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-5 cursor-pointer border-none rounded-full bg-accent text-[#0a0a0a] font-semibold text-[15px] py-3.5 font-sans shadow-[0_8px_24px_rgba(239,199,94,0.22)] hover:bg-[#f2d072] disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
