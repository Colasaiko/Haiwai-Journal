import { getPostsByCategory, getAllCategories } from '@/lib/mdx';
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
    title: `${cat.title}｜海外志`,
    description: cat.description,
    alternates: {
      canonical: `https://haiwaijichang.online/${params.category}`,
    }
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
        <div className="prose prose-slate text-lg text-slate-600 max-w-3xl">
          <p>{cat.description}</p>
          <p>在这里，我们对相关知识进行了系统的整理与归类。你可以浏览下方按主题组织的深度文章，从基础概念到进阶技巧，构建属于你的网络知识图谱。</p>
        </div>
      </div>
      
      <div className="space-y-16">
        <div className="space-y-12">
          {posts.map(post => (
            <article key={post.slug} className="flex flex-col md:flex-row gap-8 group bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
               <Link href={`/${post.category}/${post.slug}`} className="md:w-1/3 relative h-56 md:h-auto overflow-hidden shrink-0 block rounded-lg">
                 <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
               </Link>
               <div className="md:w-2/3 flex flex-col justify-center py-2 pr-4">
                 <span className="text-xs text-slate-400 mb-2 font-medium tracking-wide">{post.date}</span>
                 <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug"><Link href={`/${post.category}/${post.slug}`}>{post.title}</Link></h2>
                 <p className="text-slate-600 mb-5 leading-relaxed line-clamp-3">{post.description}</p>
                 <Link href={`/${post.category}/${post.slug}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center uppercase tracking-wider mt-auto">
                    阅读全文 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </Link>
               </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
