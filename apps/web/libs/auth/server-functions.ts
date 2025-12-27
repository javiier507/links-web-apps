import { auth } from "./";

export async function getAuthUser() {
    const session = await auth();
    return session?.user ?? null;
}
