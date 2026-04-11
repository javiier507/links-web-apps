import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql/web";

import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from "../environment";

const client = createClient({
    url: TURSO_DATABASE_URL as string,
    authToken: TURSO_AUTH_TOKEN as string,
});

export const db = drizzle(client);
