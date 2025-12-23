import { Account, Client, Functions, TablesDB } from "node-appwrite";

import { APPWRITE_ENDPOINT, APPWRITE_PROJECT, APPWRITE_WEB_AUTH_API_KEY } from "./environment";

const client = new Client();

client
    .setEndpoint(APPWRITE_ENDPOINT as string)
    .setProject(APPWRITE_PROJECT as string)
    .setKey(APPWRITE_WEB_AUTH_API_KEY as string);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const functions = new Functions(client);

export { ExecutionMethod, ID, Query } from "node-appwrite";

//

export async function createSessionClient(sessionSecret: string) {
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
