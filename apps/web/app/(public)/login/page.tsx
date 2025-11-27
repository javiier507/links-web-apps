import { redirect } from "next/navigation";

import { signInGoogle } from "@/libs/auth/actions";
import { isAuth } from "@/libs/auth/server-functions";

export default async function LoginPage() {
    const isAuthenticated = await isAuth();

    if (isAuthenticated) {
        redirect("/");
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

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <a
                                    href="#download"
                                    className="text-gray-1 hover:text-yellow-2 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Download
                                </a>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                type="button"
                                className="text-gray-1 hover:text-white-1"
                                aria-label="Open menu"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Glow Effects */}
                <div className="hero-glow top-1/4 left-1/4" />
                <div
                    className="hero-glow bottom-1/4 right-1/4"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(229,57,53,0.05) 0%, rgba(24,24,24,0) 70%)",
                    }}
                />

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    {/* Badge */}
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-dark-2 border border-yellow-1/30 text-yellow-2 text-xs font-semibold tracking-wide uppercase animate-pulse">
                        Available on Web and Android
                    </div>

                    {/* Hero Title */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white-1">
                        Your internet, <span className="gradient-text">organized.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-1 mb-10">
                        Save, organize, and access your favorite links from anywhere. Your personal
                        link wallet, synced across all your devices.
                    </p>

                    {/* Sign In Button */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                        <form action={signInGoogle}>
                            <button
                                type="submit"
                                className="group relative flex items-center justify-center gap-3 bg-white text-dark-1 px-8 py-3.5 rounded-full font-medium text-lg shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 w-full sm:w-auto transform hover:-translate-y-0.5"
                            >
                                <svg
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    role="img"
                                    aria-label="Google logo"
                                >
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                <span>Sign In with Google</span>
                            </button>
                        </form>
                    </div>

                    {/* Mockup / Visual Representation */}
                    <div className="mt-16 relative mx-auto max-w-4xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-1 to-transparent z-20 h-full w-full" />
                        <div className="glass-card p-2 rounded-xl mx-auto w-full md:w-3/4 transform rotate-1 hover:rotate-0 transition-transform duration-700 border border-white/10 shadow-2xl shadow-yellow-1/5">
                            {/* Fake Browser UI */}
                            <div className="bg-dark-3 rounded-lg overflow-hidden flex flex-col h-64 md:h-80">
                                <div className="bg-dark-2 p-3 flex items-center gap-2 border-b border-white/5">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-1" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-1" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="ml-4 bg-dark-1 px-3 py-1 rounded text-xs text-gray-500 flex-1 text-center font-mono">
                                        wlinks.app/dashboard
                                    </div>
                                </div>
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Mock Card 1 */}
                                    <div className="bg-dark-2 p-4 rounded-lg border border-white/5 hover:border-yellow-1/50 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-gray-1 text-xs group-hover:text-yellow-2">
                                                Design
                                            </span>
                                        </div>
                                        <div className="h-2 w-24 bg-white/20 rounded mb-2" />
                                        <div className="h-2 w-32 bg-white/10 rounded" />
                                    </div>
                                    {/* Mock Card 2 */}
                                    <div className="bg-dark-2 p-4 rounded-lg border border-white/5 hover:border-yellow-1/50 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="w-8 h-8 rounded bg-red-1/20 flex items-center justify-center text-red-1">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-gray-1 text-xs group-hover:text-yellow-2">
                                                Video
                                            </span>
                                        </div>
                                        <div className="h-2 w-16 bg-white/20 rounded mb-2" />
                                        <div className="h-2 w-28 bg-white/10 rounded" />
                                    </div>
                                    {/* Mock Card 3 */}
                                    <div className="bg-dark-2 p-4 rounded-lg border border-white/5 hover:border-yellow-1/50 transition-colors cursor-pointer group hidden md:block">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="w-8 h-8 rounded bg-yellow-1/20 flex items-center justify-center text-yellow-1">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-gray-1 text-xs group-hover:text-yellow-2">
                                                News
                                            </span>
                                        </div>
                                        <div className="h-2 w-20 bg-white/20 rounded mb-2" />
                                        <div className="h-2 w-full bg-white/10 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 bg-dark-3/30 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white-1 mb-4">
                            Everything in one place
                        </h2>
                        <p className="text-gray-1 max-w-2xl mx-auto">
                            Wlinks eliminates bookmark chaos. A clean interface designed for
                            productivity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-dark-2 p-8 rounded-2xl border border-white/5 hover:border-yellow-1/30 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-yellow-1/10 rounded-lg flex items-center justify-center mb-6 text-yellow-1">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    role="img"
                                    aria-label="Archive icon"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white-1 mb-3">
                                Smart Organization
                            </h3>
                            <p className="text-gray-1 leading-relaxed">
                                Categorize your links with tags and folders. Find what you need in
                                seconds.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-dark-2 p-8 rounded-2xl border border-white/5 hover:border-yellow-1/30 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-yellow-1/10 rounded-lg flex items-center justify-center mb-6 text-yellow-1">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    role="img"
                                    aria-label="Mobile device icon"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white-1 mb-3">Mobile Sync</h3>
                            <p className="text-gray-1 leading-relaxed">
                                Access from your browser or our mobile app. Your data always travels
                                with you.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-dark-2 p-8 rounded-2xl border border-white/5 hover:border-yellow-1/30 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-yellow-1/10 rounded-lg flex items-center justify-center mb-6 text-yellow-1">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    role="img"
                                    aria-label="Lock icon"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white-1 mb-3">
                                Private & Secure
                            </h3>
                            <p className="text-gray-1 leading-relaxed">
                                Your links are yours alone. Sign in securely with Google and forget
                                about passwords.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="download" className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-dark-1 to-dark-2 opacity-50" />
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl font-bold text-white-1 mb-6">
                        Start organizing your digital life
                    </h2>
                    <p className="text-gray-1 mb-10 text-lg">
                        Join Wlinks today and stop losing that important page you found yesterday.
                    </p>

                    <form action={signInGoogle}>
                        <button
                            type="submit"
                            className="bg-yellow-1 hover:bg-yellow-2 text-dark-1 font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-yellow-1/20"
                        >
                            Create free account
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-gray-500">No credit card required.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark-2 border-t border-white/5 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-yellow-1 rounded flex items-center justify-center text-dark-1 font-bold text-xs">
                            W
                        </div>
                        <span className="text-white-1 font-bold">Wlinks</span>
                    </div>

                    <div className="flex gap-8 text-sm text-gray-1">
                        <a href="/privacy" className="hover:text-yellow-1 transition-colors">
                            Privacy
                        </a>
                    </div>

                    <div className="text-gray-600 text-sm">
                        &copy; 2024 Wlinks App. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
