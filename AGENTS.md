# SaaS Starter Kit - Codebase Analysis

## 🚀 INDIE DEVELOPER CONTEXT
**This is an indie SaaS project focused on rapid market validation.**
- Target: Tens of thousands of users (not millions)
- Philosophy: Ship fast, validate, iterate
- Priority: Working features over perfect code
- Analysis Date: September 1, 2025

## 💰 THE MONEY FEATURE
**CRITICAL: AI-Powered Chat Assistant Service**

This is a **SaaS starter kit with AI chat capabilities** - the core value proposition appears to be providing an AI-powered chat interface that can integrate multiple AI providers (OpenAI, Anthropic, Google) with built-in tools.

### Core Money Feature Components:
- **Core functionality**: Multi-provider AI chat with tool integration
- **Critical path**: User → Auth → AI Chat → API calls to AI providers
- **Key files**: 
  - `app/api/chat/route.ts` - Main chat API endpoint
  - `components/ai/chat.tsx` - Chat UI component
  - `lib/ai/providers.ts` - AI provider configurations
  - `lib/ai/tools.ts` - AI tool implementations
- **Dependencies**: 
  - AI SDK packages (`@ai-sdk/openai`, `@ai-sdk/anthropic`, `@ai-sdk/google`)
  - Clerk for authentication
  - Convex for data persistence
- **Failure impact**: If AI chat breaks, the entire value proposition fails - users can't access the main feature

## Project Overview

This is a Next.js 15.2.3 SaaS starter kit with TypeScript, Tailwind CSS v4, Convex backend, and Clerk authentication. The project uses shadcn/ui components and Biome for linting.

## Quick Start

```bash
# 1. Clone and install
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Add your Convex, Clerk, and AI provider keys

# 3. Run development servers
npm run dev

# 4. Open browser
# Frontend: http://localhost:3000
# Convex Dashboard: Opens automatically
```

## Development Commands

