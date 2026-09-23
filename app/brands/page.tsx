import { getAllBrands } from '@/lib/brands';
import BrandListClient from './BrandListClient';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = { alternates: { canonical: 'https://haiwaijichang.online/brands' },
  title: '机场品牌资料库｜海外志',
  description: '整理海外志目前收录的机场品牌、套餐、线路特点与公开资料，方便按自己的需求进一步了解与比较。',
};

export default function BrandsPage() {
  const brands = getAllBrands();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-slate-500 mb-8 flex space-x-2 items-center">
        <Link href="/" className="hover:text-slate-900">首页</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">品牌库</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">机场品牌资料库</h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          整理海外志目前收录的机场品牌、套餐、线路特点与公开资料，方便按自己的需求进一步了解与比较。
          <br />
          <span className="text-sm text-slate-500 mt-2 block">
            注：本页仅为资料归档，套餐与活动可能随品牌调整，具体价格以官网实际页面为准。
          </span>
        </p>
      </div>

      <BrandListClient initialBrands={brands} />
    </div>
  );
}
