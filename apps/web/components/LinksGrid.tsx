import type { Link } from "@repo/api/link";
import { LinkItem } from "./LinkItem";

interface LinksGridProps {
    links: Link[];
}

export function LinksGrid({ links }: LinksGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {links.map((link) => (
                <LinkItem key={link.$id} link={link} />
            ))}
        </div>
    );
}
