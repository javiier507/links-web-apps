import { ApiKeyClient, ExecutionMethod } from "./appwrite";

export async function googleSignIn(
    token: string,
): Promise<{ secret: string; expire: string } | null> {
    const { account, functions } = await ApiKeyClient();

    const response = await functions.createExecution(
        "google-sign-in-function",
        JSON.stringify({ token }),
        false,
        "/",
        ExecutionMethod.POST,
    );

    if (response.responseStatusCode !== 200) {
        console.error(response.responseBody);
        return null;
    }

    const responseBody = JSON.parse(response.responseBody);
    const session = await account.createSession(responseBody.userId, responseBody.secret);
    return {
        secret: session.secret,
        expire: session.expire,
    };
}
