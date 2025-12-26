"use client";

import { Button } from "@repo/ui/button/Button";

interface SignOutButtonProps {
    signOut: () => void;
}

export function SignOutButton({ signOut }: SignOutButtonProps) {
    return (
        <Button color="red" size="lg" onClick={() => signOut()}>
            Log Out
        </Button>
    );
}
