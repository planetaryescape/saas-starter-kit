# Developer Guide

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- A Convex account
- Clerk account for authentication
- OpenAI API key for AI features
- (Optional) Stripe account for payments

## Environment Setup

### 1. Clone the Repository

```bash
git clone <repo-url>
cd eanie-meanie
npm install
```

### 2. Environment Variables

Create `.env.local`:

```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-instance.convex.cloud
CONVEX_DEPLOY_KEY=your-deploy-key

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-instance

# AI Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_GENERATIVE_AI_API_KEY=...

# File Storage (choose one)
UPLOADTHING_TOKEN=...
# OR
BLOB_READ_WRITE_TOKEN=...

# Optional: External Services
FX_API_KEY=...  # For currency rates
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

### 3. Database Setup

Initialize Convex:

```bash
npx convex dev
```

This will:
- Create a development deployment
- Generate TypeScript types
- Start the Convex dev server

## Project Structure

```
/app                    # Next.js App Router
  /api                  # API endpoints
    /import            # File import endpoints
    /ocr               # OCR processing
    /classify          # AI classification
  /(dashboard)         # Main app pages
    /transactions      # Transaction views
    /insights          # P&L and analytics
    /settings          # User settings

/components
  /finance             # Finance-specific components
    TransactionTable.tsx
    ReceiptCapture.tsx
    CategoryPicker.tsx
  /ui                  # shadcn/ui components

/convex
  /finance             # Finance functions
    transactions.ts    # CRUD operations
    import.ts          # Import logic
    classify.ts        # Classification
    rollups.ts         # Aggregations
  schema.ts            # Database schema

/lib
  /finance             # Business logic
    /parsers           # Bank CSV parsers
    /ocr               # OCR utilities
    /classification    # AI classification
    /deduplication     # Duplicate detection
```

## Core Development Tasks

### Adding a New Bank Parser

Create a parser in `/lib/finance/parsers/`:

```typescript
// lib/finance/parsers/hsbc.ts
import { z } from "zod";
import { BankParser } from "./types";

const HSBCSchema = z.object({
  "Date": z.string(),
  "Description": z.string(),
  "Amount": z.string(),
  "Balance": z.string()
});

