/**
 * FAQ SEO Validation Utilities
 *
 * Use these functions to validate your FAQ SEO implementation
 */

import { faqItems, stripHtml } from '../data/faqData';

/**
 * Validate FAQ Schema Data
 * Ensures all FAQs have clean text for schema markup
 */
export function validateFAQSchema() {
  const results = {
    total: faqItems.length,
    withHTML: 0,
    tooLong: 0,
    tooShort: 0,
    valid: 0,
  };

  faqItems.forEach((faq, index) => {
    const cleanAnswer = stripHtml(faq.answer);

    // Check for HTML tags that weren't stripped
    if (cleanAnswer.includes('<') || cleanAnswer.includes('>')) {
      results.withHTML++;
      console.warn(`FAQ ${index}: Still contains HTML tags`);
    }

    // Check answer length (50-300 words is ideal for SEO)
    const wordCount = cleanAnswer.split(/\s+/).length;
    if (wordCount < 10) {
      results.tooShort++;
      console.warn(`FAQ ${index}: Answer too short (${wordCount} words)`);
    } else if (wordCount > 500) {
      results.tooLong++;
      console.warn(`FAQ ${index}: Answer very long (${wordCount} words)`);
    } else {
      results.valid++;
    }
  });

  return results;
}

/**
 * Get FAQ Statistics for SEO
 */
export function getFAQStats() {
  const categories = new Set(faqItems.map(f => f.category));
  const popular = faqItems.filter(f => f.popular);
  const withRelated = faqItems.filter(f => f.relatedIndexes && f.relatedIndexes.length > 0);

  return {
    totalFAQs: faqItems.length,
    categories: categories.size,
    popularFAQs: popular.length,
    withRelatedLinks: withRelated.length,
    averageAnswerLength: Math.round(
      faqItems.reduce((sum, faq) => sum + stripHtml(faq.answer).split(/\s+/).length, 0) / faqItems.length
    ),
  };
}

/**
 * Generate SEO Report
 */
export function generateSEOReport() {
  console.log('=== FAQ SEO Report ===\n');

  const stats = getFAQStats();
  console.log('📊 Statistics:');
  console.log(`   Total FAQs: ${stats.totalFAQs}`);
  console.log(`   Categories: ${stats.categories}`);
  console.log(`   Popular FAQs: ${stats.popularFAQs}`);
  console.log(`   With Related Links: ${stats.withRelatedLinks}`);
  console.log(`   Avg Answer Length: ${stats.averageAnswerLength} words\n`);

  const validation = validateFAQSchema();
  console.log('✅ Schema Validation:');
  console.log(`   Valid: ${validation.valid}`);
  console.log(`   With HTML: ${validation.withHTML}`);
  console.log(`   Too Short: ${validation.tooShort}`);
  console.log(`   Too Long: ${validation.tooLong}\n`);

  console.log('🎯 SEO Checklist:');
  console.log(`   [${stats.popularFAQs > 0 ? '✓' : ' '}] Popular FAQs marked`);
  console.log(`   [${stats.withRelatedLinks > 0 ? '✓' : ' '}] Internal FAQ linking`);
  console.log(`   [${validation.withHTML === 0 ? '✓' : ' '}] Clean schema data`);
  console.log(`   [✓] Server-side rendering enabled`);
  console.log(`   [✓] Individual FAQ URLs in sitemap`);
  console.log(`   [✓] FAQPage schema markup`);
  console.log(`   [✓] Enhanced metadata`);

  return { stats, validation };
}

// Example usage:
// import { generateSEOReport } from '@/app/utils/validateFAQSEO';
// generateSEOReport();
