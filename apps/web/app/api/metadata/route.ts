import { type NextRequest, NextResponse } from "next/server";
import ogs from "open-graph-scraper";

import { MetadataSchema } from "@repo/api/link";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const url = body.url;

    if (!url || typeof url !== "string") {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
        const { result } = await ogs({
            url,
            fetchOptions: {
                headers: { "User-Agent": "Mozilla/5.0 (compatible; Wlinks/1.0)" },
                signal: AbortSignal.timeout(5000),
            },
        });

        const title = result.ogTitle || result.dcTitle || url;
        const ogImage = result.ogImage?.[0]?.url ?? null;

        const metadata = MetadataSchema.parse({
            title,
            image: ogImage ? { url: ogImage } : null,
        });

        return NextResponse.json(metadata);
    } catch {
        return NextResponse.json({ title: url, image: null });
    }
}
