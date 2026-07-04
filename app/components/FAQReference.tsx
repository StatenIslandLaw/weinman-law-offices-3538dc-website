/**
 * FAQ Reference Component
 *
 * Use this component in blog posts and content pages to link to specific FAQs.
 * This improves internal linking and helps with SEO.
 *
 * Example usage in a blog post:
 *
 * <FAQReference
 *   index={5}
 *   title="Learn about attorney fees"
 *   variant="inline"
 * />
 *
 * or
 *
 * <FAQReference
 *   index={13}
 *   title="Understanding co-op board approval"
 *   variant="callout"
 * />
 */

import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import { getFAQUrl, faqItems } from '../data/faqData';

interface FAQReferenceProps {
  index: number;
  title?: string;
  variant?: 'inline' | 'callout' | 'button';
  className?: string;
}

export default function FAQReference({
  index,
  title,
  variant = 'inline',
  className = ''
}: FAQReferenceProps) {
  // Validate index
  if (index < 0 || index >= faqItems.length) {
    console.error(`Invalid FAQ index: ${index}`);
    return null;
  }

  const faq = faqItems[index];
  const url = getFAQUrl(index);
  const displayTitle = title || faq.question;

  // Inline link (minimal styling)
  if (variant === 'inline') {
    return (
      <Link
        href={url}
        className={`text-amber-400 hover:text-amber-300 underline font-medium ${className}`}
      >
        {displayTitle}
      </Link>
    );
  }

  // Callout box (highlighted reference)
  if (variant === 'callout') {
    return (
      <div className={`my-6 p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg ${className}`}>
        <div className="flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-slate-400 mb-1">Related FAQ</p>
            <Link
              href={url}
              className="text-white hover:text-amber-300 font-medium transition-colors"
            >
              {displayTitle} →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Button style (call-to-action)
  if (variant === 'button') {
    return (
      <Link
        href={url}
        className={`inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg hover:bg-amber-500/30 transition-colors text-white font-medium ${className}`}
      >
        <HelpCircle className="h-4 w-4" />
        {displayTitle}
      </Link>
    );
  }

  return null;
}

/**
 * Multiple FAQ References Component
 * Shows a list of related FAQs at the end of blog posts
 */
export function RelatedFAQs({
  faqIndexes,
  title = 'Related FAQs'
}: {
  faqIndexes: number[];
  title?: string;
}) {
  const validIndexes = faqIndexes.filter(i => i >= 0 && i < faqItems.length);

  if (validIndexes.length === 0) return null;

  return (
    <div className="mt-12 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="h-5 w-5 text-amber-400" />
        <h3 className="text-xl font-bold text-amber-400">{title}</h3>
      </div>
      <div className="space-y-2">
        {validIndexes.map(index => {
          const faq = faqItems[index];
          return (
            <Link
              key={index}
              href={getFAQUrl(index)}
              className="block p-3 bg-slate-900/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
            >
              <p className="text-white group-hover:text-amber-300 font-medium">
                → {faq.question}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/**
 * FAQ Search Helper
 * Find FAQ indexes by searching question text
 */
export function findFAQsByKeyword(keyword: string): number[] {
  return faqItems
    .map((faq, index) => ({ faq, index }))
    .filter(({ faq }) =>
      faq.question.toLowerCase().includes(keyword.toLowerCase()) ||
      faq.answer.toLowerCase().includes(keyword.toLowerCase())
    )
    .map(({ index }) => index);
}

/**
 * EXAMPLE USAGE IN BLOG POSTS:
 *
 * import FAQReference, { RelatedFAQs, findFAQsByKeyword } from '@/app/components/FAQReference';
 *
 * // Inline reference
 * <p>
 *   Wondering about costs? Check out our <FAQReference index={5} /> for details.
 * </p>
 *
 * // Callout box
 * <FAQReference
 *   index={13}
 *   title="Learn about the co-op approval process"
 *   variant="callout"
 * />
 *
 * // Related FAQs section at end of post
 * <RelatedFAQs faqIndexes={[0, 5, 13, 20]} />
 *
 * // Find FAQs by keyword
 * const feesFAQs = findFAQsByKeyword('attorney fees');
 * <RelatedFAQs faqIndexes={feesFAQs} title="FAQs About Attorney Fees" />
 */
