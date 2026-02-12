"use client";

import { useState, useEffect } from "react";

export default function ApiModeIndicator() {
  const [useDummyData, setUseDummyData] = useState(false);
  const [backendApi, setBackendApi] = useState("");

  useEffect(() => {
    setUseDummyData(process.env.NEXT_PUBLIC_USE_DUMMY_DATA === "true");
    setBackendApi(process.env.NEXT_PUBLIC_BACKEND_API || "Next.js API Routes");
  }, []);

  if (!useDummyData && !process.env.NEXT_PUBLIC_BACKEND_API) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              useDummyData ? "bg-yellow-400" : "bg-green-400"
            }`}
          />
          <span className="font-medium">
            {useDummyData ? "🔧 Dummy Data Mode" : "🌐 Live API Mode"}
          </span>
        </div>
        {!useDummyData && backendApi && (
          <div className="text-xs text-gray-400 mt-1">
            API: {backendApi}
          </div>
        )}
      </div>
    </div>
  );
}
