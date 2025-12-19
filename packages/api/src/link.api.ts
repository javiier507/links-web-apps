import { ExecutionMethod, Query, account, functions, tablesDB } from "./appwrite";
import { APPWRITE_DATABASE_ID, APPWRITE_TABLE_ID } from "./environment";

import { toLink } from "./link.mapper";

import type { LinkList } from "./link";

export async function getLinks(): Promise<LinkList> {
    const links = await tablesDB.listRows({
        databaseId: APPWRITE_DATABASE_ID as string,
        tableId: APPWRITE_TABLE_ID as string,
        queries: [Query.limit(100), Query.offset(0)],
    });

    return {
        rows: links.rows.map(toLink),
        total: links.total,
    };
}

export async function googleSignIn(token: string): Promise<boolean> {
    const response = await functions.createExecution(
        "google-sign-in-function",
        JSON.stringify({ token }),
        false,
        "/",
        ExecutionMethod.POST,
    );

    console.log(response.responseStatusCode);
    if (response.responseStatusCode !== 200) {
        console.error(response.responseBody);
        return false;
    }

    const responseBody = JSON.parse(response.responseBody);
    await account.createSession(responseBody.userId, responseBody.secret);
    return true;
}
