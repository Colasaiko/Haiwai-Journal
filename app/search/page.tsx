import { Metadata } from 'next';
import SearchClient from './SearchClient';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '全站搜索 | 海外志',
  description: '搜索海外志的文章、机场品牌、网络知识与常见问题。',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://haiwaijichang.online/search',
  }
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">搜索海外志</h1>
          <p className="text-slate-500">搜索文章、机场品牌、网络知识与常见问题。</p>
        </header>
        
        <Suspense fallback={<div className="text-center py-10 text-slate-400">正在加载搜索索引...</div>}>
          <SearchClient />
        </Suspense>
      </div>
    </div>
  );
}
