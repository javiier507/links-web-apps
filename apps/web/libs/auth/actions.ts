'use server';

import { signIn, signOut as signOutAll } from "./";

export async function signInGoogle() {
    await signIn("google", { redirectTo: "/" });
}

export async function signOut() {
    await signOutAll();
}