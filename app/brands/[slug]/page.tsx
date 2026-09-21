import { getAllBrands, getBrandBySlug } from '@/lib/brands';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/mdx';
import { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const brands = getAllBrands();
  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const brand = getBrandBySlug(params.slug);
  if (!brand) return {};

  return {
    title: `${brand.name} 品牌档案与套餐资料｜海外志`,
    description: `查看 ${brand.name} 的线路特点、套餐价格、流媒体解锁支持及相关资料。海外志机场品牌档案库。`,
    alternates: {
      canonical: `https://haiwaijichang.online/brands/${params.slug}`,
    }
  };
}

export default function BrandProfilePage({ params }: Props) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) notFound();

  // Get related posts
  const relatedPosts = getAllPosts()
    .filter(post => post.brands?.includes(brand.id))
    .sort((a, b) => b.date.localeCompare(a.date));

  // "Who is this for?" generation logic based on tags
  let audience = "从公开资料看，该品牌提供基础的网络代理服务，适合进一步了解。";
  if (brand.tags.includes("IPLC") || brand.tags.includes("IEPL")) {
    if (brand.tags.includes("流媒体") && brand.tags.includes("不限设备")) {
      audience = "从公开资料看，该品牌配备高端物理专线，且不限制设备数量并支持流媒体解锁，可能更值得需要专线游戏、全家桶流媒体观影或多设备重度网络用户进一步了解。";
    } else {
      audience = "从公开资料看，该品牌配备低延迟的 IPLC/IEPL 专线，可能更值得对网络稳定性要求极高、或有外服游戏需求的用户进一步了解。";
    }
  } else if (brand.tags.includes("流媒体") || brand.tags.includes("原生 IP")) {
    audience = "从公开资料看，该品牌强调流媒体解锁与原生 IP 线路，可能更值得有 Netflix、Disney+ 追剧需求的用户进一步了解。";
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-8 flex space-x-2 items-center">
        <Link href="/" className="hover:text-slate-900">首页</Link>
        <span>/</span>
        <Link href="/brands" className="hover:text-slate-900">品牌库</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">{brand.name}</span>
      </nav>

      {/* Hero Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-3xl font-bold">
              {brand.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">{brand.name}</h1>
              <p className="text-slate-500 text-sm font-medium">海外志品牌资料档案</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {brand.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/compare?brands=${brand.id}`} className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-lg text-center hover:bg-slate-50 hover:border-slate-300 transition-all">
            加入对比
          </Link>
          <Link href={`/go/${brand.id}`} target="_blank" rel="nofollow noopener" className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg text-center hover:bg-slate-800 transition-all shadow-sm">
            访问官网
          </Link>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-right mb-8">
        注：部分外部链接可能包含推广或邀请参数。套餐与活动可能随品牌调整，请以品牌官方页面为准。
      </p>

      {/* Grid Layout for Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        
        {/* Left Column (Overview & Audience) */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">品牌概览</h2>
            <ul className="space-y-3">
              {brand.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-slate-600 leading-relaxed">
                  <span className="text-blue-500 mr-2 mt-0.5">•</span>
                  <span>{feature.replace(/^[✔✅]\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-2">资料研判：适合谁？</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {audience}
            </p>
          </section>
        </div>

        {/* Right Column (Summary & Promo) */}
        <div className="space-y-6">
          <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">价格与套餐摘要</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">提供套餐数量</span>
                <span className="font-bold text-slate-900">{brand.pricingSummary.planCount} 个</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">资料最低月付</span>
                <span className="font-bold text-slate-900">{brand.pricingSummary.minMonthly || '暂无'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">资料最低年付</span>
                <span className="font-bold text-slate-900">{brand.pricingSummary.minYearly || '暂无'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">一次性套餐</span>
                <span className="font-bold text-slate-900">{brand.pricingSummary.hasOneTime ? '有提供' : '无'}</span>
              </div>
            </div>
          </section>

          <section className="bg-orange-50 rounded-xl border border-orange-100 p-6">
            <h2 className="text-sm font-bold text-orange-800 mb-2">公开优惠资料</h2>
            {brand.code && !brand.code.includes('暂无优惠') && !brand.code.includes('无') ? (
              <div className="text-orange-900 font-mono font-bold bg-white px-3 py-2 rounded border border-orange-200 mt-2 text-center">
                {brand.code}
              </div>
            ) : (
              <p className="text-orange-600 text-sm mt-2">暂无优惠码资料</p>
            )}
          </section>
        </div>

      </div>

      {/* Pricing Table Section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">详细套餐资料</h2>
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-200">
                {brand.pricingHeaders.map((header, idx) => (
                  <th key={idx} className="py-3 px-4 text-sm font-bold text-slate-700">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {brand.pricingRows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className={`py-3 px-4 text-sm ${cellIdx === 0 ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="pt-8 border-t border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-6">品牌相关文章</h2>
        {relatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map(post => (
              <Link key={post.slug} href={`/${post.category}/${post.slug}`} className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all">
                {post.coverImage && (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{post.category === 'airport-observation' ? '机场观察' : post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {post.description}
                  </p>
                  <div className="text-sm font-semibold text-slate-900 flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    阅读文章 <span className="text-blue-600">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 rounded-xl p-8 text-center border border-slate-100">
            <p className="text-slate-500">海外志暂时还没有这个品牌的专题文章。</p>
          </div>
        )}
      </section>

    </div>
  );
}
