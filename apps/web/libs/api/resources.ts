import { SessionClient } from "@repo/api/appwrite";
import { getLinks } from "@repo/api/link.api";

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

    if (!sessionSecret) throw new Error("No session secret found");

    return getLinks(sessionSecret);
}
