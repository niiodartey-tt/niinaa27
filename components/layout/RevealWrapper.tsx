"use client"

import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

interface RevealWrapperProps {
  children: React.ReactNode
  className?: string
  threshold?: number
}

export function RevealWrapper({ children, className, threshold = 0.08 }: RevealWrapperProps) {
  const { ref, isInView } = useInView(threshold)

  return (
    <div
      ref={ref}
      className={cn(
        isInView ? "animate-fade-up opacity-0" : "opacity-0",
        "motion-reduce:opacity-100 motion-reduce:animate-none",
        className
      )}
    >
      {children}
    </div>
  )
}
