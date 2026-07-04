'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronUp,
  Search,
  Printer,
  Share2,
  CheckCircle,
  HelpCircle,
  Briefcase,
  Calendar,
  FileText,
  Clock,
  DollarSign,
  Home,
  Scale,
} from 'lucide-react';
import { PROFESSIONAL_PHONE } from '../../professionalConstants';
import { formatPhoneNumber } from '../utils/phoneUtils';
import { FAQItem } from '../data/faqData';

// Icon mapping for resolving icon names to components
const iconComponents: Record<string, React.ElementType> = {
  Calendar,
  DollarSign,
  Home,
  Clock,
  CheckCircle,
  Briefcase,
  FileText,
  Scale,
  HelpCircle,
};

interface FAQClientProps {
  faqItems: FAQItem[];
  categoryIcons: Record<string, string>;
  groupedFAQs: Record<string, FAQItem[]>;
}

export default function FAQClient({ faqItems, categoryIcons, groupedFAQs }: FAQClientProps) {
  const [expandedIndexes, setExpandedIndexes] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Handle URL hash on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#faq-', '');
      const index = parseInt(hash);
      if (!isNaN(index) && index >= 0 && index < faqItems.length) {
        setExpandedIndexes(new Set([index]));
        setTimeout(() => {
          const element = document.getElementById(`faq-${index}`);
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [faqItems.length]);

  const toggleExpanded = (index: number) => {
    setExpandedIndexes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedIndexes(new Set(filteredFAQs.map((_, idx) => faqItems.indexOf(_))));
  };

  const collapseAll = () => {
    setExpandedIndexes(new Set());
  };

  const handleShare = async (index: number) => {
    const url = `${window.location.origin}${window.location.pathname}#faq-${index}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToCategory = (category: string) => {
    categoryRefs.current[category]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveCategory(category);
  };

  // Filter FAQs based on search
  const filteredFAQs = faqItems.filter((faq) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query)
    );
  });

  // Highlight search matches
  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts
      .map((part, i) =>
        part.toLowerCase() === searchQuery.toLowerCase()
          ? `<mark class="bg-amber-300 text-slate-900 px-1 rounded">${part}</mark>`
          : part
      )
      .join('');
  };

  // Get popular FAQs
  const popularFAQs = faqItems.filter((faq) => faq.popular).slice(0, 5);

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
                <span className="text-amber-300 text-sm font-semibold tracking-wide">
                  Frequently Asked Questions (FAQs)
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
              Real Estate Attorney FAQs
            </h1>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border-2 border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              {searchQuery && (
                <p className="text-slate-300 text-sm mt-2">
                  Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center print:hidden">
              <button
                onClick={expandAll}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <ChevronDown className="h-4 w-4" />
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <ChevronUp className="h-4 w-4" />
                Collapse All
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>
            </div>
          </div>
        </div>
        <div className="h-8 bg-gradient-to-b from-transparent to-slate-900/50"></div>
      </section>

      {/* Resource Banner - Compact */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 rounded-lg p-3 text-center">
            <p className="text-sm font-semibold text-amber-400 mb-2">📚 Looking for Downloadable Guides?</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <a
                href="https://sites.google.com/statenislandlaw.com/buyer-seller-resources/home-buyer-resources"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500/80 hover:bg-amber-500 text-slate-900 px-4 py-1.5 rounded text-sm font-semibold transition-all">
                📥 Buyer Resources
              </a>
              <a
                href="https://drive.google.com/file/d/1jR7uLTdb6P4FD8CrGsuQJ2fzTwB3ZgkI/view"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500/80 hover:bg-amber-500 text-slate-900 px-4 py-1.5 rounded text-sm font-semibold transition-all">
                💰 Closing Costs
              </a>
              <a
                href="https://sites.google.com/statenislandlaw.com/buyer-seller-resources/home-seller-resources"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500/80 hover:bg-amber-500 text-slate-900 px-4 py-1.5 rounded text-sm font-semibold transition-all">
                📤 Seller Resources
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="pt-8 pb-16 md:pt-10 md:pb-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sticky Category Navigation - Desktop */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0 print:hidden">
              <div className="sticky top-24 bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h2 className="text-lg font-bold text-amber-400 mb-4">Categories</h2>
                <nav className="space-y-2">
                  {Object.keys(groupedFAQs).map((category) => {
                    const iconName = categoryIcons[category] || 'HelpCircle';
                    const Icon = iconComponents[iconName] || HelpCircle;
                    return (
                      <button
                        key={category}
                        onClick={() => scrollToCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                          activeCategory === category
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        }`}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{category}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* FAQs Content */}
            <div className="flex-1 min-w-0">
              {/* Browse by Category Section */}
              {!searchQuery && (
                <div className="mb-12 print:hidden">
                  <div className="flex items-center gap-2 mb-6">
                    <HelpCircle className="h-6 w-6 text-amber-400" />
                    <h2 className="text-2xl md:text-3xl font-bold text-amber-400">Browse by Category</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* Most Popular - First Item */}
                    {popularFAQs.length > 0 && (
                      <button
                        onClick={() => scrollToCategory('Most Popular')}
                        className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-2 border-amber-400/50 rounded-lg hover:from-amber-500/30 hover:to-amber-600/30 hover:border-amber-400 transition-all text-left group"
                      >
                        <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold text-sm leading-tight truncate">Most Popular</p>
                          <p className="text-amber-300 text-xs mt-0.5">{popularFAQs.length} question{popularFAQs.length !== 1 ? 's' : ''}</p>
                        </div>
                      </button>
                    )}

                    {/* Regular Categories */}
                    {Object.keys(groupedFAQs).map((category) => {
                      const iconName = categoryIcons[category] || 'HelpCircle';
                      const Icon = iconComponents[iconName] || HelpCircle;
                      const categoryFAQCount = groupedFAQs[category].length;

                      return (
                        <button
                          key={category}
                          onClick={() => scrollToCategory(category)}
                          className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-700/50 hover:border-amber-400/50 transition-all text-left group"
                        >
                          <Icon className="h-5 w-5 text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm leading-tight truncate">{category}</p>
                            <p className="text-slate-400 text-xs mt-0.5">{categoryFAQCount} question{categoryFAQCount !== 1 ? 's' : ''}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Most Popular Section */}
              {!searchQuery && popularFAQs.length > 0 && (
                <div
                  className="mb-12"
                  ref={(el) => {
                    categoryRefs.current['Most Popular'] = el;
                  }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-amber-500/30">
                    <CheckCircle className="h-7 w-7 text-amber-400" />
                    <h2 className="text-2xl md:text-3xl font-bold text-amber-400">Most Popular</h2>
                  </div>

                  {/* Popular FAQs List */}
                  <div className="space-y-4">
                    {popularFAQs.map((faq) => {
                      const globalIndex = faqItems.indexOf(faq);
                      const isExpanded = expandedIndexes.has(globalIndex);
                      const relatedFAQs =
                        faq.relatedIndexes?.map((idx) => faqItems[idx]).filter(Boolean) || [];

                      return (
                        <div
                          key={globalIndex}
                          id={`faq-${globalIndex}`}
                          className="bg-slate-800/50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-700 scroll-mt-24"
                        >
                          <button
                            onClick={() => toggleExpanded(globalIndex)}
                            className="w-full px-6 py-5 flex items-start justify-between hover:bg-slate-700/50 transition-colors text-left gap-4"
                          >
                            <div className="flex items-start gap-4 flex-1">
                              <span className="flex-shrink-0 w-8 h-8 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center text-sm font-bold">
                                {globalIndex + 1}
                              </span>
                              <h3
                                className="text-lg font-semibold text-white flex-1"
                                dangerouslySetInnerHTML={{ __html: highlightText(faq.question) }}
                              />
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleShare(globalIndex);
                                }}
                                className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors"
                                title="Copy link to this question"
                              >
                                {copiedIndex === globalIndex ? (
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                ) : (
                                  <Share2 className="h-4 w-4 text-slate-400" />
                                )}
                              </button>
                              {isExpanded ? (
                                <ChevronUp className="h-5 w-5 text-amber-400" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-slate-400" />
                              )}
                            </div>
                          </button>

                          {isExpanded && (
                            <div className="px-6 pb-6">
                              <div
                                className="prose prose-invert prose-sm max-w-none text-slate-200 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: highlightText(faq.answer) }}
                              />

                              {relatedFAQs.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-slate-700">
                                  <p className="text-sm font-semibold text-slate-300 mb-3">
                                    Related Questions:
                                  </p>
                                  <div className="space-y-2">
                                    {relatedFAQs.map((relatedFaq) => {
                                      const relatedIndex = faqItems.indexOf(relatedFaq);
                                      return (
                                        <button
                                          key={relatedIndex}
                                          onClick={() => {
                                            toggleExpanded(relatedIndex);
                                            document
                                              .getElementById(`faq-${relatedIndex}`)
                                              ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                          }}
                                          className="block w-full text-left text-sm text-amber-400 hover:text-amber-300 transition-colors"
                                        >
                                          → {relatedFaq.question}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* FAQs by Category - Single Column */}
              {Object.entries(groupedFAQs).map(([category, faqs]) => {
                const filteredCategoryFAQs = faqs.filter((faq) => filteredFAQs.includes(faq));
                if (filteredCategoryFAQs.length === 0) return null;

                const iconName = categoryIcons[category] || 'HelpCircle';
                const Icon = iconComponents[iconName] || HelpCircle;

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
                    </div>

                    {/* FAQs List - Single Column */}
                    <div className="space-y-4">
                      {filteredCategoryFAQs.map((faq) => {
                        const globalIndex = faqItems.indexOf(faq);
                        const isExpanded = expandedIndexes.has(globalIndex);
                        const relatedFAQs =
                          faq.relatedIndexes?.map((idx) => faqItems[idx]).filter(Boolean) || [];

                        return (
                          <div
                            key={globalIndex}
                            id={`faq-${globalIndex}`}
                            className="bg-slate-800/50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-700 scroll-mt-24"
                          >
                            <button
                              onClick={() => toggleExpanded(globalIndex)}
                              className="w-full px-6 py-5 flex items-start justify-between hover:bg-slate-700/50 transition-colors text-left gap-4"
                            >
                              <div className="flex items-start gap-4 flex-1">
                                <span className="flex-shrink-0 w-8 h-8 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center text-sm font-bold">
                                  {globalIndex + 1}
                                </span>
                                <h3
                                  className="text-lg font-semibold text-white flex-1"
                                  dangerouslySetInnerHTML={{ __html: highlightText(faq.question) }}
                                />
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleShare(globalIndex);
                                  }}
                                  className="p-2 hover:bg-slate-600 rounded-lg transition-colors print:hidden"
                                  title="Share this FAQ"
                                >
                                  {copiedIndex === globalIndex ? (
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                  ) : (
                                    <Share2 className="h-5 w-5 text-slate-400" />
                                  )}
                                </button>
                                {isExpanded ? (
                                  <ChevronUp className="h-6 w-6 text-amber-400" />
                                ) : (
                                  <ChevronDown className="h-6 w-6 text-slate-400" />
                                )}
                              </div>
                            </button>

                            {isExpanded && (
                              <div className="px-6 py-6 bg-slate-900/50 border-t border-slate-700">
                                <div
                                  className="text-slate-200 text-base leading-relaxed mb-4"
                                  dangerouslySetInnerHTML={{ __html: highlightText(faq.answer) }}
                                />

                                {/* Related FAQs */}
                                {relatedFAQs.length > 0 && (
                                  <div className="mt-6 pt-4 border-t border-slate-700">
                                    <p className="text-sm font-semibold text-amber-400 mb-3">
                                      Related Questions:
                                    </p>
                                    <div className="space-y-2">
                                      {relatedFAQs.map((relatedFaq) => {
                                        const relatedIndex = faqItems.indexOf(relatedFaq);
                                        return (
                                          <button
                                            key={relatedIndex}
                                            onClick={() => {
                                              toggleExpanded(relatedIndex);
                                              document
                                                .getElementById(`faq-${relatedIndex}`)
                                                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }}
                                            className="block w-full text-left px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors text-sm text-slate-300 hover:text-white"
                                          >
                                            → {relatedFaq.question}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">No FAQs found matching &quot;{searchQuery}&quot;</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-amber-400 hover:text-amber-300 underline"
                  >
                    Clear search
                  </button>
                </div>
              )}

              <div className="text-center mt-12 print:hidden">
                <Link
                  href="/"
                  className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Return to Home →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .bg-gradient-to-br,
          .bg-slate-900,
          .bg-slate-800 {
            background: white !important;
          }
          .text-white,
          .text-slate-200 {
            color: black !important;
          }
          .border-slate-700 {
            border-color: #ccc !important;
          }
          button[class*='print:hidden'],
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8 mx-auto text-center">
          <div className="mb-6 inline-block px-6 py-2 bg-amber-500/20 border-2 border-amber-400/40 rounded-full">
            <span className="text-amber-300 text-sm font-semibold tracking-wide">
              WE&apos;RE HERE TO HELP
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Didn&apos;t find your answer?
          </h2>
          <p className="text-xl text-slate-200 mb-8 leading-relaxed">
            Contact us directly for personalized assistance with your legal needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${PROFESSIONAL_PHONE}`}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Call {formatPhoneNumber(PROFESSIONAL_PHONE)}
            </a>
            <a
              href="mailto:Weinman@StatenIslandLaw.com"
              className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Email Us
            </a>
          </div>
          <p className="text-slate-300 text-sm mt-8">
            Office Hours: Monday - Friday, 8:00 AM - 5:00 PM ET
          </p>
        </div>
      </section>
    </>
  );
}
