import { Account, Client, Functions, TablesDB } from "node-appwrite";

import { APPWRITE_ENDPOINT, APPWRITE_PROJECT } from "./environment";

const client = new Client();

client.setEndpoint(APPWRITE_ENDPOINT as string).setProject(APPWRITE_PROJECT as string);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const functions = new Functions(client);

export { ExecutionMethod, ID } from "node-appwrite";
