"use server";

import { auth } from "@repo/api/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function SignOut() {
    await auth.api.signOut({
        headers: await headers(),
    });
    redirect("/login");
}
