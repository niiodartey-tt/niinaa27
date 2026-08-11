import { Gift } from "lucide-react"
import { SectionWrapper } from "@/components/layout/SectionWrapper"

// Gift Guide is currently hardcoded — not wired to Sanity.
// See overview.md Scoped Exceptions for Sprint 3 context.
export function RegistrySection() {
  return (
    <SectionWrapper id="gift-guide" className="relative overflow-hidden">
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
