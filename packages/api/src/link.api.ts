import { and, desc, eq, like, or, sql } from "drizzle-orm";

import { db } from "./db";
import { links } from "./db/schema";
import { getRandomPlaceholder } from "./utils/placeholder";

import type { CreateLinkRequest, Link, LinkList, LinkQuery } from "./link";

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

    // Cursor-based pagination: get items created before the cursor
    if (linkQuery?.cursorAfter) {
        const cursor = await db
            .select({ createdAt: links.createdAt })
            .from(links)
            .where(eq(links.id, linkQuery.cursorAfter))
            .limit(1);

        if (cursor[0]) {
            const cursorCondition = or(
                sql`${links.createdAt} < ${cursor[0].createdAt}`,
                and(
                    eq(links.createdAt, cursor[0].createdAt),
                    sql`${links.id} < ${linkQuery.cursorAfter}`,
                ),
            );
            if (cursorCondition) conditions.push(cursorCondition);
        }
    }

    const rows = await db
        .select()
        .from(links)
        .where(and(...conditions))
        .orderBy(desc(links.createdAt), desc(links.id))
        .limit(linkQuery?.limit ?? 100);

    const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(links)
        .where(eq(links.userId, userId));

    return {
        links: rows.map(ToLink),
        total: countResult[0]?.count ?? 0,
    };
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
