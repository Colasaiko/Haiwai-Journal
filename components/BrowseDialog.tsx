'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { SearchItem } from '@/lib/search';
import { Search, X, BookOpen, Clock, Lightbulb, ExternalLink, Compass } from 'lucide-react';

interface BrowseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BrowseDialog({ isOpen, onClose }: BrowseDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [quickFilter, setQuickFilter] = useState<'All' | 'Recent' | 'Question' | 'Beginner'>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (index.length === 0) {
        fetch('/search-index.json')
          .then(res => res.json())
          .then(data => setIndex(data))
          .catch(err => console.error('Failed to fetch search index', err));
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, index.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const articles = useMemo(() => index.filter(i => i.type === 'article'), [index]);
  const brands = useMemo(() => index.filter(i => i.type === 'brand'), [index]);

  const categoryMap: Record<string, string> = {
    'airport-observation': '机场测评',
    'network': '网络知识',
    'clash': 'Clash 教程',
    'tools': '软件工具',
    'guides': '海外指南',
  };

  const getCategoryCount = (slug: string) => articles.filter(a => a.category === slug).length;

  const filteredItems = useMemo(() => {
    let result = activeTab === 'Brand' ? brands : articles;

    if (activeTab !== 'All' && activeTab !== 'Brand') {
      result = result.filter(i => i.category === activeTab);
    }

    if (quickFilter === 'Question') {
      const qWords = ['怎么', '如何', '为什么', '怎么办', '什么是', '区别', '怎么选', '怎么用', '失败', '连不上', '超时', 'timeout', '错误'];
      result = result.filter(i => qWords.some(w => i.title.toLowerCase().includes(w)));
    } else if (quickFilter === 'Beginner') {
      const bWords = ['新手', '入门', '基础', '科普', '指南', '推荐'];
      result = result.filter(i => bWords.some(w => i.title.toLowerCase().includes(w)));
    } else if (quickFilter === 'Recent') {
      result = [...result].sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());
    }

    if (filterQuery) {
      const lower = filterQuery.toLowerCase();
      result = result.filter(i => 
        (i.title && i.title.toLowerCase().includes(lower)) ||
        (i.description && i.description.toLowerCase().includes(lower)) ||
        (i.category && i.category.toLowerCase().includes(lower))
      );
    }

    return result;
  }, [articles, brands, activeTab, quickFilter, filterQuery]);

  const displayItems = quickFilter === 'Recent' && activeTab === 'All' ? filteredItems.slice(0, 20) : filteredItems;

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div 
      id="browse-dialog"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-start pt-20 px-4 pb-4 md:px-6 pointer-events-none" 
      role="dialog"
      aria-modal="true"
      aria-label="Content Browser"
    >
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm pointer-events-auto" onClick={onClose}></div>
      <div 
        className="relative z-10 w-full max-w-7xl bg-[#FAF9F6] shadow-2xl overflow-hidden flex flex-col h-full max-h-[85vh] rounded-2xl border border-slate-200 pointer-events-auto animate-[fadeinup_0.2s_ease-out_forwards]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="bg-white px-6 py-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center">
              <Compass className="w-5 h-5 mr-2 text-blue-600" />
              浏览海外志
            </h2>
            <p className="text-sm text-slate-500 mt-1">按主题、问题或最新内容快速找到你需要的文章。</p>
          </div>
          
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              ref={inputRef}
              type="text" 
              placeholder="在当前浏览列表中过滤..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
            />
          </div>
          
          <button onClick={onClose} className="hidden md:flex p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors absolute top-4 right-4 md:relative md:top-0 md:right-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shortcuts Bar */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex flex-wrap gap-x-6 gap-y-2 text-sm overflow-x-auto">
          <span className="text-slate-500 font-medium whitespace-nowrap">快捷入口:</span>
          <Link href="/start-here" onClick={onClose} className="text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap">新手从这里开始</Link>
          <Link href="/articles" onClick={onClose} className="text-slate-600 hover:text-slate-900 whitespace-nowrap">全部文章</Link>
          <Link href="/brands" onClick={onClose} className="text-slate-600 hover:text-slate-900 whitespace-nowrap">品牌库</Link>
          <Link href="/compare" onClick={onClose} className="text-slate-600 hover:text-slate-900 whitespace-nowrap">品牌对比</Link>
          <Link href="/faq" onClick={onClose} className="text-slate-600 hover:text-slate-900 whitespace-nowrap">常见问题</Link>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-56 lg:w-64 bg-white border-r border-slate-200 overflow-y-auto flex-shrink-0">
            <div className="p-4 space-y-1">
              <div className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3 px-3 mt-2">按分类浏览</div>
              <button 
                onClick={() => { setActiveTab('All'); setQuickFilter('All'); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex justify-between items-center transition-colors ${activeTab === 'All' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                全部文章
                <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">{articles.length}</span>
              </button>
              
              {Object.entries(categoryMap).map(([slug, name]) => (
                <button 
                  key={slug}
                  onClick={() => { setActiveTab(slug); setQuickFilter('All'); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex justify-between items-center transition-colors ${activeTab === slug ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  {name}
                  <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">{getCategoryCount(slug)}</span>
                </button>
              ))}

              <div className="my-4 border-t border-slate-100"></div>
              
              <button 
                onClick={() => { setActiveTab('Brand'); setQuickFilter('All'); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex justify-between items-center transition-colors ${activeTab === 'Brand' ? 'bg-purple-50 text-purple-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                品牌库
                <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">{brands.length}</span>
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col bg-[#FAF9F6] overflow-hidden">
            {/* Quick Filters */}
            {activeTab !== 'Brand' && (
              <div className="p-4 border-b border-slate-200 bg-white/50 flex flex-wrap gap-2 items-center shrink-0 overflow-x-auto">
                <span className="text-sm font-medium text-slate-500 mr-2">过滤视图:</span>
                <button 
                  onClick={() => setQuickFilter('All')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${quickFilter === 'All' ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  默认列表
                </button>
                <button 
                  onClick={() => setQuickFilter('Recent')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center transition-colors ${quickFilter === 'Recent' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  最新发布
                </button>
                <button 
                  onClick={() => setQuickFilter('Question')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center transition-colors ${quickFilter === 'Question' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  <Lightbulb className="w-3.5 h-3.5 mr-1" />
                  问题解决
                </button>
                <button 
                  onClick={() => setQuickFilter('Beginner')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center transition-colors ${quickFilter === 'Beginner' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  <BookOpen className="w-3.5 h-3.5 mr-1" />
                  新手入门
                </button>
              </div>
            )}

            {/* List Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {displayItems.length === 0 ? (
                <div className="text-center text-slate-500 py-12">
                  <p>没有找到相关内容。</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 content-start">
                  {displayItems.map((item, idx) => (
                    <Link 
                      key={idx} 
                      href={item.url}
                      onClick={onClose}
                      className="group bg-white border border-slate-200 rounded-xl p-3 md:p-4 hover:border-blue-300 hover:shadow-md transition-all flex flex-col h-full"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full ${item.type === 'brand' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                          {item.type === 'brand' ? 'Brand' : categoryMap[item.category || ''] || item.category || 'Article'}
                        </span>
                        {item.date && <span className="text-[10px] md:text-xs text-slate-400 font-mono">{item.date}</span>}
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-slate-900 leading-snug mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs md:text-sm text-slate-500 line-clamp-2 mt-auto">
                          {item.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
              
              {quickFilter === 'Recent' && activeTab === 'All' && (
                <div className="mt-8 text-center">
                  <Link 
                    href="/articles" 
                    onClick={onClose}
                    className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    查看全部文章 <ExternalLink className="w-4 h-4 ml-1.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
