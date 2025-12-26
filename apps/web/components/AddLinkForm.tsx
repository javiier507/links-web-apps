"use client";

import { useActionState, useEffect, useRef } from "react";

import { Button } from "@repo/ui/button/Button";

import { type AddLinkState, addLinkAction } from "@/app/(private)/actions";

interface AddLinkFormProps {
    onSuccess?: () => void;
}

const initialState: AddLinkState = {
    success: false,
    message: "",
};

export function AddLinkForm({ onSuccess }: AddLinkFormProps) {
    const [state, formAction, isPending] = useActionState(addLinkAction, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    // Reset form and close modal on success
    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
            onSuccess?.();
        }
    }, [state.success, onSuccess]);

    return (
        <form ref={formRef} action={formAction} className="space-y-4">
            <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-1 mb-2">
                    URL
                </label>
                <input
                    type="url"
                    id="url"
                    name="url"
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 bg-dark-3 border border-white/10 rounded-lg text-white-1 placeholder-gray-1 focus:outline-none focus:border-yellow-1/50 focus:ring-2 focus:ring-yellow-1/20 transition-all"
                    required
                    disabled={isPending}
                    aria-describedby={state.errors?.url ? "url-error" : undefined}
                />
                {state.errors?.url && (
                    <p id="url-error" className="mt-2 text-sm text-red-400">
                        {state.errors.url[0]}
                    </p>
                )}
            </div>

            {!state.success && state.message && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-400">{state.message}</p>
                </div>
            )}

            <Button
                type="submit"
                variant="solid"
                color="yellow"
                size="lg"
                fullWidth
                loading={isPending}
                loadingText="Saving..."
            >
                Save
            </Button>
        </form>
    );
}
