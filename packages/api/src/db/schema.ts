import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const links = sqliteTable("links", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    url: text("url").notNull(),
    title: text("title").notNull(),
    imageOriginalUrl: text("image_original_url"),
    imagePlaceholderUrl: text("image_placeholder_url"),
    tags: text("tags").notNull().default("[]"),
    userId: text("user_id").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
});
