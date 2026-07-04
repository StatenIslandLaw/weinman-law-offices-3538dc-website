import { blogPosts, getAllPosts } from './app/data/blogPosts.ts';

console.log('Total posts in blogPosts array:', blogPosts.length);
console.log('Total posts from getAllPosts():', getAllPosts().length);
console.log('\nPost slugs:');
blogPosts.forEach((post, index) => {
  console.log(`${index + 1}. ${post.slug} (${post.publishDate})`);
});
