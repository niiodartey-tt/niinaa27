import type { Metadata } from "next"
import { Imperial_Script, Cormorant_Garamond } from "next/font/google"
import { SiteNav } from "@/components/layout/SiteNav"
import { LenisProvider } from "@/components/providers/LenisProvider"
import "./globals.css"

const imperialScript = Imperial_Script({
  subsets: ["latin"],
  variable: "--font-imperial-script",
  weight: "400",
  display: "swap",
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Thomas & Leanne — Wedding Invitation",
  description: "You are invited to celebrate the wedding of Thomas & Leanne on 2 January 2027.",
  openGraph: {
    title: "Thomas & Leanne — Wedding Invitation",
    description: "You are invited to celebrate the wedding of Thomas & Leanne on 2 January 2027.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${imperialScript.variable} ${cormorantGaramond.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-rose focus:text-ivory focus:rounded-lg font-sans text-sm"
        >
          Skip to main content
        </a>
        <LenisProvider>
          <SiteNav />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
