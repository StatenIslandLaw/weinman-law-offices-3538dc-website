import React from 'react';
import { Metadata } from 'next';
import DesktopMarginWrapper from '../components/DesktopMarginWrapper';
import BlogClient from './BlogClient';
import { getAllPosts } from '../data/blogPosts';

export const metadata: Metadata = {
  title: "Real Estate Law Blog | Staten Island Attorney Pete Weinman",
  description: "Expert insights on NY & NJ real estate law, home buying, closings, co-ops, condos, and property transactions from experienced Staten Island attorney Pete Weinman.",
  keywords: [
    "real estate law blog",
    "Staten Island real estate attorney blog",
    "NY real estate legal advice",
    "home buying tips",
    "real estate closing insights",
    "Pete Weinman blog"
  ],
  openGraph: {
    title: "Real Estate Law Blog | Staten Island Attorney",
    description: "Expert insights on NY & NJ real estate law from Pete Weinman, experienced Staten Island attorney.",
    url: "https://www.statenislandlaw.com/blog",
    type: "website",
    siteName: "Pete Weinman, Esq., Real Estate Lawyer",
  },
  alternates: {
    canonical: "https://www.statenislandlaw.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  // Blog structured data
  const blogData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Staten Island Law Blog',
    description: 'Real estate law insights and updates from Pete Weinman, Staten Island Real Estate Attorney',
    url: 'https://www.statenislandlaw.com/blog',
    author: {
      '@type': 'Person',
      name: 'Pete Weinman',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Weinman Law Offices',
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.publishDate,
      dateModified: post.updatedDate || post.publishDate,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      url: `https://www.statenislandlaw.com/blog/${post.slug}`,
    })),
  };

  return (
    <DesktopMarginWrapper>
      {/* Blog Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white w-full overflow-x-hidden">
        <BlogClient posts={posts} />
      </div>
    </DesktopMarginWrapper>
  );
}
