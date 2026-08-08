import { Monogram } from "@/components/illustrations/Monogram"
import { LeafDivider } from "@/components/illustrations/LeafDivider"
import { FloralAccent } from "@/components/illustrations/FloralAccent"
import type { CoupleInfo } from "@/types/sanity"

// Use local-time Date constructor (not ISO string) to avoid UTC-midnight
// shifting the date back one day in negative-offset timezones.
function formatDate(iso: string): string {
  const parts = iso.split("-")
  const year = Number(parts[0])
  const month = Number(parts[1])
  const day = Number(parts[2])
  if (!year || !month || !day) return iso
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

interface FooterSectionProps {
  couple: CoupleInfo
}

export function FooterSection({ couple }: FooterSectionProps) {
  return (
    <footer id="footer" className="bg-ink py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Placeholder — wire src once floral assets are sourced */}
      <FloralAccent
        src=""
        width={200}
        height={200}
        position="top-left"
        rotation={-10}
        opacity={0.5}
      />
      <FloralAccent
        src=""
        width={200}
        height={200}
        position="top-right"
        rotation={10}
        opacity={0.5}
      />
      <div className="relative z-[1] max-w-md mx-auto flex flex-col items-center text-center gap-6">
        <Monogram
          aria-hidden="true"
          className="w-28 md:w-36 text-ivory opacity-45"
        />
        <LeafDivider
          aria-hidden="true"
          className="text-ivory opacity-20 w-36 md:w-44"
        />
        <p className="font-script text-4xl md:text-5xl text-ivory">
          {couple.names}
        </p>
        <div className="w-12 h-px bg-blush opacity-30" aria-hidden="true" />
        <p className="font-serif text-base text-blush">
          {formatDate(couple.weddingDate)} · {couple.locationName}
        </p>
      </div>
    </footer>
  )
}
