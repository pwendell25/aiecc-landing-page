import CheckItem from '@/components/ui/CheckItem'
import { packageItems } from '@/constants/data'

export default function PackageSection() {
  return (
    <section className="bg-bg-alt border-t border-[rgba(239,199,94,.12)]">
      <div
        className="max-w-[1180px] mx-auto"
        style={{ padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,56px)' }}
      >
        <div data-reveal className="max-w-[640px] mx-auto mb-12 text-center">
          <p className="text-[12px] tracking-[.22em] text-accent font-medium">WHAT YOU&apos;LL GET</p>
          <h2
            className="font-display font-extrabold leading-[1.06] tracking-[-0.02em] mt-4"
            style={{ fontSize: 'clamp(30px,4.4vw,52px)' }}
          >
            Everything inside the
            <br />
            Perfect Package.
          </h2>
        </div>

        <div
          className="grid max-w-[980px] mx-auto"
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '0 28px' }}
        >
          {packageItems.map((item, i) => (
            <div key={i} data-reveal data-delay={i + 1}>
            <CheckItem
              text={
                item.highlight ? (
                  <>
                    {item.text.split(item.highlight)[0]}
                    <span className="text-accent">{item.highlight}</span>
                    {item.text.split(item.highlight)[1]}
                  </>
                ) : (
                  item.text
                )
              }
            />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
