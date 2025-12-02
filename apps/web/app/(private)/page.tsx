import { MOCKED_LINKS } from "@repo/api/link.mock";

export default async function Home() {
    const links = MOCKED_LINKS.documents;

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white-1 mb-2">My Links</h1>
                    <p className="text-gray-1">
                        {links.length} {links.length === 1 ? "link" : "links"} saved
                    </p>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {links.map((link) => (
                        <a
                            key={link.$id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-dark-2 rounded-xl border border-white/5 hover:border-yellow-1/50 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-1/10"
                        >
                            {/* Card Content */}
                            <div className="p-6">
                                {/* Icon/Favicon Placeholder */}
                                <div className="w-12 h-12 bg-yellow-1/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-1/20 transition-colors">
                                    <svg
                                        className="w-6 h-6 text-yellow-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                        />
                                    </svg>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-white-1 mb-2 line-clamp-2 group-hover:text-yellow-2 transition-colors">
                                    {link.title}
                                </h3>

                                {/* URL */}
                                <p className="text-sm text-gray-1 mb-4 truncate">
                                    {new URL(link.url).hostname}
                                </p>

                                {/* Tags */}
                                {link.tags && link.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {link.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 text-xs bg-dark-3 text-gray-1 rounded-md border border-white/5"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {link.tags.length > 3 && (
                                            <span className="px-2 py-1 text-xs bg-dark-3 text-gray-1 rounded-md border border-white/5">
                                                +{link.tags.length - 3}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </a>
                    ))}
                </div>

                {/* Empty State */}
                {links.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-yellow-1/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg
                                className="w-10 h-10 text-yellow-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white-1 mb-2">No links yet</h2>
                        <p className="text-gray-1 mb-6">
                            Start adding links to build your collection
                        </p>
                        <a
                            href="/links/new"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-2 to-yellow-1 text-dark-1 rounded-full font-medium hover:shadow-xl transition-all duration-300"
                        >
                            Add Your First Link
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
