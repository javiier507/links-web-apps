"use client";

import { useState, useTransition } from "react";

import { MAX_LINK_TAGS, MAX_LINK_TAG_LENGTH, UpdateLinkTagsSchema } from "@repo/api/link";
import type { Link } from "@repo/api/link";
import { Button } from "@repo/ui/button/Button";

import { updateLinkTagsAction } from "@/app/(private)/actions";
import { Modal } from "@/components/Modal";

type EditLinkTagsProps = {
    link: Link;
};

export function EditLinkTags(props: EditLinkTagsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [tags, setTags] = useState(props.link.tags);
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    function HandleOpen() {
        setTags(props.link.tags);
        setInput("");
        setError("");
        setIsOpen(true);
    }

    function HandleClose() {
        if (isPending) return;
        setIsOpen(false);
    }

    function AddPendingTags(value: string): boolean {
        const pendingTags = value.split(",");
        const validation = UpdateLinkTagsSchema.safeParse({ tags: [...tags, ...pendingTags] });

        if (!validation.success) {
            setError(validation.error.issues[0]?.message ?? "Invalid tags");
            return false;
        }

        setTags(validation.data.tags);
        setInput("");
        setError("");
        return true;
    }

    function HandleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;

        if (value.includes(",")) {
            AddPendingTags(value);
            return;
        }

        setInput(value);
        setError("");
    }

    function HandleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            AddPendingTags(input);
        }
    }

    function HandleRemoveTag(tagToRemove: string) {
        setTags((currentTags) => currentTags.filter((tag) => tag !== tagToRemove));
        setError("");
    }

    function HandleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const validation = UpdateLinkTagsSchema.safeParse({
            tags: [...tags, ...input.split(",")],
        });

        if (!validation.success) {
            setError(validation.error.issues[0]?.message ?? "Invalid tags");
            return;
        }

        startTransition(async () => {
            const result = await updateLinkTagsAction(props.link.id, validation.data.tags);

            if (!result.success) {
                setError(result.errors?.tags?.[0] ?? result.message);
                return;
            }

            setTags(validation.data.tags);
            setInput("");
            setError("");
            setIsOpen(false);
        });
    }

    return (
        <>
            <button
                type="button"
                onClick={HandleOpen}
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

            <Modal isOpen={isOpen} onClose={HandleClose} title="Edit tags">
                <form onSubmit={HandleSubmit} className="space-y-5">
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label
                                htmlFor={`tags-${props.link.id}`}
                                className="text-sm font-medium text-gray-1"
                            >
                                Tags
                            </label>
                            <span className="text-xs text-gray-1">
                                {tags.length}/{MAX_LINK_TAGS}
                            </span>
                        </div>

                        {tags.length > 0 && (
                            <div className="mb-3 flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1 rounded-md border border-white/5 bg-dark-3 px-2 py-1 text-sm text-gray-1"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => HandleRemoveTag(tag)}
                                            disabled={isPending}
                                            className="rounded text-gray-1/60 hover:text-white-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            aria-label={`Remove ${tag}`}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        <input
                            type="text"
                            id={`tags-${props.link.id}`}
                            value={input}
                            onChange={HandleInputChange}
                            onKeyDown={HandleInputKeyDown}
                            placeholder="Type a tag and press Enter"
                            className="w-full rounded-lg border border-white/10 bg-dark-3 px-4 py-3 text-white-1 placeholder-gray-1 focus:border-yellow-1/50 focus:outline-none focus:ring-2 focus:ring-yellow-1/20 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isPending || tags.length >= MAX_LINK_TAGS}
                            aria-invalid={Boolean(error)}
                            aria-describedby={error ? `tags-error-${props.link.id}` : undefined}
                        />
                        <p className="mt-2 text-xs text-gray-1">
                            Press Enter or comma to add. Maximum {MAX_LINK_TAG_LENGTH} characters.
                        </p>
                        {error && (
                            <p
                                id={`tags-error-${props.link.id}`}
                                className="mt-2 text-sm text-red-400"
                            >
                                {error}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            color="dark"
                            size="sm"
                            onClick={HandleClose}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="solid"
                            color="yellow"
                            size="sm"
                            loading={isPending}
                            loadingText="Saving..."
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
