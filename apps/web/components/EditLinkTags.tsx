"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { MAX_LINK_TAGS, MAX_LINK_TAG_LENGTH, UpdateLinkTagsSchema } from "@repo/api/link";
import type { Link } from "@repo/api/link";
import { Button } from "@repo/ui/button/Button";

import { updateLinkTagsAction } from "@/app/(private)/actions";
import { Modal } from "@/components/Modal";

type EditLinkTagsProps = {
    link: Link;
    availableTags: string[];
};

export function EditLinkTags(props: EditLinkTagsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [tags, setTags] = useState(props.link.tags);
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [isPending, startTransition] = useTransition();
    const comboboxRef = useRef<HTMLDivElement>(null);
    const normalizedInput = input.trim().toLowerCase();
    const suggestions = normalizedInput
        ? props.availableTags.filter(
              (tag) =>
                  tag.toLowerCase().includes(normalizedInput) &&
                  !tags.some((selectedTag) => selectedTag.toLowerCase() === tag.toLowerCase()),
          )
        : [];
    const showSuggestions =
        isSuggestionsOpen && suggestions.length > 0 && tags.length < MAX_LINK_TAGS;
    const suggestionsId = `tag-suggestions-${props.link.id}`;

    useEffect(() => {
        if (!isSuggestionsOpen) return;

        function HandlePointerDown(event: MouseEvent) {
            if (!comboboxRef.current?.contains(event.target as Node)) {
                setIsSuggestionsOpen(false);
            }
        }

        document.addEventListener("mousedown", HandlePointerDown);

        return () => document.removeEventListener("mousedown", HandlePointerDown);
    }, [isSuggestionsOpen]);

    function HandleOpen() {
        setTags(props.link.tags);
        setInput("");
        setError("");
        setIsSuggestionsOpen(false);
        setActiveSuggestionIndex(0);
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
        setIsSuggestionsOpen(false);
        setActiveSuggestionIndex(0);
        return true;
    }

    function SelectSuggestion(tag: string) {
        AddPendingTags(tag);
    }

    function HandleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;

        if (value.includes(",")) {
            AddPendingTags(value);
            return;
        }

        setInput(value);
        setError("");
        setIsSuggestionsOpen(Boolean(value.trim()));
        setActiveSuggestionIndex(0);
    }

    function HandleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "ArrowDown" && suggestions.length > 0) {
            event.preventDefault();
            setIsSuggestionsOpen(true);
            setActiveSuggestionIndex((currentIndex) =>
                currentIndex >= suggestions.length - 1 ? 0 : currentIndex + 1,
            );
            return;
        }

        if (event.key === "ArrowUp" && suggestions.length > 0) {
            event.preventDefault();
            setIsSuggestionsOpen(true);
            setActiveSuggestionIndex((currentIndex) =>
                currentIndex <= 0 ? suggestions.length - 1 : currentIndex - 1,
            );
            return;
        }

        if (event.key === "Escape") {
            setIsSuggestionsOpen(false);
            return;
        }

        if (event.key === "Enter" && showSuggestions) {
            event.preventDefault();
            const activeSuggestion = suggestions[activeSuggestionIndex];
            if (activeSuggestion) SelectSuggestion(activeSuggestion);
            return;
        }

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
            setIsSuggestionsOpen(false);
            setActiveSuggestionIndex(0);
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

                        <div ref={comboboxRef} className="relative">
                            <input
                                type="text"
                                id={`tags-${props.link.id}`}
                                value={input}
                                onChange={HandleInputChange}
                                onKeyDown={HandleInputKeyDown}
                                onFocus={() => setIsSuggestionsOpen(Boolean(input.trim()))}
                                placeholder="Type a tag and press Enter"
                                className="w-full rounded-lg border border-white/10 bg-dark-3 px-4 py-3 text-white-1 placeholder-gray-1 focus:border-yellow-1/50 focus:outline-none focus:ring-2 focus:ring-yellow-1/20 disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={isPending || tags.length >= MAX_LINK_TAGS}
                                role="combobox"
                                aria-autocomplete="list"
                                aria-expanded={showSuggestions}
                                aria-controls={suggestionsId}
                                aria-activedescendant={
                                    showSuggestions
                                        ? `${suggestionsId}-${activeSuggestionIndex}`
                                        : undefined
                                }
                                aria-invalid={Boolean(error)}
                                aria-describedby={error ? `tags-error-${props.link.id}` : undefined}
                            />

                            {showSuggestions && (
                                <div
                                    id={suggestionsId}
                                    // biome-ignore lint/a11y/useSemanticElements: A custom listbox keeps text entry and tag creation in the same control.
                                    role="listbox"
                                    tabIndex={-1}
                                    aria-label="Tag suggestions"
                                    className="absolute z-20 mt-2 max-h-48 w-full overflow-y-auto rounded-lg border border-white/10 bg-dark-3 py-1 shadow-xl"
                                >
                                    {suggestions.map((tag, index) => (
                                        <button
                                            type="button"
                                            id={`${suggestionsId}-${index}`}
                                            key={tag}
                                            // biome-ignore lint/a11y/useSemanticElements: Options are buttons so pointer users can select without moving input focus.
                                            role="option"
                                            aria-selected={index === activeSuggestionIndex}
                                            onMouseDown={(event) => event.preventDefault()}
                                            onClick={() => SelectSuggestion(tag)}
                                            onMouseEnter={() => setActiveSuggestionIndex(index)}
                                            className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                                                index === activeSuggestionIndex
                                                    ? "bg-yellow-1/10 text-yellow-1"
                                                    : "text-gray-1 hover:bg-white/5 hover:text-white-1"
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
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
