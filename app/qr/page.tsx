import type { Metadata } from "next"
import { Monogram } from "@/components/illustrations/Monogram"
import { DIRECTIONS_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "T&L | Welcome",
  robots: { index: false, follow: false },
}

const SITE_URL = "https://thomasandleanne.com"

export default function QRPage() {
  return (
    <main className="min-h-dvh bg-ivory flex flex-col items-center justify-center px-6 py-16">
      <div className="flex flex-col items-center gap-6 w-full max-w-xs">

        {/* Monogram */}
        <div className="flex flex-col items-center gap-2">
          <Monogram
            alt="Thomas and Leanne monogram"
            className="w-24"
            sizes="96px"
          />
          <p className="font-cormorant italic text-lg text-taupe tracking-widest">
            Thomas &amp; Leanne
          </p>
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-hairline" />

        {/* Welcome line */}
        <p className="font-cormorant text-center text-ink text-xl leading-relaxed">
          We&rsquo;re so glad you found us.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-3 w-full pt-2">
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

      </div>
    </main>
  )
}
