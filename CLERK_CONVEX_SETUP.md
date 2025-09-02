# Clerk + Convex Setup Guide

## Quick Fix (To See Landing Page)

The landing page is now fixed and will work even without Convex properly configured. Just make sure your Clerk keys are set in `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_secret_here
```

## Full Setup (For Database Features)

To enable the full app with database features (import, transactions, analytics), follow these steps:

### 1. Set Up Clerk JWT Template

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **JWT Templates** in the sidebar
3. Click **New template**
4. Configure as follows:
   - **Name**: `convex` (MUST be exactly "convex")
   - **Lifetime**: 60 seconds (default)
   - **Claims**: Add this exact JSON:
   ```json
   {
     "aud": "convex"
   }
   ```
5. Click **Save**

### 2. Get Your Clerk Domain

From the JWT template you just created, copy the **Issuer** URL. It looks like:
```
https://your-app-name.clerk.accounts.dev
```

### 3. Configure Convex

1. Go to your [Convex Dashboard](https://dashboard.convex.dev)
2. Go to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `CLERK_JWT_ISSUER_DOMAIN`
   - **Value**: Your Clerk issuer URL (from step 2)

### 4. Update Your .env.local

Make sure these are set:
```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 5. Restart Your Dev Servers

```bash
# Kill any running processes with Ctrl+C, then:
npm run dev
```

## Verify It's Working

1. **Landing page works**: You should see the landing page content immediately
2. **Sign up works**: Click "Get Started" and create an account
3. **Dashboard works**: After signing in, you should see the authenticated dashboard
4. **Import works**: Try importing a CSV file

## Troubleshooting

### "No JWT template exists with name: convex"
- The JWT template in Clerk MUST be named exactly "convex" (lowercase)
- Make sure you saved the template after creating it

### Blank page or loading spinner
- Check browser console for errors
- Verify all environment variables are set
- Make sure both `npm run dev` servers are running (Next.js and Convex)

### Authentication not working
- Clear your browser cookies/cache
- Check that Clerk keys in `.env.local` match your Clerk dashboard
- Verify the Convex URL in `.env.local` is correct

## What This Enables

Once properly configured, users can:
- Sign up/in with Clerk (email, Google, etc.)
- Import CSV bank statements
- View and categorize transactions
- See spending analytics
- All data stored securely in Convex database