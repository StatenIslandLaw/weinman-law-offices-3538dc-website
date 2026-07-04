// Generate static sitemap.xml for Google Search Console
const fs = require('fs');
const path = require('path');

// Import blog posts
const { blogPosts } = require('./app/data/blogPosts.ts');
const { faqItems } = require('./app/data/faqData.ts');

const baseUrl = 'https://www.statenislandlaw.com';
const currentDate = new Date().toISOString().split('T')[0];

// Static pages
const staticPages = [
  { url: '', lastmod: currentDate, changefreq: 'weekly', priority: '1.0' },
  { url: '/about', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
  { url: '/services', lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
  { url: '/areas', lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
  { url: '/faqs', lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
  { url: '/reviews', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
  { url: '/blog', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
  { url: '/disclaimer', lastmod: currentDate, changefreq: 'yearly', priority: '0.3' },
  { url: '/privacy-policy', lastmod: currentDate, changefreq: 'yearly', priority: '0.3' },
  { url: '/terms-of-service', lastmod: currentDate, changefreq: 'yearly', priority: '0.3' },
];

// Generate XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Add static pages
staticPages.forEach(page => {
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
  xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += '  </url>\n';
});

// Add blog posts
blogPosts.forEach(post => {
  const lastmod = (post.updatedDate || post.publishDate).split('T')[0];
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
  xml += `    <lastmod>${lastmod}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.7</priority>\n`;
  xml += '  </url>\n';
});

// Add FAQ entries
faqItems.forEach((faq, index) => {
  const priority = faq.popular ? '0.8' : '0.6';
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}/faqs#faq-${index}</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>${priority}</priority>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>';

// Write to file
const outputPath = path.join(__dirname, 'sitemap-upload.xml');
fs.writeFileSync(outputPath, xml, 'utf8');

console.log(`✅ Sitemap generated: ${outputPath}`);
console.log(`📊 Total URLs: ${staticPages.length + blogPosts.length + faqItems.length}`);
console.log(`   - Static pages: ${staticPages.length}`);
console.log(`   - Blog posts: ${blogPosts.length}`);
console.log(`   - FAQ entries: ${faqItems.length}`);
