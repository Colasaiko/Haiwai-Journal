import Link from 'next/link';
import { Post } from '@/lib/mdx';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ArticleNavigationProps {
  prev: Post | null;
  next: Post | null;
}

export default function ArticleNavigation({ prev, next }: ArticleNavigationProps) {
  if (!prev && !next) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 mb-16">
      {prev ? (
        <Link 
          href={`/${prev.category}/${prev.slug}`}
          className="group flex flex-col items-start p-6 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all bg-slate-50 hover:bg-white"
        >
          <span className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 group-hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            上一篇
          </span>
          <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link 
          href={`/${next.category}/${next.slug}`}
          className="group flex flex-col items-end text-right p-6 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all bg-slate-50 hover:bg-white"
        >
          <span className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 group-hover:text-blue-600 transition-colors">
            下一篇
            <ArrowRight className="w-4 h-4 ml-2" />
          </span>
          <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
