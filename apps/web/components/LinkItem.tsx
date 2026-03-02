import { LinkImage } from "@/components/LinkImage";
import type { Link } from "@repo/api/link";

type LinkItemProps = {
    link: Link;
};

export function LinkItem({ link }: LinkItemProps) {
    return (
        <div className="group bg-dark-2 rounded-xl border border-white/5 overflow-hidden">
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="p-6">
                    {/* Image */}
                    <LinkImage
                        imageOriginalUrl={link.imageOriginalUrl}
                        imagePlaceholderUrl={link.imagePlaceholderUrl}
                        alt={link.title}
                    />

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white-1 mb-2 line-clamp-2 group-hover:text-yellow-2">
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

            {/* Action buttons */}
            <div className="flex justify-center gap-3 px-6 py-2 border-t border-white/5">
                <button
                    type="button"
                    className="p-1.5 rounded-md text-gray-1/40 hover:text-yellow-2 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                    aria-label="Share link"
                >
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon */}
                    <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                </button>
                <button
                    type="button"
                    className="p-1.5 rounded-md text-gray-1/40 hover:text-yellow-2 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                    aria-label="Edit tags"
                >
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon */}
                    <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                        <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                </button>
                <button
                    type="button"
                    className="p-1.5 rounded-md text-gray-1/40 hover:text-red-1 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                    aria-label="Remove link"
                >
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon */}
                    <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
