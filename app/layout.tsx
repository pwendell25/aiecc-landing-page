import type { Metadata } from 'next'
import { Instrument_Sans, Source_Serif_4, Red_Hat_Display } from 'next/font/google'
import './globals.css'

const instrumentSans = Instrument_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

// Only used by the admin dashboard.
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
    <html
      lang="en"
      className={`${instrumentSans.variable} ${sourceSerif.variable} ${redHatDisplay.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  )
}
