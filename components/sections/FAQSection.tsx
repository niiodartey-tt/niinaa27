import { QuestionCircleIcon } from "@/components/illustrations/SiteIconsSection"
import { FloralAccent } from "@/components/illustrations/FloralAccent"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { RevealWrapper } from "@/components/layout/RevealWrapper"
import { FAQAccordion } from "@/components/sections/FAQAccordion"
import type { FaqItem } from "@/types/sanity"

interface FAQSectionProps {
  items: FaqItem[]
}

export function FAQSection({ items }: FAQSectionProps) {
  if (items.length === 0) return null

  return (
    <SectionWrapper id="faq" className="bg-ivory relative overflow-hidden">
      <FloralAccent
        src="/bloom-3.png"
        width={170}
        height={297}
        position="top-right"
        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[26vw] max-w-[460px] z-0"
        rotation={15}
        opacity={0.65}
        feather
        sizes="(min-width: 1024px) 26vw, (min-width: 768px) 240px, (min-width: 640px) 200px, 160px"
      />
      <RevealWrapper className="max-w-2xl mx-auto relative z-[1]">
        <div className="text-center mb-10 md:mb-12">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-3">
            Questions
          </p>
          <QuestionCircleIcon className="w-[22px] h-[22px] mx-auto mb-3 block" />
          <h2 className="font-serif text-3xl md:text-4xl text-ink uppercase">
            Frequently asked
          </h2>
        </div>
        <FAQAccordion items={items} />

        <div className="mt-10 md:mt-12 max-w-sm mx-auto">
          <div className="p-px bg-gold-shimmer rounded-card">
            <div className="bg-ivory rounded-[27px] px-6 py-5 flex flex-col items-center text-center gap-3">
              <p className="font-sans text-xs text-taupe tracking-widest uppercase">
                Still have a question?
              </p>
              <div className="w-8 h-px bg-hairline" aria-hidden="true" />
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:niinaathompson@outlook.com"
                  className="flex items-center gap-2 font-serif text-base text-ink hover:text-rose active:text-rose transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                  niinaathompson@outlook.com
                </a>
                <div className="flex flex-col items-start gap-0.5">
                  <a
                    href="tel:+233553231996"
                    className="flex items-center gap-2 font-serif text-base text-ink hover:text-rose active:text-rose transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.38 2 2 0 0 1 3.6 1.19h3a2 2 0 0 1 2 1.72c.12.98.34 1.95.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45c.86.36 1.83.58 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    +233 55 323 1996
                  </a>
                  <p className="font-sans text-xs text-taupe italic pl-[22px]">
                    WhatsApp calls &amp; messages only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealWrapper>
    </SectionWrapper>
  )
}
