'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  slug: string;
  tags: string[];
}

interface PostMeta {
  title: string;
  slug: string;
  description: string;
  date: string;
  coverImage: string;
  brands: string[];
}

interface Props {
  brands: Brand[];
  posts: PostMeta[];
}

function getPostPriority(slug: string) {
  if (slug.includes('review') || slug.includes('airport-guide')) return 1;
  if (slug.includes('how-to-use')) return 2;
  if (slug.includes('subscription')) return 3;
  if (slug.includes('plans-pricing')) return 4;
  if (slug.includes('troubleshooting')) return 5;
  if (slug.includes('nodes-routes')) return 6;
  if (slug.includes('website-account')) return 7;
  return 99;
}

export default function AirportObservationClient({ brands, posts }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('全部');
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);

  // Extract all unique tags from brands
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    brands.forEach(b => {
      b.tags?.forEach(t => tags.add(t));
    });
    return ['全部', ...Array.from(tags)];
  }, [brands]);

  // Filter brands based on search and tag
  const filteredBrands = useMemo(() => {
    return brands.filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            brand.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === '全部' || (brand.tags && brand.tags.includes(selectedTag));
      return matchesSearch && matchesTag;
    });
  }, [brands, searchQuery, selectedTag]);

  // Map posts to brands
  const brandPostsMap = useMemo(() => {
    const map: Record<string, PostMeta[]> = {};
    brands.forEach(b => {
      map[b.id] = posts.filter(p => 
        p.brands.includes(b.id) || p.brands.includes(b.slug) || p.brands.includes(b.name)
      ).sort((a, b) => getPostPriority(a.slug) - getPostPriority(b.slug));
    });
    return map;
  }, [brands, posts]);

  // Non-brand posts (Topics & Guides)
  const nonBrandPosts = useMemo(() => {
    return posts.filter(p => !p.brands || p.brands.length === 0)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [posts]);

  // Recent posts across all (for recent section)
  const recentPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 8);
  }, [posts]);

  // Count total brand posts
  const totalBrandPostsCount = useMemo(() => {
    return posts.filter(p => p.brands && p.brands.length > 0).length;
  }, [posts]);

  const toggleBrand = (brandId: string) => {
    setExpandedBrand(prev => prev === brandId ? null : brandId);
  };

  return (
    <div className="space-y-12">
      {/* Stats & Controls */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground bg-secondary/30 p-4 rounded-xl">
          <div>
            已收录 <strong className="text-foreground">{brands.length}</strong> 个机场品牌与 <strong className="text-foreground">{totalBrandPostsCount}</strong> 篇品牌相关文章
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="搜索品牌..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="搜索品牌"
            />
          </div>
          <div className="flex flex-wrap gap-2 w-full">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTag === tag 
                    ? 'bg-primary text-primary-foreground font-medium' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Catalog */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          品牌目录
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBrands.map(brand => {
            const bPosts = brandPostsMap[brand.id] || [];
            const isExpanded = expandedBrand === brand.id;
            
            return (
              <div key={brand.id} className="border rounded-xl bg-card overflow-hidden transition-all duration-200 hover:shadow-md">
                <div 
                  className="p-5 cursor-pointer flex flex-col h-full"
                  onClick={() => toggleBrand(brand.id)}
                  onKeyDown={(e) => e.key === 'Enter' && toggleBrand(brand.id)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold">{brand.name}</h3>
                    <div className="text-muted-foreground">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {brand.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-secondary/60 text-secondary-foreground px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t flex justify-between items-center text-sm">
                    <span className="font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                      {bPosts.length} 篇相关内容
                    </span>
                    <Link 
                      href={`/brands/${brand.slug}`}
                      className="text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      品牌资料 <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Expanded Articles List */}
                {isExpanded && (
                  <div className="bg-secondary/20 border-t px-4 py-3 max-h-96 overflow-y-auto">
                    {bPosts.length > 0 ? (
                      <ul className="space-y-2">
                        {bPosts.map(post => (
                          <li key={post.slug}>
                            <Link 
                              href={`/airport-observation/${post.slug}`}
                              className="text-sm block py-1.5 px-2 rounded hover:bg-secondary/50 hover:text-primary transition-colors truncate"
                              title={post.title}
                            >
                              {post.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-muted-foreground text-center py-4">
                        暂无相关文章
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {filteredBrands.length === 0 && (
          <div className="text-center py-12 text-muted-foreground border rounded-xl border-dashed">
            没有找到匹配的品牌
          </div>
        )}
      </section>

      {/* Non-Brand Topics & Guides */}
      {nonBrandPosts.length > 0 && (
        <section className="pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">机场专题与选购指南</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nonBrandPosts.map(post => (
              <Link key={post.slug} href={`/airport-observation/${post.slug}`} className="group block h-full">
                <article className="border rounded-xl bg-card overflow-hidden h-full flex flex-col transition-all hover:shadow-md hover:border-primary/30">
                  <div className="relative w-full aspect-video overflow-hidden bg-muted">
                    {post.coverImage ? (
                      <Image 
                        src={post.coverImage} 
                        alt={post.title} 
                        fill 
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        暂无封面
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="text-xs text-muted-foreground mb-2">
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('zh-CN')}</time>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mt-auto">
                      {post.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent Updates */}
      <section className="pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6">最近更新</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentPosts.map(post => (
            <Link key={post.slug} href={`/airport-observation/${post.slug}`} className="block">
              <div className="flex gap-4 p-4 border rounded-xl hover:bg-secondary/30 transition-colors h-full items-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  {post.coverImage && (
                    <Image 
                      src={post.coverImage} 
                      alt={post.title} 
                      fill 
                      className="object-cover"
                      sizes="96px"
                    />
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-base sm:text-lg font-bold mb-1 truncate group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.description}
                  </p>
                  <div className="text-xs text-muted-foreground mt-2">
                    {new Date(post.date).toLocaleDateString('zh-CN')}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
