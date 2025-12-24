import { ApiKeyClient, ExecutionMethod, Query, SessionClient } from "./appwrite";
import { APPWRITE_DATABASE_ID, APPWRITE_TABLE_ID } from "./environment";
import type { LinkList } from "./link";
import { toLink } from "./link.mapper";

export async function googleSignIn(token: string): Promise<string | null> {
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
    console.log(session);
    return session.secret;
}

export async function getLinks(sessionSecret: string): Promise<LinkList> {
    const { tablesDB: table } = await SessionClient(sessionSecret);

    const links = await table.listRows({
        databaseId: APPWRITE_DATABASE_ID as string,
        tableId: APPWRITE_TABLE_ID as string,
        queries: [Query.orderDesc("$sequence")],
    });

    return {
        rows: links.rows.map(toLink),
        total: links.total,
    };
}
