import Image from 'next/image'
import { companies } from '@/constants/data'

/* Static, monochrome "trusted by" row. The logos are mixed JPG/PNG on white,
   so they're greyscaled and multiplied onto the paper instead of boxed in tiles. */
export default function LogosSection() {
  return (
    <section className="border-y border-hair">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-10 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-12 items-center">
        <p className="m-0 t-small text-stone max-w-[220px]">
          Coached and mentored professionals at
        </p>
        <ul className="m-0 p-0 list-none flex flex-wrap items-center gap-x-9 gap-y-5">
          {companies.map((company) => (
            <li key={company.name} className="flex items-center">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={150}
                  height={32}
                  className="h-7 sm:h-8 w-auto max-w-[150px] object-contain opacity-80"
                  style={{ filter: 'grayscale(1) contrast(1.15)', mixBlendMode: 'multiply' }}
                  unoptimized
                />
              ) : (
                <span className="text-[14px] font-medium text-stone">{company.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
