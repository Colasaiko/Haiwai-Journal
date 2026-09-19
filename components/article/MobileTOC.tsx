'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';

interface TOCProps {
  toc: { id: string; text: string; level: number }[];
}

export default function MobileTOC({ toc }: TOCProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (toc.length === 0) return null;

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden mb-8 lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-slate-800 font-semibold focus:outline-none"
      >
        <span className="flex items-center">
          <List className="w-5 h-5 mr-3 text-slate-400" />
          本文目录
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-slate-200 bg-white">
          <ul className="space-y-3 mt-4">
            {toc.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
