"use client"

import { Calendar, CreditCard, DollarSign, PieChart, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AnalyticsPage() {
  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="font-bold text-3xl">Analytics</h1>
        <p className="mt-2 text-muted-foreground">
          Visualize your spending patterns and financial trends
        </p>
      </div>

      {/* Date Range Selector */}
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="h-4 w-4" />
          This Month
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Income</p>
              <p className="font-bold text-2xl">£0</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Expenses</p>
              <p className="font-bold text-2xl">£0</p>
            </div>
            <CreditCard className="h-8 w-8 text-red-600 opacity-20" />
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Net Savings</p>
              <p className="font-bold text-2xl">£0</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600 opacity-20" />
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Savings Rate</p>
              <p className="font-bold text-2xl">0%</p>
            </div>
            <PieChart className="h-8 w-8 text-purple-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="rounded-lg border border-dashed p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-muted p-3">
            <PieChart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="mb-2 font-semibold text-xl">No Data to Analyze</h2>
          <p className="mb-6 max-w-sm text-muted-foreground">
            Import your transactions to see spending analytics and insights
          </p>
          <Link href="/import">
            <Button>Import Transactions</Button>
          </Link>
        </div>
      </div>

      {/* Future Features */}
      <div className="mt-8 text-muted-foreground text-sm">
        <p>Coming soon:</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Spending by category charts</li>
          <li>Monthly trends and comparisons</li>
          <li>Budget tracking and alerts</li>
          <li>Savings goals progress</li>
          <li>Detailed financial reports</li>
        </ul>
      </div>
    </div>
  )
}
