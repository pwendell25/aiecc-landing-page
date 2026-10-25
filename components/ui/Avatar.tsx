/* Client photo, or their initial when there's no photo (e.g. anonymous clients). */
export default function Avatar({ name, src, size = 40 }: { name: string; src?: string; size?: number }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        className="shrink-0 rounded-full object-cover bg-hair"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <span
      className="shrink-0 rounded-full bg-linen border border-hair flex items-center justify-center font-serif text-ink"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden="true"
    >
      {name.charAt(0)}
    </span>
  )
}
