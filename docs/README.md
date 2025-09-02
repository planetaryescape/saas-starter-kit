# Personal P&L Documentation

## 📊 Overview

Personal P&L is a mobile-first financial tracking application that automatically processes bank statements and receipts to generate accurate monthly profit & loss statements. Built for personal use, it handles multiple bank accounts, detects transfers, deduplicates transactions, and provides intelligent categorization using AI.

## 🎯 Core Features

- **Smart Import**: Camera capture for receipts, CSV/PDF import for bank statements
- **AI Classification**: Automatic expense categorization using GPT-5
- **Duplicate Detection**: Intelligent matching between receipts and bank statements
- **Transfer Recognition**: Automatic detection of inter-account transfers and credit card payments
- **Monthly P&L**: Clean income/expense tracking with category breakdowns
- **Natural Language Queries**: Ask questions about your finances in plain English
- **Export Options**: CSV, Excel, and YNAB-compatible formats

## 📱 Mobile-First Design

- PWA with camera capture
- Swipe gestures for transaction review
- One-handed operation
- Offline queue for receipt capture
- Large touch targets and responsive layouts

## 🔐 Security & Privacy

- Clerk authentication with row-level security
- File encryption at rest
- Private signed URLs for documents
- Separate user data isolation

## 📚 Documentation

- [Architecture](./architecture.md) - System design and tech stack
- [Data Model](./data-model.md) - Database schema and relationships
- [User Guide](./user-guide.md) - How to use the application
- [Developer Guide](./developer-guide.md) - Setup and development instructions
- [API Reference](./api-reference.md) - Backend functions and endpoints
- [Deployment](./deployment.md) - Production deployment guide

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local

# Run development servers
npm run dev

# Open http://localhost:3000
```

## 📊 Tech Stack

- **Frontend**: Next.js 15.2.3, React 19, TypeScript
- **Backend**: Convex (real-time database)
- **Auth**: Clerk
- **AI**: Vercel AI SDK with OpenAI GPT-5
- **UI**: shadcn/ui, Tailwind CSS v4
- **Storage**: UploadThing/Vercel Blob

## 🎨 Design Philosophy

Built for personal use by two people, not enterprise:
- Speed over perfection
- Working features over perfect code
- Pragmatic choices for tens of thousands of transactions
- Focus on the "money feature" - accurate P&L