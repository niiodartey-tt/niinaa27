/* eslint-disable @next/next/no-page-custom-font */
// Elms Sans is not in next/font/google at Next.js 14.2.35 — loaded via <link> in root layout.
import type { Metadata } from "next"
import { Imperial_Script } from "next/font/google"
import { SiteNav } from "@/components/layout/SiteNav"
import { LenisProvider } from "@/components/providers/LenisProvider"
import "./globals.css"

const imperialScript = Imperial_Script({
  subsets: ["latin"],
  variable: "--font-imperial-script",
  weight: "400",
  display: "swap",
})

// Elms Sans is not yet in next/font/google's bundled font list (Next.js 14.2.35).
// Loaded via <link> in <head> below. TODO Sprint 3: switch to localFont once
// a self-hosted copy is added to /public/fonts/.

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
      className={imperialScript.variable}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Elms+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
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
