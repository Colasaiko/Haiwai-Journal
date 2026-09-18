'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SearchItem, search } from '@/lib/search';
import { Search, X, FileText, Package, HelpCircle, Folder, CornerDownLeft } from 'lucide-react';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 50);
      
      if (index.length === 0) {
        fetch('/search-index.json')
          .then(res => res.json())
          .then(data => setIndex(data))
          .catch(console.error);
      }
    }
  }, [isOpen, index.length]);

  const results = useMemo(() => query.trim().length >= 2 ? search(index, query).slice(0, 8) : [], [query, index]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          onClose(); // In a real app we'd have a global state, but here onClose isn't exactly toggle. Wait.
          // Wait, the global listener should be in Header. This is just the dialog.
        }
        return;
      }

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > -1 ? prev - 1 : -1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          router.push(results[selectedIndex].url);
          onClose();
        } else if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query.trim())}`);
          onClose();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, query, selectedIndex, results, router, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-[fadeinup_0.2s_ease-out_forwards]">
        
        <div className="flex items-center px-4 py-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章、品牌或关键词..."
            className="flex-1 bg-transparent border-none focus:outline-none text-lg text-slate-900 placeholder:text-slate-400"
          />
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors ml-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {query.trim().length > 0 && query.trim().length < 2 && (
          <div className="px-6 py-8 text-center text-slate-500 text-sm">
            请输入至少 2 个字符...
          </div>
        )}

        {results.length > 0 && (
          <div className="overflow-y-auto p-2">
            {results.map((item, idx) => {
              const Icon = item.type === 'article' ? FileText :
                           item.type === 'brand' ? Package :
                           item.type === 'category' ? Folder : HelpCircle;
              
              const isSelected = idx === selectedIndex;
              
              return (
                <Link 
                  key={item.id} 
                  href={item.url}
                  onClick={onClose}
                  className={`flex items-center px-4 py-3 rounded-xl transition-colors ${isSelected ? 'bg-blue-50 text-blue-900' : 'hover:bg-slate-50'}`}
                >
                  <Icon className={`w-5 h-5 mr-4 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium truncate ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                      {item.title}
                    </div>
                    {item.description && (
                      <div className="text-xs text-slate-500 truncate mt-0.5">
                        {item.description}
                      </div>
                    )}
                  </div>
                  {isSelected && <CornerDownLeft className="w-4 h-4 text-blue-400 ml-3 shrink-0" />}
                </Link>
              );
            })}
          </div>
        )}
        
        {query.trim().length >= 2 && results.length === 0 && (
          <div className="px-6 py-12 text-center text-slate-500">
            没有找到与 “{query}” 相关的内容
          </div>
        )}

        {query.trim().length >= 2 && results.length > 0 && (
          <div className="border-t border-slate-100 p-2">
            <Link 
              href={`/search?q=${encodeURIComponent(query.trim())}`}
              onClick={onClose}
              className="block w-full py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              查看全部搜索结果
            </Link>
          </div>
        )}
        
        <div className="hidden sm:flex border-t border-slate-100 bg-slate-50 px-4 py-3 items-center justify-end space-x-4 text-xs text-slate-400">
          <span className="flex items-center"><kbd className="font-sans px-1.5 py-0.5 rounded border border-slate-200 bg-white mr-1.5 shadow-sm">&uarr;</kbd><kbd className="font-sans px-1.5 py-0.5 rounded border border-slate-200 bg-white mr-1.5 shadow-sm">&darr;</kbd> 导航</span>
          <span className="flex items-center"><kbd className="font-sans px-1.5 py-0.5 rounded border border-slate-200 bg-white mr-1.5 shadow-sm">Enter</kbd> 确认</span>
          <span className="flex items-center"><kbd className="font-sans px-1.5 py-0.5 rounded border border-slate-200 bg-white mr-1.5 shadow-sm">Esc</kbd> 关闭</span>
        </div>
      </div>
    </div>
  );
}
