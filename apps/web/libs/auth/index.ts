import { auth } from "@repo/api/auth";
import { headers } from "next/headers";

export async function GetSession() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session;
}

export async function GetAuthUser() {
    const session = await GetSession();
    return session?.user ?? null;
}
