'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Brand } from '@/lib/brands';

interface BrandListClientProps {
  initialBrands: Brand[];
}

export default function BrandListClient({ initialBrands }: BrandListClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('全部');

  const ALL_TAGS = ['全部', 'IPLC', 'IEPL', '原生 IP', '流媒体', 'AI 解锁', '不限设备'];

  const filteredBrands = useMemo(() => {
    return initialBrands.filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === '全部' || brand.tags.includes(activeFilter);
      return matchesSearch && matchesFilter;
    });
  }, [initialBrands, searchTerm, activeFilter]);

  return (
    <div>
      {/* Search and Filter */}
      <div className="mb-10 space-y-6">
        <div className="relative max-w-xl">
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800"
            placeholder="搜索品牌名称..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === tag
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand) => (
          <div key={brand.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="p-6 flex-grow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xl font-bold shrink-0">
                  {brand.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-slate-900 line-clamp-1">{brand.name}</h2>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {brand.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded text-xs font-medium border border-slate-100">
                    {tag}
                  </span>
                ))}
                {brand.tags.length === 0 && (
                  <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded text-xs font-medium border border-slate-100">
                    常规节点
                  </span>
                )}
              </div>

              <div className="space-y-2 text-sm text-slate-600 mb-6">
                <div className="flex justify-between">
                  <span>提供套餐：</span>
                  <span className="font-medium text-slate-900">{brand.pricingSummary.planCount} 个</span>
                </div>
                <div className="flex justify-between">
                  <span>资料最低月付：</span>
                  <span className="font-medium text-blue-600">
                    {brand.pricingSummary.minMonthly || '暂无月付资料'}
                  </span>
                </div>
                {brand.code && !brand.code.includes('暂无') && (
                  <div className="mt-3 inline-block bg-orange-50 text-orange-600 text-xs px-2.5 py-1 rounded border border-orange-100">
                    优惠: {brand.code}
                  </div>
                )}
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 mt-auto">
              <Link href={`/brands/${brand.slug}`} className="block w-full py-2.5 bg-white border border-slate-300 rounded-lg text-center text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                查看品牌档案
              </Link>
            </div>
          </div>
        ))}
        {filteredBrands.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            没有找到符合条件的品牌资料。
          </div>
        )}
      </div>
    </div>
  );
}
