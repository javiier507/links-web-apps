"use client";

import { useState } from "react";

import { deleteLinkAction } from "@/app/(private)/actions";
import { Confirm } from "@/components/Confirm";

import type { Link } from "@repo/api/link";

type LinkItemActionsProps = {
    link: Link;
};

export function LinkItemActions(props: LinkItemActionsProps) {
    const [copied, setCopied] = useState(false);

    async function HandleShare() {
        await navigator.clipboard.writeText(props.link.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    async function HandleDelete() {
        await deleteLinkAction(props.link.$id);
    }

    return (
        <div className="flex justify-center gap-3 px-6 py-2 border-t border-white/5">
            <button
                type="button"
                onClick={HandleShare}
                className="p-1.5 rounded-md text-gray-1/40 hover:text-yellow-2 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                aria-label="Share link"
            >
                {copied ? (
                    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon
                    <svg
                        className="w-3.5 h-3.5 text-yellow-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                ) : (
                    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon
                    <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                )}
            </button>
            <button
                type="button"
                className="p-1.5 rounded-md text-gray-1/40 hover:text-yellow-2 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                aria-label="Edit tags"
            >
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon */}
                <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
            </button>
            <Confirm
                title="Delete link"
                description="Are you sure you want to delete this link? This action cannot be undone."
                confirmText="Delete"
                onConfirm={HandleDelete}
            >
                {(open) => (
                    <button
                        type="button"
                        onClick={open}
                        className="p-1.5 rounded-md text-gray-1/40 hover:text-red-1 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                        aria-label="Remove link"
                    >
                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon */}
                        <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                    </button>
                )}
            </Confirm>
        </div>
    );
}
