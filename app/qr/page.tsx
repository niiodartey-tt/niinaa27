import type { Metadata } from "next"
import Image from "next/image"
import { Monogram } from "@/components/illustrations/Monogram"
import { DIRECTIONS_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "T&L | Welcome",
  robots: { index: false, follow: false },
}

const SITE_URL = "https://thomasandleanne.com"

export default function QRPage() {
  return (
    <main className="relative min-h-dvh bg-ivory flex flex-col items-center justify-center px-6 py-16">

      {/* Hero photo */}
      <Image
        src="/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-[75%_50%] md:object-center"
        priority
      />

      {/* Scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(251,249,244,0.55) 0%, rgba(251,249,244,0.88) 45%, #FBF9F4 78%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-xs text-center">

        {/* Monogram badge */}
        <div className="w-24 h-24 rounded-full bg-ivory border border-hairline shadow-sm overflow-hidden flex items-center justify-center">
          <Monogram
            alt="Thomas and Leanne monogram"
            className="w-16"
            sizes="64px"
          />
        </div>

        {/* Name */}
        <p className="font-serif text-rose not-italic tracking-[0.04em] text-xl">
          Thomas &amp; Leanne
        </p>

        {/* Gold divider */}
        <div className="w-24 h-px bg-gold-base" aria-hidden="true" />

        {/* Tagline */}
        <p className="font-serif text-ink text-xl leading-relaxed">
          Thank you for being part of our story.{" "}
          <span className="block">We cannot wait to celebrate with you.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-3 w-full pt-1">
          <a
            href={SITE_URL}
            className="flex items-center justify-center min-h-[48px] w-full rounded-full bg-rose text-ivory font-sans text-sm font-medium tracking-wide transition-colors duration-200 hover:bg-rose-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            Visit Our Website
          </a>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center min-h-[48px] w-full rounded-full border border-rose text-rose font-sans text-sm font-medium tracking-wide transition-colors duration-200 hover:bg-blush focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            Get Directions
          </a>
        </div>

        {/* Date / location */}
        <p className="font-sans text-sm uppercase tracking-[0.15em] text-taupe pt-1">
          Saturday, 2 January 2027 &middot; Accra
        </p>

      </div>
    </main>
  )
}
