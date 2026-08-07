import type { Metadata } from "next"
import { Dancing_Script, Cormorant_Garamond, Inter } from "next/font/google"
import { SiteNav } from "@/components/layout/SiteNav"
import "./globals.css"

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nii & Naa — Wedding Invitation",
  description: "You are invited to celebrate the wedding of Nii & Naa on 2 January 2027.",
  openGraph: {
    title: "Nii & Naa — Wedding Invitation",
    description: "You are invited to celebrate the wedding of Nii & Naa on 2 January 2027.",
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
      className={`${dancingScript.variable} ${cormorantGaramond.variable} ${inter.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-rose focus:text-ivory focus:rounded-lg font-sans text-sm"
        >
          Skip to main content
        </a>
        <SiteNav />
        {children}
      </body>
    </html>
  )
}
