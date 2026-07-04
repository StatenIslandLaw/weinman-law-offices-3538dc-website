import Link from 'next/link';
import { getFAQUrl } from '../data/faqData';

/**
 * Create a link to a specific FAQ by index
 * Usage in blog posts or other pages:
 * <FAQLink index={5}>Learn more about attorney fees</FAQLink>
 */
export function FAQLink({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <Link
      href={getFAQUrl(index)}
      className="text-amber-400 hover:text-amber-300 underline font-medium"
    >
      {children}
    </Link>
  );
}

/**
 * Get FAQ URL for programmatic use
 * Usage: const url = getFAQLinkUrl(5)
 */
export function getFAQLinkUrl(index: number, absolute = false): string {
  return getFAQUrl(index, absolute);
}

/**
 * Search FAQs by question text (returns first match)
 * Useful for finding FAQ index by question text
 */
export function findFAQByQuestion(
  faqItems: Array<{ question: string }>,
  searchText: string
): number {
  const index = faqItems.findIndex((faq) =>
    faq.question.toLowerCase().includes(searchText.toLowerCase())
  );
  return index !== -1 ? index : -1;
}

/**
 * Example usage in blog posts or content pages:
 *
 * import { FAQLink } from '@/app/utils/faqLinking';
 * import { faqItems } from '@/app/data/faqData';
 * import { findFAQByQuestion } from '@/app/utils/faqLinking';
 *
 * // Option 1: Direct index
 * <FAQLink index={5}>Read our FAQ about attorney fees</FAQLink>
 *
 * // Option 2: Find by question text
 * const feesFaqIndex = findFAQByQuestion(faqItems, 'attorney fees');
 * <FAQLink index={feesFaqIndex}>Attorney fees explained</FAQLink>
 *
 * // Option 3: As a regular anchor tag
 * <a href={getFAQLinkUrl(10, true)}>Check out this FAQ</a>
 */
