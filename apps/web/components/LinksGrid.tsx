import type { Link } from "@repo/api/link";

import { LinkItem } from "@/components/LinkItem";

type LinksGridProps = {
    links: Link[];
    availableTags: string[];
};

export function LinksGrid(props: LinksGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {props.links.map((link) => (
                <LinkItem key={link.id} link={link} availableTags={props.availableTags} />
            ))}
        </div>
    );
}
