"use client"

// TODO: Uncomment after running `npx convex dev`
// import { useQuery } from 'convex/react';
// import { api } from '@/convex/_generated/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, CreditCard, Calendar, AlertCircle } from "lucide-react"
import { format } from "date-fns"

type SubscriptionData = {
  subscriptionId: string | null
  status: string
  priceId: string | null
  currentPeriodStart: number | null
  currentPeriodEnd: number | null
  cancelAtPeriodEnd: boolean | null
  paymentMethodBrand: string | null
  paymentMethodLast4: string | null
}

export function SubscriptionStatus() {
  // TODO: Uncomment after running `npx convex dev` and replace with:
  // const subscription = useQuery(api.stripe.getSubscription);

  // Temporary mock data - remove after Convex setup
  // Set to null to show free plan, or use mockSubscription to test paid plan UI
  const mockSubscription: SubscriptionData = {
    subscriptionId: "sub_mock123",
    status: "active",
    priceId: "price_mock123",
    currentPeriodStart: Date.now() / 1000 - 86400 * 15,
    currentPeriodEnd: Date.now() / 1000 + 86400 * 15,
    cancelAtPeriodEnd: false,
    paymentMethodBrand: "visa",
    paymentMethodLast4: "4242",
  }

  // Toggle this to test different states
  const USE_MOCK = false // Set to true to test subscription UI
  const subscription: SubscriptionData | null = USE_MOCK ? mockSubscription : null

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Free Plan
          </CardTitle>
          <CardDescription>You're currently on the free plan</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Upgrade to unlock premium features and unlimited AI conversations.
          </p>
          <Button asChild>
            <a href="/pricing">View Plans</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const isActive = subscription.status === "active" || subscription.status === "trialing"
  const planName = getPlanName(subscription.priceId)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          {planName} Plan
        </CardTitle>
        <CardDescription>
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
            }`}
          >
            {formatStatus(subscription.status)}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {subscription.currentPeriodEnd && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {subscription.cancelAtPeriodEnd
                ? `Cancels on ${format(new Date(subscription.currentPeriodEnd * 1000), "MMM d, yyyy")}`
                : `Renews on ${format(new Date(subscription.currentPeriodEnd * 1000), "MMM d, yyyy")}`}
            </span>
          </div>
        )}

        {subscription.paymentMethodBrand && (
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="capitalize">
              {subscription.paymentMethodBrand} ending in {subscription.paymentMethodLast4}
            </span>
          </div>
        )}

        {subscription.cancelAtPeriodEnd && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              Your subscription will be canceled at the end of the current billing period.
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" asChild>
            <a
              href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL || "https://billing.stripe.com/p/login/test"}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Manage Subscription
            </a>
          </Button>
          {!isActive && (
            <Button asChild>
              <a href="/pricing">Reactivate</a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function getPlanName(priceId: string | null): string {
  if (!priceId) return "Unknown"

  // These environment variables will be set when you configure Stripe
  const priceIdMap: Record<string, string> = {
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC || ""]: "Basic",
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO || ""]: "Pro",
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ENTERPRISE || ""]: "Enterprise",
  }

  return priceIdMap[priceId] || "Custom"
}

function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    active: "Active",
    canceled: "Canceled",
    incomplete: "Incomplete",
    incomplete_expired: "Expired",
    past_due: "Past Due",
    trialing: "Trial",
    unpaid: "Unpaid",
    paused: "Paused",
    none: "No Subscription",
  }

  return statusMap[status] || status
}
