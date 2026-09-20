"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@repo/ui/button/Button";

import { AddLinkForm } from "./AddLinkForm";
import { Modal } from "./Modal";
import { SearchLinkForm } from "./SearchLinkForm";

interface LinksHeaderProps {
    linksCount: number;
    tags: string[];
}

export function LinksHeader(props: LinksHeaderProps) {
    const { linksCount, tags } = props;
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isTagFilterOpen, setIsTagFilterOpen] = useState(false);
    const tagFilterRef = useRef<HTMLDivElement>(null);
    const activeTag = tags.find((tag) => tag === searchParams.get("search"));

    useEffect(() => {
        if (!isTagFilterOpen) return;

        function HandlePointerDown(event: MouseEvent) {
            if (!tagFilterRef.current?.contains(event.target as Node)) {
                setIsTagFilterOpen(false);
            }
        }

        function HandleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") setIsTagFilterOpen(false);
        }

        document.addEventListener("mousedown", HandlePointerDown);
        document.addEventListener("keydown", HandleKeyDown);

        return () => {
            document.removeEventListener("mousedown", HandlePointerDown);
            document.removeEventListener("keydown", HandleKeyDown);
        };
    }, [isTagFilterOpen]);

    function SetTagFilter(tag: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", tag);
        params.delete("page");
        router.push(`?${params.toString()}`);
        setIsTagFilterOpen(false);
    }

    function ClearTagFilter() {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("search");
        params.delete("page");
        router.push(`?${params.toString()}`);
        setIsTagFilterOpen(false);
    }

    return (
        <>
            <div className="mb-8 flex items-center justify-between">
                <p className="text-gray-1">
                    {linksCount} {linksCount === 1 ? "link" : "links"} saved
                </p>

                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        color="dark"
                        size="sm"
                        onClick={() => setIsSearchModalOpen(true)}
                        aria-label="Search links"
                    >
                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </Button>

                    <div ref={tagFilterRef} className="relative">
                        <Button
                            variant="ghost"
                            color="dark"
                            size="sm"
                            onClick={() => setIsTagFilterOpen((isOpen) => !isOpen)}
                            aria-label="Filter links by tag"
                        >
                            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M3 5h18M6 12h12m-9 7h6" />
                            </svg>
                        </Button>

                        {isTagFilterOpen && (
                            <div
                                className="absolute right-0 z-10 mt-2 max-h-64 w-56 overflow-y-auto rounded-lg border border-white/10 bg-dark-3 py-1 shadow-xl"
                                role="menu"
                                aria-label="Filter by tag"
                            >
                                {activeTag && (
                                    <button
                                        type="button"
                                        className="w-full px-3 py-2 text-left text-sm text-gray-1 transition-colors hover:bg-white/5 hover:text-white-1"
                                        onClick={ClearTagFilter}
                                        role="menuitem"
                                    >
                                        Clear filter
                                    </button>
                                )}

                                {tags.length > 0 ? (
                                    tags.map((tag) => (
                                        <button
                                            type="button"
                                            key={tag}
                                            className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
                                                tag === activeTag
                                                    ? "bg-yellow-1/10 text-yellow-1"
                                                    : "text-gray-1 hover:text-white-1"
                                            }`}
                                            onClick={() => SetTagFilter(tag)}
                                            role="menuitem"
                                        >
                                            {tag}
                                        </button>
                                    ))
                                ) : (
                                    <p className="px-3 py-2 text-sm text-gray-1">
                                        No tags available
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <Button
                        variant="solid"
                        color="yellow"
                        size="sm"
                        onClick={() => setIsAddModalOpen(true)}
                        aria-label="Add new link"
                    >
                        +
                    </Button>
                </div>
            </div>

            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Link"
            >
                <AddLinkForm onSuccess={() => setIsAddModalOpen(false)} />
            </Modal>

            <Modal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
                title="Search Links"
            >
                <SearchLinkForm onSuccess={() => setIsSearchModalOpen(false)} />
            </Modal>
        </>
    );
}
