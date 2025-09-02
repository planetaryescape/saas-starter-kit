import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const listAccounts = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("accounts"),
      _creationTime: v.number(),
      userId: v.id("users"),
      name: v.string(),
      type: v.union(
        v.literal("current"),
        v.literal("savings"),
        v.literal("credit"),
        v.literal("investment"),
        v.literal("other"),
      ),
      currency: v.string(),
      currentBalance: v.optional(v.number()),
      lastSyncedAt: v.optional(v.number()),
      isActive: v.boolean(),
      bankName: v.optional(v.string()),
      lastFourDigits: v.optional(v.string()),
    }),
  ),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return []

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first()

    if (!user) return []

    return await ctx.db
      .query("accounts")
      .withIndex("by_user_and_active", (q) => q.eq("userId", user._id).eq("isActive", true))
      .collect()
  },
})

export const createAccount = mutation({
  args: {
    name: v.string(),
    type: v.union(
      v.literal("current"),
      v.literal("savings"),
      v.literal("credit"),
      v.literal("investment"),
      v.literal("other"),
    ),
    currency: v.string(),
    bankName: v.optional(v.string()),
    lastFourDigits: v.optional(v.string()),
    currentBalance: v.optional(v.number()),
  },
  returns: v.id("accounts"),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first()

    if (!user) throw new Error("User not found")

    return await ctx.db.insert("accounts", {
      userId: user._id,
      name: args.name,
      type: args.type,
      currency: args.currency,
      bankName: args.bankName,
      lastFourDigits: args.lastFourDigits,
      currentBalance: args.currentBalance,
      isActive: true,
      lastSyncedAt: Date.now(),
    })
  },
})

export const updateAccount = mutation({
  args: {
    id: v.id("accounts"),
    name: v.optional(v.string()),
    currentBalance: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const account = await ctx.db.get(args.id)
    if (!account) throw new Error("Account not found")

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first()

    if (!user || account.userId !== user._id) {
      throw new Error("Unauthorized")
    }

    const updates: any = {}
    if (args.name !== undefined) updates.name = args.name
    if (args.currentBalance !== undefined) {
      updates.currentBalance = args.currentBalance
      updates.lastSyncedAt = Date.now()
    }
    if (args.isActive !== undefined) updates.isActive = args.isActive

    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(args.id, updates)
    }

    return null
  },
})

export const deleteAccount = mutation({
  args: { id: v.id("accounts") },
  returns: v.null(),
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const account = await ctx.db.get(id)
    if (!account) throw new Error("Account not found")

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first()

    if (!user || account.userId !== user._id) {
      throw new Error("Unauthorized")
    }

    // Check if account has transactions
    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_account", (q) => q.eq("accountId", id))
      .first()

    if (transactions) {
      // Soft delete by marking as inactive
      await ctx.db.patch(id, { isActive: false })
    } else {
      // Hard delete if no transactions
      await ctx.db.delete(id)
    }

    return null
  },
})
