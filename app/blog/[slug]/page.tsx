import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/app/data/blogPosts';
import DesktopMarginWrapper from '@/app/components/DesktopMarginWrapper';
import { parseMarkdownToHTML } from '@/app/utils/blogContentParser';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: {params: Promise<{slug: string;}>;}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }

  return {
    title: `${post.title} | Staten Island Real Estate Lawyer`,
    description: post.description,
    keywords: [...post.tags, 'Staten Island', 'real estate lawyer', 'Pete Weinman', post.category.toLowerCase()],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      siteName: "Pete Weinman, Esq., Real Estate Lawyer",
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate || post.publishDate,
      authors: [post.author],
      url: `https://www.statenislandlaw.com/blog/${post.slug}`,
      images: post.image ? [
      {
        url: post.image,
        width: 1200,
        height: 630,
        alt: post.imageAlt || post.title
      }] :
      []
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : []
    },
    alternates: {
      canonical: `https://www.statenislandlaw.com/blog/${post.slug}`
    }
  };
}

export default async function BlogPost({ params }: {params: Promise<{slug: string;}>;}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);

  // Generate Article structured data for SEO
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.publishDate,
    dateModified: post.updatedDate || post.publishDate,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Weinman Law Offices',
      logo: {
        '@type': 'ImageObject',
        url: 'https://breezy-sites.s3.amazonaws.com/site_images/3538dc64da8e6f3cab2a245299e0e3dd6655ba6606b507776332400b7f39/0552d3074780f0802def15f029c6e855438464d908a52b154903abe398c8.jpg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.statenislandlaw.com/blog/${post.slug}`
    }
  };

  // Generate Breadcrumb structured data
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.statenislandlaw.com'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: 'https://www.statenislandlaw.com/blog'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: post.title,
      item: `https://www.statenislandlaw.com/blog/${post.slug}`
    }]

  };

  return (
    <DesktopMarginWrapper>
      {/* Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }} />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />


      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Article Header */}
        <article className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="mb-8 text-sm">
              <ol className="flex items-center space-x-2 text-slate-400">
                <li>
                  <Link href="/" className="hover:text-amber-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/blog" className="hover:text-amber-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>/</li>
                <li className="text-slate-300">{post.title}</li>
              </ol>
            </nav>

            {/* Author Photo */}
            <div className="float-left mr-6 mb-4">
              <Image
                src="/pete-weinman-photo.jpg"
                alt="Pete Weinman"
                width={80}
                height={80}
                className="rounded-full border-2 border-amber-400/50" />

            </div>

            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-block px-4 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-sm font-semibold">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm mb-8 pb-8 border-b border-slate-700 clear-left">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={post.publishDate}>
                  {new Date(post.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-lg prose-invert prose-amber max-w-none">
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: parseMarkdownToHTML(post.content)
                }} />

            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-700">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) =>
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">

                    #{tag}
                  </span>
                )}
              </div>
            </div>

            {/* Legal Disclaimer */}
            <div className="mt-8 p-6 bg-slate-800/30 border-2 border-slate-700 rounded-lg">
              <h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Legal Disclaimer
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                The information provided in this blog post is for general informational purposes only and does not constitute legal advice.
                No attorney-client relationship is formed by reading this content. The information may not reflect the most current legal
                developments and may not apply to your specific situation. For legal advice concerning your individual circumstances,
                please consult with a licensed attorney. Do not rely on this information as a substitute for professional legal counsel.
                Past results do not guarantee similar outcomes in future cases.
              </p>
            </div>

            {/* CTA Section */}
            <div className="mt-12 p-8 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-2 border-amber-400/30 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Need Legal Assistance?</h3>
              <p className="text-slate-200 mb-6">
                If you have questions about real estate law or need representation, I'm here to help.
                Contact me today for a consultation.
              </p>
              <Link
                href="/about"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">

                Contact Pete Weinman →
              </Link>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 &&
        <section className="py-12 bg-slate-800/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) =>
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="block bg-slate-900 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-700 hover:border-amber-400/50 p-5">

                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-3">
                      {relatedPost.description}
                    </p>
                  </Link>
              )}
              </div>
            </div>
          </section>
        }

        {/* Back to Blog */}
        <div className="py-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">

            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Posts
          </Link>
        </div>
      </div>
    </DesktopMarginWrapper>);

}