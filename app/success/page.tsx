import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { stripe } from "@/lib/stripe"
import { syncStripeDataToConvex } from "@/lib/stripe-sync"

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  const { userId } = await auth()

  if (!userId) {
    redirect("/")
  }

  if (!params.session_id) {
    redirect("/")
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(params.session_id, {
      expand: ["customer"],
    })

    if (!session.customer || typeof session.customer === "string") {
      throw new Error("Customer not found in session")
    }

    // Sync Stripe data to Convex
    // Note: This is currently commented out in the sync function until Convex is running
    await syncStripeDataToConvex(session.customer.id)

    // Redirect to dashboard or wherever you want users to go after successful payment
    redirect("/dashboard")
  } catch (error) {
    console.error("Error processing successful payment:", error)
    redirect("/")
  }
}
