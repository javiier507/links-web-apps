export function Footer() {
    return (
        <footer className="bg-dark-2 border-t border-white/5 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1 text-sm text-gray-1">
                    <a href="/privacy" className="hover:text-yellow-1 transition-colors">
                        Privacy
                    </a>
                </div>

                <div className="flex items-center gap-2 flex-1 justify-center">
                    <div className="w-6 h-6 bg-yellow-1 rounded flex items-center justify-center text-dark-1 font-bold text-xs">
                        W
                    </div>
                    <span className="text-white-1 font-bold">Wlinks</span>
                </div>

                <div className="text-gray-600 text-sm md:flex-1 md:text-right">
                    &copy; {new Date().getFullYear()} Wlinks App. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
