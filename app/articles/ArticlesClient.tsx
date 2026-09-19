'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Post, Category } from '@/lib/mdx';
import { Clock, Filter, List, LayoutGrid, X, ChevronLeft, ChevronRight, Package } from 'lucide-react';

interface ArticlesClientProps {
  initialPosts: Post[];
  categories: Category[];
}

type SortOrder = 'newest' | 'oldest';
type ViewMode = 'magazine' | 'compact';

const POSTS_PER_PAGE = 15;

export default function ArticlesClient({ initialPosts, categories }: ArticlesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL States
  const urlCategory = searchParams.get('category') || 'all';
  const urlYear = searchParams.get('year') || 'all';
  const urlPage = parseInt(searchParams.get('page') || '1', 10);
  
  // Local States
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('magazine');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedView = localStorage.getItem('haiwai_view_mode') as ViewMode;
    if (savedView === 'compact' || savedView === 'magazine') {
      setViewMode(savedView);
    }
  }, []);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('haiwai_view_mode', mode);
  };

  const updateUrl = (updates: { category?: string; year?: string; page?: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (updates.category !== undefined) {
      if (updates.category === 'all') params.delete('category');
      else params.set('category', updates.category);
    }
    
    if (updates.year !== undefined) {
      if (updates.year === 'all') params.delete('year');
      else params.set('year', updates.year);
    }
    
    if (updates.page !== undefined) {
      if (updates.page <= 1) params.delete('page');
      else params.set('page', updates.page.toString());
    }
    
    // reset to page 1 if category or year changes
    if (updates.category !== undefined || updates.year !== undefined) {
      params.delete('page');
    }

    router.push(`/articles?${params.toString()}`, { scroll: false });
  };

  // Extract available years
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    initialPosts.forEach(post => {
      if (post.date) {
        years.add(post.date.substring(0, 4));
      }
    });
    return Array.from(years).sort((a, b) => (a > b ? -1 : 1));
  }, [initialPosts]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialPosts.forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, [initialPosts]);

  // Filter and Sort
  const filteredPosts = useMemo(() => {
    let result = [...initialPosts];

    if (urlCategory !== 'all') {
      result = result.filter(p => p.category === urlCategory);
    }

    if (urlYear !== 'all') {
      result = result.filter(p => p.date && p.date.startsWith(urlYear));
    }

    result.sort((a, b) => {
      if (sortOrder === 'newest') return a.date > b.date ? -1 : 1;
      return a.date > b.date ? 1 : -1;
    });

    return result;
  }, [initialPosts, urlCategory, urlYear, sortOrder]);

  // Pagination safely
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safePage = isNaN(urlPage) || urlPage < 1 ? 1 : (urlPage > totalPages ? totalPages : urlPage);
  
  const currentPosts = filteredPosts.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      
      {/* Left Sidebar: Filters */}
      <div className="w-full lg:w-64 shrink-0 space-y-10">
        
        {/* Categories */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            分类导航
          </h3>
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => updateUrl({ category: 'all' })}
              aria-pressed={urlCategory === 'all'}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                urlCategory === 'all' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span>全部</span>
              <span className="text-xs bg-white/60 px-2 py-0.5 rounded-full">{initialPosts.length}</span>
            </button>
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => updateUrl({ category: cat.slug })}
                aria-pressed={urlCategory === cat.slug}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  urlCategory === cat.slug ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{cat.title}</span>
                <span className="text-xs bg-white/60 px-2 py-0.5 rounded-full">{categoryCounts[cat.slug] || 0}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Years */}
        {availableYears.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              发布年份
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateUrl({ year: 'all' })}
                aria-pressed={urlYear === 'all'}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  urlYear === 'all' ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
                }`}
              >
                全部
              </button>
              {availableYears.map(year => (
                <button
                  key={year}
                  onClick={() => updateUrl({ year })}
                  aria-pressed={urlYear === year}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    urlYear === year ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content: Article List */}
      <div className="flex-1 min-w-0">
        
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 mb-8 gap-4">
          <div className="text-sm text-slate-500">
            找到 <strong className="text-slate-900 font-semibold">{filteredPosts.length}</strong> 篇文章
            {(urlCategory !== 'all' || urlYear !== 'all') && (
              <button 
                onClick={() => updateUrl({ category: 'all', year: 'all' })}
                className="ml-3 text-blue-600 hover:underline inline-flex items-center"
              >
                <X className="w-3 h-3 mr-1" />
                清除筛选
              </button>
            )}
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-slate-400">排序:</span>
              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value as SortOrder);
                  updateUrl({ page: 1 });
                }}
                className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="newest">最新发布</option>
                <option value="oldest">最早发布</option>
              </select>
            </div>
            
            {isMounted && (
              <div className="hidden sm:flex items-center space-x-1 border border-slate-200 p-1 rounded-lg bg-white">
                <button
                  onClick={() => handleViewModeChange('magazine')}
                  aria-pressed={viewMode === 'magazine'}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'magazine' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}
                  aria-label="Magazine View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleViewModeChange('compact')}
                  aria-pressed={viewMode === 'compact'}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'compact' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}
                  aria-label="Compact View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* List */}
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
            <h3 className="text-lg font-medium text-slate-900 mb-2">这个组合暂时没有文章</h3>
            <p className="text-slate-500 mb-6">试试更改分类或年份筛选条件。</p>
            <button
              onClick={() => updateUrl({ category: 'all', year: 'all' })}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
            >
              浏览全部文章
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {currentPosts.map(post => {
              const catInfo = categories.find(c => c.slug === post.category);
              
              if (viewMode === 'compact') {
                return (
                  <Link href={`/${post.category}/${post.slug}`} key={post.slug} className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all">
                    <div className="flex items-center text-xs font-medium text-slate-400 mb-2 space-x-3">
                      <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{catInfo?.title || post.category}</span>
                      <span>{post.date}</span>
                      {post.readingTime && <span>· 约 {post.readingTime} 分钟阅读</span>}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                );
              }

              return (
                <div key={post.slug} className="group flex flex-col sm:flex-row bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all">
                  <div className="sm:w-64 shrink-0 relative aspect-[16/9] sm:aspect-auto sm:h-full overflow-hidden bg-slate-100">
                    <Link href={`/${post.category}/${post.slug}`} className="absolute inset-0">
                      <Image
                        src={post.coverImage || '/images/about-1.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  </div>
                  <div className="flex-1 p-5 sm:p-7 flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-3 text-xs font-medium text-slate-400">
                      <Link href={`/articles?category=${post.category}`} className="text-blue-600 uppercase tracking-wider hover:underline z-10 relative">
                        {catInfo?.title || post.category}
                      </Link>
                      <span>&bull;</span>
                      <time>{post.date}</time>
                      {post.readingTime && (
                        <>
                          <span>&bull;</span>
                          <span>约 {post.readingTime} 分钟</span>
                        </>
                      )}
                    </div>
                    <Link href={`/${post.category}/${post.slug}`} className="block">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {post.description}
                      </p>
                    </Link>
                    
                    {post.brands && post.brands.length > 0 && (
                      <div className="flex items-center flex-wrap gap-2 mt-auto pt-4 border-t border-slate-50">
                        <Package className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-500">提及品牌:</span>
                        {post.brands.map(b => (
                          <Link 
                            key={b} 
                            href={`/brands/${b}`}
                            className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors z-10 relative"
                          >
                            {b}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6">
            <button
              onClick={() => updateUrl({ page: safePage - 1 })}
              disabled={safePage <= 1}
              aria-label="上一页"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              上一页
            </button>
            <div className="text-sm text-slate-500 font-medium">
              第 {safePage} 页，共 {totalPages} 页
            </div>
            <button
              onClick={() => updateUrl({ page: safePage + 1 })}
              disabled={safePage >= totalPages}
              aria-label="下一页"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 text-slate-700 transition-colors"
            >
              下一页
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}
