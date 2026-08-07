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
      className={cn("py-20 md:py-28 px-4", className)}
    >
      {children}
    </section>
  )
}
