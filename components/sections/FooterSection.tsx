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
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-floral-tile bg-repeat [background-size:309px_306px] pointer-events-none select-none opacity-[0.12]"
      />
      <FloralAccent
        src="/peony-1.png"
        width={612}
        height={408}
        position="top-left"
        className="w-16 md:w-24 lg:w-36 xl:w-48 [&_img]:w-full [&_img]:h-auto"
        rotation={-5}
        opacity={0.80}
        sizes="(min-width: 1280px) 192px, (min-width: 1024px) 144px, (min-width: 768px) 96px, 64px"
      />
      <FloralAccent
        src="/peony-2.png"
        width={1000}
        height={666}
        position="top-right"
        className="w-16 md:w-24 lg:w-36 xl:w-48 [&_img]:w-full [&_img]:h-auto"
        rotation={5}
        opacity={0.80}
        sizes="(min-width: 1280px) 192px, (min-width: 1024px) 144px, (min-width: 768px) 96px, 64px"
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
