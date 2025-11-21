import { redirect } from "next/navigation";

import { isAuth } from "@/libs/auth/server-functions";
import { signInGoogle } from '@/libs/auth/actions';

export default async function LoginPage() {
    const isAuthenticated = await isAuth();

    if (isAuthenticated) {
        redirect("/");
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <form action={signInGoogle}>
                <button type="submit">
                    Sign In with Google
                </button>
            </form>
        </div>
    )
}
