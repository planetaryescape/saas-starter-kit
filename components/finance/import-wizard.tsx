"use client"

import { useMutation, useQuery } from "convex/react"
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  CreditCard,
  FileText,
  Loader2,
  Upload,
  XCircle,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { type ParseResult, parseCSV } from "@/lib/finance/parsers"
import { cn } from "@/lib/utils"

type Step = "upload" | "account" | "preview" | "importing" | "complete"

export function ImportWizard() {
  const [step, setStep] = useState<Step>("upload")
  const [file, setFile] = useState<File | null>(null)
  const [csvContent, setCsvContent] = useState<string>("")
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [selectedAccountId, setSelectedAccountId] = useState<string>("")
  const [importResult, setImportResult] = useState<{
    success: boolean
    importedCount: number
    duplicateCount: number
    errorCount: number
    errors: string[]
  } | null>(null)

  const accounts = useQuery(api.accounts.listAccounts)
  const processImport = useMutation(api.imports.processImportCSV)
  const createAccount = useMutation(api.accounts.createAccount)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFile(file)

    const reader = new FileReader()
    reader.onload = async (event) => {
      const content = event.target?.result as string
      setCsvContent(content)

      // Parse CSV to preview
      const result = parseCSV(content)
      setParseResult(result)

      if (result.success) {
        setStep("account")
      }
    }
    reader.readAsText(file)
  }

  const handleImport = async () => {
    if (!file || !csvContent || !selectedAccountId) return

    setStep("importing")

    try {
      const result = await processImport({
        accountId: selectedAccountId as any,
        csvContent,
        fileName: file.name,
      })

      setImportResult(result)
      setStep("complete")
    } catch (error) {
      console.error("Import error:", error)
      setImportResult({
        success: false,
        importedCount: 0,
        duplicateCount: 0,
        errorCount: 1,
        errors: [error instanceof Error ? error.message : "Import failed"],
      })
      setStep("complete")
    }
  }

  const handleCreateAccount = async () => {
    const name = prompt("Enter account name (e.g., 'Monzo Current')")
    if (!name) return

    try {
      const accountId = await createAccount({
        name,
        type: "current",
        currency: "GBP",
        bankName: parseResult?.bankType,
      })

      setSelectedAccountId(accountId)
    } catch (error) {
      console.error("Error creating account:", error)
      alert("Failed to create account")
    }
  }

  const reset = () => {
    setStep("upload")
    setFile(null)
    setCsvContent("")
    setParseResult(null)
    setSelectedAccountId("")
    setImportResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {["upload", "account", "preview", "complete"].map((s, i) => {
          const isActive =
            step === s ||
            (s === "preview" && step === "importing") ||
            ["upload", "account", "preview"].indexOf(s) <
              ["upload", "account", "preview", "importing", "complete"].indexOf(step)

          return (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/20 text-muted-foreground",
                )}
              >
                {i + 1}
              </div>
              {i < 3 && <ChevronRight className="mx-2 h-5 w-5 text-muted-foreground" />}
            </div>
          )
        })}
      </div>

      {/* Upload Step */}
      {step === "upload" && (
        <div className="rounded-lg border-2 border-muted-foreground/25 border-dashed p-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Upload className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <p className="font-medium text-lg">Upload Bank Statement CSV</p>
              <p className="mt-1 text-muted-foreground text-sm">
                Supported banks: Monzo, Barclays, and more
              </p>
            </div>
            <label htmlFor="file-upload">
              <input
                id="file-upload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button asChild>
                <span>Choose File</span>
              </Button>
            </label>
          </div>
        </div>
      )}

      {/* Account Selection Step */}
      {step === "account" && parseResult && (
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span className="font-medium">{file?.name}</span>
            </div>
            <div className="mt-2 text-muted-foreground text-sm">
              <p>Bank: {parseResult.bankType}</p>
              <p>Transactions: {parseResult.transactions.length}</p>
              {parseResult.dateRange && (
                <p>
                  Date range: {parseResult.dateRange.start} to {parseResult.dateRange.end}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Select Account</h3>
            <p className="text-muted-foreground text-sm">
              Choose which account to import these transactions into
            </p>

            {accounts && accounts.length > 0 ? (
              <div className="space-y-2">
                {accounts.map((account) => (
                  <button
                    key={account._id}
                    onClick={() => setSelectedAccountId(account._id)}
                    className={cn(
                      "w-full rounded-lg border p-4 text-left transition-colors",
                      selectedAccountId === account._id
                        ? "border-primary bg-primary/10"
                        : "border-muted-foreground/25 hover:border-muted-foreground/50",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {account.bankName && `${account.bankName} • `}
                          {account.type} • {account.currency}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-6 text-center">
                <p className="text-muted-foreground">No accounts found</p>
                <Button onClick={handleCreateAccount} className="mt-4">
                  Create New Account
                </Button>
              </div>
            )}

            {accounts && accounts.length > 0 && (
              <Button variant="outline" onClick={handleCreateAccount} className="w-full">
                Create New Account
              </Button>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("upload")}>
                Back
              </Button>
              <Button
                onClick={() => setStep("preview")}
                disabled={!selectedAccountId}
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Step */}
      {step === "preview" && parseResult && (
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="mb-3 font-medium">Import Preview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total transactions:</span>
                <span className="font-medium">{parseResult.transactions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date range:</span>
                <span className="font-medium">
                  {parseResult.dateRange?.start} to {parseResult.dateRange?.end}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Currency:</span>
                <span className="font-medium">{parseResult.currency}</span>
              </div>
            </div>
          </div>

          {/* Sample transactions */}
          <div className="rounded-lg border">
            <div className="border-b bg-muted/50 px-4 py-2">
              <h4 className="font-medium text-sm">Sample Transactions (first 5)</h4>
            </div>
            <div className="divide-y">
              {parseResult.transactions.slice(0, 5).map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 text-sm">
                  <div>
                    <p className="font-medium">{t.merchant || t.description}</p>
                    <p className="text-muted-foreground">{t.date}</p>
                  </div>
                  <span
                    className={cn("font-medium", t.amount >= 0 ? "text-green-600" : "text-red-600")}
                  >
                    {t.amount >= 0 ? "+" : ""}£{Math.abs(t.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep("account")}>
              Back
            </Button>
            <Button onClick={handleImport} className="flex-1">
              Import {parseResult.transactions.length} Transactions
            </Button>
          </div>
        </div>
      )}

      {/* Importing Step */}
      {step === "importing" && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 font-medium text-lg">Importing transactions...</p>
          <p className="text-muted-foreground text-sm">This may take a few moments</p>
        </div>
      )}

      {/* Complete Step */}
      {step === "complete" && importResult && (
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center py-8">
            {importResult.success ? (
              <>
                <CheckCircle className="h-16 w-16 text-green-600" />
                <h3 className="mt-4 font-semibold text-xl">Import Complete!</h3>
              </>
            ) : (
              <>
                <XCircle className="h-16 w-16 text-red-600" />
                <h3 className="mt-4 font-semibold text-xl">Import Failed</h3>
              </>
            )}
          </div>

          <div className="rounded-lg border p-4">
            <h4 className="mb-3 font-medium">Import Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Imported:</span>
                <span className="font-medium text-green-600">
                  {importResult.importedCount} transactions
                </span>
              </div>
              {importResult.duplicateCount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duplicates skipped:</span>
                  <span className="font-medium text-yellow-600">
                    {importResult.duplicateCount} transactions
                  </span>
                </div>
              )}
              {importResult.errorCount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Errors:</span>
                  <span className="font-medium text-red-600">
                    {importResult.errorCount} transactions
                  </span>
                </div>
              )}
            </div>
          </div>

          {importResult.errors.length > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-900">Import Errors</h4>
                  <ul className="mt-2 space-y-1 text-red-800 text-sm">
                    {importResult.errors.slice(0, 5).map((error, i) => (
                      <li key={i}>• {error}</li>
                    ))}
                    {importResult.errors.length > 5 && (
                      <li>• ... and {importResult.errors.length - 5} more</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={reset} variant="outline">
              Import Another File
            </Button>
            <Button onClick={() => (window.location.href = "/")} className="flex-1">
              View Transactions
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
