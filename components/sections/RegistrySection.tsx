import { Gift } from "lucide-react"
import { FloralAccent } from "@/components/illustrations/FloralAccent"
import { SectionWrapper } from "@/components/layout/SectionWrapper"

// Gift Guide is currently hardcoded — not wired to Sanity.
// See overview.md Scoped Exceptions for Sprint 3 context.
export function RegistrySection() {
  return (
    <SectionWrapper id="gift-guide" className="relative overflow-hidden">
      <FloralAccent
        src="/bloom-1.png"
        width={495}
        height={619}
        position="top-left"
        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[26vw] max-w-[460px] z-0"
        rotation={-8}
        opacity={0.60}
        feather
        sizes="(min-width: 1024px) 26vw, (min-width: 768px) 240px, (min-width: 640px) 200px, 160px"
      />
      <FloralAccent
        src="/bloom-2.png"
        width={453}
        height={676}
        position="top-right"
        className="w-[120px] sm:w-[150px] md:w-[190px] lg:w-[20vw] max-w-[360px] z-0"
        rotation={12}
        opacity={0.55}
        feather
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 190px, (min-width: 640px) 150px, 120px"
      />
      <FloralAccent
        src="/bloom-3.png"
        width={170}
        height={297}
        position="bottom-left"
        className="w-[120px] sm:w-[150px] md:w-[190px] lg:w-[20vw] max-w-[360px] z-0"
        rotation={-12}
        opacity={0.60}
        feather
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 190px, (min-width: 640px) 150px, 120px"
      />
      <FloralAccent
        src="/bloom-1.png"
        width={495}
        height={619}
        position="bottom-right"
        className="w-[120px] sm:w-[150px] md:w-[190px] lg:w-[20vw] max-w-[360px] z-0"
        rotation={10}
        opacity={0.50}
        feather
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 190px, (min-width: 640px) 150px, 120px"
      />
      <div className="max-w-2xl mx-auto text-center relative z-[1]">
        <Gift size={22} aria-hidden="true" stroke="url(#gold-shimmer)" className="mx-auto mb-3" />
        <h2 className="font-serif text-3xl md:text-4xl text-ink uppercase">
          Gift Guide
        </h2>

        <p className="font-serif text-base text-taupe leading-relaxed mt-4 max-w-sm mx-auto">
          Your presence and your prayers are the greatest gift you could give us.
          If you would still like to mark the occasion, a monetary contribution
          would be warmly and gratefully received.
        </p>

        {/* Bank transfer details — placeholder, confirm real details before launch */}
        <div className="mt-10 md:mt-12 p-px rounded-card bg-gold-shimmer max-w-xs mx-auto">
        <div className="rounded-[27px] bg-ivory p-6 text-left">
          <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-4">
            Bank Transfer Details
          </p>
          <div className="space-y-4">
            {/* placeholder — confirm real details before launch */}
            <div>
              <p className="font-sans text-xs text-taupe uppercase tracking-wide mb-0.5">
                Account Name
              </p>
              <p className="font-serif text-base text-ink">Thomas &amp; Leanne Wedding Fund</p>
            </div>
            <div>
              <p className="font-sans text-xs text-taupe uppercase tracking-wide mb-0.5">
                Bank
              </p>
              <p className="font-serif text-base text-ink">GCB Bank</p>
            </div>
            <div>
              <p className="font-sans text-xs text-taupe uppercase tracking-wide mb-0.5">
                Account Number
              </p>
              <p className="font-serif text-base text-ink font-mono tracking-wider">
                1002345678
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
