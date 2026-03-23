import { SessionClient } from "@repo/api/appwrite";
import type { LinkQuery, Metadata } from "@repo/api/link";
import { MetadataSchema } from "@repo/api/link";
import { createLink, deleteLink, getLinks } from "@repo/api/link.api";

import { GetSessionSecret } from "@/libs/api/cookie";

export async function GetAuthUser() {
    const sessionSecret = await GetSessionSecret();

    if (!sessionSecret) return null;

    try {
        const { account } = await SessionClient(sessionSecret);
        return await account.get();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function GetLinks(linkQuery?: LinkQuery) {
    const authUser = await GetAuthUser();

    if (!authUser) return { links: [], total: 0 };

    return getLinks(authUser.$id, linkQuery);
}

export async function CreateLink(url: string) {
    const authUser = await GetAuthUser();
    if (!authUser)
        throw new Error("Unauthorized", {
            cause: "No user found",
        });

    const metadata = await FetchMetadata(url);

    return createLink({
        url,
        title: metadata.title,
        tags: [],
        userId: authUser.$id,
        imageOriginalUrl: metadata.image?.url,
        imagePlaceholderUrl: undefined,
    });
}

export async function DeleteLink(linkId: string) {
    const authUser = await GetAuthUser();
    if (!authUser)
        throw new Error("Unauthorized", {
            cause: "No user found",
        });

    return deleteLink(authUser.$id, linkId);
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
