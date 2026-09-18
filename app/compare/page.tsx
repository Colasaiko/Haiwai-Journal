import { getAllBrands } from '@/lib/brands';
import CompareArena from './CompareArena';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '品牌对比中心｜海外志',
  description: '选择 2-4 个机场品牌，从套餐价格、线路标签、优惠信息与公开资料等维度进行并排比较，更直观地了解不同品牌之间的差异。',
  alternates: { canonical: 'https://haiwaijichang.online/compare' }
};

export default function ComparePage() {
  const allBrands = getAllBrands();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Compare Arena Hero */}
      <div className="text-center mb-12">
        <div className="inline-block bg-slate-900 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
          Compare Arena
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">机场品牌对决中心</h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          把不同机场品牌放进同一个对比场，从套餐、线路、使用场景与优惠信息中看清它们真正的差异。
          <br className="hidden sm:block" />
          <span className="font-semibold text-slate-800">没有自动赢家，只有更适合你的选择。</span>
        </p>
      </div>

      <Suspense fallback={<div className="py-20 text-center text-slate-500">正在加载对比引擎...</div>}>
        <CompareArena allBrands={allBrands} />
      </Suspense>
    </div>
  );
}