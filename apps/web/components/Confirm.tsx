"use client";

import { useState } from "react";

import { Button } from "@repo/ui/button/Button";

import { Modal } from "@/components/Modal";

type ConfirmProps = {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => Promise<void> | void;
    children: (open: () => void) => React.ReactNode;
};

export function Confirm(props: ConfirmProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    function HandleOpen() {
        setIsOpen(true);
    }

    function HandleClose() {
        if (loading) return;
        setIsOpen(false);
    }

    async function HandleConfirm() {
        setLoading(true);
        try {
            await props.onConfirm();
            setIsOpen(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {props.children(HandleOpen)}

            <Modal isOpen={isOpen} onClose={HandleClose} title={props.title}>
                <p className="text-gray-1 mb-6">{props.description}</p>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="ghost"
                        color="dark"
                        size="sm"
                        onClick={HandleClose}
                        disabled={loading}
                    >
                        {props.cancelText ?? "Cancel"}
                    </Button>
                    <Button
                        variant="solid"
                        color="red"
                        size="sm"
                        onClick={HandleConfirm}
                        loading={loading}
                        loadingText="Deleting..."
                    >
                        {props.confirmText ?? "Confirm"}
                    </Button>
                </div>
            </Modal>
        </>
    );
}
