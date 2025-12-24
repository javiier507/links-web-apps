import { SessionClient } from "@repo/api/appwrite";
import { createLink, getLinks } from "@repo/api/link.api";

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

export async function GetLinks() {
    const sessionSecret = await GetSessionSecret();

    // workaround for avoing errors when the user is logging in
    if (!sessionSecret) return { rows: [], total: 0 };

    return getLinks(sessionSecret);
}

export async function CreateLink(url: string) {
    const sessionSecret = await GetSessionSecret();
    if (!sessionSecret)
        throw new Error("Unauthorized", {
            cause: "No session secret found",
        });

    const authUser = await GetAuthUser();
    if (!authUser)
        throw new Error("Unauthorized", {
            cause: "No user found",
        });

    return createLink(sessionSecret, {
        url,
        title: url,
        tags: [],
        userId: authUser.$id,
    });
}
