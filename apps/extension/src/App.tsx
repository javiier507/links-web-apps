import { useState, useEffect } from "react";

function App() {
    const [currentUrl, setCurrentUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Get current tab URL
        const getCurrentTabUrl = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // For browser extensions
                if (chrome?.tabs) {
                    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    if (tab?.url) {
                        setCurrentUrl(tab.url);
                        console.log("Current URL:", tab.url);
                    } else {
                        setError("Could not get tab URL");
                    }
                } else {
                    // Fallback for local development
                    setCurrentUrl(window.location.href);
                    console.log("Current URL (dev):", window.location.href);
                }
            } catch (err) {
                console.error("Error getting URL:", err);
                setError("Error getting URL");
            } finally {
                setIsLoading(false);
            }
        };

        getCurrentTabUrl();
    }, []);

    const handleGetUrl = () => {
        if (currentUrl) {
            console.log("URL added:", currentUrl);
            alert(`URL added: ${currentUrl}`);
        }
    };

    const getDisplayContent = () => {
        if (isLoading) {
            return "Loading...";
        }
        if (error) {
            return error;
        }
        if (currentUrl) {
            return currentUrl;
        }
        return "No URL available";
    };

    return (
        <div className="w-[350px] h-[200px] mx-auto bg-dark-1 border border-dark-1 rounded-xl p-2.5 box-border grid gap-4 grid-rows-[auto_1fr_auto]">
            <p className="m-0 font-semibold text-gray-1 text-center text-base">Wlinks</p>
            <div className={`bg-dark-2 border border-dark-2 rounded-lg p-2.5 m-0 text-sm overflow-hidden break-all line-clamp-4 ${error ? 'text-red-1' : 'text-gray-1'}`}>
                {getDisplayContent()}
            </div>
            <button
                type="button"
                onClick={handleGetUrl}
                className="w-full p-2.5 bg-yellow-2 text-dark-1 border-none rounded font-semibold text-base cursor-pointer transition-colors duration-300 hover:bg-yellow-1 disabled:bg-dark-2 disabled:text-gray-1 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none active:not-disabled:opacity-90"
                disabled={!currentUrl || isLoading}
            >
                Save
            </button>
        </div>
    );
}

export default App;
