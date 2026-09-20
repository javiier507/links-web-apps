import { redirect } from "next/navigation";

import { GetAuthUser } from "@/libs/api/auth";

import { Footer } from "@/components/Footer";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { Header } from "@/components/Header";
import { SignInGoogleButton } from "@/components/SignInGoogleButton";

export default async function LoginPage() {
    const isAuthenticated = await GetAuthUser();

    if (isAuthenticated) {
        redirect("/");
    }

    return (
        <div className="min-h-screen">
            <Header>
                {/* Sign In Menu */}
                <SignInGoogleButton className="cursor-pointer font-semibold transition-colors duration-300 focus:outline-none btn-sm btn-ghost-yellow">
                    Sign In
                </SignInGoogleButton>
            </Header>

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
                    {/* Badge disabled: the Android app is no longer available.
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-dark-2 border border-yellow-1/30 text-yellow-2 text-xs font-semibold tracking-wide uppercase animate-pulse">
                        Available on Web and Android
                    </div>
                    */}

                    {/* Hero Title */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white-1">
                        Your internet, <span className="gradient-text">organized.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-1 mb-10">
                        Save, organize, and access your favorite links from anywhere. Your personal
                        link wallet, synced across all your devices.
                    </p>

                    {/* Google Play Button disabled: the Android app is no longer available.
                    <div className="flex justify-center items-center">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.penalbar06.linksapp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block transition-all duration-300 transform hover:scale-105"
                            aria-label="Get it on Google Play"
                        >
                            <img
                                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                                alt="Get it on Google Play"
                                className="h-20 sm:h-24 w-auto"
                            />
                        </a>
                    </div>
                    */}

                    <GoogleSignInButton />

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

                    <GoogleSignInButton />
                    <p className="mt-4 text-sm text-gray-500">It's Free</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
