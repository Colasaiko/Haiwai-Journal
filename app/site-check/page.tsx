import { Metadata } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { getAllBrands } from '@/lib/brands';
import SiteCheckClient from './SiteCheckClient';

export const metadata: Metadata = {
  title: '站点内容检查中心｜海外志',
  description: '快速检查海外志的文章、品牌、分类与主要页面。',
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: 'https://haiwaijichang.online/site-check',
  }
};

export default function SiteCheckPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const brands = getAllBrands();
  
  const staticPages = [
    { name: '首页', url: '/' },
    { name: '全部文章', url: '/articles' },
    { name: '品牌大全', url: '/brands' },
    { name: '品牌对比', url: '/compare' },
    { name: '软件工具', url: '/tools' },
    { name: '海外指南', url: '/guides' },
    { name: '网络知识', url: '/network' },
    { name: 'Clash 教程', url: '/clash' },
    { name: '机场测评', url: '/airport-observation' },
    { name: '从这里开始', url: '/start-here' },
    { name: '内容与方法', url: '/methodology' },
    { name: '推广说明', url: '/disclosure' },
    { name: 'FAQ', url: '/faq' },
    { name: '关于我们', url: '/about' },
    { name: '隐私政策', url: '/privacy' },
    { name: '使用条款', url: '/terms' },
    { name: '梯子推荐', url: '/tizi' },
    { name: '便宜机场', url: '/cheap' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">站点内容检查中心</h1>
          <p className="text-slate-600">快速检查海外志的文章、品牌、分类与主要页面。</p>
        </header>

        <SiteCheckClient 
          posts={posts} 
          categories={categories} 
          brands={brands} 
          staticPages={staticPages} 
        />
      </div>
    </div>
  );
}
