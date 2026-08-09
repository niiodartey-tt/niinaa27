import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  className?: string
}

export function SectionWrapper({ children, id, className }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28 px-4",
        "bg-ivory bg-[radial-gradient(ellipse_100%_70%_at_50%_0%,#FFF8EC_0%,#FBF9F4_65%)]",
        className
      )}
    >
      {children}
    </section>
  )
}
