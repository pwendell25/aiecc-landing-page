import LinkedInIcon from '@/components/icons/LinkedInIcon'

interface LinkedInBadgeProps {
  name: string
  subtitle: string
  url: string
}

export default function LinkedInBadge({ name, subtitle, url }: LinkedInBadgeProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      className="inline-flex items-center gap-3 no-underline card pl-3 pr-5 py-3 hover:bg-white transition-colors"
    >
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-ink text-paper shrink-0">
        <LinkedInIcon size={17} />
      </span>
      <span className="flex flex-col gap-[2px]">
        <span className="text-[15px] font-medium text-ink leading-tight">{name}</span>
        <span className="t-small text-stone leading-tight">{subtitle}</span>
      </span>
    </a>
  )
}
