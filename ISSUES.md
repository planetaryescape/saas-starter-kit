# GitHub Issues to Create

Based on the codebase analysis, here are the issues that should be created once the repository is pushed to GitHub:

## 🔴 Critical Issues (Fix This Week)

### 1. [CRITICAL] Add Payment Integration for Monetization
**Labels**: critical, feature, payment
**Description**: 
The application has no payment processing capability, making it impossible to monetize the SaaS product. This is the most critical missing feature.
- Integrate Stripe or similar payment provider
- Add subscription plans and pricing tiers
- Implement usage-based billing for AI API calls
- Add billing dashboard for users

### 2. [CRITICAL] Fix TypeScript Errors in AI Components
**Labels**: critical, bug, typescript
**Description**:
Multiple TypeScript errors prevent the app from building properly:
- `chat.tsx`: Property 'isLoading' and 'api' issues with useChat hook
- `providers.ts`: LanguageModelV1 import error
- `tools.ts`: Type mismatches in conversion functions
These need immediate fixes for the app to compile.

### 3. [SECURITY] Calculator Tool Uses Unsafe Eval Pattern
**Labels**: security, bug, high-priority
**Description**:
The calculator tool in `lib/ai/tools.ts:33-34` uses `Function()` constructor which is similar to eval(). Despite sanitization, this poses a security risk.
- Replace with a proper math expression parser library like mathjs
- Remove the Function() constructor usage

## 🟡 Important Issues (Fix This Month)

### 4. [FEATURE] Add Rate Limiting to AI API Endpoints
**Labels**: feature, security, api
**Description**:
No rate limiting on `/api/chat` and other AI endpoints. A single user could rack up huge API costs.
- Implement rate limiting middleware
- Add per-user usage tracking
- Set configurable limits per tier

### 5. [BUG] Mock Data in Production Tools
**Labels**: bug, ai-tools
**Description**:
Weather and search tools return fake/mock data even in production:
- Weather tool generates random data
- Search tool returns placeholder results
Either integrate real APIs or clearly mark as demo-only features.

### 6. [DOCS] Missing Environment Variables Documentation
**Labels**: documentation, good-first-issue
**Description**:
`.env.local.example` lacks clear documentation about which variables are required vs optional.
- Add comments explaining each variable
- Document how to obtain API keys
- Specify which providers are minimum required

### 7. [UX] Add Loading Skeletons and Error States
**Labels**: enhancement, ux
**Description**:
Missing loading states in multiple places:
- `app/page.tsx:52` shows plain text "loading..."
- No error boundaries for AI failures
- No skeleton loaders for data fetching

## 🟢 Nice to Have (Backlog)

### 8. [DX] Fix Biome Linting Issues
**Labels**: code-quality, good-first-issue
**Description**:
Multiple CSS class ordering issues detected by Biome linter.
Run `npm run lint:fix` to auto-fix most issues.

### 9. [FEATURE] Add More AI Providers
**Labels**: enhancement, ai
**Description**:
Expand AI provider support:
- Groq for fast inference
- Mistral AI
- Local LLM support (Ollama)
- DeepSeek integration

### 10. [FEATURE] Implement Conversation History
**Labels**: feature, database
**Description**:
Add persistent chat history:
- Store conversations in Convex
- Allow users to continue previous chats
- Search through past conversations
- Export conversation history

### 11. [TEST] Add Testing Framework
**Labels**: testing, infrastructure
**Description**:
No tests currently exist. Add:
- Jest or Vitest for unit tests
- React Testing Library for components
- Playwright for E2E tests
- Test critical paths (auth, payments, AI chat)

### 12. [INFRA] Add Monitoring and Analytics
**Labels**: infrastructure, monitoring
**Description**:
No monitoring or analytics in place:
- Add Sentry for error tracking
- Implement Posthog or similar for analytics
- Add performance monitoring
- Track AI API usage and costs

## 📋 Codebase Improvement Roadmap

Once these issues are created on GitHub, create a meta-issue with this prioritized roadmap:

### Week 1 (Critical)
- #1 Payment Integration
- #2 Fix TypeScript Errors
- #3 Fix Calculator Security

### Week 2-3 (Important)
- #4 Rate Limiting
- #5 Replace Mock Tools
- #6 Document Environment Variables

### Month 2 (Nice to Have)
- #7 Loading States & Error Boundaries
- #10 Conversation History
- #11 Add Tests

### Future
- #9 More AI Providers
- #12 Monitoring & Analytics

## How to Create These Issues

Once the repository is on GitHub:

```bash
# Example for creating the first issue:
gh issue create \
  --title "[CRITICAL] Add Payment Integration for Monetization" \
  --body "$(cat <<'EOF'
## Problem
The application has no payment processing capability...
EOF
)" \
  --label "critical,feature,payment"
```

Or use the GitHub web interface to manually create each issue with the descriptions provided above.