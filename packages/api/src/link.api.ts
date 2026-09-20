import { and, desc, eq, like, or, sql } from "drizzle-orm";

import { db } from "./db";
import { links } from "./db/schema";
import { getRandomPlaceholder } from "./utils/placeholder";

import { UpdateLinkTagsSchema } from "./link";
import type { CreateLinkRequest, Link, LinkList, LinkQuery, UpdateLinkTagsRequest } from "./link";

function ToLink(row: typeof links.$inferSelect): Link {
    return {
        ...row,
        tags: JSON.parse(row.tags),
    };
}

export async function getLinks(userId: string, linkQuery?: LinkQuery): Promise<LinkList> {
    const conditions = [eq(links.userId, userId)];

    if (linkQuery?.search) {
        const searchCondition = or(
            like(links.title, `%${linkQuery.search}%`),
            like(links.tags, `%${linkQuery.search}%`),
        );
        if (searchCondition) conditions.push(searchCondition);
    }

    const limit = linkQuery?.limit ?? 100;
    const offset = linkQuery?.offset ?? 0;

    const rows = await db
        .select()
        .from(links)
        .where(and(...conditions))
        .orderBy(desc(links.createdAt), desc(links.id))
        .limit(limit)
        .offset(offset);

    const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(links)
        .where(and(...conditions));

    return {
        links: rows.map(ToLink),
        total: countResult[0]?.count ?? 0,
    };
}

export async function getTags(userId: string): Promise<string[]> {
    const rows = await db
        .selectDistinct({ tag: sql<string>`json_each.value` })
        .from(links)
        .innerJoin(sql`json_each(${links.tags})`, sql`true`)
        .where(eq(links.userId, userId))
        .orderBy(sql`json_each.value`);

    return rows.map((row) => row.tag);
}

export async function createLink(request: CreateLinkRequest): Promise<Link> {
    const [newLink] = await db
        .insert(links)
        .values({
            url: request.url,
            title: request.title,
            tags: JSON.stringify(request.tags ?? []),
            userId: request.userId,
            imageOriginalUrl: request.imageOriginalUrl ?? null,
            imagePlaceholderUrl: request.imagePlaceholderUrl ?? getRandomPlaceholder(),
        })
        .returning();

    if (!newLink) throw new Error("Failed to create link");
    return ToLink(newLink);
}

export async function deleteLink(userId: string, linkId: string): Promise<void> {
    await db.delete(links).where(and(eq(links.id, linkId), eq(links.userId, userId)));
}

export async function updateLinkTags(
    userId: string,
    linkId: string,
    request: UpdateLinkTagsRequest,
): Promise<Link> {
    const validatedRequest = UpdateLinkTagsSchema.parse(request);
    const [updatedLink] = await db
        .update(links)
        .set({
            tags: JSON.stringify(validatedRequest.tags),
            updatedAt: new Date(),
        })
        .where(and(eq(links.id, linkId), eq(links.userId, userId)))
        .returning();

    if (!updatedLink) throw new Error("Link not found");
    return ToLink(updatedLink);
}
