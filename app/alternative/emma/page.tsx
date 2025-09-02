import { SignUpButton } from "@clerk/nextjs"
import { ArrowRight, CheckCircle, Shield, Upload, X, Zap } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Emma App Alternative - CSV Import Instead of Bank Login | Eanie Meanie",
  description:
    "Privacy-focused Emma alternative. Track UK spending with CSV bank statement import. No open banking or bank passwords required. Free to start.",
  keywords: [
    "emma app alternative",
    "emma alternative uk",
    "budgeting app like emma",
    "emma app without bank connection",
    "personal finance app uk",
    "spending tracker without open banking",
  ],
  openGraph: {
    title: "Emma Alternative - Track Money Without Bank Connection",
    description:
      "The Emma alternative that never asks for bank passwords. CSV import for all UK banks.",
  },
}

export default function EmmaAlternativePage() {
  return (
    <main className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold text-4xl">
            The <span className="text-primary">Emma Alternative</span> Without Open Banking
          </h1>
          <p className="text-muted-foreground text-xl">
            Track your UK finances privately. Import CSV statements instead of connecting bank
            accounts.
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-semibold text-2xl">Emma App Limitations</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                <span>Requires open banking connection</span>
              </li>
              <li className="flex gap-3">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                <span>Must share bank login details</span>
              </li>
              <li className="flex gap-3">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                <span>Connections expire every 90 days</span>
              </li>
              <li className="flex gap-3">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                <span>Premium features are expensive</span>
              </li>
              <li className="flex gap-3">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                <span>Some banks have connection issues</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-2xl">Eanie Meanie Advantages</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <span>CSV import - no bank connection</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <span>Keep bank passwords private</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <span>No connection renewals needed</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <span>Generous free plan</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <span>Works with every UK bank</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-16 rounded-lg bg-primary/5 p-8">
          <h2 className="mb-6 text-center font-semibold text-2xl">Emma vs Eanie Meanie</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left">Feature</th>
                  <th className="py-3 text-center">Eanie Meanie</th>
                  <th className="py-3 text-center">Emma</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Open Banking Required</td>
                  <td className="py-3 text-center">
                    <X className="mx-auto h-5 w-5 text-green-600" />
                  </td>
                  <td className="py-3 text-center">
                    <CheckCircle className="mx-auto h-5 w-5 text-red-500" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">CSV Import Support</td>
                  <td className="py-3 text-center">
                    <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                  </td>
                  <td className="py-3 text-center">
                    <X className="mx-auto h-5 w-5 text-gray-400" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Free Plan Transactions</td>
                  <td className="py-3 text-center">Unlimited</td>
                  <td className="py-3 text-center">Limited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Auto-Categorization</td>
                  <td className="py-3 text-center">
                    <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                  </td>
                  <td className="py-3 text-center">
                    <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Spending Analytics</td>
                  <td className="py-3 text-center">
                    <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                  </td>
                  <td className="py-3 text-center">
                    <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Connection Renewal</td>
                  <td className="py-3 text-center">Never</td>
                  <td className="py-3 text-center">Every 90 days</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Data Privacy</td>
                  <td className="py-3 text-center">Full Control</td>
                  <td className="py-3 text-center">Shared Access</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">UK Bank Support</td>
                  <td className="py-3 text-center">All Banks</td>
                  <td className="py-3 text-center">Most Banks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-center font-semibold text-2xl">What Our Users Say</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6">
              <p className="mb-4 text-sm italic">
                "Switched from Emma because I was tired of reconnecting my banks every few months.
                With Eanie Meenie, I just upload when I want to update - so much better!"
              </p>
              <p className="font-semibold text-sm">- Sarah, London</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <p className="mb-4 text-sm italic">
                "I never felt comfortable giving Emma my bank passwords. This CSV import approach
                gives me the same insights without the security worries."
              </p>
              <p className="font-semibold text-sm">- James, Manchester</p>
            </div>
          </div>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <Shield className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-semibold">Your Privacy First</h3>
            <p className="text-muted-foreground text-sm">
              No open banking, no bank passwords, no third-party access
            </p>
          </div>
          <div className="text-center">
            <Upload className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-semibold">Manual Control</h3>
            <p className="text-muted-foreground text-sm">
              You decide when to update your data by uploading statements
            </p>
          </div>
          <div className="text-center">
            <Zap className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-semibold">Instant Analysis</h3>
            <p className="text-muted-foreground text-sm">
              Same powerful insights without the privacy trade-offs
            </p>
          </div>
        </div>

        <div className="mb-12 rounded-lg border bg-card p-8">
          <h2 className="mb-4 font-semibold text-2xl">Making the Switch is Easy</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 font-bold text-primary">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Download your bank statements as CSV</h3>
                <p className="mt-1 text-muted-foreground text-sm">
                  Log into your bank's website or app and export your recent transactions
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 font-bold text-primary">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Create your free Eanie Meanie account</h3>
                <p className="mt-1 text-muted-foreground text-sm">
                  Sign up in seconds - no credit card or bank details needed
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 font-bold text-primary">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Upload and see instant insights</h3>
                <p className="mt-1 text-muted-foreground text-sm">
                  Drag and drop your CSV files to see spending breakdowns immediately
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="mb-4 font-bold text-3xl">Try the Privacy-First Alternative</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Get Emma-level insights without Emma-level access to your bank. Start tracking your
            finances the secure way.
          </p>
          <div className="flex justify-center gap-4">
            <SignUpButton mode="modal">
              <Button size="lg" className="gap-2">
                Start Free - No Bank Login <ArrowRight className="h-4 w-4" />
              </Button>
            </SignUpButton>
            <Link href="/">
              <Button size="lg" variant="outline">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
