# API Reference

## Convex Functions

### Transactions

#### `transactions.create`
Create a new transaction.

```typescript
mutation({
  args: {
    accountId: v.id("accounts"),
    amount: v.number(),        // Minor units (pence)
    currency: v.string(),
    merchant: v.string(),
    description: v.optional(v.string()),
    date: v.number(),          // Epoch milliseconds
    categoryId: v.optional(v.id("categories")),
    tags: v.optional(v.array(v.string()))
  },
  returns: v.object({
    duplicate: v.boolean(),
    id: v.id("transactions")
  })
})
```

#### `transactions.list`
List transactions with filters.

```typescript
query({
  args: {
    accountId: v.optional(v.id("accounts")),
    categoryId: v.optional(v.id("categories")),
    dateFrom: v.optional(v.number()),
    dateTo: v.optional(v.number()),
    paginationOpts: paginationOptsValidator
  },
  returns: v.object({
    page: v.array(TransactionSchema),
    isDone: v.boolean(),
    continueCursor: v.string()
  })
})
```

#### `transactions.update`
Update transaction details.

```typescript
mutation({
  args: {
    id: v.id("transactions"),
    categoryId: v.optional(v.id("categories")),
    merchant: v.optional(v.string()),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string()))
  },
  returns: v.null()
})
```

#### `transactions.delete`
Soft delete a transaction.

```typescript
mutation({
  args: {
    id: v.id("transactions")
  },
  returns: v.null()
})
```

### Import

#### `import.parseCSV`
Parse CSV file for preview.

```typescript
action({
  args: {
    fileContent: v.string(),
    bankType: v.string()
  },
  returns: v.object({
    transactions: v.array(TransactionPreview),
    errors: v.array(v.string()),
    bankDetected: v.string()
  })
})
```

#### `import.confirmImport`
Confirm and save imported transactions.

```typescript
mutation({
  args: {
    accountId: v.id("accounts"),
    transactions: v.array(TransactionInput),
    sourceId: v.id("sources")
  },
  returns: v.object({
    created: v.number(),
    duplicates: v.number(),
    errors: v.array(v.string())
  })
})
```

### Classification

#### `classify.transaction`
Classify a single transaction.

```typescript
action({
  args: {
    merchant: v.string(),
    amount: v.number(),
    description: v.optional(v.string()),
    date: v.string()
  },
  returns: v.object({
    category: v.string(),
    subcategory: v.optional(v.string()),
    confidence: v.number(),
    reasoning: v.string()
  })
})
```

#### `classify.batch`
Classify multiple transactions.

```typescript
action({
  args: {
    transactions: v.array(TransactionInput)
  },
  returns: v.array(v.object({
    id: v.string(),
    category: v.string(),
    confidence: v.number()
  }))
})
```

### Rules

#### `rules.create`
Create a categorization rule.

```typescript
mutation({
  args: {
    field: v.union(v.literal("merchant"), v.literal("description")),
    pattern: v.string(),
    categoryId: v.id("categories"),
    priority: v.number()
  },
  returns: v.id("rules")
})
```

#### `rules.apply`
Apply rules to uncategorized transactions.

```typescript
mutation({
  args: {
    transactionIds: v.optional(v.array(v.id("transactions")))
  },
  returns: v.object({
    updated: v.number()
  })
})
```

### Deduplication

#### `dedupe.findDuplicates`
Find potential duplicate transactions.

```typescript
query({
  args: {
    windowDays: v.optional(v.number())  // Default: 7
  },
  returns: v.array(v.object({
    transactions: v.array(v.id("transactions")),
    score: v.number(),
    reason: v.string()
  }))
})
```

#### `dedupe.confirmDuplicate`
Confirm transactions are duplicates.

```typescript
mutation({
  args: {
    primaryId: v.id("transactions"),
    duplicateIds: v.array(v.id("transactions"))
  },
  returns: v.null()
})
```

### Transfers

#### `transfers.detect`
Detect inter-account transfers.

```typescript
mutation({
  args: {
    sinceDate: v.optional(v.number())
  },
  returns: v.object({
    detected: v.number(),
    confirmed: v.number()
  })
})
```

#### `transfers.confirm`
Confirm a transfer link.

```typescript
mutation({
  args: {
    outgoingId: v.id("transactions"),
    incomingId: v.id("transactions")
  },
  returns: v.null()
})
```

### Analytics

#### `analytics.monthlyPL`
Get monthly P&L summary.

```typescript
query({
  args: {
    month: v.string()  // "2025-08"
  },
  returns: v.object({
    income: v.number(),
    expenses: v.number(),
    net: v.number(),
    savingsRate: v.number(),
    byCategory: v.array(v.object({
      categoryId: v.id("categories"),
      name: v.string(),
      amount: v.number(),
      percentage: v.number()
    }))
  })
})
```

