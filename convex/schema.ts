import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  {
    documents: defineTable({
      title: v.string(),
      userId: v.string(),
      isDeleted: v.boolean(),
      isArchived: v.boolean(),
      isPublished: v.boolean(),
      childDocsCount: v.number(),
      icon: v.optional(v.string()),
      content: v.optional(v.string()),
      coverImage: v.optional(v.string()),
      parentDocument: v.optional(v.id("documents")),
    })
      .index("by_user", ["userId"])
      .index("by_user_parent", ["userId", "parentDocument"]),
  },
  { schemaValidation: true }
);
