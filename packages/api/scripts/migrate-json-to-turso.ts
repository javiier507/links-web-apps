import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { links } from "../src/db/schema";

type AppwriteLink = {
    $id: string;
    url: string;
    title: string;
    tags: string[];
    userId: string;
    imageOriginalUrl?: string | null;
    imagePlaceholderUrl?: string | null;
    deleted?: unknown;
    $createdAt: string;
    $updatedAt: string;
};

type AppwriteExport = {
    total: number;
    rows: AppwriteLink[];
};

const JSON_PATH = resolve(import.meta.dirname, "../Appwrite Links Database.json");

const TURSO_URL = process.env.TURSO_DATABASE_URL;
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!TURSO_URL || !TURSO_TOKEN) {
    console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
    process.exit(1);
}

const client = createClient({
    url: TURSO_URL,
    authToken: TURSO_TOKEN,
});

const db = drizzle(client);

async function Migrate() {
    const raw = readFileSync(JSON_PATH, "utf-8");
    const data: AppwriteExport = JSON.parse(raw);
    const rows = data.rows.filter((row) => !row.deleted);

    console.log(
        `Migrando ${rows.length} links (${data.total - rows.length} eliminados ignorados)...`,
    );

    let inserted = 0;

    for (const link of rows) {
        await db.insert(links).values({
            id: link.$id,
            url: link.url,
            title: link.title,
            tags: JSON.stringify(link.tags ?? []),
            userId: link.userId,
            imageOriginalUrl: link.imageOriginalUrl ?? null,
            imagePlaceholderUrl: link.imagePlaceholderUrl ?? null,
            createdAt: new Date(link.$createdAt),
            updatedAt: new Date(link.$updatedAt),
        });
        inserted++;
    }

    console.log(`Migración completada. ${inserted} links insertados.`);
    process.exit(0);
}

Migrate().catch((err) => {
    console.error("Error en migración:", err);
    process.exit(1);
});
