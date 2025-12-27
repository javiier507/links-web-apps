import Link from "next/link";
import { redirect } from "next/navigation";

import { GetAuthUser } from "@/libs/api/auth";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default async function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await GetAuthUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen">
            <Header>
                <Link
                    href="/profile"
                    className="text-gray-1 hover:text-yellow-2 px-3 py-2 rounded-md text-base font-medium"
                >
                    Profile
                </Link>
            </Header>
            <main className="pt-20">{children}</main>
            <Footer />
        </div>
    );
}
