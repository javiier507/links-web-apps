import {
    ApiKeyClient,
    ExecutionMethod,
    ID,
    Permission,
    Query,
    Role,
    SessionClient,
} from "./appwrite";
import { APPWRITE_DATABASE_ID, APPWRITE_TABLE_ID } from "./environment";
import { MetadataSchema } from "./link";
import { toLink } from "./link.mapper";
import { getRandomPlaceholder } from "./utils/placeholder";

import type { Functions, TablesDB } from "./appwrite";
import type { CreateLinkRequest, Link, LinkList, Metadata } from "./link";

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
    return session.secret;
}

export async function getLinks(sessionSecret: string): Promise<LinkList> {
    const { tablesDB } = await SessionClient(sessionSecret);

    const links = await tablesDB.listRows({
        databaseId: APPWRITE_DATABASE_ID as string,
        tableId: APPWRITE_TABLE_ID as string,
        queries: [Query.orderDesc("$sequence")],
    });

    return {
        rows: links.rows.map(toLink),
        total: links.total,
    };
}

export async function createLink(sessionSecret: string, request: CreateLinkRequest): Promise<Link> {
    const { tablesDB, functions } = await SessionClient(sessionSecret);

    const metadata = await getMetadata(functions, request.url);

    const newLink = await insertLink(tablesDB, {
        ...request,
        title: metadata.title,
        imageOriginalUrl: metadata.image?.url,
        imagePlaceholderUrl: getRandomPlaceholder(),
    });

    return newLink;
}

async function insertLink(tablesDB: TablesDB, request: CreateLinkRequest): Promise<Link> {
    const link = await tablesDB.createRow({
        databaseId: APPWRITE_DATABASE_ID as string,
        tableId: APPWRITE_TABLE_ID as string,
        rowId: ID.unique(),
        data: request,
        permissions: [
            Permission.read(Role.user(request.userId)),
            Permission.delete(Role.user(request.userId)),
            Permission.update(Role.user(request.userId)),
        ],
    });

    return toLink(link);
}

async function getMetadata(functions: Functions, url: string): Promise<Metadata> {
    try {
        const response = await functions.createExecution(
            "get-metadata-function",
            JSON.stringify({ url }),
            false,
            "/",
            ExecutionMethod.POST,
        );
        const { success, data, error } = MetadataSchema.safeParse(
            JSON.parse(response.responseBody),
        );
        if (!success) {
            console.error(error);
            throw new Error("Failed to fetch metadata");
        }
        return data;
    } catch {
        return {
            title: url,
        };
    }
}
