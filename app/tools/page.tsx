import { getAllPosts } from '@/lib/mdx';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: '软件工具与客户端指南｜Clash、v2rayN、Shadowrocket - 海外志',
  description: '海外志整理 Clash、v2rayN、v2rayNG、Shadowrocket、Surge、Quantumult X、sing-box、Hiddify 等客户端与网络工具使用指南。',
  alternates: {
    canonical: 'https://haiwaijichang.online/tools',
  }
};

const catMap: Record<string, string> = { "airport-observation": "机场测评", "network": "网络知识", "clash": "Clash 教程", "tools": "软件工具", "guides": "海外指南" };

export default function ToolsPage() {
  const allPosts = getAllPosts();
  
  const getPostsBySlugs = (slugs: string[]) => {
    return slugs.map(slug => allPosts.find(p => p.slug === slug)).filter(Boolean) as typeof allPosts;
  };

  const nativeTools = allPosts.filter(p => p.category === 'tools' && p.slug !== 'sing-box-hiddify-airport-recommendations');

  const recommendedClients = getPostsBySlugs([
    'sing-box-hiddify-airport-recommendations',
    'v2rayn-airport-recommendations-windows',
    'android-clash-v2rayng-airport-recommendations',
    'mac-clashx-surge-airport-recommendations',
    'shadowrocket-airport-recommendations-2026',
    'quantumultx-surge-airport-recommendations'
  ]);

  const clashTools = getPostsBySlugs([
    'how-to-import-clash-subscription',
    'clash-modes-explained',
    'clash-subscription-update-failed',
    'clash-airport-recommendations-2026'
  ]);

  const desktopTools = getPostsBySlugs([
    'v2rayn-airport-recommendations-windows',
    'mac-clashx-surge-airport-recommendations'
  ]);

  const mobileTools = getPostsBySlugs([
    'android-clash-v2rayng-airport-recommendations',
    'shadowrocket-airport-recommendations-2026',
    'quantumultx-surge-airport-recommendations',
    'sing-box-hiddify-airport-recommendations'
  ]);

  const speedTools = getPostsBySlugs([
    'how-to-test-airport-speed',
    'how-to-read-speed-test-results',
    'is-lower-latency-always-better'
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-blue-600 font-bold text-sm tracking-wider uppercase mb-3 block">软件工具中心</span>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">软件工具与客户端指南</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          海外志整理 Windows、macOS、Android、iOS 常见网络客户端、订阅工具、测速工具与配置教程，帮助用户根据设备和使用场景选择适合的软件。
        </p>
        <div className="mt-8 flex gap-4 text-sm font-medium">
          <Link href="/start-here" className="text-blue-600 hover:underline">新手指南 &rarr;</Link>
          <Link href="/clash" className="text-blue-600 hover:underline">Clash 专区 &rarr;</Link>
          <Link href="/network" className="text-blue-600 hover:underline">网络基础知识 &rarr;</Link>
        </div>
      </div>

      {/* Section 0: 完整软件教程 (Native Tools) */}
      <section>
        <div className="mb-8 border-b-2 border-blue-600 pb-2 flex justify-between items-end">
          <h2 className="text-2xl font-bold uppercase tracking-tight">完整软件教程</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nativeTools.map(post => (
            <Link key={post.slug} href={`/${post.category}/${post.slug}`} className="group flex flex-col h-full bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors rounded-lg overflow-hidden shadow-sm hover:shadow-md">
              <div className="relative h-32 w-full overflow-hidden shrink-0">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">{catMap[post.category] || post.category}</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2 mb-3">{post.description}</p>
                <span className="mt-auto text-xs text-slate-500 font-medium flex items-center">
                  阅读全文 <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 1: 推荐客户端 */}
      <section>
        <div className="mb-8 border-b-2 border-slate-900 pb-2 flex justify-between items-end">
          <h2 className="text-xl font-bold uppercase tracking-tight">核心推荐客户端</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedClients.map(post => (
            <Link key={post.slug} href={`/${post.category}/${post.slug}`} className="group block border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col h-full">
              <div className="relative h-48 w-full overflow-hidden shrink-0">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">{catMap[post.category] || post.category}</span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-700 transition-colors">{post.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2 mb-4">{post.description}</p>
                <span className="mt-auto text-xs text-slate-500 font-medium">阅读文章 &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 2: Clash 与 Mihomo 工具指南 */}
      <section className="bg-slate-50 p-8 md:p-12 border border-slate-200">
        <div className="mb-8 border-b border-slate-300 pb-4">
          <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">Clash 与 Mihomo 工具指南</h2>
          <p className="text-slate-600 mt-2">围绕最流行的规则分流客户端，从订阅导入到排错的基础教程。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clashTools.map(post => (
            <Link key={post.slug} href={`/${post.category}/${post.slug}`} className="group flex gap-4 items-center bg-white p-4 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-tight line-clamp-2">{post.title}</h3>
                <span className="text-xs text-slate-500 mt-1 block">{catMap[post.category] || post.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 3 & 4: 桌面与移动端 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section>
          <div className="mb-6 border-b-2 border-slate-900 pb-2">
            <h2 className="text-xl font-bold uppercase tracking-tight">桌面端工具 (Windows / macOS)</h2>
          </div>
          <div className="space-y-6">
            {desktopTools.map(post => (
              <article key={post.slug} className="group">
                <Link href={`/${post.category}/${post.slug}`}>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{post.description}</p>
                </Link>
              </article>
            ))}
          </div>
        </section>
        
        <section>
          <div className="mb-6 border-b-2 border-slate-900 pb-2">
            <h2 className="text-xl font-bold uppercase tracking-tight">移动端工具 (iOS / Android)</h2>
          </div>
          <div className="space-y-6">
            {mobileTools.map(post => (
              <article key={post.slug} className="group">
                <Link href={`/${post.category}/${post.slug}`}>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{post.description}</p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Section 5: 测速与排错 */}
      <section>
        <div className="mb-8 border-b-2 border-slate-900 pb-2">
          <h2 className="text-xl font-bold uppercase tracking-tight">测速、诊断与排错工具</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {speedTools.map(post => (
            <Link key={post.slug} href={`/${post.category}/${post.slug}`} className="group flex flex-col h-full bg-slate-900 text-white p-6 hover:bg-slate-800 transition-colors">
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">{catMap[post.category] || post.category}</span>
              <h3 className="text-lg font-bold leading-snug mb-4 group-hover:text-blue-200 transition-colors">{post.title}</h3>
              <div className="mt-auto flex justify-between items-center text-sm text-slate-400">
                <span>{post.date}</span>
                <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
