import { redirect } from "next/navigation";

import { signOut } from "@/libs/auth/client-functions";
import { getAuthUser } from "@/libs/auth/server-functions";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SignOutButton } from "@/components/SignOutButton";

export default async function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getAuthUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen">
            <Header>
                <div className="flex items-center gap-4">
                    <span className="text-gray-1 text-sm hidden sm:inline">
                        Hello, <span className="text-white-1 font-medium">{user.name}</span>
                    </span>
                    <SignOutButton signOut={signOut} />
                </div>
            </Header>
            <main className="pt-20">{children}</main>
            <Footer />
        </div>
    );
}
