import { Metadata } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import ArticlesClient from './ArticlesClient';
import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '全部文章｜海外志',
  description: '浏览海外志发布的全部文章，包括机场测评、网络知识、Clash 教程、软件工具与海外数字生活指南。',
  alternates: {
    canonical: 'https://haiwaijichang.online/articles',
  }
};

export default function ArticlesPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '全部文章｜海外志',
    description: '浏览海外志发布的全部文章，包括机场测评、网络知识、Clash 教程、软件工具与海外数字生活指南。',
    url: 'https://haiwaijichang.online/articles',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '首页',
          item: 'https://haiwaijichang.online/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '全部文章',
          item: 'https://haiwaijichang.online/articles'
        }
      ]
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://haiwaijichang.online/${post.category}/${post.slug}`
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-[#FAF9F6] pb-24">
        {/* Header / Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">首页</Link>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-slate-900 font-medium">全部文章</span>
          </nav>

          <header className="max-w-3xl">
            <div className="flex items-center space-x-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">全部文章</h1>
              <span className="hidden sm:inline-block text-xs font-bold tracking-widest text-slate-400 uppercase mt-2 border-l-2 border-slate-300 pl-3">
                Journal Archive
              </span>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              记录海外网络、机场测评、Clash、网络知识与数字工具的长期内容档案。
            </p>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-100 text-sm font-medium text-slate-600">
              目前收录 <span className="text-blue-600 font-bold mx-1.5">{posts.length}</span> 篇文章
            </div>
          </header>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></span>
            常见问题与解决方法
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/network/airport-not-working-troubleshooting" className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="text-base font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors leading-tight">机场连不上怎么办？</div>
              <p className="text-sm text-slate-500 line-clamp-2">从订阅、节点、DNS 到客户端完整排查流程。</p>
            </Link>
            <Link href="/network/airport-slow-speed-troubleshooting" className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="text-base font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors leading-tight">机场速度变慢怎么办？</div>
              <p className="text-sm text-slate-500 line-clamp-2">网页、流媒体和下载变慢的真实排查方案。</p>
            </Link>
            <Link href="/network/why-airport-node-timeout" className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="text-base font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors leading-tight">节点全部超时怎么办？</div>
              <p className="text-sm text-slate-500 line-clamp-2">延迟测试全红、Timeout 的原因与应对。</p>
            </Link>
            <Link href="/clash/how-to-use-airport-subscription" className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="text-base font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors leading-tight">订阅链接怎么用？</div>
              <p className="text-sm text-slate-500 line-clamp-2">各大客户端导入节点通用教程。</p>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="py-20 text-center text-slate-400">正在加载内容档案...</div>}>
            <ArticlesClient initialPosts={posts} categories={categories} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
