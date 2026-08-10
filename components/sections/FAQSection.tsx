import { QuestionCircleIcon } from "@/components/illustrations/SiteIconsSection"
import { FloralAccent } from "@/components/illustrations/FloralAccent"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
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
        src="/allium-single.png"
        width={480}
        height={640}
        position="top-left"
        className="w-[22vw] max-w-[110px] z-0"
        rotation={-8}
        opacity={0.68}
        feather
        sizes="(max-width: 768px) 22vw, 110px"
      />
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-3">
            Questions
          </p>
          <QuestionCircleIcon className="w-[22px] h-[22px] text-rose mx-auto mb-3 block" />
          <h2 className="font-serif text-3xl md:text-4xl text-ink uppercase">
            Frequently asked
          </h2>
        </div>
        <FAQAccordion items={items} />
      </div>
    </SectionWrapper>
  )
}
