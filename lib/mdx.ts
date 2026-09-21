import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');
const categoriesDirectory = path.join(process.cwd(), 'content', 'categories');

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  coverImage: string;
  coverAlt?: string;
  author: string;
  content: string;
  brands?: string[];
  tags?: string[];
  updated?: string;
  readingTime?: number;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    description: data.description,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    updated: data.updated ? (data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : String(data.updated)) : undefined,
    category: data.category,
    coverImage: data.coverImage,
    coverAlt: data.coverAlt,
    author: data.author || '海外志编辑部',
    brands: data.brands || [],
    tags: data.tags || [],
    content,
    readingTime: Math.max(1, Math.ceil(content.length / 350)),
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter(post => post.category === categorySlug);
}

export function getCategorySlugs() {
  return fs.readdirSync(categoriesDirectory).filter(file => file.endsWith('.mdx'));
}

export function getCategoryBySlug(slug: string): Category {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(categoriesDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    description: data.description,
  };
}

export function getAllCategories(): Category[] {
  const slugs = getCategorySlugs();
  return slugs.map(slug => getCategoryBySlug(slug));
}
