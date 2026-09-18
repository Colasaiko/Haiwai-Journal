'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Brand } from '@/lib/brands';
import Link from 'next/link';

interface Props {
  allBrands: Brand[];
}

export default function CompareArena({ allBrands }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectorSearch, setSelectorSearch] = useState('');
  const [slotToReplace, setSlotToReplace] = useState<number | null>(null); // null means adding new

  const [copySuccess, setCopySuccess] = useState(false);

  // Parse URL
  const selectedBrandIds = useMemo(() => {
    const brandsParam = searchParams.get('brands');
    if (!brandsParam) return [];
    
    // Split, filter out empty, filter out invalid IDs, remove duplicates
    const ids = brandsParam.split(',').filter(Boolean);
    const validIds = ids.filter(id => allBrands.some(b => b.id === id));
    return Array.from(new Set(validIds)).slice(0, 4); // max 4
  }, [searchParams, allBrands]);

  const selectedBrands = useMemo(() => {
    return selectedBrandIds.map(id => allBrands.find(b => b.id === id)!).filter(Boolean);
  }, [selectedBrandIds, allBrands]);

  const updateUrl = (newIds: string[]) => {
    const uniqueIds = Array.from(new Set(newIds)).slice(0, 4);
    const params = new URLSearchParams(searchParams.toString());
    if (uniqueIds.length > 0) {
      params.set('brands', uniqueIds.join(','));
    } else {
      params.delete('brands');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const addBrand = (id: string) => {
    if (slotToReplace !== null) {
      // Replace
      const newIds = [...selectedBrandIds];
      newIds[slotToReplace] = id;
      updateUrl(newIds);
    } else {
      // Add
      updateUrl([...selectedBrandIds, id]);
    }
    setIsSelectorOpen(false);
  };

  const removeBrand = (index: number) => {
    const newIds = [...selectedBrandIds];
    newIds.splice(index, 1);
    updateUrl(newIds);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Selector Filter
  const availableBrandsToSelect = useMemo(() => {
    return allBrands.filter(b => {
      // Filter out already selected IF we are adding (not replacing with self)
      const isAlreadySelected = selectedBrandIds.includes(b.id);
      if (isAlreadySelected && slotToReplace === null) return false;
      
      const matchSearch = b.name.toLowerCase().includes(selectorSearch.toLowerCase());
      return matchSearch;
    });
  }, [allBrands, selectedBrandIds, selectorSearch, slotToReplace]);

  return (
    <div>
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 gap-4">
        <div className="flex gap-2">
          {selectedBrands.length < 4 && (
            <button
              onClick={() => { setSlotToReplace(null); setSelectorSearch(''); setIsSelectorOpen(true); }}
              className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              + 添加对比品牌
            </button>
          )}
          {selectedBrands.length >= 4 && (
            <span className="px-4 py-2 bg-slate-100 text-slate-500 text-sm font-medium rounded-lg">
              当前最多支持 4 个品牌同时比较
            </span>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-sm font-medium text-slate-500">
            {selectedBrands.length === 2 && '1v1 模式'}
            {selectedBrands.length === 3 && '1v1v1 三方模式'}
            {selectedBrands.length === 4 && '1v1v1v1 四方模式'}
          </span>
          {selectedBrands.length > 0 && (
            <button
              onClick={copyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              {copySuccess ? '对比链接已复制' : '复制对比链接'}
            </button>
          )}
        </div>
      </div>

      {/* States */}
      {selectedBrands.length === 0 && (
        <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl">
          <h2 className="text-2xl font-bold text-slate-700 mb-4">选择两个品牌，开始对比</h2>
          <button
            onClick={() => { setSlotToReplace(null); setSelectorSearch(''); setIsSelectorOpen(true); }}
            className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
          >
            选择品牌
          </button>
        </div>
      )}

      {selectedBrands.length === 1 && (
        <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-900 text-white font-bold text-2xl flex items-center justify-center rounded-2xl mb-4">
            {selectedBrands[0].name.charAt(0)}
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">{selectedBrands[0].name} 已加入</h2>
          <p className="text-slate-500 mb-6">再选择一个品牌开始对比</p>
          <button
            onClick={() => { setSlotToReplace(null); setSelectorSearch(''); setIsSelectorOpen(true); }}
            className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
          >
            选择品牌
          </button>
        </div>
      )}

      {selectedBrands.length >= 2 && (
        <div className="space-y-12">
          {/* 1v1 Hero */}
          {selectedBrands.length === 2 && (
            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
              <div className="text-center md:text-left z-10 flex-1">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto md:mx-0 mb-4">
                  {selectedBrands[0].name.charAt(0)}
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-2">{selectedBrands[0].name}</h2>
                <div className="flex gap-2 justify-center md:justify-start flex-wrap mt-4">
                  {selectedBrands[0].tags.slice(0, 3).map(t => <span key={t} className="px-2 py-1 bg-white/20 rounded text-xs">{t}</span>)}
                </div>
              </div>
              
              <div className="text-6xl md:text-8xl font-black italic text-white/20 select-none z-0">
                VS
              </div>

              <div className="text-center md:text-right z-10 flex-1">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto md:ml-auto md:mr-0 mb-4">
                  {selectedBrands[1].name.charAt(0)}
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-2">{selectedBrands[1].name}</h2>
                <div className="flex gap-2 justify-center md:justify-end flex-wrap mt-4">
                  {selectedBrands[1].tags.slice(0, 3).map(t => <span key={t} className="px-2 py-1 bg-white/20 rounded text-xs">{t}</span>)}
                </div>
              </div>
            </div>
          )}

          {/* 3 or 4 Brands Hero */}
          {selectedBrands.length > 2 && (
            <div className="bg-slate-900 rounded-3xl p-8 text-white text-center shadow-xl">
              <h2 className="text-3xl font-black mb-8 italic tracking-wider">
                {selectedBrands.length === 3 ? '三方对决' : '四方竞技'}
              </h2>
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center">
                {selectedBrands.map((b, i) => (
                  <div key={b.id} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl font-bold mb-2">
                        {b.name.charAt(0)}
                      </div>
                      <span className="font-bold text-lg">{b.name}</span>
                    </div>
                    {i < selectedBrands.length - 1 && (
                      <span className="text-2xl font-black italic text-white/30 px-2 md:px-4">VS</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* The Matrix */}
          <div className="w-full overflow-x-auto pb-4">
            <div className={`grid min-w-[800px] gap-4 ${
              selectedBrands.length === 2 ? 'grid-cols-2' : 
              selectedBrands.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
            }`}>
              
              {/* Row: Actions */}
              {selectedBrands.map((b, i) => (
                <div key={`act-${i}`} className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{b.name}</h3>
                    <div className="flex flex-col gap-2">
                      <Link href={`/brands/${b.slug}`} target="_blank" className="text-sm font-medium text-blue-600 hover:underline">
                        查看完整档案
                      </Link>
                      <Link href={`/go/${b.id}`} target="_blank" rel="nofollow noopener" className="block w-full py-2 bg-slate-900 text-white rounded font-medium hover:bg-slate-800 transition-colors">
                        访问官网
                      </Link>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2 justify-center">
                    <button onClick={() => { setSlotToReplace(i); setSelectorSearch(''); setIsSelectorOpen(true); }} className="text-xs text-slate-500 hover:text-slate-900 font-medium px-2 py-1 bg-slate-100 rounded">
                      更换
                    </button>
                    <button onClick={() => removeBrand(i)} className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 bg-red-50 rounded">
                      移除
                    </button>
                  </div>
                </div>
              ))}

              {/* Row: Overview Labels */}
              <div className={`mt-6 mb-2 flex items-center gap-4 ${
                selectedBrands.length === 2 ? 'col-span-2' : 
                selectedBrands.length === 3 ? 'col-span-3' : 'col-span-4'
              }`}>
                <h4 className="text-lg font-bold text-slate-900">核心数据与价格</h4>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              {selectedBrands.map((b, i) => (
                <div key={`ov-${i}`} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-sm">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">套餐数量</span>
                    <span className="font-bold">{b.pricingSummary.planCount}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">最低月付</span>
                    <span className="font-bold text-blue-600">{b.pricingSummary.minMonthly || '—'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">最低年付</span>
                    <span className="font-bold">{b.pricingSummary.minYearly || '—'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">一次性套餐</span>
                    <span className="font-bold">{b.pricingSummary.hasOneTime ? '有资料' : '—'}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 mb-1">公开优惠码</span>
                    {b.code && !b.code.includes('暂无') && !b.code.includes('无') ? (
                      <span className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-bold font-mono">
                        {b.code}
                      </span>
                    ) : (
                      <span className="text-slate-400">暂无优惠资料</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Row: Tags */}
              <div className={`mt-6 mb-2 flex items-center gap-4 ${
                selectedBrands.length === 2 ? 'col-span-2' : 
                selectedBrands.length === 3 ? 'col-span-3' : 'col-span-4'
              }`}>
                <h4 className="text-lg font-bold text-slate-900">线路标签</h4>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              {selectedBrands.map((b, i) => (
                <div key={`tags-${i}`} className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 text-sm">
                  {['IPLC', 'IEPL', '原生 IP', '流媒体', 'AI 解锁', '不限设备'].map(tag => {
                    const hasTag = b.tags.includes(tag);
                    return (
                      <div key={tag} className="flex justify-between items-center">
                        <span className="text-slate-600">{tag}</span>
                        {hasTag ? (
                          <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-xs">✓ 资料有注明</span>
                        ) : (
                          <span className="text-slate-400 text-xs">— 资料未注明</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Row: Features */}
              <div className={`mt-6 mb-2 flex items-center gap-4 ${
                selectedBrands.length === 2 ? 'col-span-2' : 
                selectedBrands.length === 3 ? 'col-span-3' : 'col-span-4'
              }`}>
                <h4 className="text-lg font-bold text-slate-900">特点对比</h4>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              {selectedBrands.map((b, i) => (
                <div key={`feat-${i}`} className="bg-white p-5 rounded-xl border border-slate-200">
                  <ul className="space-y-3">
                    {b.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start text-sm text-slate-600 leading-relaxed">
                        <span className="text-blue-400 mr-2 shrink-0">•</span>
                        <span>{feat.replace(/^[✔✅]\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Row: Pricing Plans */}
              <div className={`mt-6 mb-2 flex items-center gap-4 ${
                selectedBrands.length === 2 ? 'col-span-2' : 
                selectedBrands.length === 3 ? 'col-span-3' : 'col-span-4'
              }`}>
                <h4 className="text-lg font-bold text-slate-900">套餐方案</h4>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              {selectedBrands.map((b, i) => (
                <div key={`plan-${i}`} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 text-sm font-bold text-slate-700">
                    {b.name} 套餐
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs whitespace-nowrap">
                      <thead className="bg-slate-50">
                        <tr>
                          {b.pricingHeaders.map((h, idx) => (
                            <th key={idx} className="px-3 py-2 font-medium text-slate-500">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {b.pricingRows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className={`px-3 py-2 ${cIdx === 0 ? 'font-bold text-slate-800' : 'text-slate-600'}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      )}

      {/* Brand Selector Modal */}
      {isSelectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col">
            <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <h3 className="text-xl font-bold text-slate-900">
                {slotToReplace !== null ? '更换品牌' : '选择要添加的品牌'}
              </h3>
              <button 
                onClick={() => setIsSelectorOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-2"
                aria-label="关闭"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 sm:p-6 border-b border-slate-100">
              <input
                type="text"
                placeholder="搜索品牌名称..."
                value={selectorSearch}
                onChange={e => setSelectorSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="overflow-y-auto p-4 sm:p-6 space-y-3 flex-1">
              {availableBrandsToSelect.length === 0 ? (
                <div className="text-center py-8 text-slate-500">没有找到符合条件的品牌</div>
              ) : (
                availableBrandsToSelect.map(b => (
                  <button
                    key={b.id}
                    onClick={() => addBrand(b.id)}
                    className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center font-bold">
                        {b.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{b.name}</div>
                        <div className="text-xs text-slate-500 mt-1 flex gap-2">
                          {b.tags.slice(0, 2).join(' / ')} 
                          {b.pricingSummary.minMonthly && ` | 起步 ${b.pricingSummary.minMonthly}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
