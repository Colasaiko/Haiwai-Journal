'use client';

import { useState } from 'react';

type FaqItem = { q: string, a: string };
type FaqCategory = { category: string, questions: FaqItem[] };

export default function FaqClient({ data }: { data: FaqCategory[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndexes, setOpenIndexes] = useState<Record<string, boolean>>({});

  const toggleOpen = (catIdx: number, qIdx: number) => {
    const key = `${catIdx}-${qIdx}`;
    setOpenIndexes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredData = data.map((cat, catIdx) => {
    const filteredQuestions = cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...cat, questions: filteredQuestions, originalIdx: catIdx };
  }).filter(cat => cat.questions.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">科学上网与机场 FAQ 知识库</h1>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          无论您是刚接触魔法上网的新手，还是追求极致延迟的老玩家，这里整理了关于机场、节点、流媒体解锁最全面的解答。
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800"
            placeholder="搜索您的问题 (例如：Netflix, 延迟, 怎么导入...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-4 top-4 h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="space-y-12">
        {filteredData.length === 0 ? (
          <div className="text-center py-12 text-slate-500">没有找到匹配的问题，尝试换个搜索词？</div>
        ) : (
          filteredData.map((cat) => (
            <div key={cat.category} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">{cat.category}</h2>
              <div className="space-y-4">
                {cat.questions.map((item, qIdx) => {
                  const key = `${cat.originalIdx}-${qIdx}`;
                  const isOpen = openIndexes[key];
                  return (
                    <div key={key} className="border border-slate-200 rounded-lg overflow-hidden transition-all duration-200">
                      <button 
                        className="w-full px-5 py-4 text-left flex justify-between items-center bg-slate-50 hover:bg-slate-100 focus:outline-none"
                        onClick={() => toggleOpen(cat.originalIdx, qIdx)}
                      >
                        <span className="font-semibold text-slate-800 pr-4">{item.q}</span>
                        <svg className={`w-5 h-5 text-slate-500 transform transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-5 py-4 bg-white text-slate-600 leading-relaxed border-t border-slate-200">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
