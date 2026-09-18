const fs = require('fs');
const path = require('path');

const root = path.join(__dirname);
const appDir = path.join(root, 'app');
const compDir = path.join(root, 'components');

const files = {
  'app/layout.tsx': `import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "海外志｜海外机场、网络知识与 Clash 使用指南",
  description: "海外志是一个围绕海外机场、网络知识、Clash 教程、软件工具与海外数字生活展开的中文内容 Blog，提供实用教程、概念解释、选择建议与使用经验。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-[#FAF9F6] text-slate-900 font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}`,
  'app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-[#FAF9F6] text-slate-800;
  }
}
`,
  'components/Header.tsx': `import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900">海外志</span>
            <span className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold leading-none">Haiwai Journal</span>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">首页</Link>
          <Link href="/airport-observation" className="text-sm font-medium text-slate-600 hover:text-slate-900">机场观察</Link>
          <Link href="/network" className="text-sm font-medium text-slate-600 hover:text-slate-900">网络知识</Link>
          <Link href="/clash" className="text-sm font-medium text-slate-600 hover:text-slate-900">Clash 教程</Link>
          <Link href="/tools" className="text-sm font-medium text-slate-600 hover:text-slate-900">软件工具</Link>
          <Link href="/guides" className="text-sm font-medium text-slate-600 hover:text-slate-900">海外指南</Link>
          <Link href="/compare" className="text-sm font-medium text-slate-600 hover:text-slate-900">品牌对比</Link>
          <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900">关于</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <p className="hidden lg:block text-xs text-slate-400 italic mr-4">探索更大的世界，<br/>从更好的网络开始。</p>
          <button className="text-slate-500 hover:text-slate-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}`,
  'components/Footer.tsx': `import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-20 border-t-4 border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-1">海外志</h2>
          <p className="text-xs text-slate-500 tracking-widest uppercase mb-4">Haiwai Journal</p>
          <p className="text-sm leading-relaxed text-slate-400">海外志是一个围绕海外网络、机场服务、Clash、网络工具与数字生活经验整理内容的独立中文 Blog。我们相信，更好的网络可以让更多人更轻松地连接世界。</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-white font-semibold mb-4">网站导航</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">首页</Link></li>
              <li><Link href="/airport-observation" className="hover:text-white transition-colors">机场观察</Link></li>
              <li><Link href="/network" className="hover:text-white transition-colors">网络知识</Link></li>
              <li><Link href="/clash" className="hover:text-white transition-colors">Clash 教程</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">&nbsp;</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools" className="hover:text-white transition-colors">软件工具</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">海外指南</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">品牌对比</Link></li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">关于海外志</h3>
          <ul className="space-y-2 text-sm mb-6">
            <li><Link href="/about" className="hover:text-white transition-colors">关于我们</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">隐私政策</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">使用条款</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link></li>
            <li><Link href="/rss.xml" className="hover:text-white transition-colors">RSS 订阅</Link></li>
          </ul>
          <div className="flex">
            <input type="email" placeholder="输入邮箱订阅更新" className="bg-slate-800 border-none text-sm px-4 py-2 w-full text-white placeholder-slate-500 focus:ring-1 focus:ring-slate-500 outline-none" />
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm transition-colors">订阅</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
        &copy; 2026 海外志 / haiwaijichang.online. All rights reserved.
      </div>
    </footer>
  );
}`,
  'app/page.tsx': `import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default function Home() {
  const posts = getAllPosts();
  const heroPost = posts.find(p => p.slug === 'why-airport-slows-down-at-night') || posts[0];
  const featuredPosts = posts.filter(p => p.slug !== heroPost.slug).slice(0, 4);
  const latestPosts = posts.slice(0, 4);
  const weeklyReads = posts.slice(4, 9);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] w-full bg-slate-900 overflow-hidden flex items-end">
        <Image src={heroPost.coverImage} alt={heroPost.title} fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="relative z-10 w-full p-8 md:p-16 flex flex-col md:flex-row justify-between items-end">
          <div className="max-w-3xl">
            <span className="text-white/80 uppercase tracking-widest text-xs font-semibold mb-4 block">本期推荐</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{heroPost.title}</h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl">{heroPost.description}</p>
            <Link href={\`/\${heroPost.category}/\${heroPost.slug}\`} className="inline-block bg-white text-slate-900 px-8 py-3 text-sm font-medium uppercase tracking-wide hover:bg-slate-100 transition-colors">阅读文章</Link>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-white/60 italic text-sm font-serif">更好的网络，<br/>让世界触手可及。</p>
          </div>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredPosts.map(post => (
          <Link key={post.slug} href={\`/\${post.category}/\${post.slug}\`} className="group flex flex-col border border-slate-200 bg-white hover:border-slate-300 transition-all">
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
            <div className="absolute top-12 right-12 text-6xl text-white/10 font-serif hidden md:block">"</div>
            <span className="text-blue-400 text-sm tracking-wider uppercase font-semibold mb-4">专题报道</span>
            <h2 className="text-3xl font-bold mb-6">新手如何选择适合自己的机场服务？</h2>
            <p className="text-slate-300 mb-8 leading-relaxed">面对众多机场品牌，新手常常不知道该如何选择。本文从使用器具、线路类别、稳定性、价格区间等方面，帮助理解判断逻辑，找到更适合自己的服务。</p>
            <div>
              <Link href="/airport-observation/what-is-airport-service" className="inline-block border border-white/30 text-white px-8 py-3 text-sm uppercase tracking-wide hover:bg-white hover:text-slate-900 transition-colors">查看专题</Link>
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
            <Link href="/airport-observation" className="text-sm text-slate-500 hover:text-slate-900">查看全部 &rarr;</Link>
          </div>
          <div className="space-y-8">
            {latestPosts.map(post => (
              <article key={post.slug} className="flex flex-col sm:flex-row gap-6 group">
                <Link href={\`/\${post.category}/\${post.slug}\`} className="sm:w-1/3 relative h-48 sm:h-auto overflow-hidden shrink-0">
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="sm:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{post.category}</span>
                    <span className="text-xs text-slate-400">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors"><Link href={\`/\${post.category}/\${post.slug}\`}>{post.title}</Link></h3>
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
                <Link href={\`/\${post.category}/\${post.slug}\`} className="flex gap-4">
                  <span className="text-3xl font-serif text-slate-300 font-bold group-hover:text-blue-200 transition-colors">0{i+1}</span>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-tight mb-1">{post.title}</h3>
                    <p className="text-xs text-slate-500">{post.category}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Compare Entry */}
          <div className="mt-12 bg-slate-100 p-8 border border-slate-200 text-center">
            <h3 className="text-xl font-bold mb-2">品牌对比中心</h3>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 uppercase tracking-wider font-semibold mb-4">即将上线</span>
            <p className="text-sm text-slate-600 mb-6">支持多维度对比，帮助更清晰理解不同品牌的定位、特点与适合人群。</p>
            <Link href="/compare" className="inline-block bg-slate-900 text-white px-6 py-2 text-sm font-medium hover:bg-slate-800 transition-colors">了解更多</Link>
          </div>
        </section>
      </div>

      {/* Category Nav */}
      <section className="pt-8">
         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link href="/airport-observation" className="relative h-32 group overflow-hidden">
              <Image src="/images/nav-airport.jpg" alt="机场观察" fill className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold tracking-wider shadow-sm">机场观察</span>
              </div>
            </Link>
            <Link href="/network" className="relative h-32 group overflow-hidden">
              <Image src="/images/nav-network.jpg" alt="网络知识" fill className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold tracking-wider shadow-sm">网络知识</span>
              </div>
            </Link>
            <Link href="/clash" className="relative h-32 group overflow-hidden">
              <Image src="/images/nav-clash.jpg" alt="Clash教程" fill className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold tracking-wider shadow-sm">Clash 教程</span>
              </div>
            </Link>
            <Link href="/tools" className="relative h-32 group overflow-hidden">
              <Image src="/images/nav-tools.jpg" alt="软件工具" fill className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold tracking-wider shadow-sm">软件工具</span>
              </div>
            </Link>
            <Link href="/guides" className="relative h-32 group overflow-hidden col-span-2 md:col-span-1">
              <Image src="/images/nav-guides.jpg" alt="海外指南" fill className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold tracking-wider shadow-sm">海外指南</span>
              </div>
            </Link>
         </div>
      </section>

    </div>
  );
}`,
  'app/[category]/page.tsx': `import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/mdx';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const cat = getAllCategories().find(c => c.slug === params.category);
  if (!cat) return {};
  return {
    title: \`\${cat.title}｜海外志\`,
    description: cat.description,
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getAllCategories().find(c => c.slug === params.category);
  if (!cat) notFound();
  const posts = getPostsByCategory(params.category);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="text-4xl font-bold mb-4">{cat.title}</h1>
        <p className="text-lg text-slate-600 max-w-2xl">{cat.description}</p>
      </div>
      <div className="space-y-12">
        {posts.map(post => (
          <article key={post.slug} className="flex flex-col md:flex-row gap-8 group">
             <Link href={\`/\${post.category}/\${post.slug}\`} className="md:w-1/3 relative h-56 md:h-auto overflow-hidden shrink-0 block">
               <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
             </Link>
             <div className="md:w-2/3 flex flex-col justify-center">
               <span className="text-xs text-slate-500 mb-2">{post.date}</span>
               <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors"><Link href={\`/\${post.category}/\${post.slug}\`}>{post.title}</Link></h2>
               <p className="text-slate-600 mb-4 leading-relaxed">{post.description}</p>
               <Link href={\`/\${post.category}/\${post.slug}\`} className="text-sm font-semibold text-blue-600 hover:text-slate-900 transition-colors inline-block uppercase tracking-wider">阅读全文 &rarr;</Link>
             </div>
          </article>
        ))}
      </div>
    </div>
  );
}`,
  'app/[category]/[slug]/page.tsx': `import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { category: string, slug: string } }) {
  try {
    const post = getPostBySlug(params.slug);
    return {
      title: \`\${post.title} - \${post.category}｜海外志\`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        url: \`https://haiwaijichang.online/\${params.category}/\${params.slug}\`,
        type: 'article',
        images: [{ url: post.coverImage }],
      },
      alternates: {
        canonical: \`https://haiwaijichang.online/\${params.category}/\${params.slug}\`,
      }
    };
  } catch (e) {
    return {};
  }
}

export default function ArticlePage({ params }: { params: { category: string, slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch (e) {
    notFound();
  }
  
  if (post.category !== params.category) {
    notFound();
  }

  // Very basic Markdown parsing for the content (replace with next-mdx-remote for real usage)
  const renderMarkdown = (text: string) => {
    let html = text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^> \[\!TIP\](.*$)/gim, '<blockquote class="border-l-4 border-blue-500 bg-blue-50 p-4 text-blue-800">$1</blockquote>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\\*\\*(.*?)\\*\\*/gim, '<strong>$1</strong>')
      .replace(/\\*(.*?)\\*/gim, '<em>$1</em>')
      .replace(/^\\* (.*$)/gim, '<li>$1</li>');
    
    // Wrap lis in ul
    html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
    
    // Wrap paragraphs
    html = html.replace(/^(?!<h|<ul|<li|<blockquote)(.+)$/gim, '<p>$1</p>');
    return html;
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <nav className="text-sm text-slate-500 mb-6 flex space-x-2 items-center">
          <Link href="/" className="hover:text-slate-900">首页</Link>
          <span>/</span>
          <Link href={\`/\${post.category}\`} className="hover:text-slate-900 uppercase tracking-wider text-xs font-semibold">{post.category}</Link>
          <span>/</span>
          <span className="truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">{post.title}</h1>
        <p className="text-xl text-slate-600 mb-6 leading-relaxed">{post.description}</p>
        <div className="flex items-center text-sm text-slate-500 border-t border-slate-200 pt-6">
          <span className="font-medium text-slate-900 mr-4">{post.author}</span>
          <span>{post.date}</span>
        </div>
      </div>
      
      <div className="relative w-full h-[50vh] min-h-[400px] mb-12">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover bg-slate-100" priority />
      </div>

      <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600">
        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
      </div>
    </article>
  );
}`,
  'app/about/page.tsx': `export const metadata = {
  title: '关于海外志｜海外志',
  description: '关于海外志，这是一个围绕海外网络、机场、Clash、工具与数字生活经验做知识整理与内容记录的中文独立 Blog。',
  alternates: { canonical: 'https://haiwaijichang.online/about' }
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">关于海外志</h1>
      <div className="prose prose-lg text-slate-700">
        <p>海外志（Haiwai Journal）是一个围绕海外网络、机场、Clash、工具与数字生活经验做知识整理与内容记录的中文独立 Blog。</p>
        <p>在这个信息冗余的时代，我们希望用杂志感、编辑感的方式，提供干净、克制、有深度的阅读体验。我们相信，更好的网络可以让更多人更轻松地连接世界。</p>
        <p>我们坚持客观的内容记录，不提供虚假测速、不编造排行。希望能成为你探索数字生活的好帮手。</p>
      </div>
    </div>
  );
}`,
  'app/compare/page.tsx': `export const metadata = {
  title: '品牌对比中心｜海外志',
  description: '海外志品牌对比中心，支持多维度对比不同品牌的定位、特点与适合人群。',
  alternates: { canonical: 'https://haiwaijichang.online/compare' }
};

export default function Compare() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">品牌对比中心</h1>
      <p className="text-lg text-slate-600 mb-12">多维度对比，帮助更清晰理解不同品牌的定位、特点与适合人群。</p>
      <div className="bg-slate-100 p-12 border border-slate-200">
        <h2 className="text-2xl font-semibold mb-4">即将支持更多维度对比</h2>
        <p className="text-slate-600 mb-8">我们正在构建一套客观的比较框架，帮助读者直观判断。功能即将上线，敬请期待。</p>
      </div>
    </div>
  );
}`,
  'app/privacy/page.tsx': `export const metadata = { title: '隐私政策｜海外志', alternates: { canonical: 'https://haiwaijichang.online/privacy' } };
export default function Privacy() { return <div className="max-w-3xl mx-auto p-8"><h1 className="text-3xl font-bold mb-6">隐私政策</h1><p>这是一个独立的个人博客。我们尊重您的隐私，不会收集敏感信息。</p></div> }`,
  'app/terms/page.tsx': `export const metadata = { title: '使用条款｜海外志', alternates: { canonical: 'https://haiwaijichang.online/terms' } };
export default function Terms() { return <div className="max-w-3xl mx-auto p-8"><h1 className="text-3xl font-bold mb-6">使用条款</h1><p>本网站提供的信息仅供学习与交流使用，不构成任何商业建议。</p></div> }`,
  'app/sitemap.ts': `import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://haiwaijichang.online';
  
  const posts = getAllPosts().map((post) => ({
    url: \`\${baseUrl}/\${post.category}/\${post.slug}\`,
    lastModified: new Date(),
  }));

  const categories = getAllCategories().map((cat) => ({
    url: \`\${baseUrl}/\${cat.slug}\`,
    lastModified: new Date(),
  }));

  const routes = ['', '/about', '/compare', '/privacy', '/terms'].map((route) => ({
    url: \`\${baseUrl}\${route}\`,
    lastModified: new Date(),
  }));

  return [...routes, ...categories, ...posts];
}`,
  'app/robots.ts': `import { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://haiwaijichang.online/sitemap.xml',
  };
}`,
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(root, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}
console.log("Pages generated successfully.");
