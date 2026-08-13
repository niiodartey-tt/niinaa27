import { FloralAccent } from "@/components/illustrations/FloralAccent"
import { Monogram } from "@/components/illustrations/Monogram"
import { RevealWrapper } from "@/components/layout/RevealWrapper"

export function FooterSection() {
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
        <p className="font-sans font-bold text-xl md:text-2xl text-ink tracking-wide">
          #thomasandleanne2027
        </p>
        <div className="w-12 h-px bg-hairline" aria-hidden="true" />
        <p className="font-serif italic text-base text-ink leading-relaxed">
          Thank you for being part of our story.{" "}
          <span className="block sm:inline">We cannot wait to celebrate with you.</span>
        </p>
      </RevealWrapper>
    </footer>
  )
}
