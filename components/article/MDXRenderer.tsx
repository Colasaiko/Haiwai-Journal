/* eslint-disable */
// @ts-nocheck
import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {
  h1: ({ children, ...props }: React.ComponentProps<any>) => {
    return <h2 {...props} className="text-2xl font-bold text-slate-900 mt-12 mb-6 scroll-mt-24">{children}</h2>;
  },
  h2: ({ children, ...props }: React.ComponentProps<any>) => {
    return <h2 {...props} className="text-2xl font-bold text-slate-900 mt-12 mb-6 scroll-mt-24">{children}</h2>;
  },
  h3: ({ children, ...props }: any) => (
    <h3 {...props} className="text-xl font-bold text-slate-900 mt-8 mb-4 scroll-mt-24">{children}</h3>
  ),
  p: ({ children }: any) => <p className="mb-6 text-slate-700 leading-relaxed text-lg">{children}</p>,
  ul: ({ children }: any) => <ul className="mb-6 list-disc list-outside ml-6 space-y-2 text-slate-700 text-lg">{children}</ul>,
  ol: ({ children }: any) => <ol className="mb-6 list-decimal list-outside ml-6 space-y-2 text-slate-700 text-lg">{children}</ol>,
  li: ({ children }: any) => <li className="pl-2">{children}</li>,
  strong: ({ children }: any) => <strong className="font-bold text-slate-900">{children}</strong>,
  blockquote: ({ children }: any) => {
    return (
      <blockquote className="border-l-4 border-slate-300 bg-slate-50 p-6 my-8 italic text-slate-700 rounded-r-lg">
        {children}
      </blockquote>
    );
  },
  a: ({ href, children }: any) => (
    <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
      {children}
    </a>
  ),
  table: ({ children }: any) => (
    <div className="overflow-x-auto mb-8 my-6 rounded-xl border border-slate-200">
      <table className="w-full text-left border-collapse min-w-[600px] text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: any) => <th className="bg-slate-50 border-b border-slate-200 p-4 font-semibold text-slate-900">{children}</th>,
  td: ({ children }: any) => <td className="border-b border-slate-100 p-4 text-slate-700">{children}</td>,
  img: ({ src, alt }: any) => (
    <span className="block my-10">
      <span className="relative block w-full aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
        <img src={src} alt={alt || ''} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      </span>
      {alt && <span className="block mt-3 text-center text-sm text-slate-500">{alt}</span>}
    </span>
  ),
  code: ({ children, className }: any) => {
    const isInline = !className;
    if (isInline) {
      return <code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
    }
    return (
      <div className="overflow-x-auto bg-slate-900 rounded-xl p-4 my-6">
        <code className="text-slate-50 text-sm font-mono whitespace-pre">{children}</code>
      </div>
    );
  }
};

export default function MDXRenderer({ source }: { source: string }) {
  // Strip the first top-level H1 to avoid double H1 with the page title
  let processedSource = source.replace(/^\s*#\s+[^\n]+/m, '');

  processedSource = processedSource
    .replace(/^>\s*\[!NOTE\]\s*\n(>.*\n)*/gm, (match) => {
      const content = match.replace(/^>\s*\[!NOTE\]\s*\n?/gm, '').replace(/^>\s?/gm, '');
      return `<div className="border-l-4 border-blue-500 bg-blue-50 p-5 rounded-r-xl my-8">\n<div className="flex items-center font-bold text-blue-800 mb-2"><span className="mr-2">📝</span> NOTE</div>\n\n${content}\n</div>\n\n`;
    })
    .replace(/^>\s*\[!TIP\]\s*\n(>.*\n)*/gm, (match) => {
      const content = match.replace(/^>\s*\[!TIP\]\s*\n?/gm, '').replace(/^>\s?/gm, '');
      return `<div className="border-l-4 border-green-500 bg-green-50 p-5 rounded-r-xl my-8">\n<div className="flex items-center font-bold text-green-800 mb-2"><span className="mr-2">💡</span> TIP</div>\n\n${content}\n</div>\n\n`;
    })
    .replace(/^>\s*\[!WARNING\]\s*\n(>.*\n)*/gm, (match) => {
      const content = match.replace(/^>\s*\[!WARNING\]\s*\n?/gm, '').replace(/^>\s?/gm, '');
      return `<div className="border-l-4 border-amber-500 bg-amber-50 p-5 rounded-r-xl my-8">\n<div className="flex items-center font-bold text-amber-800 mb-2"><span className="mr-2">⚠️</span> WARNING</div>\n\n${content}\n</div>\n\n`;
    })
    .replace(/^>\s*\[!INFO\]\s*\n(>.*\n)*/gm, (match) => {
      const content = match.replace(/^>\s*\[!INFO\]\s*\n?/gm, '').replace(/^>\s?/gm, '');
      return `<div className="border-l-4 border-cyan-500 bg-cyan-50 p-5 rounded-r-xl my-8">\n<div className="flex items-center font-bold text-cyan-800 mb-2"><span className="mr-2">ℹ️</span> INFO</div>\n\n${content}\n</div>\n\n`;
    });

  const headingCount: Record<string, number> = {};
  
  processedSource = processedSource.replace(/^(#{2,3})\s+(.+)$/gm, (match, hashes, text) => {
    const cleanText = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*`_]/g, '').trim();
    let id = cleanText.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '');
    if (!id) id = 'section';
    
    if (headingCount[id] !== undefined) {
      headingCount[id]++;
      id = `${id}-${headingCount[id]}`;
    } else {
      headingCount[id] = 0;
    }
    
    return `${hashes} ${text} {#${id}}`;
  });

  processedSource = processedSource.replace(/^(#{2,3})\s+(.+?)\s+\{#([^}]+)\}$/gm, (match, hashes, text, id) => {
    const Tag = hashes.length === 2 ? 'h2' : 'h3';
    return `<${Tag} id="${id}">${text}</${Tag}>`;
  });

  return (
    <div className="article-content">
      <MDXRemote source={processedSource} components={components} />
    </div>
  );
}
