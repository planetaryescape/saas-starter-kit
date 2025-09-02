# Architecture

## System Overview

Personal P&L follows a simple monolithic architecture optimized for rapid development and easy maintenance.

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Camera    │  │   Upload    │  │   Insights  │    │
│  │   Capture   │  │   Import    │  │   Dashboard │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                  Middleware (Clerk Auth)                 │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                   Backend (Convex)                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │            Processing Pipelines                  │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐     │   │
│  │  │   OCR    │  │ Classify │  │  Dedupe  │     │   │
│  │  └──────────┘  └──────────┘  └──────────┘     │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Database Tables                     │   │
│  │  users, accounts, transactions, categories      │   │
│  │  rules, links, months, recurrences             │   │
│  └─────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│              External Services                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  OpenAI  │  │   Blob   │  │    FX    │            │
│  │   GPT-5  │  │  Storage │  │   Rates  │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└──────────────────────────────────────────────────────────┘
```

## Tech Stack Details

### Frontend
- **Next.js 15.2.3**: App Router for modern React patterns
- **React 19**: Latest features including server components
- **TypeScript**: Type safety throughout
- **Tailwind CSS v4**: Utility-first styling
- **shadcn/ui**: Pre-built accessible components

### Backend
- **Convex**: Real-time database with serverless functions
- **Mutations**: Data writes with ACID transactions
- **Queries**: Reactive data fetching
- **Actions**: External API calls (OpenAI, FX rates)
- **Scheduled Jobs**: Cron for recurring tasks

### Authentication
- **Clerk**: Managed auth with JWT tokens
- **Row-level security**: Every query filtered by userId
- **Session management**: Automatic token refresh

### AI Integration
- **Vercel AI SDK**: Unified interface for LLMs
- **OpenAI GPT-5**: Primary classification model
- **Fallback to GPT-4o-mini**: Cost optimization
- **Structured outputs**: JSON schema validation

### Storage
- **UploadThing/Vercel Blob**: File storage
- **SHA-256 hashing**: File deduplication
- **Signed URLs**: Secure file access

## Data Flow

### Receipt Processing
1. Camera capture → compress → upload
2. OCR (OpenAI Vision) → extract text
3. LLM normalize → structured JSON
4. Create transaction → compute canonicalId
5. Apply rules → classify → store

### Statement Import
1. Upload CSV/PDF → parse
2. Bank-specific mapper → normalize
3. Batch create transactions
4. Detect transfers & duplicates
5. Update month rollups

### Classification Pipeline
```
User Rules (priority 100)
    ↓ (if no match)
Merchant Aliases (priority 80)
    ↓ (if no match)
Heuristics/MCC (priority 60)
    ↓ (if no match)
LLM Classification (priority 40)
    ↓
Final Category
```

## Background Jobs

### Daily
- FX rate updates
- Transfer detection sweep
- Duplicate detection

### Weekly
- Recurrence pattern detection
- Digest generation

### Monthly
- Month rollup computation
- Lock previous month

## Performance Optimizations

### Caching
- Merchant classifications cached by normalized name
- FX rates cached daily
- Month rollups precomputed

### Batching
- Bulk transaction imports
- Batch LLM classifications (up to 10 per call)
- Grouped database writes

### Indexes
- byUserDate: Fast date range queries
- byUserCanon: Deduplication lookups
- byHash: File-level deduplication

## Security Measures

### Authentication
- Clerk JWT validation on every request
- Secure session cookies
- MFA support

### Data Protection
- User isolation at database level
- Encrypted file storage
- No client-side sensitive data

### Rate Limiting
- API endpoint throttling
- LLM call quotas
- File upload size limits

## Scalability Considerations

### Current Scale
- Designed for 10K transactions/month
- 2 users (personal use)
- ~100 MB file storage

### Growth Path
- Can handle 100K transactions without changes
- Convex auto-scales compute
- Consider dedicated OCR service at 1M+ receipts

## Monitoring & Observability

### Metrics
- Transaction processing time
- Classification accuracy
- Duplicate detection rate
- Monthly active categories

### Errors
- Failed OCR attempts
- LLM timeout tracking
- Import failures

### Alerts
- Processing queue backlog
- High error rates
- Unusual spending patterns