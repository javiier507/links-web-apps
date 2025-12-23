import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";

import { googleSignIn } from "@repo/api/link.api";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    trustHost: true,
    callbacks: {
        authorized: async ({ auth }) => {
            /**
             * Usado por el middleware de NextAuth para redirigir a la página de inicio de sesión
             * si el usuario no está autenticado.
             */
            return !!auth;
        },
        signIn: async ({ account }) => {
            /**
             * Usado para verificar si el usuario puede iniciar sesión.
             * Si devuelve false, el usuario no podrá iniciar sesión.
             */
            if (account?.type === "oidc" && account.id_token) {
                try {
                    const response = await googleSignIn(account.id_token);

                    if (!response) return false;

                    const cookieStore = await cookies();
                    cookieStore.set("my-custom-session", response, {
                        path: "/",
                        httpOnly: true,
                        sameSite: "strict",
                        secure: true,
                    });

                    return true;
                } catch (error) {
                    console.error(error);
                    return false;
                }
            }
            return true;
        },
    },
    pages: {
        signIn: "/login",
    },
});
