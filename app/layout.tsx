import type { Metadata } from 'next'
import { Poppins, Red_Hat_Display } from 'next/font/google'
import ScrollReveal from '@/components/ui/ScrollReveal'
import './globals.css'

const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

const redHatDisplay = Red_Hat_Display({
  weight: ['500', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-red-hat-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI-Enhanced Career Coaching',
  description:
    'A 90-day, AI-enhanced program for defense professionals, executives, and career-driven leaders. Land a competitive offer in under 90 days, or your money back.',
  icons: {
    icon: '/assets/images/AI-Driven Career Coaching Logo (1).png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${redHatDisplay.variable}`}>
      <body className="font-sans bg-bg text-text">
        <ScrollReveal />
        {children}
      </body>
    </html>
  )
}
