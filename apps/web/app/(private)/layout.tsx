import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/SignOutButton";
import { signOut } from "@/libs/auth/client-functions";
import { getAuthUser } from "@/libs/auth/server-functions";

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
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-dark-1/90 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-2 to-yellow-1 rounded-lg flex items-center justify-center text-dark-1 font-bold text-xl shadow-lg shadow-yellow-1/20">
                                W
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white-1">
                                Wlinks
                            </span>
                        </div>

                        {/* User info and Sign Out */}
                        <div className="flex items-center gap-4">
                            <span className="text-gray-1 text-sm hidden sm:inline">
                                Hello, <span className="text-white-1 font-medium">{user.name}</span>
                            </span>
                            <SignOutButton signOut={signOut} />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-20">{children}</main>

            {/* Footer */}
            <footer className="bg-dark-2 border-t border-white/5 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex-1 text-sm text-gray-1">
                        <a href="/privacy" className="hover:text-yellow-1 transition-colors">
                            Privacy
                        </a>
                    </div>

                    <div className="flex items-center gap-2 flex-1 justify-center">
                        <div className="w-6 h-6 bg-yellow-1 rounded flex items-center justify-center text-dark-1 font-bold text-xs">
                            W
                        </div>
                        <span className="text-white-1 font-bold">Wlinks</span>
                    </div>

                    <div className="text-gray-600 text-sm md:flex-1 md:text-right">
                        &copy; {new Date().getFullYear()} Wlinks App. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
