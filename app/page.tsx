"use client"

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Authenticated, Unauthenticated } from "convex/react"
import Link from "next/link"
import {
  ArrowRight,
  Upload,
  PieChart,
  Shield,
  Zap,
  FileText,
  TrendingUp,
  CreditCard,
  CheckCircle,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">FinanceTracker</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Authenticated>
                <Link
                  href="/import"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Import
                </Link>
                <Link
                  href="/transactions"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Transactions
                </Link>
                <Link
                  href="/analytics"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Analytics
                </Link>
              </Authenticated>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Authenticated>
              <UserButton />
            </Authenticated>
            <Unauthenticated>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Get Started</Button>
              </SignUpButton>
            </Unauthenticated>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="container py-4 flex flex-col gap-2">
              <Authenticated>
                <Link
                  href="/import"
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Import
                </Link>
                <Link
                  href="/transactions"
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Transactions
                </Link>
                <Link
                  href="/analytics"
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Analytics
                </Link>
              </Authenticated>
            </nav>
          </div>
        )}
      </header>

      <main>
        <Authenticated>
          <AuthenticatedHome />
        </Authenticated>
        <Unauthenticated>
          <UnauthenticatedHome />
        </Unauthenticated>
      </main>

      <footer className="border-t mt-24">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 FinanceTracker. Track your money, master your future.</p>
        </div>
      </footer>
    </>
  )
}

function AuthenticatedHome() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Ready to take control of your finances?
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/import" className="group">
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <Upload className="h-8 w-8 text-primary" />
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-semibold mb-2">Import Transactions</h3>
              <p className="text-sm text-muted-foreground">
                Upload your bank statement CSV to get started
              </p>
            </div>
          </Link>

          <Link href="/transactions" className="group">
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <FileText className="h-8 w-8 text-primary" />
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-semibold mb-2">View Transactions</h3>
              <p className="text-sm text-muted-foreground">
                Browse and categorize your transactions
              </p>
            </div>
          </Link>

          <Link href="/analytics" className="group">
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <PieChart className="h-8 w-8 text-primary" />
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground">Visualize your spending patterns</p>
            </div>
          </Link>
        </div>

        <div className="mt-12 rounded-lg bg-primary/5 border border-primary/20 p-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">Coming Soon</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Import</p>
              <p className="text-2xl font-bold">-</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Transactions</p>
              <p className="text-2xl font-bold">0</p>
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
      <section className="relative overflow-hidden">
        <div className="container py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Take Control of Your
              <span className="text-primary"> Financial Future</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Import your bank statements, track spending patterns, and make smarter financial
              decisions. No manual entry required.
            </p>
            <div className="flex gap-4 justify-center">
              <SignUpButton mode="modal">
                <Button size="lg" className="gap-2">
                  Start Free <ArrowRight className="h-4 w-4" />
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </SignInButton>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to Track Your Money</h2>
          <p className="text-lg text-muted-foreground">
            Simple, powerful tools to understand your finances
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">CSV Import</h3>
            <p className="text-sm text-muted-foreground">
              Import transactions from Monzo, Barclays, and other major UK banks
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Duplicate Detection</h3>
            <p className="text-sm text-muted-foreground">
              Smart deduplication prevents double-counting transactions
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Auto-Categorization</h3>
            <p className="text-sm text-muted-foreground">
              Transactions are automatically categorized for instant insights
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <PieChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Visual Analytics</h3>
            <p className="text-sm text-muted-foreground">
              See where your money goes with beautiful charts and reports
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Multi-Account</h3>
            <p className="text-sm text-muted-foreground">
              Track multiple bank accounts and credit cards in one place
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Spending Trends</h3>
            <p className="text-sm text-muted-foreground">
              Identify patterns and optimize your spending habits
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="container py-24 border-t">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get Started in 3 Simple Steps</h2>
          <p className="text-lg text-muted-foreground">
            From signup to insights in under 5 minutes
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Create Your Account</h3>
                <p className="text-muted-foreground">
                  Sign up for free with your email or Google account. No credit card required.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Import Your Bank Statement</h3>
                <p className="text-muted-foreground">
                  Download a CSV from your bank and upload it. We'll handle the rest automatically.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">View Your Insights</h3>
                <p className="text-muted-foreground">
                  Instantly see spending breakdowns, trends, and actionable insights about your
                  finances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Banks Section */}
      <section className="container py-24 border-t">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Works With Your Bank</h2>
          <p className="text-lg text-muted-foreground">
            Supporting major UK banks with more coming soon
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center mb-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <span className="text-sm font-medium">Monzo</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center mb-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <span className="text-sm font-medium">Barclays</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center mb-2">
                <span className="text-xs text-muted-foreground">Soon</span>
              </div>
              <span className="text-sm font-medium">HSBC</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center mb-2">
                <span className="text-xs text-muted-foreground">Soon</span>
              </div>
              <span className="text-sm font-medium">Lloyds</span>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't see your bank? Request support and we'll add it!
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24 border-t">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who are already tracking their money smarter. Start for free, no
            credit card required.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" className="gap-2">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </SignUpButton>
        </div>
      </section>
    </>
  )
}
