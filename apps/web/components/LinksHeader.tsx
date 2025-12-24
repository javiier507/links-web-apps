"use client";

import { useState } from "react";
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

                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="px-2 py-1 rounded-md bg-gradient-to-br from-yellow-2 to-yellow-1 flex items-center justify-center text-dark-1 font-bold text-base shadow-md shadow-yellow-1/20 hover:shadow-yellow-1/40 transition-all duration-300 hover:scale-105"
                    aria-label="Add new link"
                >
                    +
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Link">
                <AddLinkForm onSuccess={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
}
