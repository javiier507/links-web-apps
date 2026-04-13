import Link from "next/link";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    search?: string;
};

function BuildHref(page: number, search?: string) {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (search) params.set("search", search);
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
}

function PageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
}

export function Pagination(props: PaginationProps) {
    const pages = PageNumbers(props.currentPage, props.totalPages);

    return (
        <nav className="mt-8 flex items-center justify-center gap-1" aria-label="Pagination">
            {props.currentPage > 1 && (
                <Link
                    href={BuildHref(props.currentPage - 1, props.search)}
                    className="px-3 py-2 text-sm text-gray-1 hover:text-white transition-colors"
                >
                    Previous
                </Link>
            )}

            {pages.map((page, i) =>
                page === "..." ? (
                    <span
                        key={`ellipsis-${
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            i
                        }`}
                        className="px-2 py-2 text-sm text-gray-1"
                    >
                        ...
                    </span>
                ) : (
                    <Link
                        key={page}
                        href={BuildHref(page, props.search)}
                        className={`px-3 py-2 text-sm rounded transition-colors ${
                            page === props.currentPage
                                ? "bg-yellow text-dark font-semibold"
                                : "text-gray-1 hover:text-white"
                        }`}
                    >
                        {page}
                    </Link>
                ),
            )}

            {props.currentPage < props.totalPages && (
                <Link
                    href={BuildHref(props.currentPage + 1, props.search)}
                    className="px-3 py-2 text-sm text-gray-1 hover:text-white transition-colors"
                >
                    Next
                </Link>
            )}
        </nav>
    );
}
