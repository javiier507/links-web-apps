"use client";

import { Button } from "@repo/ui/button";

interface SignOutButtonProps {
    signOut: () => void;
}

export function SignOutButton({ signOut }: SignOutButtonProps) {
    return (
        <Button variant="danger" size="lg" onClick={() => signOut()}>
            Log Out
        </Button>
    );
}
