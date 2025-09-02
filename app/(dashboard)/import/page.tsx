"use client"

import { ImportWizard } from "@/components/finance/import-wizard"

export default function ImportPage() {
  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="font-bold text-3xl">Import Transactions</h1>
        <p className="mt-2 text-muted-foreground">
          Upload your bank statement CSV to import transactions
        </p>
      </div>

      <ImportWizard />
    </div>
  )
}
