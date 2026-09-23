import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { getAllBrands } from '@/lib/brands';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://haiwaijichang.online';
  
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const addedUrls = new Set<string>();

  function addEntry(url: string, lastModified?: string | Date) {
    if (url.includes('/search') || url.includes('/site-check') || url.includes('/go/')) return;
    
    if (!addedUrls.has(url)) {
      addedUrls.add(url);
      sitemapEntries.push({
        url,
        lastModified: lastModified ? new Date(lastModified) : undefined,
      });
    }
  }

  const staticRoutes = [
    '', '/articles', '/about', '/compare', '/privacy', '/terms', '/cheap', '/tizi',
    '/brands', '/faq', '/start-here', '/methodology', '/disclosure'
  ];
  
  staticRoutes.forEach(route => {
    addEntry(`${baseUrl}${route}`);
  });

  getAllCategories().forEach(cat => {
    addEntry(`${baseUrl}/${cat.slug}`);
  });
  
  getAllBrands().forEach(brand => {
    addEntry(`${baseUrl}/brands/${brand.slug}`);
  });

  getAllPosts().forEach(post => {
    const mod = post.updated ? post.updated : post.date;
    addEntry(`${baseUrl}/${post.category}/${post.slug}`, mod);
  });

  return sitemapEntries;
}