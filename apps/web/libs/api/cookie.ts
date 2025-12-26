import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "wlinks.cookie.token";

export async function SetSession(session: { secret: string; expire: string }) {
    const cookieStore = await cookies();

    const expireDate = new Date(session.expire);

    cookieStore.set(SESSION_COOKIE_NAME, session.secret, {
        httpOnly: true,
        secure: true,
        //TODO: esta expirando en 6 meses, no en 12 como deberia. Revisar docs de Next.js
        expires: expireDate,
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
