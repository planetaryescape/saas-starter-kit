import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { generateCanonicalId } from "../lib/finance/deduplication/canonical-id"
import { parseCSV } from "../lib/finance/parsers"

export const processImportCSV = mutation({
  args: {
    accountId: v.id("accounts"),
    csvContent: v.string(),
    fileName: v.string(),
  },
  returns: v.object({
    success: v.boolean(),
    importedCount: v.number(),
    duplicateCount: v.number(),
    errorCount: v.number(),
    errors: v.array(v.string()),
  }),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first()

    if (!user) throw new Error("User not found")

    // Verify account belongs to user
    const account = await ctx.db.get(args.accountId)
    if (!account || account.userId !== user._id) {
      throw new Error("Account not found or unauthorized")
    }

    // Parse CSV
    const parseResult = parseCSV(args.csvContent)

    if (!parseResult.success) {
      return {
        success: false,
        importedCount: 0,
        duplicateCount: 0,
        errorCount: parseResult.errors.length,
        errors: parseResult.errors,
      }
    }

    // Create import record
    const importId = await ctx.db.insert("imports", {
      userId: user._id,
      fileName: args.fileName,
      bankType: parseResult.bankType,
      accountId: args.accountId,
      rowCount: parseResult.transactions.length,
      importedCount: 0,
      duplicateCount: 0,
      errorCount: 0,
      status: "processing",
      startedAt: Date.now(),
    })

    // Process transactions
    let importedCount = 0
    let duplicateCount = 0
    const errors: string[] = []

    for (const transaction of parseResult.transactions) {
      try {
        // Generate canonical ID for deduplication
        const canonicalId = generateCanonicalId({
          merchant: transaction.merchant || transaction.description,
          amount: transaction.amount,
          date: transaction.date,
          description: transaction.description,
          accountId: args.accountId,
        })

        // Check for duplicates
        const existing = await ctx.db
          .query("transactions")
          .withIndex("by_canonical_id", (q) => q.eq("canonicalId", canonicalId))
          .first()

        if (existing) {
          duplicateCount++
          continue
        }

        // Determine transaction kind and direction
        const amount = Math.abs(transaction.amount)
        const direction = transaction.amount >= 0 ? "in" : "out"
        let kind: "expense" | "income" | "transfer" | "adjustment" =
          direction === "in" ? "income" : "expense"

        if (transaction.type === "transfer") {
          kind = "transfer"
        }

        await ctx.db.insert("transactions", {
          userId: user._id,
          accountId: args.accountId,
          categoryId: undefined, // Will be auto-categorized later
          amount,
          direction,
          transactionDate: transaction.date,
          description: transaction.description,
          merchant: transaction.merchant,
          notes: transaction.reference,
          kind,
          canonicalId,
          importId,
          isRecurring: false,
          isExcludedFromAnalytics: false,
        })

        importedCount++
      } catch (error) {
        errors.push(
          `Transaction on ${transaction.date}: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        )
      }
    }

    // Update import with final counts
    await ctx.db.patch(importId, {
      status: "completed",
      importedCount,
      duplicateCount,
      errorCount: errors.length,
      errors,
      completedAt: Date.now(),
    })

    return {
      success: true,
      importedCount,
      duplicateCount,
      errorCount: errors.length,
      errors,
    }
  },
})

export const listImports = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("imports"),
      _creationTime: v.number(),
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
      .query("imports")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect()
  },
})

export const getImportById = query({
  args: { id: v.id("imports") },
  returns: v.union(
    v.object({
      _id: v.id("imports"),
      _creationTime: v.number(),
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
    }),
    v.null(),
  ),
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null

    const importRecord = await ctx.db.get(id)
    if (!importRecord) return null

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first()

    if (!user || importRecord.userId !== user._id) {
      return null
    }

    return importRecord
  },
})
