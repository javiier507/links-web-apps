"use client";

import { useState } from "react";

import { Button } from "@repo/ui/button/Button";

import { AddLinkForm } from "./AddLinkForm";
import { Modal } from "./Modal";
import { SearchLinkForm } from "./SearchLinkForm";

interface LinksHeaderProps {
    linksCount: number;
}

export function LinksHeader({ linksCount }: LinksHeaderProps) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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
