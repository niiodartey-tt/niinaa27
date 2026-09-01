import type { Metadata } from "next"
import { Imperial_Script, Cormorant_Garamond } from "next/font/google"
import { SiteNav } from "@/components/layout/SiteNav"
import { SiteReveal } from "@/components/layout/SiteReveal"
import { LenisProvider } from "@/components/providers/LenisProvider"
import GoldGradientDefs from "@/components/shared/GoldGradientDefs"
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ""

export const metadata: Metadata = {
  title: "Thomas & Leanne — Wedding Invitation",
  description: "You are invited to celebrate the wedding of Thomas & Leanne on 2 January 2027.",
  metadataBase: new URL(siteUrl || "https://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo-tl.png",
    apple: "/logo-tl.png",
  },
  openGraph: {
    title: "Thomas & Leanne — Wedding Invitation",
    description: "You are invited to celebrate the wedding of Thomas & Leanne on 2 January 2027.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1920,
        height: 1278,
        alt: "Thomas & Leanne — Wedding, 2 January 2027",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas & Leanne — Wedding Invitation",
    description: "You are invited to celebrate the wedding of Thomas & Leanne on 2 January 2027.",
    images: ["/hero-bg.jpg"],
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
        <SiteReveal />
        <GoldGradientDefs />
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
