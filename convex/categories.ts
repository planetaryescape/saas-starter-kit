import { v } from "convex/values"
import { getFlatCategories } from "../lib/finance/default-categories"
import type { Id } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"

export const seedDefaultCategories = mutation({
  args: { userId: v.id("users") },
  returns: v.null(),
  handler: async (ctx, { userId }) => {
    // Check if user already has categories
    const existingCategories = await ctx.db
      .query("categories")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first()

    if (existingCategories) {
      return null // User already has categories
    }

    const flatCategories = getFlatCategories()
    const parentMap = new Map<string, Id<"categories">>() // Map parent names to IDs

    let sortOrder = 0

    for (const category of flatCategories) {
      const parentId = category.parentName
        ? parentMap.get(`${category.parentName}_${category.type}`)
        : undefined

      const categoryId = await ctx.db.insert("categories", {
        userId,
        name: category.name,
        type: category.type,
        parentId,
        icon: category.icon,
        color: category.color,
        isSystem: category.isSystem,
        sortOrder: sortOrder++,
      })

      // Store parent categories for reference
      if (!category.parentName) {
        parentMap.set(`${category.name}_${category.type}`, categoryId)
      }
    }

    return null
  },
})

export const listCategories = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("categories"),
      _creationTime: v.number(),
      userId: v.id("users"),
      name: v.string(),
      type: v.union(v.literal("income"), v.literal("expense"), v.literal("transfer")),
      parentId: v.optional(v.id("categories")),
      icon: v.optional(v.string()),
      color: v.optional(v.string()),
      isSystem: v.boolean(),
      sortOrder: v.number(),
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
      .query("categories")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("asc")
      .collect()
  },
})

export const createCategory = mutation({
  args: {
    name: v.string(),
    type: v.union(v.literal("income"), v.literal("expense"), v.literal("transfer")),
    parentId: v.optional(v.id("categories")),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  returns: v.id("categories"),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first()

    if (!user) throw new Error("User not found")

    // Get max sort order
    const categories = await ctx.db
      .query("categories")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect()

    const maxSortOrder = Math.max(...categories.map((c) => c.sortOrder), -1)

    return await ctx.db.insert("categories", {
      userId: user._id,
      name: args.name,
      type: args.type,
      parentId: args.parentId,
      icon: args.icon,
      color: args.color,
      isSystem: false,
      sortOrder: maxSortOrder + 1,
    })
  },
})

export const updateCategory = mutation({
  args: {
    id: v.id("categories"),
    name: v.optional(v.string()),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const category = await ctx.db.get(args.id)
    if (!category) throw new Error("Category not found")

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first()

    if (!user || category.userId !== user._id) {
      throw new Error("Unauthorized")
    }

    const updates: any = {}
    if (args.name !== undefined) updates.name = args.name
    if (args.icon !== undefined) updates.icon = args.icon
    if (args.color !== undefined) updates.color = args.color

    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(args.id, updates)
    }

    return null
  },
})

export const deleteCategory = mutation({
  args: { id: v.id("categories") },
  returns: v.null(),
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const category = await ctx.db.get(id)
    if (!category) throw new Error("Category not found")

    if (category.isSystem) {
      throw new Error("Cannot delete system categories")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first()

    if (!user || category.userId !== user._id) {
      throw new Error("Unauthorized")
    }

    // Check if category has transactions
    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_category", (q) => q.eq("categoryId", id))
      .first()

    if (transactions) {
      throw new Error("Cannot delete category with transactions")
    }

    // Check if category has children
    const children = await ctx.db
      .query("categories")
      .withIndex("by_parent", (q) => q.eq("parentId", id))
      .first()

    if (children) {
      throw new Error("Cannot delete category with subcategories")
    }

    await ctx.db.delete(id)
    return null
  },
})
