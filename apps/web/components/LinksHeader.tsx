"use client";

import { useState } from "react";
import { Modal } from "./Modal";

interface LinksHeaderProps {
    linksCount: number;
}

export function LinksHeader({ linksCount }: LinksHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [url, setUrl] = useState("");

    const handleSave = () => {
        // TODO: Implement save logic
        console.log("Saving URL:", url);
        setUrl("");
        setIsModalOpen(false);
    };

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
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-1 mb-2">
                            URL
                        </label>
                        <input
                            type="url"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-4 py-3 bg-dark-3 border border-white/10 rounded-lg text-white-1 placeholder-gray-1 focus:outline-none focus:border-yellow-1/50 focus:ring-2 focus:ring-yellow-1/20 transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-br from-yellow-2 to-yellow-1 text-dark-1 font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-1/30 transition-all duration-300 hover:scale-[1.02]"
                    >
                        Save
                    </button>
                </form>
            </Modal>
        </>
    );
}
