export { auth as middleware } from "@/libs/auth";

export const config = {
	matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};