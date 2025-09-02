import { v } from "convex/values"
import { internalMutation, internalQuery, query } from "./_generated/server"

export const getOrCreateUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  returns: v.object({
    userId: v.id("users"),
    stripeCustomerId: v.union(v.string(), v.null()),
  }),
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique()

    if (existingUser) {
      return {
        userId: existingUser._id,
        stripeCustomerId: existingUser.stripeCustomerId ?? null,
      }
    }

    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      imageUrl: args.imageUrl,
    })

    return {
      userId,
      stripeCustomerId: null,
    }
  },
})

export const updateUserStripeCustomerId = internalMutation({
  args: {
    userId: v.id("users"),
    stripeCustomerId: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      stripeCustomerId: args.stripeCustomerId,
    })
    return null
  },
})

export const syncSubscriptionData = internalMutation({
  args: {
    stripeCustomerId: v.string(),
    subscriptionData: v.union(
      v.object({
        subscriptionId: v.string(),
        status: v.string(),
        priceId: v.string(),
        currentPeriodStart: v.number(),
        currentPeriodEnd: v.number(),
        cancelAtPeriodEnd: v.boolean(),
        paymentMethodBrand: v.union(v.string(), v.null()),
        paymentMethodLast4: v.union(v.string(), v.null()),
      }),
      v.object({
        status: v.literal("none"),
      }),
    ),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_stripe_customer_id", (q) => q.eq("stripeCustomerId", args.stripeCustomerId))
      .unique()

    if (!user) {
      console.error(`User not found for Stripe customer ${args.stripeCustomerId}`)
      return null
    }

    const existingSubscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .unique()

    const subscriptionDataToStore =
      "subscriptionId" in args.subscriptionData
        ? {
            userId: user._id,
            stripeCustomerId: args.stripeCustomerId,
            subscriptionId: args.subscriptionData.subscriptionId,
            status: args.subscriptionData.status,
            priceId: args.subscriptionData.priceId,
            currentPeriodStart: args.subscriptionData.currentPeriodStart,
            currentPeriodEnd: args.subscriptionData.currentPeriodEnd,
            cancelAtPeriodEnd: args.subscriptionData.cancelAtPeriodEnd,
            paymentMethodBrand: args.subscriptionData.paymentMethodBrand ?? undefined,
            paymentMethodLast4: args.subscriptionData.paymentMethodLast4 ?? undefined,
          }
        : {
            userId: user._id,
            stripeCustomerId: args.stripeCustomerId,
            status: "none",
          }

    if (existingSubscription) {
      await ctx.db.replace(existingSubscription._id, subscriptionDataToStore)
    } else {
      await ctx.db.insert("subscriptions", subscriptionDataToStore)
    }

    return null
  },
})

export const getUserByClerkId = internalQuery({
  args: { clerkId: v.string() },
  returns: v.union(
    v.object({
      userId: v.id("users"),
      stripeCustomerId: v.union(v.string(), v.null()),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique()

    if (!user) return null

    return {
      userId: user._id,
      stripeCustomerId: user.stripeCustomerId ?? null,
    }
  },
})

export const getSubscription = query({
  args: {},
  returns: v.union(
    v.object({
      subscriptionId: v.union(v.string(), v.null()),
      status: v.string(),
      priceId: v.union(v.string(), v.null()),
      currentPeriodStart: v.union(v.number(), v.null()),
      currentPeriodEnd: v.union(v.number(), v.null()),
      cancelAtPeriodEnd: v.union(v.boolean(), v.null()),
      paymentMethodBrand: v.union(v.string(), v.null()),
      paymentMethodLast4: v.union(v.string(), v.null()),
    }),
    v.null(),
  ),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique()

    if (!user) return null

    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .unique()

    if (!subscription) return null

    return {
      subscriptionId: subscription.subscriptionId ?? null,
      status: subscription.status,
      priceId: subscription.priceId ?? null,
      currentPeriodStart: subscription.currentPeriodStart ?? null,
      currentPeriodEnd: subscription.currentPeriodEnd ?? null,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd ?? null,
      paymentMethodBrand: subscription.paymentMethodBrand ?? null,
      paymentMethodLast4: subscription.paymentMethodLast4 ?? null,
    }
  },
})
