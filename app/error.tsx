'use client';

import React, { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset: _reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error caught by error boundary:', error);
  }, [error]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 rounded-full p-4">
              <svg
                className="w-16 h-16 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Error Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Oops! Something went wrong
          </h1>

          {/* Error Details (collapsible) */}
          <details className="mb-6 bg-gray-50 rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
              Error Details
            </summary>
            <div className="mt-4 space-y-2">
              <div className="bg-white rounded p-3 border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-1">Message:</p>
                <p className="text-sm text-red-600 font-mono break-words">
                  {error.message || 'Unknown error'}
                </p>
              </div>
              {error.digest && (
                <div className="bg-white rounded p-3 border border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Error ID:</p>
                  <p className="text-sm text-gray-600 font-mono break-words">
                    {error.digest}
                  </p>
                </div>
              )}
              {error.stack && process.env.NODE_ENV === 'development' && (
                <div className="bg-white rounded p-3 border border-gray-200 max-h-40 overflow-y-auto">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Stack Trace:</p>
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap break-words">
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          </details>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={handleRefresh}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

