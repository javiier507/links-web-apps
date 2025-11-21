import { isAuth } from "@/libs/auth/server-functions";
//import { ProtectedLayout } from "@/libs/auth/ProtectedLayout";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isAuthenticated = await isAuth();
    if (!isAuthenticated) {
        return <h1>No tienes acceso a esta página</h1>;
    }
    return children;
}
