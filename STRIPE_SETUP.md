# Stripe Integration Setup Guide

This project has Stripe integration pre-configured following [Theo's guide](https://github.com/t3dotgg/stripe-recommendations). Follow these steps to complete the setup:

## Prerequisites
- Stripe account (create at [stripe.com](https://stripe.com))
- Convex deployment running (`npx convex dev`)

## Step 1: Get Stripe API Keys

1. Log into your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers → API keys**
3. Copy your **Test mode** keys (for development):
   - Publishable key (starts with `pk_test_`)
   - Secret key (starts with `sk_test_`)

## Step 2: Create Products and Prices

1. Go to **Products** in Stripe Dashboard
2. Create three products (Basic, Pro, Enterprise) with monthly pricing
3. Copy each product's price ID (starts with `price_`)

## Step 3: Set Up Webhook

1. In Stripe Dashboard, go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Set endpoint URL: `https://your-domain.com/api/stripe/webhook`
   - For local testing, use [Stripe CLI](https://stripe.com/docs/stripe-cli) or [ngrok](https://ngrok.com)
4. Select events to listen for (all subscription and payment events)
5. Copy the webhook signing secret (starts with `whsec_`)

## Step 4: Configure Environment Variables

Add these to your `.env.local` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs
STRIPE_PRICE_ID_BASIC=price_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_ENTERPRISE=price_...

# Optional: Customer Portal URL
NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL=https://billing.stripe.com/p/login/test_...
```

## Step 5: Enable Convex Integration

1. Start Convex development server:
   ```bash
   npx convex dev
   ```

2. The server will generate the necessary API files and sync the schema

3. Uncomment the Convex integration code in these files:
   - `/lib/stripe-sync.ts` - Remove TODO comments and uncomment imports/mutations
   - `/app/api/stripe/checkout/route.ts` - Uncomment Convex calls
   - `/components/subscription-status.tsx` - Uncomment useQuery hook

## Step 6: Configure Stripe Settings

In your Stripe Dashboard:

1. **Disable Cash App Pay** (Settings → Payment methods)
   - High fraud rate according to Theo's guide

2. **Enable "Limit customers to one subscription"** (Settings → Subscriptions)
   - Prevents duplicate subscriptions and race conditions

## Testing

1. Use Stripe test cards: https://stripe.com/docs/testing
2. Common test card: `4242 4242 4242 4242` (any future expiry, any CVC)
3. Test the flow:
   - Visit `/pricing`
   - Click "Get Started" on any plan
   - Complete checkout with test card
   - Verify redirect to `/success`
   - Check subscription status in your dashboard

## Local Development with Webhooks

For local webhook testing, use Stripe CLI:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to your Stripe account
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret and update .env.local
```

## Architecture Notes

This implementation follows Theo's recommendations:
- **Single source of truth**: All subscription data syncs from Stripe to Convex
- **No split brain**: Avoids race conditions by always syncing full state
- **Customer-first**: Creates Stripe customer before checkout
- **Resilient webhooks**: Handles all relevant events with single sync function

## Troubleshooting

- **"Cannot find module '@/convex/_generated/api'"**: Run `npx convex dev` first
- **Webhook signature verification failed**: Check STRIPE_WEBHOOK_SECRET is correct
- **Checkout fails**: Verify all price IDs are set in environment variables
- **Subscription not updating**: Check webhook endpoint is receiving events

## Production Checklist

- [ ] Switch to live mode API keys
- [ ] Update webhook endpoint to production URL
- [ ] Configure production Convex deployment
- [ ] Set up monitoring for failed payments
- [ ] Configure customer portal settings
- [ ] Test with real payment methods