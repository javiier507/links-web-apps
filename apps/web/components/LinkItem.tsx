import type { Link } from "@repo/api/link";

interface LinkItemProps {
    link: Link;
}

export function LinkItem({ link }: LinkItemProps) {
    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-dark-2 rounded-xl border border-white/5 hover:border-yellow-1/50 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-1/10"
        >
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
                <p className="text-sm text-gray-1 mb-4 truncate">{new URL(link.url).hostname}</p>

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
    );
}
