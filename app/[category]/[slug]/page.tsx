import { getPostBySlug, getAllPosts, getCategoryBySlug } from '@/lib/mdx';
import { extractToc, getRelatedPosts, getNextAndPrevPosts } from '@/lib/article';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Calendar, Clock, User, Hash, RefreshCcw, ArrowLeft } from 'lucide-react';
import MDXRenderer from '@/components/article/MDXRenderer';
import ArticleTOC from '@/components/article/ArticleTOC';
import MobileTOC from '@/components/article/MobileTOC';
import RelatedPosts from '@/components/article/RelatedPosts';
import RelatedBrands from '@/components/article/RelatedBrands';
import ArticleNavigation from '@/components/article/ArticleNavigation';
import ReadingProgress from '@/components/article/ReadingProgress';
import CopyLink from '@/components/article/CopyLink';

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
      title: `${post.title} - ${post.category}｜海外志`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        url: `https://haiwaijichang.online/${params.category}/${params.slug}`,
        type: 'article',
        images: [{ url: post.coverImage }],
        publishedTime: post.date,
        modifiedTime: post.updated || undefined,
        authors: [post.author],
      },
      alternates: {
        canonical: `https://haiwaijichang.online/${params.category}/${params.slug}`,
      }
    };
  } catch {
    return {};
  }
}

export default function ArticlePage({ params }: { params: { category: string, slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }
  
  if (post.category !== params.category) {
    notFound();
  }

  let categoryTitle = post.category;
  try {
    categoryTitle = getCategoryBySlug(post.category).title;
  } catch {}

  const toc = extractToc(post.content);
  const relatedPosts = getRelatedPosts(post);
  const { prev, next } = getNextAndPrevPosts(post);

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: post.author
    },
    image: `https://haiwaijichang.online${post.coverImage}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://haiwaijichang.online/${params.category}/${params.slug}`
    }
  };

  if (post.updated) {
    jsonLd.dateModified = post.updated;
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: 'https://haiwaijichang.online/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryTitle,
        item: `https://haiwaijichang.online/${params.category}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://haiwaijichang.online/${params.category}/${params.slug}`
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      
      <ReadingProgress />

      <div className="bg-[#FAF9F6] min-h-screen pt-8 pb-20">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Area */}
          <div className="max-w-3xl mx-auto mb-10">
            {/* Breadcrumb */}
            <nav className="flex items-center flex-wrap gap-2 text-sm text-slate-500 mb-8">
              <Link href="/" className="hover:text-blue-600 transition-colors">首页</Link>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <Link href={`/${params.category}`} className="hover:text-blue-600 transition-colors">{categoryTitle}</Link>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className="text-slate-900 font-medium truncate">{post.title}</span>
            </nav>

            <Link href={`/${params.category}`} className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 mb-4 hover:underline">
              {categoryTitle}
            </Link>
            
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">
              {post.title}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-slate-500 py-4 border-y border-slate-200">
              <div className="flex items-center font-medium text-slate-900">
                <User className="w-4 h-4 mr-1.5 text-slate-400" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5 text-slate-400" />
                {post.date}
              </div>
              {post.updated && (
                <div className="flex items-center">
                  <RefreshCcw className="w-4 h-4 mr-1.5 text-slate-400" />
                  更新于 {post.updated}
                </div>
              )}
              {post.readingTime && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5 text-slate-400" />
                  约 {post.readingTime} 分钟阅读
                </div>
              )}
              <div className="ml-auto">
                <CopyLink />
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 mt-6">
                <Hash className="w-4 h-4 text-slate-400" />
                {post.tags.map(tag => (
                  <Link 
                    key={tag} 
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Cover Image */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="relative aspect-video sm:aspect-[2/1] rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200">
              <Image 
                src={post.coverImage || '/images/about-1.jpg'} 
                alt={post.coverAlt || post.title} 
                fill 
                className="object-cover" 
                priority 
              />
            </div>
            {post.coverAlt && (
              <p className="text-center text-sm text-slate-500 mt-4">{post.coverAlt}</p>
            )}
          </div>

          {/* Layout: Content + TOC */}
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">
            
            <main className="flex-1 min-w-0 max-w-3xl">
              <MobileTOC toc={toc} />
              
              {/* MDX Content */}
              <div className="prose prose-slate prose-lg max-w-none 
                prose-headings:text-slate-900 prose-headings:font-bold
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:border prose-img:border-slate-200"
              >
                <MDXRenderer source={post.content} />
              </div>

              {/* Related Brands */}
              {post.brands && post.brands.length > 0 && (
                <RelatedBrands brandIds={post.brands} />
              )}

              {/* Author Bio Box */}
              <div className="mt-16 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div className="w-16 h-16 shrink-0 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xl">
                  {post.author[0] || 'H'}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">关于作者：{post.author}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    专注整理海外网络、机场服务、Clash、工具与数字生活相关内容。欢迎关注海外志获取最新资讯。
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <ArticleNavigation prev={prev} next={next} />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200">
                <Link href="/articles" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回全部文章
                </Link>
                <Link href={`/${params.category}`} className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                  查看更多「{categoryTitle}」文章
                </Link>
              </div>

              {/* Related Posts */}
              <RelatedPosts posts={relatedPosts} />
            </main>

            {/* Desktop TOC Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <ArticleTOC toc={toc} />
            </aside>
            
          </div>
        </article>
      </div>
    </>
  );
}