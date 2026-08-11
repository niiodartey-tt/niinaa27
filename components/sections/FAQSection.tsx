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
        src="/bloom-2.png"
        width={453}
        height={676}
        position="top-left"
        className="w-[120px] sm:w-[150px] md:w-[190px] lg:w-[20vw] max-w-[360px] z-0"
        rotation={-10}
        opacity={0.58}
        feather
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 190px, (min-width: 640px) 150px, 120px"
      />
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
      <FloralAccent
        src="/bloom-1.png"
        width={495}
        height={619}
        position="bottom-left"
        className="w-[120px] sm:w-[150px] md:w-[190px] lg:w-[20vw] max-w-[360px] z-0"
        rotation={-20}
        opacity={0.52}
        feather
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 190px, (min-width: 640px) 150px, 120px"
      />
      <FloralAccent
        src="/bloom-2.png"
        width={453}
        height={676}
        position="bottom-right"
        className="w-[120px] sm:w-[150px] md:w-[190px] lg:w-[20vw] max-w-[360px] z-0"
        rotation={8}
        opacity={0.58}
        feather
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 190px, (min-width: 640px) 150px, 120px"
      />
      <div className="max-w-2xl mx-auto relative z-[1]">
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
      </div>
    </SectionWrapper>
  )
}
