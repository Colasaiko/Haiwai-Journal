import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { getAllBrands } from '@/lib/brands';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://haiwaijichang.online';
  
  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/${post.category}/${post.slug}`,
    lastModified: new Date(),
  }));

  const categories = getAllCategories().map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: new Date(),
  }));
  
  const brands = getAllBrands().map((brand) => ({
    url: `${baseUrl}/brands/${brand.slug}`,
    lastModified: new Date(),
  }));

  const routes = [
    '', '/articles', '/about', '/compare', '/privacy', '/terms',
    '/brands', '/faq', '/start-here', '/methodology', '/disclosure'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...categories, ...brands, ...posts];
}