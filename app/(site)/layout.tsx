import { SiteNav } from "@/components/layout/SiteNav"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteNav />
      {children}
    </>
  )
}
