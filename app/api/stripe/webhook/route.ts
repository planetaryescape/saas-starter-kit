import { headers } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"
import { allowedStripeEvents, stripe } from "@/lib/stripe"
import { syncStripeDataToConvex } from "@/lib/stripe-sync"

// Disable body parsing for webhooks
export const runtime = "nodejs"

async function processEvent(event: Stripe.Event) {
  if (!allowedStripeEvents.includes(event.type)) {
    return
  }

  const { customer: customerId } = event?.data?.object as {
    customer: string
  }

  if (typeof customerId !== "string") {
    console.error(`[STRIPE WEBHOOK] Customer ID isn't string. Event type: ${event.type}`)
    return
  }

  return await syncStripeDataToConvex(customerId)
}

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 })
  }

  const body = await req.text()
  const signature = (await headers()).get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "")
  } catch (err) {
    console.error("[STRIPE WEBHOOK] Error verifying webhook signature:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    await processEvent(event)
  } catch (error) {
    console.error("[STRIPE WEBHOOK] Error processing event:", error)
    // We still return 200 to acknowledge receipt
  }

  return NextResponse.json({ received: true })
}
