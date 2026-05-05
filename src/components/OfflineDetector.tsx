import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";

const OfflineDetector = () => {
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setShowOfflineAlert(false);
    };

    const handleOffline = () => {
      setShowOfflineAlert(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (showOfflineAlert) {
    return (
      <div className="fixed top-20 left-1/2 right-1/2 z-50 bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto shadow-lg">
        <div className="flex items-center space-x-3">
          <WifiOff className="w-5 h-5 text-yellow-600" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">You're Offline</h3>
            <p className="text-yellow-700 text-sm">
              No internet connection detected. Some features may be limited, but cached content is still available.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowOfflineAlert(false)}
          className="mt-3 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          Dismiss
        </button>
      </div>
    );
  }

  return null;
};

OfflineDetector.displayName = "OfflineDetector";

export { OfflineDetector };
