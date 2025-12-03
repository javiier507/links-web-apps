interface LinksHeaderProps {
    linksCount: number;
}

export function LinksHeader({ linksCount }: LinksHeaderProps) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white-1 mb-2">My Links</h1>
            <p className="text-gray-1">
                {linksCount} {linksCount === 1 ? "link" : "links"} saved
            </p>
        </div>
    );
}
