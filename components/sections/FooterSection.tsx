import { FloralAccent } from "@/components/illustrations/FloralAccent"
import { Monogram } from "@/components/illustrations/Monogram"
import { RevealWrapper } from "@/components/layout/RevealWrapper"
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
      <FloralAccent
        src="/bloom-2.png"
        width={453}
        height={676}
        position="bottom-left"
        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[26vw] max-w-[460px] z-0"
        rotation={-18}
        opacity={0.65}
        feather
        sizes="(min-width: 1024px) 26vw, (min-width: 768px) 240px, (min-width: 640px) 200px, 160px"
      />
      <RevealWrapper className="relative z-[1] max-w-md mx-auto flex flex-col items-center text-center gap-5">
        <Monogram
          alt="Thomas and Leanne laurel wreath"
          className="w-44 md:w-56"
        />
        <p className="font-script text-2xl md:text-3xl text-ink tracking-wide">
          #thomasandleanne2027
        </p>
        <div className="w-12 h-px bg-hairline" aria-hidden="true" />
        <p className="font-serif text-base text-taupe">
          {formatDate(couple.weddingDate)} · {couple.locationName}
        </p>
        {/* Contact placeholder — swap email and phone before launch */}
        <p className="font-serif text-sm text-taupe/80 leading-relaxed">
          Questions?{" "}
          <a
            href="mailto:placeholder@email.com"
            className="underline underline-offset-2 hover:text-ink transition-colors duration-200"
          >
            placeholder@email.com
          </a>
          {" · "}
          <a
            href="tel:+233XXXXXXXXX"
            className="underline underline-offset-2 hover:text-ink transition-colors duration-200"
          >
            +233 XX XXX XXXX
          </a>
        </p>
      </RevealWrapper>
    </footer>
  )
}
