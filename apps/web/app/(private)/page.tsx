import { LINKS_PER_PAGE } from "@repo/api/link";

import { EmptyLinks } from "@/components/EmptyLinks";
import { LinksGrid } from "@/components/LinksGrid";
import { LinksHeader } from "@/components/LinksHeader";
import { Pagination } from "@/components/Pagination";

import { GetLinksPage } from "@/libs/api/resources";

type HomeProps = {
    searchParams: Promise<{
        search?: string;
        page?: string;
    }>;
};

export default async function Home(props: HomeProps) {
    const searchParams = await props.searchParams;
    const search = searchParams.search;
    const page = Math.max(1, Number(searchParams.page) || 1);

    const { links, total } = await GetLinksPage(page, search);
    const totalPages = Math.ceil(total / LINKS_PER_PAGE);

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <LinksHeader linksCount={total} />

                {links.length > 0 ? (
                    <>
                        <LinksGrid links={links} />
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                search={search}
                            />
                        )}
                    </>
                ) : (
                    <EmptyLinks />
                )}
            </div>
        </div>
    );
}
