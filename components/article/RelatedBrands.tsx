import Link from 'next/link';
import { getBrandById } from '@/lib/brands';
import { Package, Scale } from 'lucide-react';

interface RelatedBrandsProps {
  brandIds: string[];
}

export default function RelatedBrands({ brandIds }: RelatedBrandsProps) {
  if (!brandIds || brandIds.length === 0) return null;

  const validBrands = brandIds
    .map(id => getBrandById(id))
    .filter(brand => brand !== undefined);

  if (validBrands.length === 0) return null;

  return (
    <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center">
        <Package className="w-4 h-4 mr-2 text-slate-500" />
        本文提及品牌
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {validBrands.map(brand => {
          if (!brand) return null;
          return (
            <div key={brand.id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col h-full hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900">{brand.name}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {brand.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] text-slate-400 border border-slate-100 px-1.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center space-x-3 pt-3 border-t border-slate-50">
                <Link 
                  href={`/brands/${brand.id}`}
                  className="flex-1 text-center text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 py-1.5 rounded transition-colors"
                >
                  品牌档案
                </Link>
                <Link 
                  href={`/compare?brands=${brand.id}`}
                  className="flex-1 flex items-center justify-center text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 py-1.5 rounded transition-colors"
                >
                  <Scale className="w-3 h-3 mr-1" />
                  加入对比
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
