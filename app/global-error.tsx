'use client';

import React from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset: _reset }: GlobalErrorProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSolveWithAI = () => {
    // TODO: Implement AI error solving
    console.log('🤖 Solve with AI clicked');
    console.log('Error:', error.message);
    console.log('Stack:', error.stack);
  };

  return (
    <html>
      <body>
        <div className="fixed inset-0 bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
                Critical Error
              </h1>

              {/* Error Details */}
              <details className="mb-6 bg-gray-50 rounded-lg p-4">
                <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
                  Error Details
                </summary>
                <div className="mt-4 space-y-2">
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Message:</p>
                    <p className="text-sm text-red-600 font-mono break-words">
                      {error.message || 'Unknown critical error'}
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
                
                {/* AI Solve Button - Dev Only */}
                {process.env.NODE_ENV === 'development' && (
                  <button
                    onClick={handleSolveWithAI}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1.5 underline decoration-dotted underline-offset-2"
                  >
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                      />
                    </svg>
                    Solve with AI
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