export const hsbcParser: BankParser = {
  bankName: "HSBC",
  detectBank: (headers) => headers.includes("Balance"),
  parseRow: (row) => {
    const validated = HSBCSchema.parse(row);
    return {
      date: new Date(validated.Date).getTime(),
      merchant: validated.Description,
      amount: Math.round(parseFloat(validated.Amount) * 100),
      direction: validated.Amount.startsWith("-") ? "out" : "in"
    };
  }
};
```

### Implementing OCR Processing

```typescript
// app/api/ocr/route.ts
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  
  // Convert to base64
  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");
  
  // Use OpenAI Vision
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [{
      role: "user",
      content: [
        { type: "text", text: "Extract receipt data as JSON" },
        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64}` }}
      ]
    }]
  });
  
  return Response.json(JSON.parse(response.choices[0].message.content));
}
```

### Creating Convex Functions

```typescript
// convex/finance/transactions.ts
import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    accountId: v.id("accounts"),
    amount: v.number(),
    merchant: v.string(),
    date: v.number(),
    categoryId: v.optional(v.id("categories"))
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");
    
    // Compute canonical ID
    const canonicalId = computeCanonicalId(args);
    
    // Check for duplicates
    const existing = await ctx.db
      .query("transactions")
      .withIndex("byUserCanon", q => 
        q.eq("userId", user.id).eq("canonicalId", canonicalId)
      )
      .first();
      
    if (existing) {
      return { duplicate: true, id: existing._id };
    }
    
    // Create transaction
    const id = await ctx.db.insert("transactions", {
      ...args,
      userId: user.id,
      canonicalId,
      status: "new",
      confidence: 0.9
    });
    
    return { duplicate: false, id };
  }
});
```

### Adding AI Classification

```typescript
// lib/finance/classification/classifier.ts
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function classifyTransaction(txn: {
  merchant: string;
  amount: number;
  description?: string;
}) {
  const { text } = await generateText({
    model: openai("gpt-5-turbo"),
    system: "Classify the transaction into one category",
    prompt: JSON.stringify(txn)
  });
  
  return JSON.parse(text);
}
```

## Testing

### Unit Tests

```typescript
// __tests__/canonical-id.test.ts
import { computeCanonicalId } from "@/lib/finance/deduplication";

describe("Canonical ID", () => {
  it("generates consistent IDs", () => {
    const txn = {
      merchant: "TESCO",
      amount: 4250,
      date: new Date("2025-08-15"),
      description: "GROCERY"
    };
    
    const id1 = computeCanonicalId(txn);
    const id2 = computeCanonicalId(txn);
    
    expect(id1).toBe(id2);
  });
});
```

### Integration Tests

```typescript
// __tests__/import-flow.test.ts
import { uploadAndProcess } from "@/lib/finance/import";

describe("Import Flow", () => {
  it("processes CSV correctly", async () => {
    const csv = `Date,Description,Amount
2025-08-15,TESCO,-42.50
2025-08-16,SALARY,2500.00`;
    
    const result = await uploadAndProcess(csv, "monzo");
    
    expect(result.transactions).toHaveLength(2);
    expect(result.errors).toHaveLength(0);
  });
});
```

## Common Patterns

### Batch Processing

```typescript
// Process transactions in batches
async function batchProcess(transactions: Transaction[]) {
  const BATCH_SIZE = 50;
  const results = [];
  
  for (let i = 0; i < transactions.length; i += BATCH_SIZE) {
    const batch = transactions.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(processTransaction)
    );
    results.push(...batchResults);
  }
  
  return results;
}
```

### Caching Classifications

```typescript
// Cache merchant classifications
const classificationCache = new Map<string, string>();

async function getCachedClassification(merchant: string) {
  const normalized = merchant.toLowerCase().trim();
  
  if (classificationCache.has(normalized)) {
    return classificationCache.get(normalized);
  }
  
  const category = await classifyMerchant(merchant);
  classificationCache.set(normalized, category);
  
  return category;
}
```

### Error Handling

```typescript
// Robust error handling
async function importWithRetry(file: File) {
  const MAX_RETRIES = 3;
  let lastError;
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await importFile(file);
    } catch (error) {
      lastError = error;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
  
  throw new Error(`Import failed after ${MAX_RETRIES} attempts: ${lastError}`);
}
```

## Performance Optimization

### Database Indexes

Ensure these indexes exist:
- `transactions.byUserDate` - For date range queries
- `transactions.byUserCanon` - For deduplication
- `sources.byHash` - For file deduplication

### Query Optimization

```typescript
// Efficient month query
export const getMonthTransactions = query({
  args: { month: v.string() },
  handler: async (ctx, { month }) => {
    const [year, monthNum] = month.split("-").map(Number);
    const start = new Date(year, monthNum - 1, 1).getTime();
    const end = new Date(year, monthNum, 1).getTime();
    
    return await ctx.db
      .query("transactions")
      .withIndex("byUserDate", q => 
        q.eq("userId", ctx.auth.userId)
         .gte("date", start)
         .lt("date", end)
      )
      .collect();
  }
});
```

### Caching Strategies

- Cache FX rates daily
- Cache merchant classifications
- Precompute monthly rollups
- Use React Query for client caching

## Deployment

### Production Build

```bash
# Build checks
npm run type-check
npm run lint
npm run test

# Production build
npm run build

# Deploy to Vercel
vercel --prod

# Deploy Convex functions
npx convex deploy --prod
```

### Monitoring

Set up monitoring for:
- Transaction processing time
- OCR success rate
- Classification accuracy
- API response times
- Error rates

## Security Best Practices

1. **Authentication**: Always verify user in Convex functions
2. **Input Validation**: Use Zod schemas for all inputs
3. **File Uploads**: Limit size, validate MIME types
4. **API Keys**: Never expose in client code
5. **Rate Limiting**: Implement on all endpoints
6. **SQL Injection**: Use parameterized queries
7. **XSS Prevention**: Sanitize all user inputs

## Troubleshooting

### Common Issues

**Convex connection errors:**
```bash
npx convex dev --once  # Reinitialize
```

**TypeScript errors after schema change:**
```bash
npx convex codegen  # Regenerate types
```

**OCR failing:**
- Check OpenAI API credits
- Verify image size < 20MB
- Ensure good image quality

**Duplicate detection missing:**
- Review canonical ID logic
- Check date normalization
- Verify merchant normalization