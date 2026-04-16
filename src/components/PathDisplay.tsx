import { useState, useEffect } from "react";
import { useRouter } from "./Router";

const PathDisplay = () => {
  const { currentPage } = useRouter();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    const path = currentPage === "home" 
      ? "https://Mckeywaprojects.co.za/"
      : currentPage === "about"
      ? "https://Mckeywaprojects.co.za/about"
      : currentPage === "services"
      ? "https://Mckeywaprojects.co.za/services"
      : currentPage === "contact"
      ? "https://Mckeywaprojects.co.za/contact"
      : "https://Mckeywaprojects.co.za/";
    
    setCurrentPath(path);
  }, [currentPage]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentPath);
    // You could add a toast notification here
  };

  return (
    <div className="fixed bottom-4 left-4 bg-gray-800 dark:bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg z-40 max-w-sm">
      <div className="flex items-center space-x-2 text-sm">
        <div className="flex-1 min-w-0">
          <span className="text-gray-400 text-xs">Current Page URL:</span>
          <div className="font-mono text-xs break-all">{currentPath}</div>
        </div>
        <button
          onClick={copyToClipboard}
          className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition-colors"
          title="Copy URL"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

PathDisplay.displayName = "PathDisplay";

export { PathDisplay };
