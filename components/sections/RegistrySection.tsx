import { Gift } from "lucide-react"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { RevealWrapper } from "@/components/layout/RevealWrapper"

// Gift Guide is currently hardcoded — not wired to Sanity.
// See overview.md Scoped Exceptions for Sprint 3 context.
export function RegistrySection() {
  return (
    <SectionWrapper id="gift-guide" className="relative overflow-hidden">
      <RevealWrapper className="max-w-2xl mx-auto text-center relative z-[1]">
        <Gift size={22} aria-hidden="true" stroke="url(#gold-shimmer)" className="mx-auto mb-3" />
        <h2 className="font-serif text-3xl md:text-4xl text-ink uppercase">
          Gift Guide
        </h2>

        <p className="font-serif text-base text-taupe leading-relaxed mt-4 max-w-sm mx-auto">
          Your presence means more to us than any gift. If you&apos;d like to
          help us start this next chapter, we&apos;re saving toward our first
          home together and a honeymoon to remember — any contribution would be
          received with so much gratitude.
        </p>

        <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">

          {/* Ghana */}
          <div className="p-px rounded-card bg-gold-shimmer">
            <div className="rounded-[27px] bg-ivory p-6 text-left h-full">
              <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-4">
                Ghana
              </p>
              <div className="space-y-4">
                <div>
                  <p className="font-sans text-xs text-taupe uppercase tracking-wide mb-0.5">Account Name</p>
                  <p className="font-serif text-base text-ink">Thomas Nii Odartey Thompson</p>
                </div>
                <div>
                  <p className="font-sans text-xs text-taupe uppercase tracking-wide mb-0.5">Bank</p>
                  <p className="font-serif text-base text-ink">GCB Bank</p>
                </div>
                <div>
                  <p className="font-sans text-xs text-taupe uppercase tracking-wide mb-0.5">Account Number</p>
                  <p className="font-serif text-base text-ink font-mono tracking-wider">1011101834312</p>
                </div>
              </div>
            </div>
          </div>

          {/* UK */}
          <div className="p-px rounded-card bg-gold-shimmer">
            <div className="rounded-[27px] bg-ivory p-6 text-left h-full">
              <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-4">
                United Kingdom
              </p>
              <div className="space-y-4">
                <div>
                  <p className="font-sans text-xs text-taupe uppercase tracking-wide mb-0.5">Account Name</p>
                  <p className="font-serif text-base text-ink">Leanne Crabbe</p>
                </div>
                <div>
                  <p className="font-sans text-xs text-taupe uppercase tracking-wide mb-0.5">Sort Code</p>
                  <p className="font-serif text-base text-ink font-mono tracking-wider">04-00-04</p>
                </div>
                <div>
                  <p className="font-sans text-xs text-taupe uppercase tracking-wide mb-0.5">Account Number</p>
                  <p className="font-serif text-base text-ink font-mono tracking-wider">68481961</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <p className="font-serif text-sm text-taupe italic leading-relaxed mt-5 max-w-sm mx-auto">
          Please include your name as the payment reference so we can send our thanks.
        </p>

        <p className="font-serif text-sm text-taupe italic leading-relaxed mt-5 max-w-xs mx-auto">
          Physical gifts will be warmly received at the event.
        </p>
      </RevealWrapper>
    </SectionWrapper>
  )
}
