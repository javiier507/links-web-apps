import { Account, Client, Functions, TablesDB } from "node-appwrite";

import { APPWRITE_ENDPOINT, APPWRITE_PROJECT, APPWRITE_WEB_AUTH_API_KEY } from "./environment";

export { ExecutionMethod, ID, Query, Permission, Role } from "node-appwrite";
export type { Account, TablesDB, Functions, Models } from "node-appwrite";

export async function ApiKeyClient() {
    const client = new Client()
        .setEndpoint(APPWRITE_ENDPOINT as string)
        .setProject(APPWRITE_PROJECT as string)
        .setKey(APPWRITE_WEB_AUTH_API_KEY as string);

    return {
        get account() {
            return new Account(client);
        },
        get functions() {
            return new Functions(client);
        },
    };
}

export async function SessionClient(sessionSecret: string) {
    const client = new Client()
        .setEndpoint(APPWRITE_ENDPOINT as string)
        .setProject(APPWRITE_PROJECT as string);

    client.setSession(sessionSecret);

    return {
        get account() {
            return new Account(client);
        },
        get tablesDB() {
            return new TablesDB(client);
        },
        get functions() {
            return new Functions(client);
        },
    };
}
