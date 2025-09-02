import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  numbers: defineTable({
    value: v.number(),
  }),

  users: defineTable({
    clerkId: v.string(),
    stripeCustomerId: v.optional(v.string()),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    monthStartDay: v.optional(v.number()), // 1-31, day of month when financial month starts
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_stripe_customer_id", ["stripeCustomerId"]),

  subscriptions: defineTable({
    userId: v.id("users"),
    stripeCustomerId: v.string(),
    subscriptionId: v.optional(v.string()),
    status: v.string(),
    priceId: v.optional(v.string()),
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
    paymentMethodBrand: v.optional(v.string()),
    paymentMethodLast4: v.optional(v.string()),
  })
    .index("by_user_id", ["userId"])
    .index("by_stripe_customer_id", ["stripeCustomerId"])
    .index("by_subscription_id", ["subscriptionId"]),

  // Finance tracking tables
  accounts: defineTable({
    userId: v.id("users"),
    name: v.string(),
    type: v.union(
      v.literal("current"),
      v.literal("savings"),
      v.literal("credit"),
      v.literal("investment"),
      v.literal("other"),
    ),
    currency: v.string(), // ISO 4217 code (GBP, USD, EUR, etc.)
    currentBalance: v.optional(v.number()),
    lastSyncedAt: v.optional(v.number()),
    isActive: v.boolean(),
    bankName: v.optional(v.string()),
    lastFourDigits: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_active", ["userId", "isActive"]),

  categories: defineTable({
    userId: v.id("users"),
    name: v.string(),
    type: v.union(v.literal("income"), v.literal("expense"), v.literal("transfer")),
    parentId: v.optional(v.id("categories")),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
    isSystem: v.boolean(), // System categories can't be deleted
    sortOrder: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_type", ["userId", "type"])
    .index("by_parent", ["parentId"]),

  transactions: defineTable({
    userId: v.id("users"),
    accountId: v.id("accounts"),
    categoryId: v.optional(v.id("categories")),
    amount: v.number(), // Always positive, direction determines sign
    direction: v.union(
      v.literal("in"), // Money coming in (income, transfers in)
      v.literal("out"), // Money going out (expenses, transfers out)
    ),
    transactionDate: v.string(), // YYYY-MM-DD format
    description: v.string(),
    merchant: v.optional(v.string()),
    notes: v.optional(v.string()),
    kind: v.union(
      v.literal("expense"),
      v.literal("income"),
      v.literal("transfer"),
      v.literal("adjustment"),
    ),
    relatedTransactionId: v.optional(v.id("transactions")), // For transfers
    canonicalId: v.optional(v.string()), // For deduplication
    importId: v.optional(v.string()), // Track which import batch
    isRecurring: v.boolean(),
    isExcludedFromAnalytics: v.boolean(),
    attachments: v.optional(v.array(v.string())), // File URLs
  })
    .index("by_user", ["userId"])
    .index("by_account", ["accountId"])
    .index("by_category", ["categoryId"])
    .index("by_user_and_date", ["userId", "transactionDate"])
    .index("by_canonical_id", ["canonicalId"])
    .index("by_related", ["relatedTransactionId"]),

  imports: defineTable({
    userId: v.id("users"),
    fileName: v.string(),
    bankType: v.string(),
    accountId: v.id("accounts"),
    rowCount: v.number(),
    importedCount: v.number(),
    duplicateCount: v.number(),
    errorCount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed"),
    ),
    errors: v.optional(v.array(v.string())),
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),
})
