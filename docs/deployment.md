# Deployment Guide

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database schema finalized
- [ ] Authentication tested
- [ ] File upload configured
- [ ] AI API keys valid with credits
- [ ] Build passes without errors
- [ ] Critical features tested locally

## Environment Variables

### Production Requirements

```bash
# Required - Core Services
NEXT_PUBLIC_CONVEX_URL=https://prod.convex.cloud
CONVEX_DEPLOY_KEY=prod_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_JWT_ISSUER_DOMAIN=https://clerk.your-domain.com

# Required - AI (at least one)
OPENAI_API_KEY=sk-...
# ANTHROPIC_API_KEY=sk-ant-...
# GOOGLE_GENERATIVE_AI_API_KEY=...

# Required - File Storage (choose one)
UPLOADTHING_TOKEN=...
# OR
BLOB_READ_WRITE_TOKEN=...

# Optional but Recommended
FX_API_KEY=...  # For accurate currency conversion
SENTRY_DSN=...  # Error tracking
ANALYTICS_ID=... # Usage analytics
```

## Deployment Steps

### 1. Vercel Deployment

#### Initial Setup

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Link project:
```bash
vercel link
```

3. Configure environment variables:
```bash
vercel env add NEXT_PUBLIC_CONVEX_URL
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# Add all other variables...
```

#### Deploy

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

#### Custom Domain

1. Add domain in Vercel dashboard
2. Update DNS records
3. Configure SSL (automatic)
4. Update Clerk redirect URLs

### 2. Convex Deployment

#### Production Setup

1. Create production deployment:
```bash
npx convex deploy --prod
```

2. Get production URL:
```bash
npx convex dashboard --prod
```

3. Update `NEXT_PUBLIC_CONVEX_URL` in Vercel

#### Database Migration

If migrating from development:

```bash
# Export dev data
npx convex export --path ./backup

# Import to production
npx convex import --prod --path ./backup
```

### 3. Clerk Configuration

#### Production Instance

1. Create production instance at clerk.com
2. Configure:
   - Allowed redirect URLs
   - Webhook endpoints
   - JWT template for Convex

#### JWT Template

Create JWT template with:
```json
{
  "aud": "convex",
  "iss": "https://your-clerk-instance.clerk.accounts.dev",
  "sub": "{{user.id}}",
  "email": "{{user.primary_email_address}}",
  "name": "{{user.full_name}}"
}
```

### 4. File Storage Setup

#### UploadThing

1. Create account at uploadthing.com
2. Create app
3. Configure:
   - File size limits
   - Allowed MIME types
   - CORS settings

#### Vercel Blob (Alternative)

1. Enable in Vercel dashboard
2. Create storage bucket
3. Set read/write token

### 5. Monitoring Setup

#### Sentry

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Configure in `sentry.client.config.ts`:
```typescript
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

#### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Performance Optimization

### Image Optimization

Configure Next.js image optimization:

```typescript
// next.config.ts
module.exports = {
  images: {
    domains: ['uploadthing.com', 'your-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
};
```

### Caching Strategy

Set cache headers for static assets:

```typescript
// next.config.ts
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### Database Indexes

Ensure production indexes:

```typescript
// convex/schema.ts
.index("byUserDate", ["userId", "date"])
.index("byUserCanon", ["userId", "canonicalId"])
.index("byUserMonth", ["userId", "month"])
```

## Security Configuration

### API Rate Limiting

Install rate limiting:
```bash
npm install @upstash/ratelimit @upstash/redis
```

Implement in API routes:
```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "1 h"),
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for");
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response("Too Many Requests", { status: 429 });
  }
  
  // Process request...
}
```

### Content Security Policy

Add CSP headers:
```typescript
// next.config.ts
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.clerk.com *.convex.cloud"
          },
        ],
      },
    ];
  },
};
```

## Backup Strategy

### Automated Backups

Create backup cron job:

```typescript
// convex/crons.ts
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.daily(
  "backup",
  { hourUTC: 2, minuteUTC: 0 },
  internal.backup.daily
);

export default crons;
```

### Manual Backup

```bash
# Backup Convex data
npx convex export --prod --path ./backups/$(date +%Y%m%d)

# Backup environment
vercel env pull .env.backup
```

## Rollback Procedures

### Quick Rollback

```bash
# Vercel - revert to previous deployment
vercel rollback

# Convex - restore from backup
npx convex import --prod --path ./backups/20250831
```

### Database Rollback

1. Export current state (for safety)
2. Clear affected tables
3. Import previous backup
4. Verify data integrity

## Post-Deployment

### Verification Checklist

- [ ] Authentication works
- [ ] File upload functional
- [ ] OCR processing successful
- [ ] AI classification working
- [ ] Transaction creation/edit
- [ ] Export functionality
- [ ] Mobile responsiveness
- [ ] Performance acceptable

### Monitoring Setup

1. **Uptime Monitoring**: Set up Uptime Robot or similar
2. **Error Alerts**: Configure Sentry alerts
3. **Usage Metrics**: Monitor Vercel Analytics
4. **Cost Tracking**: Watch API usage for:
   - OpenAI credits
   - Convex bandwidth
   - Vercel usage
   - File storage

### DNS Configuration

```
Type  Name    Value
A     @       76.76.21.21
CNAME www     cname.vercel-dns.com
```

## Troubleshooting

### Common Issues

**Build Failures**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Convex Connection Issues**
```bash
# Regenerate and update keys
npx convex dashboard --prod
# Copy new URL to environment variables
```

**Clerk Auth Failures**
- Verify JWT issuer domain matches
- Check webhook endpoints
- Confirm redirect URLs

**File Upload Issues**
- Check CORS configuration
- Verify storage limits
- Confirm API keys

## Cost Management

### Estimated Monthly Costs (Personal Use)

| Service | Free Tier | Paid Estimate |
|---------|-----------|---------------|
| Vercel | 100GB bandwidth | ~$0 |
| Convex | 1M function calls | ~$0-5 |
| Clerk | 5,000 MAU | ~$0 |
| OpenAI | Pay as you go | ~$5-20 |
| UploadThing | 2GB storage | ~$0 |
| **Total** | | **~$5-25/month** |

### Cost Optimization Tips

1. Use GPT-4o-mini for classification
2. Cache AI responses aggressively
3. Batch process transactions
4. Compress images before upload
5. Use client-side validations

## Maintenance

### Regular Tasks

**Daily**
- Check error logs
- Monitor API usage

**Weekly**
- Review performance metrics
- Check backup integrity
- Update dependencies (security)

**Monthly**
- Full backup
- Cost review
- Performance audit
- Security scan

### Update Procedure

```bash
# Update dependencies
npm update
npm audit fix

# Test locally
npm run dev

# Deploy to staging
vercel

# Test staging
# If OK, deploy to production
vercel --prod
```