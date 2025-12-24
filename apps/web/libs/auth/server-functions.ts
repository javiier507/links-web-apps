import { auth } from "./";

export async function isAuth(): Promise<boolean> {
    const session = await auth();
    return !!session?.user;
}

export async function getAuthUser() {
    const session = await auth();
    return session?.user ?? null;
}
