'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Home,
  FileText,
  Briefcase,
  Scale,
  GraduationCap,
  ClipboardCheck,
  ScrollText,
  DollarSign,
  Search,
  Banknote,
  Clock,
} from 'lucide-react';
import { BlogPost } from '../data/blogPosts';

// Icon mapping for categories
const iconComponents: Record<string, React.ElementType> = {
  'Most Recent': Clock,
  'Home Buying': Home,
  'Home Selling': Briefcase,
  'Closing Process': ClipboardCheck,
  'Finances': DollarSign,
  'Legal Resources': Scale,
};

interface BlogClientProps {
  posts: BlogPost[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const searchableText = [
      post.title,
      post.description,
      post.content,
      ...post.tags,
      post.category,
    ].join(' ').toLowerCase();

    return searchableText.includes(query);
  });

  // Group posts by category
  const groupedPosts: Record<string, BlogPost[]> = filteredPosts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, BlogPost[]>);

  // Add "Most Recent" category with the 5 most recent posts
  const mostRecentPosts = filteredPosts.slice(0, 5);
  if (mostRecentPosts.length > 0) {
    groupedPosts['Most Recent'] = mostRecentPosts;
  }

  // Define category order
  const categoryOrder = ['Most Recent', 'Home Buying', 'Home Selling', 'Closing Process', 'Finances', 'Legal Resources'];
  const categories = categoryOrder.filter(cat => groupedPosts[cat] && groupedPosts[cat].length > 0);

  const scrollToCategory = (category: string) => {
    categoryRefs.current[category]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveCategory(category);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 sm:pt-20 md:pt-24">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="w-full mx-auto text-center">
            {/* Badge */}
            <div className="mb-8 flex justify-center">
              <div className="px-6 py-2 bg-amber-500/20 border-2 border-amber-400/40 rounded-full inline-block">
                <span className="text-amber-300 text-sm font-semibold tracking-wide">REAL ESTATE LAW INSIGHTS</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Staten Island Lawyer Pete Weinman's Blog
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 mb-8 leading-relaxed w-full mx-auto px-4">
              Stay informed with the latest updates, tips, and insights on real estate law in New York and New Jersey.
            </p>
          </div>
        </div>
        <div className="h-8 bg-gradient-to-b from-transparent to-slate-900/50"></div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          {/* Search Box */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search blog posts by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-center text-slate-400 text-sm mt-3">
                Found {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}
          </div>

          {/* Horizontal Category Navigation */}
          <div className="mb-8 max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const Icon = iconComponents[category] || BookOpen;
                const count = groupedPosts[category].length;
                return (
                  <button
                    key={category}
                    onClick={() => scrollToCategory(category)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-lg whitespace-nowrap transition-all ${
                      activeCategory === category
                        ? 'bg-amber-500/20 text-amber-400 border-2 border-amber-400/50 shadow-lg'
                        : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:bg-slate-700/50 hover:border-amber-400/30'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-base font-semibold">{category}</span>
                    <span className="text-xs bg-slate-700 px-2.5 py-1 rounded-full">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Blog Posts Content */}
          <div className="max-w-5xl mx-auto">

              {/* Posts by Category */}
              {categories.map((category) => {
                const Icon = iconComponents[category] || BookOpen;
                const categoryPosts = groupedPosts[category];

                return (
                  <div
                    key={category}
                    className="mb-12"
                    ref={(el) => {
                      categoryRefs.current[category] = el;
                    }}
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-amber-500/30">
                      <Icon className="h-7 w-7 text-amber-400" />
                      <h2 className="text-2xl md:text-3xl font-bold text-amber-400">{category}</h2>
                      <span className="text-slate-400 text-sm ml-auto">({categoryPosts.length})</span>
                    </div>

                    {/* Posts List */}
                    <div className="space-y-4">
                      {categoryPosts.map((post) => (
                        <article
                          key={post.slug}
                          className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:bg-slate-700/50 hover:border-amber-400/50 transition-all"
                        >
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {/* Category Badge */}
                            <span className="inline-block px-2 py-0.5 bg-amber-500/20 border border-amber-400/40 rounded text-amber-300 text-xs font-semibold">
                              {post.category}
                            </span>
                            {/* Date */}
                            <time dateTime={post.publishDate} className="text-xs text-slate-400">
                              {new Date(post.publishDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </time>
                            {/* Updated badge if applicable */}
                            {post.updatedDate && (
                              <span className="text-xs text-slate-500">
                                (Updated {new Date(post.updatedDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })})
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="hover:text-amber-400 transition-colors"
                            >
                              {post.title}
                            </Link>
                          </h3>

                          {/* Description */}
                          <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                            {post.description}
                          </p>

                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.slice(0, 5).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-1 bg-slate-700/50 text-slate-400 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Read More Link */}
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors"
                          >
                            Read full article
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Empty State */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <Search className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  {searchQuery ? (
                    <>
                      <p className="text-slate-400 text-lg mb-2">No blog posts found for "{searchQuery}"</p>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                      >
                        Clear search and view all posts
                      </button>
                    </>
                  ) : (
                    <p className="text-slate-400 text-lg">No blog posts yet. Check back soon!</p>
                  )}
                </div>
              )}

            <div className="text-center mt-12">
              <Link
                href="/"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Return to Home →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Need Legal Advice?
          </h2>
          <p className="text-slate-200 text-lg mb-8">
            If you have questions about real estate law or need representation, contact me for a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Schedule Free Consultation →
            </Link>
            <Link
              href="/"
              className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-8 bg-slate-900/50 border-t border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-amber-400 mb-3">Legal Disclaimer</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              The information provided on this blog is for general informational purposes only and does not constitute legal advice.
              No attorney-client relationship is formed by reading or commenting on these posts. The content may not reflect the most
              current legal developments and may not apply to your specific situation. For legal advice concerning your individual
              circumstances, please consult with a licensed attorney. Do not rely on information from this blog as a substitute for
              professional legal counsel. Past results described in blog posts do not guarantee similar outcomes in future cases.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
