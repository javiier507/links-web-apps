import { type Client, createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql/web";

import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from "../environment";

let CLIENT: Client | null = null;
let DB_INSTANCE: ReturnType<typeof drizzle> | null = null;

function GetDb() {
    if (!DB_INSTANCE) {
        if (!TURSO_DATABASE_URL) {
            throw new Error("TURSO_DATABASE_URL is not defined");
        }
        CLIENT = createClient({
            url: TURSO_DATABASE_URL,
            authToken: TURSO_AUTH_TOKEN,
        });
        DB_INSTANCE = drizzle(CLIENT);
    }
    return DB_INSTANCE;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
    get(_target, prop, receiver) {
        return Reflect.get(GetDb() as object, prop, receiver);
    },
});
