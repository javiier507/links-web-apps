"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Link } from "@repo/api/link";

import { loadMoreLinksAction } from "@/app/(private)/actions";

import { LinksGrid } from "./LinksGrid";

interface InfiniteLinksGridProps {
    initialLinks: Link[];
}

export function InfiniteLinksGrid({ initialLinks }: InfiniteLinksGridProps) {
    const [links, setLinks] = useState<Link[]>(initialLinks);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialLinks.length === 100);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const loadMore = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);

        const lastLink = links[links.length - 1];
        const cursorAfter = lastLink.$id;

        const result = await loadMoreLinksAction(cursorAfter);

        if (result.success) {
            setLinks((prev) => [...prev, ...result.links]);
            setHasMore(result.hasMore);
        }

        setIsLoading(false);
    }, [links, isLoading, hasMore]);

    useEffect(() => {
        // Setup Intersection Observer
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.1 },
        );

        const currentLoadMoreRef = loadMoreRef.current;
        if (currentLoadMoreRef) {
            observerRef.current.observe(currentLoadMoreRef);
        }

        return () => {
            if (observerRef.current && currentLoadMoreRef) {
                observerRef.current.unobserve(currentLoadMoreRef);
            }
        };
    }, [loadMore]);

    return (
        <>
            <LinksGrid links={links} />

            {hasMore && (
                <div ref={loadMoreRef} className="py-8 text-center">
                    {isLoading && <div className="text-gray-1 text-sm">Loading more links...</div>}
                </div>
            )}
        </>
    );
}
