import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import ConvexClientProvider from "@/components/ConvexClientProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "CSV Bank Statement Analyzer - Import & Track Spending | Eanie Meenie",
  description:
    "Import CSV bank statements from Monzo, Barclays & more. Instantly analyze spending, track budgets, and spot trends. No bank login required. Try free today.",
  keywords: [
    "csv bank statement analyzer",
    "bank statement import tool",
    "personal finance tracker no bank login",
    "spending analysis",
    "monzo csv import",
    "barclays statement analyzer",
    "uk personal finance",
    "budget tracker without bank connection",
    "transaction categorizer",
    "financial tracking app uk",
  ],
  authors: [{ name: "Eanie Meenie" }],
  openGraph: {
    title: "Eanie Meenie - Analyze Your Spending Without Bank Login",
    description:
      "Import CSV bank statements and get instant spending insights. Works with all UK banks. No passwords required.",
    type: "website",
    locale: "en_GB",
    siteName: "Eanie Meanie",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eanie Meanie - CSV Bank Statement Analyzer",
    description: "Track finances privately. Import CSV statements from any UK bank. Free to start.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/convex.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Eanie Meanie",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
    },
    description:
      "CSV bank statement analyzer and personal finance tracker. Import statements from UK banks without sharing login credentials.",
    featureList: [
      "CSV bank statement import",
      "Automatic transaction categorization",
      "Spending analysis and reports",
      "Multi-account support",
      "Duplicate transaction detection",
      "Works with Monzo, Barclays, HSBC, Lloyds and more UK banks",
    ],
    creator: {
      "@type": "Organization",
      name: "Eanie Meanie",
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider dynamic>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