#### `analytics.trends`
Get spending trends.

```typescript
query({
  args: {
    months: v.number(),  // How many months back
    categoryId: v.optional(v.id("categories"))
  },
  returns: v.array(v.object({
    month: v.string(),
    amount: v.number()
  }))
})
```

#### `analytics.topMerchants`
Get top merchants by spending.

```typescript
query({
  args: {
    dateFrom: v.number(),
    dateTo: v.number(),
    limit: v.optional(v.number())  // Default: 10
  },
  returns: v.array(v.object({
    merchant: v.string(),
    amount: v.number(),
    count: v.number()
  }))
})
```

### Natural Language

#### `nl.query`
Process natural language query.

```typescript
action({
  args: {
    query: v.string()
  },
  returns: v.object({
    plan: QueryPlan,
    results: v.any(),
    summary: v.string()
  })
})
```

### OCR

#### `ocr.processReceipt`
Process receipt image.

```typescript
action({
  args: {
    imageBase64: v.string(),
    mimeType: v.string()
  },
  returns: v.object({
    merchant: v.string(),
    date: v.string(),
    amount: v.number(),
    currency: v.string(),
    items: v.array(v.object({
      description: v.string(),
      quantity: v.number(),
      unitPrice: v.number(),
      total: v.number()
    })),
    confidence: v.number()
  })
})
```

## REST API Endpoints

### Upload Endpoints

#### `POST /api/upload/receipt`
Upload a receipt image.

```typescript
// Request
FormData {
  file: File,
  accountId: string
}

// Response
{
  success: boolean,
  transaction?: {
    id: string,
    merchant: string,
    amount: number,
    date: string
  },
  error?: string
}
```

#### `POST /api/upload/statement`
Upload a bank statement.

```typescript
// Request
FormData {
  file: File,
  accountId: string,
  bankType?: string
}

// Response
{
  success: boolean,
  preview: {
    transactions: Transaction[],
    duplicates: number,
    errors: string[]
  }
}
```

### Export Endpoints

#### `GET /api/export/csv`
Export transactions as CSV.

```typescript
// Query params
{
  dateFrom: string,
  dateTo: string,
  accountIds?: string[],
  format?: "csv" | "ynab"
}

// Response
Content-Type: text/csv
Content-Disposition: attachment; filename="transactions.csv"
```

#### `GET /api/export/excel`
Export comprehensive Excel file.

```typescript
// Query params
{
  dateFrom: string,
  dateTo: string,
  includePL?: boolean,
  includeCategories?: boolean
}

// Response
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="finances.xlsx"
```

## Webhooks

### Clerk Webhooks

#### `POST /api/webhooks/clerk`
Handle Clerk user events.

Events handled:
- `user.created` - Create user record
- `user.updated` - Update user details
- `user.deleted` - Soft delete user data

### Bank Sync Webhooks (Future)

#### `POST /api/webhooks/bank-sync`
Handle Open Banking transaction updates.

## Error Codes

| Code | Description |
|------|-------------|
| AUTH_001 | Not authenticated |
| AUTH_002 | Not authorized for resource |
| VAL_001 | Invalid input data |
| VAL_002 | Missing required field |
| DUP_001 | Duplicate transaction detected |
| IMP_001 | Import parsing failed |
| IMP_002 | Unsupported file format |
| OCR_001 | OCR processing failed |
| OCR_002 | Image too large |
| AI_001 | Classification failed |
| AI_002 | AI provider unavailable |
| RATE_001 | Rate limit exceeded |

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| OCR processing | 100 | 1 hour |
| AI classification | 500 | 1 hour |
| CSV import | 50 | 1 hour |
| Export | 20 | 1 hour |
| Natural language | 100 | 1 hour |

## Data Types

### Transaction
```typescript
interface Transaction {
  _id: Id<"transactions">;
  userId: Id<"users">;
  accountId: Id<"accounts">;
  amount: number;
  currency: string;
  merchant: string;
  merchantNormalized: string;
  description?: string;
  date: number;
  categoryId?: Id<"categories">;
  tags?: string[];
  status: "new" | "reviewed" | "locked";
  confidence: number;
}
```

### Category
```typescript
interface Category {
  _id: Id<"categories">;
  userId: Id<"users">;
  name: string;
  type: "income" | "expense" | "transfer";
  parentId?: Id<"categories">;
  icon?: string;
  color?: string;
  budgetAmount?: number;
}
```

### QueryPlan
```typescript
interface QueryPlan {
  range: { from: string; to: string };
  filters: {
    categories?: string[];
    merchants?: string[];
    accounts?: string[];
  };
  metrics: ("income" | "expense" | "net")[];
  groupBy?: "category" | "merchant" | "month";
}
```