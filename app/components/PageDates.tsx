import React from 'react';
import { RefreshCw } from 'lucide-react';

interface PageDatesProps {
  lastUpdated: string;
  className?: string;
}

export default function PageDates({ lastUpdated, className = '' }: PageDatesProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`flex items-center justify-center gap-2 text-sm ${className}`}>
      <RefreshCw className="h-4 w-4 text-amber-400" />
      <span className="text-slate-400">Last Updated:</span>
      <span className="text-slate-200 font-medium">April 30, 2026</span>
    </div>);

}