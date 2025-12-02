import type { ReactNode } from "react";

interface HeaderProps {
    children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
    return (
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

                    {/* Dynamic Content (Sign In / User Info + Sign Out) */}
                    {children}
                </div>
            </div>
        </nav>
    );
}
