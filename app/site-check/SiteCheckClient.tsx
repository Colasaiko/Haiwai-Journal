'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useMemo } from 'react';
import { Search, ExternalLink, Copy, Check } from 'lucide-react';

interface SiteCheckClientProps {
  posts: any[];
  categories: any[];
  brands: any[];
  staticPages: any[];
}

export default function SiteCheckClient({ posts, categories, brands, staticPages }: SiteCheckClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Article' | 'Brand' | 'Category' | 'Static'>('All');
  const [catFilter, setCatFilter] = useState<string>('All');
  const [specialFilter, setSpecialFilter] = useState<'All' | 'Recent10' | 'Recent20' | 'Question'>('All');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(`https://haiwaijichang.online${url}`);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const allItems = useMemo(() => {
    const items: any[] = [];
    
    // Posts
    posts.forEach(p => {
      items.push({
        type: 'Article',
        title: p.title,
        category: p.category,
        date: p.date,
        url: `/${p.category}/${p.slug}`,
        description: p.description,
        slug: p.slug
      });
    });

    // Brands
    brands.forEach(b => {
      items.push({
        type: 'Brand',
        title: b.name,
        category: 'Brand',
        url: `/brands/${b.slug}`,
        slug: b.slug
      });
    });

    // Categories
    categories.forEach(c => {
      items.push({
        type: 'Category',
        title: c.name,
        category: 'Category',
        url: `/${c.slug}`,
        slug: c.slug
      });
    });

    // Static
    staticPages.forEach(s => {
      items.push({
        type: 'Static',
        title: s.name,
        category: 'Static',
        url: s.url
      });
    });

    return items;
  }, [posts, brands, categories, staticPages]);

  const filteredItems = useMemo(() => {
    let result = allItems;

    if (typeFilter !== 'All') {
      result = result.filter(i => i.type === typeFilter);
    }

    if (catFilter !== 'All' && typeFilter === 'Article') {
      result = result.filter(i => i.category === catFilter);
    }

    if (specialFilter === 'Question') {
      const questionKeywords = ['怎么', '如何', '为什么', '怎么办', '什么是', '区别'];
      result = result.filter(i => i.type === 'Article' && questionKeywords.some(kw => i.title.includes(kw)));
    }

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(i => 
        (i.title && i.title.toLowerCase().includes(lower)) ||
        (i.slug && i.slug.toLowerCase().includes(lower)) ||
        (i.category && i.category.toLowerCase().includes(lower)) ||
        (i.description && i.description.toLowerCase().includes(lower))
      );
    }

    if (specialFilter === 'Recent10') {
      result = result.filter(i => i.type === 'Article').sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime()).slice(0, 10);
    } else if (specialFilter === 'Recent20') {
      result = result.filter(i => i.type === 'Article').sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime()).slice(0, 20);
    }

    return result;
  }, [allItems, searchTerm, typeFilter, catFilter, specialFilter]);

  const getCategoryName = (slug: string) => {
    const cat = categories.find(c => c.slug === slug);
    return cat ? cat.name : slug;
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-500 mb-1">全部文章</div>
          <div className="text-3xl font-bold text-slate-900">{posts.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-500 mb-1">品牌数量</div>
          <div className="text-3xl font-bold text-slate-900">{brands.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-500 mb-1">分类数量</div>
          <div className="text-3xl font-bold text-slate-900">{categories.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-500 mb-1">主要静态页</div>
          <div className="text-3xl font-bold text-slate-900">{staticPages.length}</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="搜索标题、Slug、描述或分类..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2 border-r border-slate-200 pr-4">
            <span className="text-sm font-medium text-slate-700">类型:</span>
            {['All', 'Article', 'Brand', 'Category', 'Static'].map(t => (
              <button 
                key={t}
                onClick={() => { setTypeFilter(t as any); setCatFilter('All'); setSpecialFilter('All'); }}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${typeFilter === t ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {t === 'All' ? '全部' : t}
              </button>
            ))}
          </div>

          {typeFilter === 'Article' && (
            <div className="flex flex-wrap items-center gap-2 border-r border-slate-200 pr-4">
              <span className="text-sm font-medium text-slate-700">文章分类:</span>
              <button 
                onClick={() => setCatFilter('All')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${catFilter === 'All' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                全部
              </button>
              {categories.map(c => (
                <button 
                  key={c.slug}
                  onClick={() => setCatFilter(c.slug)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${catFilter === c.slug ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {c.name} ({posts.filter(p => p.category === c.slug).length})
                  {posts.filter(p => p.category === c.slug).length < 5 && <span className="ml-1 text-xs text-amber-500" title="内容偏少">!</span>}
                </button>
              ))}
            </div>
          )}

          {typeFilter === 'Article' && (
             <div className="flex items-center gap-2">
               <span className="text-sm font-medium text-slate-700">快速筛选:</span>
               <button 
                  onClick={() => setSpecialFilter(specialFilter === 'Recent10' ? 'All' : 'Recent10')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${specialFilter === 'Recent10' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  最新 10 篇
                </button>
                <button 
                  onClick={() => setSpecialFilter(specialFilter === 'Recent20' ? 'All' : 'Recent20')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${specialFilter === 'Recent20' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  最新 20 篇
                </button>
                <button 
                  onClick={() => setSpecialFilter(specialFilter === 'Question' ? 'All' : 'Question')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${specialFilter === 'Question' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  问题型文章
                </button>
             </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <span className="font-medium text-slate-700">筛选结果: {filteredItems.length} 项</span>
        </div>
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="p-4 font-medium">类型</th>
                <th className="p-4 font-medium">标题</th>
                <th className="p-4 font-medium">分类</th>
                <th className="p-4 font-medium">日期</th>
                <th className="p-4 font-medium">URL</th>
                <th className="p-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                      ${item.type === 'Article' ? 'bg-blue-100 text-blue-700' : 
                        item.type === 'Brand' ? 'bg-purple-100 text-purple-700' : 
                        item.type === 'Category' ? 'bg-amber-100 text-amber-700' : 
                        'bg-slate-200 text-slate-700'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-900 max-w-xs truncate" title={item.title}>
                    {item.title}
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    {item.type === 'Article' ? getCategoryName(item.category || '') : '-'}
                  </td>
                  <td className="p-4 text-sm text-slate-500">
                    {item.date || '-'}
                  </td>
                  <td className="p-4 text-sm font-mono text-slate-500 max-w-[200px] truncate" title={item.url}>
                    {item.url}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => copyToClipboard(item.url)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="复制完整 URL"
                    >
                      {copiedUrl === item.url ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="在新标签页打开"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-slate-200">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="p-4 hover:bg-slate-50">
              <div className="flex justify-between items-start mb-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                      ${item.type === 'Article' ? 'bg-blue-100 text-blue-700' : 
                        item.type === 'Brand' ? 'bg-purple-100 text-purple-700' : 
                        item.type === 'Category' ? 'bg-amber-100 text-amber-700' : 
                        'bg-slate-200 text-slate-700'}`}>
                  {item.type}
                </span>
                {item.date && <span className="text-xs text-slate-400">{item.date}</span>}
              </div>
              <div className="font-medium text-slate-900 mb-1">{item.title}</div>
              <div className="text-xs font-mono text-slate-500 mb-3 break-all">{item.url}</div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => copyToClipboard(item.url)}
                  className="flex items-center text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded hover:bg-slate-200"
                >
                  {copiedUrl === item.url ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                  复制
                </button>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded hover:bg-blue-100"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  打开
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            没有找到匹配的内容
          </div>
        )}
      </div>
    </div>
  );
}
