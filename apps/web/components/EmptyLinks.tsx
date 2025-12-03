export function EmptyLinks() {
    return (
        <div className="text-center py-20">
            <div className="w-20 h-20 bg-yellow-1/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                    className="w-10 h-10 text-yellow-1"
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
            <h2 className="text-2xl font-bold text-white-1 mb-2">No links yet</h2>
            <p className="text-gray-1 mb-6">Start adding links to build your collection</p>
            <a
                href="/links/new"
                className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-2 to-yellow-1 text-dark-1 rounded-full font-medium hover:shadow-xl transition-all duration-300"
            >
                Add Your First Link
            </a>
        </div>
    );
}
