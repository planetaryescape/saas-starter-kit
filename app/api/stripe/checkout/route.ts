import { auth, currentUser } from "@clerk/nextjs/server"
import { type NextRequest, NextResponse } from "next/server"
import { STRIPE_PRICE_IDS, stripe } from "@/lib/stripe"
// import { ConvexHttpClient } from "convex/browser"
// TODO: Uncomment after running `npx convex dev`
// import { internal } from '@/convex/_generated/api';

// const convexClient = process.env.NEXT_PUBLIC_CONVEX_URL
//   ? new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL)
//   : null

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 })
    }

    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await req.json()
    const { priceId } = body

    if (!priceId || !Object.values(STRIPE_PRICE_IDS).includes(priceId)) {
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 })
    }

    // TODO: Uncomment after running `npx convex dev`
    // Get or create user in Convex
    // const { userId: convexUserId, stripeCustomerId: existingCustomerId } =
    //   await convexClient.mutation(internal.stripe.getOrCreateUser, {
    //     clerkId: userId,
    //     email: user.emailAddresses[0]?.emailAddress,
    //     name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || undefined,
    //     imageUrl: user.imageUrl,
    //   });

    // For now, we'll create a customer directly
    let stripeCustomerId: string

    // Check if customer exists (in production, this would come from Convex)
    const customers = await stripe.customers.list({
      email: user.emailAddresses[0]?.emailAddress,
      limit: 1,
    })

    if (customers.data.length > 0) {
      stripeCustomerId = customers.data[0].id
    } else {
      const newCustomer = await stripe.customers.create({
        email: user.emailAddresses[0]?.emailAddress,
        metadata: {
          clerkId: userId,
        },
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username || undefined,
      })
      stripeCustomerId = newCustomer.id

      // TODO: Uncomment after running `npx convex dev`
      // Store the Stripe customer ID in Convex
      // await convexClient.mutation(internal.stripe.updateUserStripeCustomerId, {
      //   userId: convexUserId,
      //   stripeCustomerId: newCustomer.id,
      // });
    }

    const checkout = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/pricing`,
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
          clerkId: userId,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
    })

    return NextResponse.json({ url: checkout.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
