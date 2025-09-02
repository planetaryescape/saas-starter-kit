import { SignUpButton } from "@clerk/nextjs"
import { ArrowRight, CheckCircle, PieChart, Shield, Upload, Zap } from "lucide-react"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "CSV Bank Statement Analyzer - Free Online Tool | Eanie Meanie",
  description:
    "Analyze CSV bank statements instantly. Upload statements from any UK bank for automatic categorization and spending insights. No bank login needed. Free tool.",
  keywords: [
    "csv bank statement analyzer",
    "analyze bank statement csv",
    "csv transaction analyzer",
    "bank statement csv reader",
    "csv financial analyzer",
    "bank csv import tool",
  ],
  openGraph: {
    title: "Free CSV Bank Statement Analyzer - Upload & Analyze Instantly",
    description: "Turn your CSV bank statements into spending insights. Works with all UK banks.",
  },
}

export default function CSVAnalyzerPage() {
  return (
    <main>
      <section className="container py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-bold text-4xl">CSV Bank Statement Analyzer</h1>
          <p className="mb-8 text-muted-foreground text-xl">
            Upload your bank statement CSV and get instant spending insights. Works with Monzo,
            Barclays, HSBC, Lloyds, and all UK banks.
          </p>
          <div className="mb-12 flex justify-center gap-4">
            <SignUpButton mode="modal">
              <Button size="lg" className="gap-2">
                Analyze Your CSV Free <ArrowRight className="h-4 w-4" />
              </Button>
            </SignUpButton>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Upload CSV</h3>
              <p className="text-muted-foreground text-sm">
                Drag & drop your bank statement CSV file
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Auto-Analyze</h3>
              <p className="text-muted-foreground text-sm">
                Transactions categorized automatically
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <PieChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">View Insights</h3>
              <p className="text-muted-foreground text-sm">See spending breakdowns and trends</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container border-t py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-bold text-3xl">
            What is a CSV Bank Statement Analyzer?
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">
            A CSV bank statement analyzer is a tool that reads your downloaded bank statements in
            CSV (Comma-Separated Values) format and automatically processes them to provide
            financial insights. Unlike traditional banking apps that require you to share your login
            credentials, a CSV analyzer works with the files you export from your bank, keeping your
            passwords completely private.
          </p>
          <p className="mb-8 text-lg text-muted-foreground">
            Eanie Meanie's CSV analyzer automatically categorizes your transactions, detects
            spending patterns, and generates visual reports - all without requiring access to your
            bank account.
          </p>

          <h3 className="mb-4 font-semibold text-2xl">How Our CSV Analyzer Works</h3>
          <ol className="mb-8 space-y-4">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-sm">
                1
              </span>
              <div>
                <strong>Export your bank statement as CSV</strong>
                <p className="mt-1 text-muted-foreground text-sm">
                  Log into your bank's website or mobile app and download your recent transactions
                  in CSV format
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-sm">
                2
              </span>
              <div>
                <strong>Upload to Eanie Meanie</strong>
                <p className="mt-1 text-muted-foreground text-sm">
                  Simply drag and drop your CSV file or click to browse and select it
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-sm">
                3
              </span>
              <div>
                <strong>Automatic analysis begins</strong>
                <p className="mt-1 text-muted-foreground text-sm">
                  Our analyzer reads your transactions, categorizes them, and identifies patterns
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-sm">
                4
              </span>
              <div>
                <strong>View your insights</strong>
                <p className="mt-1 text-muted-foreground text-sm">
                  See spending breakdowns by category, trends over time, and actionable insights
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="container border-t py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-bold text-3xl">CSV Analyzer Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="font-semibold">Automatic Transaction Categorization</h3>
                  <p className="mt-1 text-muted-foreground text-sm">
                    AI-powered categorization sorts transactions into groceries, transport,
                    entertainment, etc.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="font-semibold">Duplicate Detection</h3>
                  <p className="mt-1 text-muted-foreground text-sm">
                    Smart algorithms prevent double-counting when importing multiple statements
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="font-semibold">Multi-Bank Support</h3>
                  <p className="mt-1 text-muted-foreground text-sm">
                    Works with CSV exports from all major UK banks
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="font-semibold">Spending Trends</h3>
                  <p className="mt-1 text-muted-foreground text-sm">
                    Track how your spending changes over time
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="font-semibold">Visual Charts & Reports</h3>
                  <p className="mt-1 text-muted-foreground text-sm">
                    Beautiful pie charts, bar graphs, and trend lines for easy understanding
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="font-semibold">Custom Categories</h3>
                  <p className="mt-1 text-muted-foreground text-sm">
                    Create your own categories and rules for personalized tracking
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="font-semibold">Export Analysis Results</h3>
                  <p className="mt-1 text-muted-foreground text-sm">
                    Download your categorized data and reports as CSV or PDF
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="font-semibold">Secure & Private</h3>
                  <p className="mt-1 text-muted-foreground text-sm">
                    No bank login required, encrypted storage, delete anytime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container border-t py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-bold text-3xl">Supported UK Banks</h2>
          <p className="mb-8 text-center text-lg text-muted-foreground">
            Our CSV analyzer works with statements from all these banks and more:
          </p>
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              "Monzo",
              "Barclays",
              "HSBC",
              "Lloyds",
              "NatWest",
              "Santander",
              "Halifax",
              "Nationwide",
              "TSB",
              "Royal Bank of Scotland",
              "Metro Bank",
              "Starling",
              "Revolut",
              "First Direct",
              "Co-op Bank",
              "Virgin Money",
            ].map((bank) => (
              <div key={bank} className="rounded-lg bg-muted p-3 text-center">
                <span className="font-medium text-sm">{bank}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm">
            Don't see your bank? Our analyzer works with any standard CSV format. Try it free!
          </p>
        </div>
      </section>

      <section className="container border-t py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Shield className="mx-auto mb-6 h-16 w-16 text-primary" />
          <h2 className="mb-4 font-bold text-3xl">Why Choose CSV Analysis Over Bank Connection?</h2>
          <div className="mx-auto mb-8 max-w-2xl space-y-4 text-left">
            <div className="flex gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
              <p>
                <strong>Complete Privacy:</strong> Never share your bank login credentials
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
              <p>
                <strong>Full Control:</strong> You decide when and what data to share
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
              <p>
                <strong>No Expiry:</strong> No need to reconnect every 90 days like open banking
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
              <p>
                <strong>Universal Support:</strong> Works with any bank that provides CSV exports
              </p>
            </div>
          </div>
          <SignUpButton mode="modal">
            <Button size="lg" className="gap-2">
              Start Analyzing Your CSV <ArrowRight className="h-4 w-4" />
            </Button>
          </SignUpButton>
        </div>
      </section>
    </main>
  )
}
