'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { getFirebaseAuth } from '@/lib/firebase'
import LoginForm from '@/components/admin/LoginForm'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    return onAuthStateChanged(getFirebaseAuth(), (u) => {
      setUser(u)
      setChecked(true)
    })
  }, [])

  if (!checked) {
    return <div className="min-h-screen bg-bg" />
  }

  if (!user) {
    return <LoginForm />
  }

  return <>{children}</>
}
