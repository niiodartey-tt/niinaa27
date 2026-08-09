import { ExternalLink, Gift } from "lucide-react"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import type { RegistryInfo } from "@/types/sanity"

interface RegistrySectionProps {
  items: RegistryInfo[]
}

export function RegistrySection({ items }: RegistrySectionProps) {
  if (items.length === 0) return null

  return (
    <SectionWrapper id="registry">
      <div className="max-w-2xl mx-auto text-center">
        <Gift
          size={22}
          aria-hidden="true"
          className="text-rose mx-auto mb-3"
        />
        <h2 className="font-serif text-3xl md:text-4xl text-ink uppercase">Registry</h2>
        <p className="font-serif text-base text-taupe italic mt-3">
          Your presence is the greatest gift. Should you wish to honour us
          further, we are grateful.
        </p>

        <ul className="mt-10 md:mt-12 flex flex-wrap justify-center gap-4">
          {items.map((item) => (
            <li key={item._id} className="w-full max-w-sm">
              <div className="rounded-card bg-ivory p-6 text-left">
                <p className="font-serif text-xl text-ink">{item.storeName}</p>
                {item.notes !== undefined && (
                  <p className="font-sans text-sm text-taupe italic mt-2">
                    {item.notes}
                  </p>
                )}
                {item.url !== "#" && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${item.storeName} registry`}
                    className="inline-flex items-center gap-1.5 mt-4 min-h-[44px] font-sans text-sm text-rose hover:text-rose-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
                  >
                    View registry
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  )
}
