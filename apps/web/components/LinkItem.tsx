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
            className="group bg-dark-2 rounded-xl border border-white/5 overflow-hidden"
        >
            <div className="p-6">
                {/* Image */}
                <div className="w-full aspect-square mb-4 rounded-lg overflow-hidden bg-dark-3">
                    <img
                        src={link.imageOriginalUrl || "/placeholder/placeholder.png"}
                        alt={link.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white-1 mb-2 line-clamp-2 group-hover:text-yellow-2">
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
