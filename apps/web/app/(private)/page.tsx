import { getAuthUser } from "@/libs/auth/server-functions";

export default async function Home() {
    const user = await getAuthUser();

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
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
                    {/* Welcome Message */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white-1">
                        Welcome back, <span className="gradient-text">{user.name}</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-1 mb-10">
                        Your links are waiting for you. Start organizing your digital world.
                    </p>

                    {/* Quick Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                        <a
                            href="/dashboard"
                            className="px-8 py-3.5 bg-gradient-to-r from-yellow-2 to-yellow-1 text-dark-1 rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Go to Dashboard
                        </a>
                        <a
                            href="/links/new"
                            className="px-8 py-3.5 bg-dark-2 text-white-1 rounded-full font-medium text-lg border border-white/10 hover:border-yellow-1/50 transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Add New Link
                        </a>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-dark-3/30 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Stat 1 */}
                        <div className="bg-dark-2 p-8 rounded-2xl border border-white/5 hover:border-yellow-1/30 transition-all duration-300 hover:-translate-y-1 text-center">
                            <div className="w-16 h-16 bg-yellow-1/10 rounded-lg flex items-center justify-center mb-4 mx-auto text-yellow-1">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    role="img"
                                    aria-label="Link icon"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-white-1 mb-2">0</h3>
                            <p className="text-gray-1">Total Links</p>
                        </div>

                        {/* Stat 2 */}
                        <div className="bg-dark-2 p-8 rounded-2xl border border-white/5 hover:border-yellow-1/30 transition-all duration-300 hover:-translate-y-1 text-center">
                            <div className="w-16 h-16 bg-yellow-1/10 rounded-lg flex items-center justify-center mb-4 mx-auto text-yellow-1">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    role="img"
                                    aria-label="Tag icon"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-white-1 mb-2">0</h3>
                            <p className="text-gray-1">Tags Used</p>
                        </div>

                        {/* Stat 3 */}
                        <div className="bg-dark-2 p-8 rounded-2xl border border-white/5 hover:border-yellow-1/30 transition-all duration-300 hover:-translate-y-1 text-center">
                            <div className="w-16 h-16 bg-yellow-1/10 rounded-lg flex items-center justify-center mb-4 mx-auto text-yellow-1">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    role="img"
                                    aria-label="Calendar icon"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-white-1 mb-2">Today</h3>
                            <p className="text-gray-1">Last Activity</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Start Guide */}
            <section className="py-20 relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white-1 mb-4">Getting Started</h2>
                        <p className="text-gray-1">
                            Start organizing your links in just a few steps
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Step 1 */}
                        <div className="bg-dark-2 p-6 rounded-xl border border-white/5 hover:border-yellow-1/30 transition-colors flex items-start gap-4">
                            <div className="w-10 h-10 bg-yellow-1 rounded-lg flex items-center justify-center text-dark-1 font-bold flex-shrink-0">
                                1
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white-1 mb-2">
                                    Add Your First Link
                                </h3>
                                <p className="text-gray-1">
                                    Click on "Add New Link" to save your first bookmark. You can add
                                    a title, tags, and organize it however you want.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-dark-2 p-6 rounded-xl border border-white/5 hover:border-yellow-1/30 transition-colors flex items-start gap-4">
                            <div className="w-10 h-10 bg-yellow-1 rounded-lg flex items-center justify-center text-dark-1 font-bold flex-shrink-0">
                                2
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white-1 mb-2">
                                    Organize with Tags
                                </h3>
                                <p className="text-gray-1">
                                    Use tags to categorize your links. Create custom tags like
                                    "work", "personal", "inspiration", or anything that makes sense
                                    for you.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-dark-2 p-6 rounded-xl border border-white/5 hover:border-yellow-1/30 transition-colors flex items-start gap-4">
                            <div className="w-10 h-10 bg-yellow-1 rounded-lg flex items-center justify-center text-dark-1 font-bold flex-shrink-0">
                                3
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white-1 mb-2">
                                    Access Anywhere
                                </h3>
                                <p className="text-gray-1">
                                    Your links sync across all your devices. Download our mobile app
                                    to access your bookmarks on the go.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
