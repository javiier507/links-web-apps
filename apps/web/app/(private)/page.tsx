import { EmptyLinks } from "@/components/EmptyLinks";
import { InfiniteLinksGrid } from "@/components/InfiniteLinksGrid";
import { LinksHeader } from "@/components/LinksHeader";

import { GetLinks } from "@/libs/api/resources";

type HomeProps = {
    searchParams: Promise<{
        search?: string;
    }>;
};

export default async function Home({ searchParams }: HomeProps) {
    const { search } = await searchParams;
    const links = await GetLinks({ limit: 100, search });

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <LinksHeader linksCount={links.total} />

                {links.rows.length > 0 ? (
                    <InfiniteLinksGrid initialLinks={links.rows} />
                ) : (
                    <EmptyLinks />
                )}
            </div>
        </div>
    );
}
