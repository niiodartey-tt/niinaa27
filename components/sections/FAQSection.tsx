import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { FAQAccordion } from "@/components/sections/FAQAccordion"
import type { FaqItem } from "@/types/sanity"

interface FAQSectionProps {
  items: FaqItem[]
}

export function FAQSection({ items }: FAQSectionProps) {
  if (items.length === 0) return null

  return (
    <SectionWrapper id="faq" className="bg-ivory">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-3">
            Questions
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink">
            Frequently asked
          </h2>
        </div>
        <FAQAccordion items={items} />
      </div>
    </SectionWrapper>
  )
}
