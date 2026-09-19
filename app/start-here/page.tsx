import { getAllPosts, getCategoryBySlug } from '@/lib/mdx';
import Link from 'next/link';
import { ChevronRight, Clock } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '从这里开始｜海外志新手阅读指南',
  description: '第一次接触机场、Clash、IPLC、节点与代理工具？从海外志的新手阅读路线开始，按顺序了解基础概念、线路、客户端与品牌选择。',
  alternates: {
    canonical: 'https://haiwaijichang.online/start-here',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function StartHerePage() {
  const allPosts = getAllPosts();

  const getPostInfo = (slug: string) => {
    const post = allPosts.find(p => p.slug === slug);
    if (!post) return null;
    let categoryName = post.category;
    try {
      categoryName = getCategoryBySlug(post.category).title;
    } catch {}
    
    return {
      ...post,
      categoryName
    };
  };

  const sections = [
    {
      id: '01',
      title: '先搞懂“机场”到底是什么',
      desc: '解释什么是机场、节点、订阅和客户端，帮助你快速理解基础概念。',
      slugs: ['what-is-airport-meaning']
    },
    {
      id: '02',
      title: '再了解线路有什么区别',
      desc: '深入理解 IPLC、IEPL、BGP、直连与中转的区别，以及延迟和晚高峰对体验的影响。',
      slugs: [
        'dedicated-line-iplc-iepl-explained',
        'cn2-gia-bgp-routing-airport-recommendations',
        'is-lower-latency-always-better',
        'peak-hours-stable-airport-recommendations'
      ]
    },
    {
      id: '03',
      title: '怎么判断适不适合自己',
      desc: '没有一个方案适合所有人。根据预算、流量、设备、流媒体或游戏需求来挑选。',
      slugs: [
        'monthly-vs-yearly-airport-recommendations',
        'pay-as-you-go-unlimited-airport-recommendations',
        'student-budget-airport-recommendations',
        'streaming-chatgpt-airport-recommendations',
        'can-airports-be-used-for-gaming'
      ]
    },
    {
      id: '04',
      title: '学会使用客户端',
      desc: '获取 Windows、Android、iOS 和 macOS 各大主流客户端的使用指南。',
      slugs: [
        'clash-airport-recommendations-2026',
        'v2rayn-airport-recommendations-windows',
        'shadowrocket-airport-recommendations-2026',
        'quantumultx-surge-airport-recommendations',
        'mac-clashx-surge-airport-recommendations',
        'sing-box-hiddify-airport-recommendations'
      ]
    }
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-10">
          <Link href="/" className="hover:text-blue-600 transition-colors">首页</Link>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <span className="text-slate-900 font-medium">从这里开始</span>
        </nav>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">
            第一次来到海外志？从这里开始
          </h1>
          <div className="prose prose-slate prose-lg text-slate-600">
            <p>
              如果你刚接触机场、代理工具、Clash、IPLC、原生 IP 等概念，不需要一次看懂所有术语。
            </p>
            <p>
              这里按照从基础到进阶的顺序，整理一条更容易理解的阅读路线。
            </p>
          </div>
        </div>

        {/* Reading Path */}
        <div className="space-y-20 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-8 md:before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          
          {sections.map(section => {
            const posts = section.slugs.map(getPostInfo).filter(Boolean);
            if (posts.length === 0) return null;

            return (
              <div key={section.id} className="relative flex items-start">
                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-[#FAF9F6] shadow-sm z-10 shrink-0 font-serif text-2xl font-bold text-slate-300">
                  {section.id}
                </div>
                <div className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-white border-[3px] border-[#FAF9F6] shadow-sm z-10 shrink-0 font-serif text-base font-bold text-slate-300">
                  {section.id}
                </div>
                
                <div className="ml-6 md:ml-8 flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{section.title}</h2>
                  <p className="text-slate-600 mb-8 text-lg">{section.desc}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {posts.map(post => (
                      <Link 
                        key={post!.slug} 
                        href={`/${post!.category}/${post!.slug}`}
                        className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col h-full"
                      >
                        <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mb-3">
                          <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{post!.categoryName}</span>
                          {post!.readingTime && (
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {post!.readingTime} min
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                          {post!.title}
                        </h3>
                        <p className="text-sm text-slate-500 line-clamp-2 mt-auto">
                          {post!.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Section 05: Brands */}
          <div className="relative flex items-start">
            <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-[#FAF9F6] shadow-sm z-10 shrink-0 font-serif text-2xl font-bold text-slate-300">
              05
            </div>
            <div className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-white border-[3px] border-[#FAF9F6] shadow-sm z-10 shrink-0 font-serif text-base font-bold text-slate-300">
              05
            </div>
            
            <div className="ml-6 md:ml-8 flex-1 min-w-0">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">05｜最后再去看品牌</h2>
              <p className="text-slate-600 mb-8 text-lg">理解基础概念后，再去查看品牌资料和对比会更容易。购买长期套餐前请先进行短周期测试。</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/brands" className="flex items-center justify-center p-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                  浏览品牌库
                </Link>
                <Link href="/compare" className="flex items-center justify-center p-4 bg-white border-2 border-slate-200 text-slate-900 rounded-xl font-bold hover:border-slate-300 transition-colors">
                  进入品牌对比
                </Link>
              </div>

              <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                <h4 className="font-bold text-blue-900 mb-3">购买前建议：</h4>
                <ul className="list-disc list-outside ml-5 space-y-1.5 text-blue-800 text-sm">
                  <li>优先短周期测试，确认客户端兼容与本地网络连通性</li>
                  <li>确认套餐周期、流量规则与设备数限制</li>
                  <li>网络服务存在波动，价格和节点可能变化</li>
                  <li>查看官方退款和售后说明</li>
                  <li>长期套餐购买前多确认一次</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-24 pt-12 border-t border-slate-200 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-6">仍然不知道从哪里开始？</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/search" className="text-sm font-medium text-slate-600 hover:text-blue-600 px-4 py-2 bg-white border border-slate-200 rounded-full hover:border-slate-300 transition-colors">
              搜索海外志
            </Link>
            <Link href="/articles" className="text-sm font-medium text-slate-600 hover:text-blue-600 px-4 py-2 bg-white border border-slate-200 rounded-full hover:border-slate-300 transition-colors">
              浏览全部文章
            </Link>
            <Link href="/faq" className="text-sm font-medium text-slate-600 hover:text-blue-600 px-4 py-2 bg-white border border-slate-200 rounded-full hover:border-slate-300 transition-colors">
              查看 FAQ
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
