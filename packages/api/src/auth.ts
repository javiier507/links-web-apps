import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "./db";
import * as schema from "./db/auth-schema";
import {
    AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET,
    BETTER_AUTH_SECRET,
    BETTER_AUTH_URL,
} from "./environment";

export const auth = betterAuth({
    baseURL: BETTER_AUTH_URL,
    secret: BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, { provider: "sqlite", schema }),
    socialProviders: {
        google: {
            clientId: AUTH_GOOGLE_ID as string,
            clientSecret: AUTH_GOOGLE_SECRET as string,
        },
    },
});
