"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Link } from "@repo/api/link";

import { loadMoreLinksAction } from "@/app/(private)/actions";

import { LinksGrid } from "./LinksGrid";

const PAGE_SIZE = 100;

interface InfiniteLinksGridProps {
    initialLinks: Link[];
}

export function InfiniteLinksGrid({ initialLinks }: InfiniteLinksGridProps) {
    // Only store additional links loaded via infinity scroll in state
    // initialLinks (from props) is the source of truth for server-rendered data
    const [additionalLinks, setAdditionalLinks] = useState<Link[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialLinks.length === PAGE_SIZE);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    // Pattern: Use refs + state together to prevent callback recreation
    // - State triggers re-renders for UI updates
    // - Refs hold current values without causing callback dependencies
    // This prevents IntersectionObserver from recreating on every render
    const isLoadingRef = useRef(false);
    const hasMoreRef = useRef(hasMore);
    const cursorRef = useRef<string | null>(initialLinks[initialLinks.length - 1]?.$id ?? null);

    // Combine server-rendered links (initialLinks) with client-loaded links (additionalLinks)
    const allLinks = [...initialLinks, ...additionalLinks];

    // Sync refs with their corresponding state values
    // This ensures loadMore callback always reads the latest values without recreating
    useEffect(() => {
        hasMoreRef.current = hasMore;
    }, [hasMore]);

    // Update cursor to always point to the last link ID for pagination
    // Checks additionalLinks first, falls back to initialLinks
    useEffect(() => {
        const lastLink =
            additionalLinks[additionalLinks.length - 1] ?? initialLinks[initialLinks.length - 1];
        cursorRef.current = lastLink?.$id ?? null;
    }, [initialLinks, additionalLinks]);

    // Reset pagination state when initialLinks changes (e.g., after revalidatePath)
    // This ensures new server data is reflected and prevents duplicate links
    useEffect(() => {
        setAdditionalLinks([]);
        setHasMore(initialLinks.length === PAGE_SIZE);
        hasMoreRef.current = initialLinks.length === PAGE_SIZE;
        cursorRef.current = initialLinks[initialLinks.length - 1]?.$id ?? null;
    }, [initialLinks]);

    // Stable callback with no dependencies - uses refs to read current values
    // Empty deps array [] means this function is created once and never recreated
    const loadMore = useCallback(async () => {
        // Guard: prevent concurrent requests and respect pagination state
        if (isLoadingRef.current || !hasMoreRef.current || !cursorRef.current) return;

        // Update both ref (for guards) and state (for UI)
        isLoadingRef.current = true;
        setIsLoading(true);

        const result = await loadMoreLinksAction(cursorRef.current);

        if (result.success) {
            setAdditionalLinks((prev) => [...prev, ...result.links]);
            setHasMore(result.hasMore);
            hasMoreRef.current = result.hasMore; // Keep ref in sync
        }

        isLoadingRef.current = false;
        setIsLoading(false);
    }, []); // Empty deps: callback never recreates, preventing observer churn

    // Setup IntersectionObserver for automatic loading when scroll reaches bottom
    // Observer only recreates if loadMore changes (which it doesn't, thanks to empty deps)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.1 }, // Trigger when 10% of target is visible
        );

        const target = loadMoreRef.current;
        if (target) {
            observer.observe(target);
        }

        return () => observer.disconnect();
    }, [loadMore]);

    return (
        <>
            <LinksGrid links={allLinks} />

            {hasMore && (
                <div ref={loadMoreRef} className="py-8 text-center">
                    {isLoading && <div className="text-gray-1 text-sm">Loading more links...</div>}
                </div>
            )}
        </>
    );
}
