"use client"

import { ImportWizard } from "@/components/finance/import-wizard"

export default function ImportPage() {
  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Import Transactions</h1>
        <p className="text-muted-foreground mt-2">
          Upload your bank statement CSV to import transactions
        </p>
      </div>

      <ImportWizard />
    </div>
  )
}
