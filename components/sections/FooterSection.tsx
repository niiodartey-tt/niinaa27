import { Monogram } from "@/components/illustrations/Monogram"
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
    <footer id="footer" className="bg-blush py-16 md:py-20 px-4 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-floral-tile bg-repeat [background-size:309px_306px] pointer-events-none select-none [filter:invert(1)_contrast(5)_brightness(0.5)] opacity-20"
      />
      <div className="relative z-[1] max-w-md mx-auto flex flex-col items-center text-center gap-6">
        <Monogram
          alt="Thomas and Leanne"
          className="w-40 md:w-52"
        />
        <p className="font-script text-4xl md:text-5xl text-ink">
          {couple.names}
        </p>
        <div className="w-12 h-px bg-hairline" aria-hidden="true" />
        <p className="font-serif text-base text-taupe">
          {formatDate(couple.weddingDate)} · {couple.locationName}
        </p>
        <p className="font-sans text-[10px] text-taupe/60 mt-2">
          Floral illustration via{" "}
          <a
            href="https://www.vecteezy.com"
            className="underline underline-offset-2 hover:text-taupe transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vecteezy
          </a>
        </p>
      </div>
    </footer>
  )
}
