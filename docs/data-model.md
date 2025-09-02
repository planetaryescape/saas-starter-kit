# Data Model

## Core Tables

### users
Stores user profile and preferences.
```typescript
{
  clerkId: string           // Clerk authentication ID
  baseCurrency: string      // Default currency (e.g., "GBP")
  monthStartDay: number     // 1-28, when month starts for budgeting
}
```

### accounts
Bank accounts, credit cards, and cash accounts.
```typescript
{
  userId: Id<"users">
  name: string              // "Monzo", "Barclays", "Cash"
  currency: string          // Account currency
  type: string              // "bank" | "credit" | "cash" | "wallet"
  externalId?: string       // For Open Banking integration
  last4?: string            // Card last 4 digits
  balance?: number          // Current balance (optional manual entry)
}
```

### transactions
Core transaction records from all sources.
```typescript
{
  userId: Id<"users">
  accountId: Id<"accounts">
  sourceId?: Id<"sources">  // Link to original document
  direction: "in" | "out"
  kind: "expense" | "income" | "transfer"
  amount: number            // In account currency (minor units)
  currency: string
  amountBase: number        // Converted to base currency
  date: number              // Epoch milliseconds
  merchant: string
  merchantNormalized: string // Cleaned merchant name
  description?: string
  categoryId?: Id<"categories">
  subcategory?: string
  confidence: number        // 0-1 classification confidence
  person?: "me" | "partner" | "shared"
  tags?: string[]
  canonicalId: string       // Deduplication hash
  status: "new" | "reviewed" | "locked"
  linkedId?: Id<"transactions"> // For refunds/chargebacks
  attachments?: Id<"sources">[] // Receipt images
  accountRef?: string       // IBAN/sort code/card reference
}
```

### categories
Expense and income categories with hierarchy.
```typescript
{
  userId: Id<"users">
  name: string              // "Groceries", "Transport"
  parentId?: Id<"categories"> // For subcategories
  type: "expense" | "income" | "transfer"
  icon?: string             // Icon identifier
  color?: string            // Hex color for UI
  sort: number              // Display order
  budgetAmount?: number     // Monthly budget cap
}
```

### sources
Uploaded files (receipts, statements).
```typescript
{
  userId: Id<"users">
  kind: "receipt" | "statement"
  filename: string
  mime: string              // Content type
  bytes: number             // File size
  storageKey: string        // Blob storage reference
  sha256: string            // File hash for deduplication
  parsedAt?: number         // When processed
  ocrText?: string          // Extracted text
  meta?: any                // Additional metadata
}
```

### rules
User-defined categorization rules.
```typescript
{
  userId: Id<"users">
  field: "merchant" | "description" | "accountRef"
  pattern: string           // Match pattern
  set: {
    categoryId?: Id<"categories">
    person?: string
    tags?: string[]
  }
  priority: number          // Higher = higher precedence
}
```

### links
Relationships between transactions.
```typescript
{
  userId: Id<"users">
  aId: Id<"transactions">   // First transaction
  bId: Id<"transactions">   // Second transaction
  kind: "duplicate" | "transfer"
  score: number             // Confidence 0-1
  decided: boolean          // User confirmed?
}
```

### months
Monthly rollup data for performance.
```typescript
{
  userId: Id<"users">
  month: string             // "2025-08"
  lockedAt?: number         // When month was closed
  incomeBase: number        // Total income
  expenseBase: number       // Total expenses
  netBase: number           // Income - expenses
  breakdown: any            // Category totals
}
```

### recurrences
Detected recurring transactions.
```typescript
{
  userId: Id<"users">
  template: any             // Transaction template
  period: "monthly" | "weekly" | "yearly"
  avgAmountBase: number     // Average amount
  nextDueAt: number         // Next expected date
  lastSeenAt: number        // Last occurrence
}
```

### fxRates
Daily foreign exchange rates.
```typescript
{
  date: string              // "2025-08-31"
  base: string              // Base currency
  rates: any                // {USD: 1.28, EUR: 1.17}
}
```

## Indexes

### Performance Indexes
- `users.byClerk`: Quick user lookup by Clerk ID
- `transactions.byUserDate`: Date range queries
- `transactions.byUserCanon`: Deduplication checks
- `sources.byHash`: File deduplication
- `months.byUserMonth`: Monthly data access

## Data Relationships

```
users
  ├── accounts (1:N)
  │     └── transactions (1:N)
  │           ├── sources (N:1) [attachments]
  │           ├── categories (N:1)
  │           └── links (N:N) [transfers/duplicates]
  ├── categories (1:N)
  ├── rules (1:N)
  ├── months (1:N)
  └── recurrences (1:N)
```

## Canonical ID Algorithm

The canonical ID uniquely identifies transactions for deduplication:

```typescript
canonicalId = sha256(
  merchantNormalized + '|' +
  Math.round(amount, 0.01) + '|' +
  formatDate(date, 'YYYY-MM-DD') + '|' +
  normalize(description) + '|' +
  accountFingerprint
)
```

## Data Integrity Rules

1. **User Isolation**: All queries filtered by userId
2. **Locked Months**: Transactions in locked months cannot be modified
3. **Transfer Pairs**: Transfers always link two transactions
4. **Amount Signs**: Direction determines sign (in = positive, out = negative)
5. **Currency Consistency**: All amounts stored in minor units
6. **Date Boundaries**: Month boundaries respect user's monthStartDay

## Migration Strategy

For existing bank data:
1. Export existing data as CSV
2. Use import mappers to normalize
3. Run deduplication on import
4. Manually review and confirm categories
5. Lock historical months after verification