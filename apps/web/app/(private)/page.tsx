import { MOCKED_LINKS } from "@repo/api/link.mock";

import { EmptyLinks } from "@/components/EmptyLinks";
import { LinksGrid } from "@/components/LinksGrid";
import { LinksHeader } from "@/components/LinksHeader";

export default async function Home() {
    const links = MOCKED_LINKS.documents;

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <LinksHeader linksCount={links.length} />

                {links.length > 0 ? <LinksGrid links={links} /> : <EmptyLinks />}
            </div>
        </div>
    );
}
