"use client";

interface SignOutButtonProps {
    signOut: () => void;
}

export function SignOutButton({ signOut }: SignOutButtonProps) {
    return (
        <button
            type="button"
            onClick={() => signOut()}
            className="text-gray-1 hover:text-yellow-2 transition-colors px-3 py-2 rounded-md text-sm font-medium bg-transparent border-none cursor-pointer"
        >
            Sign Out
        </button>
    );
}
