"use client"

import { FileText, Search, Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TransactionsPage() {
  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-muted-foreground mt-2">
          View and manage all your financial transactions
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full rounded-md border bg-background pl-10 pr-3 py-2 text-sm"
            />
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="h-4 w-4" />
          Date Range
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Empty State */}
      <div className="rounded-lg border border-dashed p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Transactions Yet</h2>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Import your bank statement to see your transactions here
          </p>
          <Link href="/import">
            <Button>Import Transactions</Button>
          </Link>
        </div>
      </div>

      {/* Table will go here once transactions are imported */}
      <div className="mt-8 text-sm text-muted-foreground">
        <p>Once you import transactions, you'll be able to:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Search and filter transactions</li>
          <li>Categorize transactions</li>
          <li>Add notes and tags</li>
          <li>Export your data</li>
        </ul>
      </div>
    </div>
  )
}
