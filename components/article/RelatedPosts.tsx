import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/mdx';
import { getCategoryBySlug } from '@/lib/mdx';

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-slate-200">
      <h3 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-wide">相关文章</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(post => {
          let categoryName = post.category;
          try {
            categoryName = getCategoryBySlug(post.category).title;
          } catch {}

          return (
            <Link 
              key={post.slug} 
              href={`/${post.category}/${post.slug}`}
              className="group block"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-slate-100 mb-4">
                <Image
                  src={post.coverImage || '/images/about-1.jpg'}
                  alt={post.coverAlt || post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-400 mb-2">
                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{categoryName}</span>
                <span>{post.date}</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h4>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
