"use client";

import { authClient } from "@/libs/auth/client";
import type { ReactNode } from "react";

type SignInGoogleButtonProps = {
    children: ReactNode;
    className?: string;
};

export function SignInGoogleButton(props: SignInGoogleButtonProps) {
    function HandleSignIn() {
        authClient.signIn.social({ provider: "google", callbackURL: "/" });
    }

    return (
        <button type="button" onClick={HandleSignIn} className={props.className}>
            {props.children}
        </button>
    );
}
