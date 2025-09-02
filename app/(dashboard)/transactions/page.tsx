"use client"

import { Calendar, FileText, Filter, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TransactionsPage() {
  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="font-bold text-3xl">Transactions</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage all your financial transactions
        </p>
      </div>

      {/* Filters Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <div className="relative">
            <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full rounded-md border bg-background py-2 pr-3 pl-10 text-sm"
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
          <div className="mb-4 rounded-full bg-muted p-3">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="mb-2 font-semibold text-xl">No Transactions Yet</h2>
          <p className="mb-6 max-w-sm text-muted-foreground">
            Import your bank statement to see your transactions here
          </p>
          <Link href="/import">
            <Button>Import Transactions</Button>
          </Link>
        </div>
      </div>

      {/* Table will go here once transactions are imported */}
      <div className="mt-8 text-muted-foreground text-sm">
        <p>Once you import transactions, you'll be able to:</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Search and filter transactions</li>
          <li>Categorize transactions</li>
          <li>Add notes and tags</li>
          <li>Export your data</li>
        </ul>
      </div>
    </div>
  )
}
