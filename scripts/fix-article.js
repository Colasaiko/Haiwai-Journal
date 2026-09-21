const fs = require('fs');
let c = fs.readFileSync('app/[category]/[slug]/page.tsx', 'utf8');

if (c.includes('title: `${post.title} - ${post.category}｜海外志`')) {
  c = c.replace(/title: `\$\{post\.title\} - \$\{post\.category\}｜海外志`,/g, 'title: `${post.title}｜${getCategoryBySlug(post.category)?.title || "海外志"} - 海外志`,');
}

// Make sure getCategoryBySlug is imported
if (!c.includes('getCategoryBySlug')) {
  c = c.replace('import { getPostBySlug, getAllPosts } from', 'import { getPostBySlug, getAllPosts, getCategoryBySlug } from');
  c = c.replace('import { getPostBySlug, getAllPosts, getAllCategories } from', 'import { getPostBySlug, getAllPosts, getAllCategories, getCategoryBySlug } from');
}

fs.writeFileSync('app/[category]/[slug]/page.tsx', c);
