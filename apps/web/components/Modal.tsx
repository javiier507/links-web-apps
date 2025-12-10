"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
                className="relative bg-dark-2 rounded-2xl border border-white/10 shadow-2xl max-w-md w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {title && (
                    <div className="px-6 py-4 border-b border-white/5">
                        <h2 className="text-xl font-semibold text-white-1">{title}</h2>
                    </div>
                )}

                {/* Close button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-1 hover:text-white-1 transition-colors"
                    aria-label="Close modal"
                >
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
