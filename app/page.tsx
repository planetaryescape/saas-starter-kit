"use client"

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import {
  ArrowRight,
  Building2,
  CheckCircle,
  FileText,
  Lock,
  Menu,
  PieChart,
  Shield,
  Star,
  TrendingUp,
  Upload,
  X,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isSignedIn, isLoaded } = useUser()

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Eanie Meanie</span>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              {isSignedIn && (
                <>
                  <Link
                    href="/import"
                    className="font-medium text-sm transition-colors hover:text-primary"
                  >
                    Import
                  </Link>
                  <Link
                    href="/transactions"
                    className="font-medium text-sm transition-colors hover:text-primary"
                  >
                    Transactions
                  </Link>
                  <Link
                    href="/analytics"
                    className="font-medium text-sm transition-colors hover:text-primary"
                  >
                    Analytics
                  </Link>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="outline">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Get Started</Button>
                </SignUpButton>
              </>
            )}

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t bg-background md:hidden">
            <nav className="container flex flex-col gap-2 py-4">
              {isSignedIn && (
                <>
                  <Link
                    href="/import"
                    className="py-2 font-medium text-sm transition-colors hover:text-primary"
                  >
                    Import
                  </Link>
                  <Link
                    href="/transactions"
                    className="py-2 font-medium text-sm transition-colors hover:text-primary"
                  >
                    Transactions
                  </Link>
                  <Link
                    href="/analytics"
                    className="py-2 font-medium text-sm transition-colors hover:text-primary"
                  >
                    Analytics
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      <main>
        {!isLoaded ? (
          <div className="flex h-[60vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : isSignedIn ? (
          <AuthenticatedHome />
        ) : (
          <UnauthenticatedHome />
        )}
      </main>

      <footer className="mt-24 border-t">
        <div className="container py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                © 2025 Eanie Meanie. The privacy-first finance tracker.
              </p>
              <p className="mt-1 text-muted-foreground text-xs">
                No bank passwords. No security risks. Just insights.
              </p>
            </div>
            <div className="flex gap-6 text-muted-foreground text-sm">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="/csv-analyzer" className="hover:text-foreground">
                CSV Guide
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

function AuthenticatedHome() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-4 font-bold text-4xl">Welcome back to Eanie Meanie!</h1>
          <p className="text-muted-foreground text-xl">
            Your privacy-first finance tracker. No bank logins, just insights.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/import" className="group">
            <div className="rounded-lg border bg-card p-6 transition-all hover:scale-105 hover:shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <Upload className="h-8 w-8 text-primary" />
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Import CSV Statements</h3>
              <p className="text-muted-foreground text-sm">
                Drag and drop your bank CSV. Instant categorization.
              </p>
            </div>
          </Link>

          <Link href="/transactions" className="group">
            <div className="rounded-lg border bg-card p-6 transition-all hover:scale-105 hover:shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <FileText className="h-8 w-8 text-primary" />
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">View Transactions</h3>
              <p className="text-muted-foreground text-sm">
                All your spending, perfectly categorized and searchable.
              </p>
            </div>
          </Link>

          <Link href="/analytics" className="group">
            <div className="rounded-lg border bg-card p-6 transition-all hover:scale-105 hover:shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <TrendingUp className="h-8 w-8 text-primary" />
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Spending Analytics</h3>
              <p className="text-muted-foreground text-sm">
                Visual insights into where your money actually goes.
              </p>
            </div>
          </Link>

          <Link href="/transactions" className="group">
            <div className="rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <FileText className="h-8 w-8 text-primary" />
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">View Transactions</h3>
              <p className="text-muted-foreground text-sm">
                Browse and categorize your transactions
              </p>
            </div>
          </Link>

          <Link href="/analytics" className="group">
            <div className="rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <PieChart className="h-8 w-8 text-primary" />
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Analytics</h3>
              <p className="text-muted-foreground text-sm">Visualize your spending patterns</p>
            </div>
          </Link>
        </div>

        <div className="mt-12 rounded-lg border border-primary/20 bg-primary/5 p-8">
          <h2 className="mb-4 font-semibold text-2xl">Your Financial Privacy Dashboard</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-muted-foreground text-sm">Bank Passwords Shared</p>
              <p className="font-bold text-2xl text-green-600">0</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Security Risks</p>
              <p className="font-bold text-2xl text-green-600">None</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">CSV Imports Ready</p>
              <p className="font-bold text-2xl text-primary">Unlimited</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function UnauthenticatedHome() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            {/* Trust Indicator */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-medium text-primary text-sm">
              <Shield className="h-4 w-4" />
              Join 500+ people who track finances privately
            </div>

            <h1 className="mb-6 font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl">
              Analyze Your Spending Without
              <span className="mt-2 block text-primary">Sharing Bank Passwords</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-xl">
              Import CSV bank statements. See spending insights in 5 minutes. Keep your banking
              credentials private.
            </p>

            <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
              <SignUpButton mode="modal">
                <Button size="lg" className="gap-2 px-8 text-lg">
                  Start Free - No Bank Login <ArrowRight className="h-5 w-5" />
                </Button>
              </SignUpButton>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="gap-2">
                  See How It Works
                </Button>
              </Link>
            </div>

            <p className="text-muted-foreground text-sm">
              No credit card required • Works with all UK banks • 100% private
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="-z-10 absolute inset-0 h-full w-full bg-white dark:bg-black">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>
        </div>
      </section>

      {/* Problem Agitation Section */}
      <section className="bg-muted/50 py-16">
        <div className="container max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">
              Tired of Finance Apps Asking for Your Bank Password?
            </h2>
            <p className="text-lg text-muted-foreground">
              Sick of re-connecting accounts every 90 days? There's a smarter way.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border bg-background p-6">
              <div className="mb-4 flex items-center gap-2">
                <X className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-red-600">The Old Way</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                  <span>Share bank passwords with third-party apps</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                  <span>Re-authenticate every 90 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                  <span>Trust apps with full account access</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                  <span>Worry about data breaches</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-600">The Eanie Meanie Way</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>Upload CSV statements you already download</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>Never share banking credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>Update when you want, not when forced</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>Sleep soundly knowing your bank is secure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="container max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">Simple, Private, Powerful</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to understand your spending, nothing you don't
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-lg">Your Bank Passwords Stay Private</h3>
              <p className="text-muted-foreground text-sm">
                No open banking. No third-party access. No security worries.
              </p>
              <p className="mt-2 font-medium text-primary text-sm">
                So you can track spending without the anxiety
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-lg">From CSV to Insights in 5 Minutes</h3>
              <p className="text-muted-foreground text-sm">
                Upload any UK bank statement. See instant spending breakdowns.
              </p>
              <p className="mt-2 font-medium text-primary text-sm">
                So you can understand your finances immediately
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-lg">Works With Every UK Bank</h3>
              <p className="text-muted-foreground text-sm">
                Monzo, Barclays, HSBC, Lloyds - if they export CSV, we analyze it.
              </p>
              <p className="mt-2 font-medium text-primary text-sm">
                So you can consolidate all accounts in one place
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">Privacy-Conscious People Love Eanie Meanie</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-3 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-4 text-sm">
                "Finally, a finance tracker that doesn't need my bank password. Uploaded 3 months of
                statements in minutes. The insights were instant and actually useful."
              </p>
              <p className="font-medium text-sm">Sarah K., London</p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="mb-3 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-4 text-sm">
                "I was nervous about connecting my bank to apps after the Mint shutdown. This is
                perfect - I stay in control of my data and still get great insights."
              </p>
              <p className="font-medium text-sm">James M., Manchester</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">From CSV to Insights in 5 Minutes</h2>
            <p className="text-lg text-muted-foreground">
              Works with every UK bank that offers CSV exports. That's all of them.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-lg text-primary-foreground">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-semibold text-lg">Download Your Bank Statement</h3>
                <p className="text-muted-foreground">
                  Log into your bank (Monzo, Barclays, HSBC, any UK bank) and download your
                  statement as CSV. You probably do this already for record-keeping.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-lg text-primary-foreground">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-semibold text-lg">Drag & Drop Into Eanie Meanie</h3>
                <p className="text-muted-foreground">
                  Upload your CSV file with one click. We instantly categorize every transaction
                  using smart pattern recognition. No manual sorting needed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-lg text-primary-foreground">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-semibold text-lg">See Where Your Money Goes</h3>
                <p className="text-muted-foreground">
                  Instant spending breakdowns, trends over time, and actionable insights. Finally
                  understand your finances without the complexity.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="gap-2">
                Try It Free Now <ArrowRight className="h-5 w-5" />
              </Button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* Supported Banks Section */}
      <section className="bg-muted/50 py-20">
        <div className="container max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">Works With All UK Banks</h2>
            <p className="text-lg text-muted-foreground">
              If your bank offers CSV export (they all do), we support it
            </p>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {["Monzo", "Barclays", "HSBC", "Lloyds", "NatWest", "Santander", "Halifax", "TSB"].map(
              (bank) => (
                <div key={bank} className="flex flex-col items-center">
                  <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-lg border bg-background">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-sm">{bank}</span>
                </div>
              ),
            )}
          </div>

          <p className="text-center text-muted-foreground text-sm">
            Plus Revolut, Starling, First Direct, RBS, and every other UK bank
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Start free. Upgrade when you need more.</p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-semibold text-lg">Free Forever</h3>
              <p className="mb-4 font-bold text-3xl">
                £0<span className="font-normal text-base text-muted-foreground">/month</span>
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Unlimited CSV imports
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Auto-categorization
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Basic spending reports
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Last 3 months of data
                </li>
              </ul>
              <SignUpButton mode="modal">
                <Button className="w-full" variant="outline">
                  Start Free
                </Button>
              </SignUpButton>
            </div>

            <div className="relative rounded-lg border-2 border-primary p-6">
              <div className="-top-3 -translate-x-1/2 absolute left-1/2 rounded-full bg-primary px-3 py-1 font-medium text-primary-foreground text-xs">
                MOST POPULAR
              </div>
              <h3 className="mb-2 font-semibold text-lg">Pro</h3>
              <p className="mb-4 font-bold text-3xl">
                £4.99<span className="font-normal text-base text-muted-foreground">/month</span>
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Everything in Free
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Unlimited history
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Export reports
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Multiple accounts
                </li>
              </ul>
              <SignUpButton mode="modal">
                <Button className="w-full">Get Pro</Button>
              </SignUpButton>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-semibold text-lg">Business</h3>
              <p className="mb-4 font-bold text-3xl">
                £14.99<span className="font-normal text-base text-muted-foreground">/month</span>
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Everything in Pro
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Team collaboration
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  API access
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Priority support
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Custom categories
                </li>
              </ul>
              <SignUpButton mode="modal">
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 py-20">
        <div className="container max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-background p-6">
              <h3 className="mb-2 font-semibold">
                How is this different from Emma, Mint, or YNAB?
              </h3>
              <p className="text-muted-foreground text-sm">
                We never ask for bank passwords. You upload CSV statements when you want to update.
                No expired connections, no security risks, no complex methodologies. Just simple
                spending insights.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-6">
              <h3 className="mb-2 font-semibold">Is my data safe without open banking?</h3>
              <p className="text-muted-foreground text-sm">
                Even safer. Your bank credentials never leave your bank. We only see transaction
                data you explicitly share via CSV. No third-party can access your account through
                our app.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-6">
              <h3 className="mb-2 font-semibold">Which banks do you support?</h3>
              <p className="text-muted-foreground text-sm">
                All UK banks that offer CSV export - which is every single one. Monzo, Barclays,
                HSBC, Lloyds, NatWest, Santander, Halifax, TSB, Revolut, Starling, and more.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-6">
              <h3 className="mb-2 font-semibold">How often do I need to upload statements?</h3>
              <p className="text-muted-foreground text-sm">
                Whenever you want fresh insights. Most users upload monthly when they download
                statements for record-keeping. There's no forced schedule or expired connections to
                worry about.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-6">
              <h3 className="mb-2 font-semibold">Can I try it before paying?</h3>
              <p className="text-muted-foreground text-sm">
                Yes! The free plan lets you import unlimited CSV files and see basic spending
                reports. Upgrade to Pro only when you need advanced analytics and unlimited history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24">
        <div className="container max-w-3xl text-center">
          <h2 className="mb-6 font-bold text-4xl">Stop Sharing Bank Passwords With Apps</h2>
          <p className="mb-8 text-muted-foreground text-xl">
            Start understanding your spending today. No bank login required.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" className="gap-2 px-8 text-lg">
              Start Free - Upload Your First CSV <ArrowRight className="h-5 w-5" />
            </Button>
          </SignUpButton>
          <p className="mt-4 text-muted-foreground text-sm">
            No credit card • No bank login • Just insights
          </p>
        </div>
      </section>
    </>
  )
}
