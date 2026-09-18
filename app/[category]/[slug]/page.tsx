import { getPostBySlug, getAllPosts } from '@/lib/mdx';
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
      title: `${post.title} - ${post.category}｜海外志`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        url: `https://haiwaijichang.online/${params.category}/${params.slug}`,
        type: 'article',
        images: [{ url: post.coverImage }],
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

  // Very basic Markdown parsing for the content (replace with next-mdx-remote for real usage)
  const renderMarkdown = (text: string) => {
    let html = text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^> [!TIP](.*$)/gim, '<blockquote class="border-l-4 border-blue-500 bg-blue-50 p-4 text-blue-800">$1</blockquote>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/^\* (.*$)/gim, '<li>$1</li>');
    
    // Wrap lis in ul
    html = html.replace(/(<li>[\s\S]*?<\/li>)/gim, '<ul>$1</ul>');
    
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
          <Link href={`/${post.category}`} className="hover:text-slate-900 uppercase tracking-wider text-xs font-semibold">{post.category}</Link>
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
}