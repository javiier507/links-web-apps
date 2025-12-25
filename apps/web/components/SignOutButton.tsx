"use client";

interface LogOutButtonProps {
    signOut: () => void;
}

export function SignOutButton({ signOut }: LogOutButtonProps) {
    return (
        <button
            type="button"
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg transition-colors border border-transparent hover:border-transparent"
        >
            Log Out
        </button>
    );
}
