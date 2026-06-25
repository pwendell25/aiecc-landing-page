import type { ReactNode } from 'react'

const CheckIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export default function CheckItem({ text }: { text: ReactNode }) {
  return (
    <div className="flex gap-[14px] items-start py-[18px] px-1 border-b border-[rgba(239,199,94,0.1)]">
      <span className="flex-none flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[rgba(239,199,94,0.14)] border border-[rgba(239,199,94,0.4)] text-accent">
        <CheckIcon />
      </span>
      <p className="m-0 text-[15.5px] leading-[1.55] text-[rgba(251,252,245,0.82)] font-light">{text}</p>
    </div>
  )
}