```bash
# Install dependencies
npm install

# Run both frontend and backend dev servers
npm run dev

# Run frontend only
npm run dev:frontend

# Run backend only (Convex)
npm run dev:backend

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture Overview

**Simple Monolithic Next.js App with Serverless Backend**
- **Frontend**: Next.js 15.2.3 with App Router, React 19, TypeScript
- **Backend**: Convex for real-time database and serverless functions
- **Auth**: Clerk for user management and authentication
- **AI Integration**: Vercel AI SDK with multiple providers (OpenAI, Anthropic, Google)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Linting**: Biome for code quality
- **Deployment**: Ready for Vercel deployment

### Tech Stack
- **Framework**: Next.js 15.2.3 with App Router
- **Backend**: Convex for real-time database and serverless functions
- **Authentication**: Clerk for user management
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Font**: Geist and Geist Mono from Google Fonts
- **Icons**: Lucide React
- **Linting**: Biome for formatting and linting
- **AI SDKs**: @ai-sdk/openai, @ai-sdk/anthropic, @ai-sdk/google

### Project Structure
- `app/`: Next.js App Router pages and layouts (moved from src/app/)
- `components/ui/`: shadcn/ui components with new-york style
- `lib/`: Utility functions including `cn()` for class merging
- Path aliases configured: `@/*` maps to root
- Convex backend files will be in `convex/` directory

### Key Configurations
- **TypeScript**: Strict mode, module resolution bundler, ES2017 target
- **ESLint**: Configured for Next.js
- **shadcn/ui**: New York style, CSS variables enabled, components use RSC
- **Convex**: Integrated with predev script to ensure backend is ready

## Important Notes
- Components use the `cn()` utility from `@/lib/utils` for className merging
- Button component already configured with multiple variants and sizes
- Project uses CSS variables for theming
- Convex dashboard opens automatically on dev start
- Clerk handles authentication - configure environment variables for Clerk keys

## Convex Guidelines

### Function Guidelines

#### New Function Syntax
ALWAYS use the new function syntax for Convex functions:
```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

export const f = query({
    args: {},
    returns: v.null(),
    handler: async (ctx, args) => {
        // Function body
    },
});
```

#### HTTP Endpoint Syntax
HTTP endpoints are defined in `convex/http.ts`:
```typescript
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();
http.route({
    path: "/echo",
    method: "POST",
    handler: httpAction(async (ctx, req) => {
        const body = await req.bytes();
        return new Response(body, { status: 200 });
    }),
});
```
HTTP endpoints are registered at the exact path specified in the `path` field.

#### Validators
Array validator example:
```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export default mutation({
    args: {
        simpleArray: v.array(v.union(v.string(), v.number())),
    },
    handler: async (ctx, args) => {
        //...
    },
});
```

Discriminated union in schema:
```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    results: defineTable(
        v.union(
            v.object({
                kind: v.literal("error"),
                errorMessage: v.string(),
            }),
            v.object({
                kind: v.literal("success"),
                value: v.number(),
            }),
        ),
    )
});
```

Always use `v.null()` for null returns:
```typescript
export const exampleQuery = query({
    args: {},
    returns: v.null(),
    handler: async (ctx, args) => {
        return null;
    },
});
```

Valid Convex types and validators:
- `Id`: `v.id(tableName)`
- `Null`: `v.null()` (JavaScript's undefined is not valid)
- `Int64`: `v.int64()` (for BigInts)
- `Float64`: `v.number()`
- `Boolean`: `v.boolean()`
- `String`: `v.string()`
- `Bytes`: `v.bytes()` (ArrayBuffer)
- `Array`: `v.array(values)` (max 8192 values)
- `Object`: `v.object({property: value})` (max 1024 entries)
- `Record`: `v.record(keys, values)`

#### Function Registration
- Use `internalQuery`, `internalMutation`, `internalAction` for private functions
- Use `query`, `mutation`, `action` for public API functions
- ALWAYS include argument and return validators
- Functions without return implicitly return `null`

#### Function Calling
- Use `ctx.runQuery` to call queries from query/mutation/action
- Use `ctx.runMutation` to call mutations from mutation/action
- Use `ctx.runAction` to call actions from action
- All calls take a `FunctionReference` from `api` or `internal` objects
- Add type annotations for same-file calls to avoid TypeScript circularity

#### Function References
- Public functions: `api.example.f` for function `f` in `convex/example.ts`
- Internal functions: `internal.example.g` for internal function `g`
- Nested directories: `api.messages.access.h` for function in `convex/messages/access.ts`

### Pagination
```typescript
import { paginationOptsValidator } from "convex/server";

export const listWithExtraArg = query({
    args: { 
        paginationOpts: paginationOptsValidator, 
        author: v.string() 
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("messages")
            .filter((q) => q.eq(q.field("author"), args.author))
            .order("desc")
            .paginate(args.paginationOpts);
    },
});
```

### Schema Guidelines
- Always define schema in `convex/schema.ts`
- System fields: `_creationTime` (number) and `_id` (table-specific)
- Include all fields in index names (e.g., "by_field1_and_field2")
- Query index fields in definition order

### TypeScript Guidelines
- Use `Id<'tableName'>` type from `./_generated/dataModel`
- Be strict with types, especially document IDs
- Use `as const` for discriminated union literals
- Define arrays as `const array: Array<T> = [...]`
- Define records as `const record: Record<K, V> = {...}`

### Query Guidelines
- Use indexes with `withIndex`, not `filter`
- No `.delete()` on queries - use `.collect()` then `ctx.db.delete()`
- Use `.unique()` for single document (throws if multiple)
- Default order: ascending `_creationTime`
- Use `.order('asc')` or `.order('desc')`

### Mutation Guidelines
- `ctx.db.replace`: fully replace document (throws if not exists)
- `ctx.db.patch`: shallow merge updates (throws if not exists)

### Action Guidelines
- Add `"use node";` for Node.js modules
- Actions don't have database access (no `ctx.db`)
```typescript
import { action } from "./_generated/server";

export const exampleAction = action({
    args: {},
    returns: v.null(),
    handler: async (ctx, args) => {
        return null;
    },
});
```

### Scheduling Guidelines
Use `crons.interval` or `crons.cron`:
```typescript
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();
crons.interval("delete inactive users", { hours: 2 }, internal.crons.empty, {});
export default crons;
```

### File Storage Guidelines
- Use `ctx.storage.getUrl()` for signed URLs
- Query `_storage` system table for metadata:
```typescript
type FileMetadata = {
    _id: Id<"_storage">;
    _creationTime: number;
    contentType?: string;
    sha256: string;
    size: number;
}

const metadata: FileMetadata | null = await ctx.db.system.get(args.fileId);
```
- Storage uses `Blob` objects - convert to/from Blob

## Development Guidelines

### Priority Order
1. **Fix anything that breaks the AI chat feature** - This is the money maker
2. **Fix authentication issues** - Users need to access the service
3. **Address API key/provider errors** - Service availability
4. **Improve chat UX** - User satisfaction
5. **Add new AI models/tools** - Feature expansion
6. Everything else is optional

### What to Ignore (For Now)
- Perfect test coverage (no tests currently)
- Complex CI/CD (not set up)
- Microservices architecture
- Enterprise patterns
- Premature optimization

## Critical Issues to Address

### 🔴 Urgent Fixes Needed

1. **No Payment Integration** - Cannot monetize without Stripe/payment provider
2. **TypeScript Errors** - Build failures in AI components need immediate fixes
3. **Security Risk** - Calculator tool uses unsafe Function() constructor

### 🟡 Important Improvements

4. **No Rate Limiting** - AI API endpoints vulnerable to abuse
5. **Mock Data in Tools** - Weather and search return fake data
6. **Missing Documentation** - Environment variables not properly documented

See `ISSUES.md` for complete list of issues to create on GitHub.

## Configuration Guide

### Required Environment Variables
```bash
# Convex (Required)
NEXT_PUBLIC_CONVEX_URL=       # From Convex dashboard

# Clerk Auth (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  # From Clerk dashboard
CLERK_SECRET_KEY=                    # From Clerk dashboard

# AI Providers (At least one required)
OPENAI_API_KEY=                # From OpenAI
ANTHROPIC_API_KEY=              # From Anthropic
GOOGLE_GENERATIVE_AI_API_KEY=  # From Google AI Studio
```

## AI Provider Models Supported

### OpenAI
- GPT-5, GPT-4o, GPT-4o Mini
- O1, O1 Mini, O3, O3 Mini

### Anthropic
- Claude 4, Claude 3.7 Sonnet
- Claude 3.5 Sonnet, Claude 3.5 Haiku
- Claude 3 Opus

### Google
- Gemini 2.5 Flash, Gemini 2.5 Pro
- Gemini 1.5 Pro, Gemini 1.5 Flash

## Production Deployment Checklist

- [ ] Set all required environment variables
- [ ] Configure Clerk production instance
- [ ] Set up Convex production deployment
- [ ] **Add payment provider (CRITICAL)**
- [ ] **Implement rate limiting (CRITICAL)**
- [ ] Fix TypeScript build errors
- [ ] Replace mock AI tools with real implementations
- [ ] Configure domain and SSL
- [ ] Set up monitoring and alerts
- [ ] Add analytics tracking

## Visual Development

### Indie Design Philosophy
**REMEMBER: We're shipping to validate, not win design awards.**
- Good enough UX that doesn't frustrate users
- Clean, professional look without obsessing over pixels
- Focus on the money feature working beautifully
- Everything else just needs to not be broken

### Quick Visual Check
After implementing any front-end change:
1. **Does it work?** - Test the actual functionality
2. **Does it look broken?** - Quick visual scan for obvious issues
3. **Is it usable?** - Can users figure it out without instructions?
4. **Take a screenshot** - Document what shipped
5. **Check console** - No errors breaking the experience

### When to Care More About Design
- The money feature (what users pay for)
- First-time user experience/onboarding
- Payment/checkout flows
- Error states that lose user trust

### Design Principles
- `/context/design-principles.md` - Pragmatic design checklist
- `/context/style-guide.md` - Basic brand consistency
- Use these as guidelines, not gospel

### Design Review (When Needed)
Use the design-review agent when:
- Shipping a major user-facing feature
- The UI feels "off" and you need help
- Before a Product Hunt launch
- Customer reported UI/UX issues

Remember: Ship first, polish based on user feedback.