import { getAllBrands } from '@/lib/brands';
import { getPostsByCategory } from '@/lib/mdx';
import { Metadata } from 'next';
import AirportObservationClient from './AirportObservationClient';

export const metadata: Metadata = {
  title: '机场品牌与机场测评｜2026 机场推荐与使用指南 - 海外志',
  description: '海外志整理机场品牌资料、机场测评、订阅使用、套餐价格、节点线路与故障排查内容，并提供 2026 机场推荐与选购指南。',
  alternates: {
    canonical: 'https://haiwaijichang.online/airport-observation'
  }
};

export default function AirportObservationPage() {
  const allBrands = getAllBrands();
  const allPosts = getPostsByCategory('airport-observation');

  // Map to lightweight objects to avoid passing full content down
  const mappedPosts = allPosts.map(post => ({
    title: post.title,
    slug: post.slug,
    description: post.description,
    date: post.date,
    coverImage: post.coverImage,
    brands: post.brands || []
  }));

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-10 text-center max-w-3xl mx-auto pt-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">机场品牌与机场测评</h1>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          浏览海外志收录的机场品牌、测评、使用教程、订阅、套餐、节点与故障排查内容。
        </p>
      </header>

      <AirportObservationClient brands={allBrands} posts={mappedPosts} />
    </div>
  );
}
