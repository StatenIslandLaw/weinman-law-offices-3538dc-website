'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import StructuredData from './StructuredData';
import { generateBreadcrumbSchema } from '../utils/structuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.statenislandlaw.com' },
    ...items,
  ];

  return (
    <>
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/"
              className="flex items-center text-slate-400 hover:text-amber-500 transition-colors"
              aria-label="Home"
            >
              <Home className="h-4 w-4" />
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4 text-slate-400" />
              {index === items.length - 1 ? (
                <span className="text-amber-400 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
    </>
  );
}
