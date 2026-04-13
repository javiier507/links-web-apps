import { type NextRequest, NextResponse } from "next/server";

import { MetadataSchema } from "@repo/api/link";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const url = body.url;

    if (!url || typeof url !== "string") {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; Wlinks/1.0)",
            },
            signal: AbortSignal.timeout(5000),
        });

        const html = await response.text();

        const ogTitle = ExtractMetaContent(html, "og:title");
        const ogImage = ExtractMetaContent(html, "og:image");
        const htmlTitle = ExtractHtmlTitle(html);

        const title = ogTitle || htmlTitle || url;

        const metadata = MetadataSchema.parse({
            title,
            image: ogImage ? { url: ogImage } : null,
        });

        return NextResponse.json(metadata);
    } catch {
        return NextResponse.json({ title: url, image: null });
    }
}

function ExtractMetaContent(html: string, property: string): string | null {
    const regex = new RegExp(
        `<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`,
        "i",
    );
    const match = html.match(regex);
    if (match) return match[1] ?? null;

    // Try reversed order (content before property)
    const regexReversed = new RegExp(
        `<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["']`,
        "i",
    );
    const matchReversed = html.match(regexReversed);
    return matchReversed?.[1] ?? null;
}

function ExtractHtmlTitle(html: string): string | null {
    const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    return match?.[1]?.trim() ?? null;
}
