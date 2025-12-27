import { getAuthUser as getUserFromWeb } from "@/libs/auth/server-functions";
import { GetAuthUser as getUerFromApi } from "./resources";

/**
 * Obtain the user by authenticating, taking into account the Auth.js session and the API session.
 */
export async function GetAuthUser() {
    const webUser = await getUserFromWeb();

    if (!webUser) return null;

    const apiUser = await getUerFromApi();
    return apiUser;
}
