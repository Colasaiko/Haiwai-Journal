'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SearchItem, SearchResult, search, normalizeQuery } from '@/lib/search';
import { Search, ChevronRight, FileText, Package, HelpCircle, Folder } from 'lucide-react';

export default function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'article' | 'brand' | 'category' | 'faq'>('all');

  useEffect(() => {
    fetch('/search-index.json')
      .then(res => res.json())
      .then(data => {
        setIndex(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load search index:', err);
        setIsLoading(false);
      });
  }, []);

  // Update input when URL changes
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const results = useMemo(() => {
    return search(index, initialQuery, filter);
  }, [index, initialQuery, filter]);

  const highlight = (text: string, q: string) => {
    if (!q.trim() || !text) return text;
    const norm = normalizeQuery(q);
    if (!norm) return text;
    
    // Simple safe highlight
    const parts = text.split(new RegExp(`(${norm})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === norm.toLowerCase() ? 
            <span key={i} className="bg-blue-100 text-blue-900 font-medium px-0.5 rounded">{part}</span> : part
        )}
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 text-sm">正在加载搜索索引...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'all', label: '全部' },
    { id: 'article', label: '文章' },
    { id: 'brand', label: '品牌' },
    { id: 'faq', label: 'FAQ' },
    { id: 'category', label: '分类' },
  ] as const;

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章、品牌或关键词..."
            className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
        </div>
      </form>

      {!initialQuery ? (
        <div className="text-center mt-12">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">常用主题</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
            {['IPLC', 'Clash', 'Netflix', 'ChatGPT', '节点测速', '机场选择', '原生 IP'].map(t => (
              <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                {t}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-100 px-4 sm:px-6 py-3 flex overflow-x-auto hide-scrollbar">
            <div className="flex space-x-6">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setFilter(t.id)}
                  className={`pb-3 pt-1 px-1 whitespace-nowrap border-b-2 text-sm font-medium transition-colors ${
                    filter === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>找到 {results.length} 个结果</span>
          </div>

          <div className="divide-y divide-slate-100">
            {results.length === 0 ? (
              <div className="py-20 text-center px-4">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">没有找到与 “{initialQuery}” 相关的内容</h3>
                <p className="text-slate-500 mb-8">建议尝试更短关键词，或检查拼写。</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/brands" className="text-blue-600 hover:underline">浏览品牌库</Link>
                  <span className="text-slate-300">•</span>
                  <Link href="/faq" className="text-blue-600 hover:underline">查看常见问题</Link>
                </div>
              </div>
            ) : (
              results.map(item => <ResultItem key={item.id} item={item} highlight={(t) => highlight(t, initialQuery)} />)
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ResultItem({ item, highlight }: { item: SearchResult, highlight: (text: string) => React.ReactNode }) {
  const Icon = item.type === 'article' ? FileText :
               item.type === 'brand' ? Package :
               item.type === 'category' ? Folder : HelpCircle;

  const typeLabel = item.type === 'article' ? '文章' :
                    item.type === 'brand' ? '品牌' :
                    item.type === 'category' ? '分类' : 'FAQ';

  return (
    <div className="p-4 sm:p-6 hover:bg-slate-50 transition-colors group">
      <div className="flex items-start justify-between">
        <Link href={item.url} className="block flex-1 min-w-0 pr-4">
          <div className="flex items-center space-x-2 text-xs font-medium text-slate-400 mb-2">
            <Icon className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">{typeLabel}</span>
            {item.category && (
              <>
                <span>&bull;</span>
                <span className="text-blue-600/70">{item.category}</span>
              </>
            )}
            {item.date && (
              <>
                <span>&bull;</span>
                <span>{item.date}</span>
              </>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
            {highlight(item.title)}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2">
            {highlight(item.description || item.content?.substring(0, 150) || '')}
          </p>
        </Link>
        <div className="pt-2">
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
        </div>
      </div>

      {item.type === 'brand' && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {item.meta?.minMonthly && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
              最低月付 {item.meta.minMonthly}
            </span>
          )}
          {item.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs">
              {tag}
            </span>
          ))}
          <div className="flex items-center gap-3 ml-auto text-xs font-medium mt-2 sm:mt-0">
            <Link href={item.url} className="text-blue-600 hover:underline">查看品牌档案</Link>
            <Link href={`/compare?brands=${item.id}`} className="text-slate-500 hover:text-slate-900">加入对比</Link>
          </div>
        </div>
      )}
    </div>
  );
}
