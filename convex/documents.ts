import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
// import { Doc, Id } from './_generated/dataModel';

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) throw new Error("Unauthorized");

    const userId = userIdentity.subject;
    const document = await ctx.db.insert("documents", {
      ...args,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) throw new Error("Unauthorized");

    const documents = await ctx.db.query("documents").collect();
    return documents;
  },
});

export const getSidebarData = query({
  args: { parentDocument: v.optional(v.id("documents")) },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) throw new Error("Unauthorized");

    const userId = userIdentity.subject;
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (query) =>
        query.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((query) => query.eq(query.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});
