import { SignUpButton } from "@clerk/nextjs"
import { ArrowRight, CheckCircle, Lock, Shield, Upload, X } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Mint Alternative Without Bank Login - UK Personal Finance Tracker | Eanie Meanie",
  description:
    "Looking for a Mint alternative in the UK? Eanie Meanie lets you track spending with CSV import. No bank passwords needed. Works with all UK banks. Try free.",
  keywords: [
    "mint alternative uk",
    "mint alternative without bank connection",
    "mint alternative csv import",
    "personal finance app like mint",
    "mint replacement uk",
    "budgeting app without bank login",
  ],
  openGraph: {
    title: "Mint Alternative for UK - Track Finances Without Bank Login",
    description:
      "The privacy-first Mint alternative. Import CSV bank statements instead of sharing passwords.",
  },
}

export default function MintAlternativePage() {
  return (
    <main className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold text-4xl">
            The <span className="text-primary">Mint Alternative</span> That Respects Your Privacy
          </h1>
          <p className="text-muted-foreground text-xl">
            Track spending without sharing bank passwords. Import CSV statements from any UK bank.
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-semibold text-2xl">Why People Leave Mint</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                <span>Requires bank login credentials</span>
              </li>
              <li className="flex gap-3">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                <span>Limited UK bank support</span>
              </li>
              <li className="flex gap-3">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                <span>Privacy concerns with data sharing</span>
              </li>
              <li className="flex gap-3">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                <span>Connection errors and sync issues</span>
              </li>
              <li className="flex gap-3">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                <span>Overwhelming ads and upsells</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-2xl">Why Choose Eanie Meanie</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <span>No bank login ever required</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <span>Works with all UK banks via CSV</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <span>Your data stays private</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <span>No sync errors - you control updates</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <span>Clean, ad-free experience</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-16 rounded-lg bg-primary/5 p-8">
          <h2 className="mb-6 text-center font-semibold text-2xl">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left">Feature</th>
                  <th className="py-3 text-center">Eanie Meanie</th>
                  <th className="py-3 text-center">Mint</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Bank Login Required</td>
                  <td className="py-3 text-center">
                    <X className="mx-auto h-5 w-5 text-green-600" />
                  </td>
                  <td className="py-3 text-center">
                    <CheckCircle className="mx-auto h-5 w-5 text-red-500" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">CSV Import</td>
                  <td className="py-3 text-center">
                    <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                  </td>
                  <td className="py-3 text-center">
                    <X className="mx-auto h-5 w-5 text-gray-400" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">UK Banks Support</td>
                  <td className="py-3 text-center">All Banks</td>
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
                  <td className="py-3">Privacy-First</td>
                  <td className="py-3 text-center">
                    <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                  </td>
                  <td className="py-3 text-center">
                    <X className="mx-auto h-5 w-5 text-gray-400" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Free Plan</td>
                  <td className="py-3 text-center">
                    <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                  </td>
                  <td className="py-3 text-center">
                    <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">No Ads</td>
                  <td className="py-3 text-center">
                    <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                  </td>
                  <td className="py-3 text-center">
                    <X className="mx-auto h-5 w-5 text-gray-400" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <Shield className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-semibold">Bank-Level Security</h3>
            <p className="text-muted-foreground text-sm">
              Your data is encrypted and secure, without ever sharing bank passwords
            </p>
          </div>
          <div className="text-center">
            <Upload className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-semibold">Simple CSV Import</h3>
            <p className="text-muted-foreground text-sm">
              Upload statements from any UK bank in seconds
            </p>
          </div>
          <div className="text-center">
            <Lock className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-semibold">You Own Your Data</h3>
            <p className="text-muted-foreground text-sm">
              Export or delete your data anytime. No vendor lock-in
            </p>
          </div>
        </div>

        <div className="mb-12 rounded-lg border bg-card p-8">
          <h2 className="mb-4 font-semibold text-2xl">How to Switch from Mint</h2>
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                1
              </span>
              <div>
                <strong>Export your data from Mint</strong>
                <p className="mt-1 text-muted-foreground text-sm">
                  Download your transaction history as CSV from Mint (if available)
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                2
              </span>
              <div>
                <strong>Sign up for Eanie Meanie</strong>
                <p className="mt-1 text-muted-foreground text-sm">
                  Create your free account - no credit card needed
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                3
              </span>
              <div>
                <strong>Import your bank statements</strong>
                <p className="mt-1 text-muted-foreground text-sm">
                  Upload CSV files from your banks directly
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                4
              </span>
              <div>
                <strong>Start tracking privately</strong>
                <p className="mt-1 text-muted-foreground text-sm">
                  View insights without ever sharing bank passwords
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="text-center">
          <h2 className="mb-4 font-bold text-3xl">Ready to Switch?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands who've ditched bank connections for CSV imports. Track your finances the
            private way.
          </p>
          <div className="flex justify-center gap-4">
            <SignUpButton mode="modal">
              <Button size="lg" className="gap-2">
                Try Eanie Meanie Free <ArrowRight className="h-4 w-4" />
              </Button>
            </SignUpButton>
            <Link href="/">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
