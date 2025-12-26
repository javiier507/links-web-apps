"use client";

import { useState } from "react";

import { Button } from "@repo/ui/button/Button";

import { AddLinkForm } from "./AddLinkForm";
import { Modal } from "./Modal";

interface LinksHeaderProps {
    linksCount: number;
}

export function LinksHeader({ linksCount }: LinksHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="mb-8 flex items-center justify-between">
                <p className="text-gray-1">
                    {linksCount} {linksCount === 1 ? "link" : "links"} saved
                </p>

                <Button
                    variant="solid"
                    color="yellow"
                    size="sm"
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Add new link"
                >
                    +
                </Button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Link">
                <AddLinkForm onSuccess={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
}
