'use server';

import { signIn } from "./";

export async function signInGoogle() {
    await signIn("google", { redirectTo: "/" });
}