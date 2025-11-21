import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

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
	},
	pages: {
		signIn: '/login'
	}
});