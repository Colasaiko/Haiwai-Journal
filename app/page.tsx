import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export const metadata: Metadata = {
  title: '2026 机场推荐｜稳定、便宜、专线机场测评 - 海外志',
  description: '海外志整理 2026 机场推荐、稳定机场、便宜机场、IPLC / IEPL 专线机场、Clash 订阅、流媒体与 AI 使用场景，并提供品牌档案、套餐资料与机场对比。',
};

export default function Home() {
  const posts = getAllPosts();
  const heroPost = posts.find(p => p.slug === 'peak-hours-stable-airport-recommendations') || posts[0];
  const featuredPosts = posts.filter(p => p.slug !== heroPost.slug).slice(0, 4);
  const latestPosts = posts.slice(0, 4);
  const weeklyReads = posts.slice(4, 9);

  const catMap: Record<string, string> = { "airport-observation": "机场测评", "network": "网络知识", "clash": "Clash 教程", "tools": "软件工具", "guides": "海外指南" };

  const recommendationSlugs = [
    { slug: 'peak-hours-stable-airport-recommendations', label: '晚高峰稳定机场推荐', desc: '测试各种拥堵情况下的实际表现' },
    { slug: 'student-budget-airport-recommendations', label: '便宜机场推荐', desc: '低预算机场怎么选与性价比分析' },
    { slug: 'dedicated-line-iplc-iepl-explained', label: '专线机场推荐', desc: '了解 IPLC / IEPL 专线与跨境传输' },
    { slug: 'clash-airport-recommendations-2026', label: 'Clash 机场推荐', desc: '适配最主流客户端的订阅服务' },
    { slug: 'pay-as-you-go-unlimited-airport-recommendations', label: '按量计费机场', desc: '轻度用户按量套餐与不限时机场选择' },
    { slug: 'streaming-chatgpt-airport-recommendations', label: '流媒体与 ChatGPT 机场推荐', desc: '解锁 Netflix 与 AI 服务的原生节点' },
    { slug: 'established-old-airport-recommendations', label: '老牌机场推荐', desc: '老牌机场选择思路与稳定运营背景' },
    { slug: 'github-reddit-airport-recommendations', label: '真实评价收集', desc: 'GitHub 与 Reddit 用户讨论区' }
  ];
  
  const recommendationLinks = recommendationSlugs.map(item => {
    const post = posts.find(p => p.slug === item.slug);
    return post ? { ...item, category: post.category } : null;
  }).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      <div className="px-4 md:px-0 mt-4 mb-8">
        <span className="text-blue-600 font-bold text-sm tracking-wider uppercase mb-2 block">海外志 / HAIWAI JOURNAL</span>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">2026 机场推荐与机场测评</h1>
        <p className="text-slate-600 max-w-4xl leading-relaxed">
          海外志持续整理 2026 机场推荐、机场测评与网络使用资料，内容覆盖稳定机场、便宜机场、IPLC / IEPL 专线机场、Clash 订阅、流媒体、ChatGPT 与不同使用场景。除了品牌资料和套餐价格，我们也会整理线路知识、客户端教程与购买前需要注意的问题。如果你正在搜索“机场推荐 2026”，可以先从使用场景而不是品牌数量开始筛选。
        </p>
      </div>
      
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] w-full bg-slate-900 overflow-hidden flex items-end">
        <Image src={heroPost.coverImage} alt={heroPost.title} fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        
        <div className="relative z-10 w-full p-8 md:p-16 flex flex-col md:flex-row justify-between items-end">
          <div className="max-w-3xl">
            <span className="text-white/80 uppercase tracking-widest text-xs font-semibold mb-4 block">本期推荐</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{heroPost.title}</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl">{heroPost.description}</p>
            <Link href={`/${heroPost.category}/${heroPost.slug}`} className="inline-block bg-white text-slate-900 px-8 py-3 text-sm font-medium uppercase tracking-wide hover:bg-slate-100 transition-colors">阅读文章</Link>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-white/60 italic text-sm font-serif">更好的网络，<br/>让世界触手可及。</p>
          </div>
        </div>
      </section>

      {/* 2026 Recommendation Hub */}
      <section className="bg-slate-50 border border-slate-200 p-8 md:p-12">
        <div className="mb-8 border-b-2 border-slate-900 pb-4">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">2026 机场推荐：按需求开始选择</h2>
          <p className="text-slate-600 mt-2 max-w-2xl">
            网上常见的“机场排行榜”与“机场天梯榜”通常会把不同价位、线路和使用场景混在一起比较。海外志更倾向提供分类指南，让用户按真实需求寻找。
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recommendationLinks.map(item => (
            <Link key={item!.slug} href={`/${item!.category}/${item!.slug}`} className="block bg-white border border-slate-200 p-5 hover:border-blue-500 hover:shadow-md transition-all group">
              <h3 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{item!.label}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{item!.desc}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex gap-4 text-sm items-center">
          <span className="text-slate-600 font-medium">机场排行榜与天梯榜怎么看？</span>
          <Link href="/brands" className="font-semibold text-blue-600 hover:underline">浏览品牌库 &rarr;</Link>
          <Link href="/compare" className="font-semibold text-blue-600 hover:underline">品牌对比工具 &rarr;</Link>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredPosts.map(post => (
          <Link key={post.slug} href={`/${post.category}/${post.slug}`} className="group flex flex-col border border-slate-200 bg-white hover:border-slate-300 transition-all">
            <div className="relative h-48 w-full overflow-hidden">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-xs text-blue-600 uppercase tracking-wider mb-2 font-semibold">{catMap[post.category] || post.category}</span>
              <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-700 transition-colors">{post.title}</h3>
              <span className="mt-auto text-xs text-slate-500">{post.date}</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Latest & Weekly */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <section className="lg:col-span-2">
          <div className="flex justify-between items-end mb-8 border-b-2 border-slate-900 pb-2">
            <h2 className="text-2xl font-bold uppercase tracking-tight">最新文章</h2>
            <Link href="/articles" className="text-sm text-slate-500 hover:text-slate-900">查看全部 &rarr;</Link>
          </div>
          <div className="space-y-8">
            {latestPosts.map(post => (
              <article key={post.slug} className="flex flex-col sm:flex-row gap-6 group">
                <Link href={`/${post.category}/${post.slug}`} className="sm:w-1/3 relative h-48 sm:h-auto overflow-hidden shrink-0">
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="sm:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{catMap[post.category] || post.category}</span>
                    <span className="text-xs text-slate-400">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors"><Link href={`/${post.category}/${post.slug}`}>{post.title}</Link></h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{post.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        
        <section>
          <div className="mb-8 border-b-2 border-slate-900 pb-2">
            <h2 className="text-2xl font-bold uppercase tracking-tight">本周阅读</h2>
          </div>
          <ul className="space-y-6">
            {weeklyReads.map((post, i) => (
              <li key={post.slug} className="group">
                <Link href={`/${post.category}/${post.slug}`} className="flex gap-4">
                  <span className="text-3xl font-serif text-slate-300 font-bold group-hover:text-blue-200 transition-colors">0{i+1}</span>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-tight mb-1">{post.title}</h3>
                    <p className="text-xs text-slate-500">{catMap[post.category] || post.category}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

            <div className="mt-12 bg-slate-100 p-8 border border-slate-200 text-center">
              <h3 className="text-xl font-bold mb-2">品牌与对比中心</h3>
              <p className="text-sm text-slate-600 mb-6">浏览收录品牌档案，或进行多维度特点对比，帮助您更清晰地选择。</p>
              <div className="flex justify-center gap-4">
                <Link href="/brands" className="inline-block bg-white border border-slate-300 text-slate-700 px-6 py-2 text-sm font-medium hover:bg-slate-50 transition-colors">浏览品牌库</Link>
                <Link href="/compare" className="inline-block bg-slate-900 text-white px-6 py-2 text-sm font-medium hover:bg-slate-800 transition-colors">品牌对比</Link>
              </div>
            </div>
        </section>
      </div>

      {/* Category Nav */}
      <section className="pt-8">
         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link href="/airport-observation" className="relative h-32 group overflow-hidden">
              <Image src="/images/nav-airport-v2.jpg" alt="机场测评" fill className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold tracking-wider shadow-sm">机场测评</span>
              </div>
            </Link>
            <Link href="/network" className="relative h-32 group overflow-hidden">
              <Image src="/images/nav-network-v2.jpg" alt="网络知识" fill className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold tracking-wider shadow-sm">网络知识</span>
              </div>
            </Link>
            <Link href="/clash" className="relative h-32 group overflow-hidden">
              <Image src="/images/nav-clash-v2.jpg" alt="Clash教程" fill className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold tracking-wider shadow-sm">Clash 教程</span>
              </div>
            </Link>
            <Link href="/tools" className="relative h-32 group overflow-hidden">
              <Image src="/images/nav-tools-v2.jpg" alt="软件工具" fill className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold tracking-wider shadow-sm">软件工具</span>
              </div>
            </Link>
            <Link href="/guides" className="relative h-32 group overflow-hidden col-span-2 md:col-span-1">
              <Image src="/images/nav-guides-v2.jpg" alt="海外指南" fill className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold tracking-wider shadow-sm">海外指南</span>
              </div>
            </Link>
         </div>
      </section>

    </div>
  );
}
