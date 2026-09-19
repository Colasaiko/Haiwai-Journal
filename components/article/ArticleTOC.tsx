'use client';

import { useEffect, useState } from 'react';

interface TOCProps {
  toc: { id: string; text: string; level: number }[];
}

export default function ArticleTOC({ toc }: TOCProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">文章目录</h3>
      <ul className="space-y-3 border-l-2 border-slate-100">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 1 + 1}rem` }}
          >
            <a
              href={`#${item.id}`}
              className={`block text-sm transition-colors ${
                activeId === item.id
                  ? 'text-blue-600 font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
