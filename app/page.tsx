import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default function Home() {
  const posts = getAllPosts();
  const heroPost = posts.find(p => p.slug === 'peak-hours-stable-airport-recommendations') || posts[0];
  const featuredPosts = posts.filter(p => p.slug !== heroPost.slug).slice(0, 4);
  const latestPosts = posts.slice(0, 4);
  const weeklyReads = posts.slice(4, 9);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] w-full bg-slate-900 overflow-hidden flex items-end">
        <Image src={heroPost.coverImage} alt={heroPost.title} fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="absolute top-4 left-4 z-20">
          <h1 className="sr-only">2026 机场推荐与天梯排行榜：稳定、便宜、专线高速梯子精选</h1>
        </div>
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

      {/* Featured Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredPosts.map(post => (
          <Link key={post.slug} href={`/${post.category}/${post.slug}`} className="group flex flex-col border border-slate-200 bg-white hover:border-slate-300 transition-all">
            <div className="relative h-48 w-full overflow-hidden">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-xs text-blue-600 uppercase tracking-wider mb-2 font-semibold">{post.category}</span>
              <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-700 transition-colors">{post.title}</h3>
              <span className="mt-auto text-xs text-slate-500">{post.date}</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Feature Area */}
      <section className="bg-slate-900 text-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto min-h-[400px]">
             <Image src="/images/hero-1.jpg" alt="Airport Feature" fill className="object-cover opacity-80" />
          </div>
          <div className="p-12 lg:p-16 flex flex-col justify-center relative">
            <div className="absolute top-12 right-12 text-6xl text-white/10 font-serif hidden md:block">&quot;</div>
            <span className="text-blue-400 text-sm tracking-wider uppercase font-semibold mb-4">专题报道</span>
            <h2 className="text-3xl font-bold mb-6">新手如何选择适合自己的机场服务？</h2>
            <p className="text-slate-300 mb-8 leading-relaxed">面对众多机场品牌，新手常常不知道该如何选择。本文从使用器具、线路类别、稳定性、价格区间等方面，帮助理解判断逻辑，找到更适合自己的服务。</p>
            <div>
              <Link href="/start-here" className="inline-block border border-white/30 text-white px-8 py-3 text-sm uppercase tracking-wide hover:bg-white hover:text-slate-900 transition-colors">查看专题</Link>
            </div>
            <p className="mt-12 text-slate-400 font-serif italic border-l-2 border-blue-500 pl-4">“更好的网络，是通往世界的另一种方式。”</p>
          </div>
        </div>
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
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{post.category}</span>
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
                    <p className="text-xs text-slate-500">{post.category}</p>
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