import Link from "next/link";

export function Header() {
    return (
        <nav className="fixed w-full z-50 bg-dark-1/90 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-2 to-yellow-1 rounded-lg flex items-center justify-center text-dark-1 font-bold text-xl shadow-lg shadow-yellow-1/20">
                            W
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white-1">
                            Wlinks
                        </span>
                    </Link>

                    {/* Profile Link */}
                    <Link
                        href="/profile"
                        className="text-gray-1 hover:text-yellow-2 px-3 py-2 rounded-md text-base font-medium"
                    >
                        Profile
                    </Link>
                </div>
            </div>
        </nav>
    );
}
