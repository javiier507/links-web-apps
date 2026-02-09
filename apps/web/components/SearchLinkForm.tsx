"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@repo/ui/button/Button";

interface SearchLinkFormProps {
    onSuccess?: () => void;
}

export function SearchLinkForm({ onSuccess }: SearchLinkFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchText, setSearchText] = useState(searchParams.get("search") || "");

    function HandleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const params = new URLSearchParams(searchParams.toString());

        if (searchText.trim()) {
            params.set("search", searchText.trim());
        } else {
            params.delete("search");
        }

        router.push(`?${params.toString()}`);
        onSuccess?.();
    }

    function HandleClear() {
        setSearchText("");
        const params = new URLSearchParams(searchParams.toString());
        params.delete("search");
        router.push(`?${params.toString()}`);
        onSuccess?.();
    }

    return (
        <form onSubmit={HandleSubmit} className="space-y-4">
            <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-1 mb-2">
                    Search
                </label>
                <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search by title or tags..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-3 border border-white/10 rounded-lg text-white-1 placeholder-gray-1 focus:outline-none focus:border-yellow-1/50 focus:ring-2 focus:ring-yellow-1/20 transition-all"
                />
            </div>

            <div className="flex gap-2">
                <Button type="submit" variant="solid" color="yellow" size="lg" fullWidth>
                    Search
                </Button>
                {searchText && (
                    <Button
                        type="button"
                        variant="ghost"
                        color="dark"
                        size="lg"
                        onClick={HandleClear}
                    >
                        Clear
                    </Button>
                )}
            </div>
        </form>
    );
}
