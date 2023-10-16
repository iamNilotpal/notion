import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const MAX_CHILD_DOCS_COUNT = 3;

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) throw new Error("Unauthorized");

    const userId = userIdentity.subject;
    if (!args.parentDocument)
      return ctx.db.insert("documents", {
        ...args,
        userId,
        isDeleted: false,
        isArchived: false,
        isPublished: false,
        childDocsCount: 0,
      });

    const parentDocument = await ctx.db.get(args.parentDocument);
    if (!parentDocument) throw new Error("No parent document found.");

    if (parentDocument.userId !== userId) throw new Error("Forbidden.");
    if (parentDocument.childDocsCount === MAX_CHILD_DOCS_COUNT)
      throw new Error("Max child documents reached.");

    await ctx.db.patch(parentDocument._id, {
      childDocsCount: parentDocument.childDocsCount + 1,
    });

    return ctx.db.insert("documents", {
      ...args,
      userId,
      isDeleted: false,
      isArchived: false,
      isPublished: false,
      childDocsCount: 0,
    });
  },
});

export const deleteDoc = mutation({
  args: { docId: v.id("documents") },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) throw new Error("Unauthorized");

    const userId = userIdentity.subject;
    const doc = await ctx.db.get(args.docId);

    if (!doc) throw new Error("Document not found.");
    if (doc.userId !== userId) throw new Error("Forbidden.");

    // if (doc.parentDocument)
    //   await ctx.db.patch(doc.parentDocument, {
    //     childDocsCount: doc.childDocsCount - 1,
    //   });

    await ctx.db.patch(doc._id, {
      isDeleted: true,
      // ...(!doc.parentDocument && { childDocsCount: doc.childDocsCount - 1 }),
    });
  },
});

export const archive = mutation({
  args: { docId: v.id("documents") },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) throw new Error("Unauthorized");

    const userId = userIdentity.subject;
    const doc = await ctx.db.get(args.docId);

    if (!doc) throw new Error("Document not found.");
    if (doc.userId !== userId) throw new Error("Forbidden.");

    await ctx.db.patch(doc._id, { isArchived: true });
  },
});

export const getTrashDocuments = query({
  args: {},
  async handler(ctx, args) {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) throw new Error("Unauthorized");

    const userId = userIdentity.subject;
    return ctx.db
      .query("documents")
      .withIndex("by_user", (query) => query.eq("userId", userId))
      .filter((query) => query.eq(query.field("isDeleted"), true))
      .collect();
  },
});

export const togglePublish = mutation({
  args: { docId: v.id("documents"), publish: v.boolean() },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) throw new Error("Unauthorized");

    const userId = userIdentity.subject;
    const doc = await ctx.db.get(args.docId);

    if (!doc) throw new Error("Document not found.");
    if (doc.userId !== userId) throw new Error("Forbidden.");

    await ctx.db.patch(doc._id, { isPublished: args.publish });
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
      .filter((query) => query.eq(query.field("isDeleted"), false))
      .filter((query) => query.eq(query.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});
