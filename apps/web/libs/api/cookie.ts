import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "wlinks.cookie.token";

export async function SetSession(sessionSecret: string) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionSecret, {
        httpOnly: true,
        secure: true,
    });
}

export async function GetSessionSecret() {
    const cookieStore = await cookies();
    const sessionSecret = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    return sessionSecret ?? null;
}

export async function DeleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}
