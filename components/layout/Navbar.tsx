import Link from 'next/link'
import Image from 'next/image'
import LinkedInIcon from '@/components/icons/LinkedInIcon'
import { LINKEDIN_URL } from '@/constants/data'

const links = [
  { href: '#process', label: 'The program' },
  { href: '#about', label: 'Your coach' },
  { href: '#proof', label: 'Results' },
  { href: '#testimonials', label: 'Testimonials' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-hair bg-paper/90 backdrop-blur-md">
      <div className="max-w-[1180px] mx-auto flex items-center justify-between px-6 sm:px-10 h-[68px]">
        <Link href="/" className="flex items-center gap-3 no-underline text-ink">
          <Image
            src="/assets/images/AI-Driven Career Coaching Logo (1).png"
            alt=""
            width={40}
            height={40}
            className="object-contain"
            priority
          />
          <span className="hidden sm:block font-serif text-[19px] leading-none tracking-[-0.01em] whitespace-nowrap">
            AI-Enhanced Career Coaching
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden md:block no-underline text-[15px] text-stone hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href={LINKEDIN_URL} target="_blank" rel="noopener" className="btn btn-ink !px-4 !py-3 text-[14px] whitespace-nowrap">
            <LinkedInIcon size={14} />
            Message Randall
          </a>
        </div>
      </div>
    </nav>
  )
}
