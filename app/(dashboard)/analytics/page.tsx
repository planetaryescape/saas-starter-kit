"use client"

import { PieChart, TrendingUp, Calendar, DollarSign, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AnalyticsPage() {
  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Visualize your spending patterns and financial trends
        </p>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="h-4 w-4" />
          This Month
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <div className="rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-2xl font-bold">£0</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold">£0</p>
            </div>
            <CreditCard className="h-8 w-8 text-red-600 opacity-20" />
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Net Savings</p>
              <p className="text-2xl font-bold">£0</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600 opacity-20" />
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Savings Rate</p>
              <p className="text-2xl font-bold">0%</p>
            </div>
            <PieChart className="h-8 w-8 text-purple-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="rounded-lg border border-dashed p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <PieChart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Data to Analyze</h2>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Import your transactions to see spending analytics and insights
          </p>
          <Link href="/import">
            <Button>Import Transactions</Button>
          </Link>
        </div>
      </div>

      {/* Future Features */}
      <div className="mt-8 text-sm text-muted-foreground">
        <p>Coming soon:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
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
