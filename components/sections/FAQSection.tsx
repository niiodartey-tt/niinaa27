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

        <div className="mt-10 md:mt-12 flex flex-col items-center text-center gap-3">
          <div className="w-12 h-px bg-hairline" aria-hidden="true" />
          <p className="font-sans text-xs text-taupe tracking-widest uppercase mt-1">
            Still have a question?
          </p>
          <p className="font-serif text-base text-ink">
            <a
              href="mailto:niinaathompson@outlook.com"
              className="underline underline-offset-2 hover:text-taupe transition-colors duration-200"
            >
              niinaathompson@outlook.com
            </a>
            {" · "}
            <a
              href="tel:+233559331276"
              className="underline underline-offset-2 hover:text-taupe transition-colors duration-200"
            >
              +233 55 933 1276
            </a>
          </p>
        </div>
      </RevealWrapper>
    </SectionWrapper>
  )
}
