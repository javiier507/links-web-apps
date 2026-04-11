import type { LinkQuery, Metadata } from "@repo/api/link";
import { LINKS_PER_PAGE, MetadataSchema } from "@repo/api/link";
import { createLink, deleteLink, getLinks } from "@repo/api/link.api";

import { GetAuthUser } from "@/libs/auth";

export async function GetLinks(linkQuery?: LinkQuery) {
    const user = await GetAuthUser();

    if (!user) return { links: [], total: 0 };

    return getLinks(user.id, linkQuery);
}

export async function GetLinksPage(page: number, search?: string) {
    const offset = (page - 1) * LINKS_PER_PAGE;
    return GetLinks({ limit: LINKS_PER_PAGE, offset, search });
}

export async function CreateLink(url: string) {
    const user = await GetAuthUser();
    if (!user)
        throw new Error("Unauthorized", {
            cause: "No user found",
        });

    const metadata = await FetchMetadata(url);

    return createLink({
        url,
        title: metadata.title,
        tags: [],
        userId: user.id,
        imageOriginalUrl: metadata.image?.url,
        imagePlaceholderUrl: undefined,
    });
}

export async function DeleteLink(linkId: string) {
    const user = await GetAuthUser();
    if (!user)
        throw new Error("Unauthorized", {
            cause: "No user found",
        });

    return deleteLink(user.id, linkId);
}

async function FetchMetadata(url: string): Promise<Metadata> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/metadata`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            },
        );

        const data = await response.json();
        const result = MetadataSchema.safeParse(data);

        if (result.success) return result.data;
    } catch (error) {
        console.error("Failed to fetch metadata:", error);
    }

    return { title: url };
}
