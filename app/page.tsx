"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getApiConfig } from "@/lib/api";

export default function Home() {
  const [apiConfig, setApiConfig] = useState({ apiUrl: '', useDummyData: true });

  useEffect(() => {
    setApiConfig(getApiConfig());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* API Status Indicator */}
          <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                API Mode:
              </span>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${
                apiConfig.useDummyData 
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {apiConfig.useDummyData ? 'Dummy Data' : 'Live Server'}
              </span>
            </div>
            {!apiConfig.useDummyData && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {apiConfig.apiUrl}
              </div>
            )}
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Toggle in <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">.env.local</code>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Next.js Authentication Starter
            </p>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/login"
              className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-center"
            >
              Login
            </Link>
            
            <Link
              href="/register"
              className="block w-full bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-indigo-600 dark:text-indigo-400 font-semibold py-3 px-4 rounded-lg border-2 border-indigo-600 dark:border-indigo-400 transition duration-200 text-center"
            >
              Register
            </Link>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Built with Next.js 15 & Tailwind CSS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
