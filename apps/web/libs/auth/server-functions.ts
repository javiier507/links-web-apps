import { auth } from "./";

export async function isAuth(): Promise<boolean> {
    const session = await auth();
    return !!session?.user;
}

export async function getAuthUser() {
    const session = await auth();

    return session?.user ?? null;
}

//

import { cookies } from "next/headers";

import { SessionClient } from "@repo/api/appwrite";

export async function getAuthCookie() {
    const cookieStore = await cookies();
    const sessionSecret = cookieStore.get("my-custom-session")?.value;
    return sessionSecret ?? null;
}

export async function getAuthUserFromAppwrite() {
    const sessionSecret = await getAuthCookie();

    if (!sessionSecret) return null;

    try {
        const { account } = await SessionClient(sessionSecret);
        return await account.get();
    } catch (error) {
        console.error(error);
        return null;
    }
}
