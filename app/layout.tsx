import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "KSM - Digital Artist Portfolio",
  description: "Professional digital artist portfolio showcasing creative works, services, and artistic journey.",
  keywords: "digital art, artist, portfolio, creative, design, illustration",
  authors: [{ name: "KSM" }],
  creator: "KSM",
  openGraph: {
    title: "KSM - Digital Artist Portfolio",
    description: "Professional digital artist portfolio showcasing creative works, services, and artistic journey.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KSM - Digital Artist Portfolio",
    description: "Professional digital artist portfolio showcasing creative works, services, and artistic journey.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
