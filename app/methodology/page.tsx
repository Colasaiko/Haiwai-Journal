import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '内容与资料方法｜海外志',
  description: '了解海外志如何整理机场品牌、套餐、网络知识与文章资料，以及品牌对比、搜索和内容关联所依据的原则。',
  alternates: {
    canonical: 'https://haiwaijichang.online/methodology',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function MethodologyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: '内容与资料方法',
    description: '了解海外志如何整理机场品牌、套餐、网络知识与文章资料，以及品牌对比、搜索和内容关联所依据的原则。',
    url: 'https://haiwaijichang.online/methodology',
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-8 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-10">
          <Link href="/" className="hover:text-blue-600 transition-colors">首页</Link>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <span className="text-slate-900 font-medium">内容与资料方法</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">
            海外志如何整理内容与品牌资料
          </h1>
          <div className="prose prose-slate prose-lg text-slate-600">
            <p>
              海外志整理的内容涉及网络概念、客户端教程、品牌公开信息、套餐资料、线路说明及工具使用。但这些信息来源和性质并不完全相同。本页用于解释资料来源、内容边界、对比方式、更新限制以及推广关系。
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:underline">
          
          <h2>我们整理什么</h2>
          <p>海外志关注并整理以下内容：</p>
          <ul>
            <li>机场品牌公开信息与套餐价格</li>
            <li>线路描述与客户端兼容信息</li>
            <li>网络基础知识与 Clash 等代理工具教程</li>
            <li>流媒体与 AI 工具相关网络知识</li>
            <li>海外数字工具相关内容</li>
          </ul>
          <p>
            我们是资料整理者与知识分享者，而非行业权威、官方机构。我们不声明任何品牌为“绝对第一名”或“最专业”。
          </p>

          <h2>资料从哪里来</h2>
          <p>我们的资料通常来源于：</p>
          <ul>
            <li>品牌公开页面与服务商公开套餐资料</li>
            <li>项目内部维护的品牌数据</li>
            <li>官方客户端文档与软件官方说明</li>
            <li>公开可验证的网络技术资料</li>
          </ul>

          <h2>公开资料 vs 实测</h2>
          <p>
            必须明确区分<strong>公开资料整理</strong>和<strong>实际测试</strong>。如果文章或页面没有明确标注为实测，我们不会把品牌宣传材料描述成海外志自己的实测结论。
          </p>
          <p>
            我们不虚构测速图、延迟数据、丢包率、在线率或服务器数量。所有的参数整理仅作功能性和预算参考。
          </p>

          <h2>品牌资料与更新时间</h2>
          <p>
            在 <Link href="/brands">品牌库 (/brands/)</Link> 中的资料来自当前维护的数据源，展示品牌名称、公开特色、套餐、价格、优惠码与功能标签。
          </p>
          <blockquote>
            <p className="font-medium text-slate-700">
              提示：价格、套餐、节点、域名和优惠活动可能随时变化，请以服务商实际页面为准。
            </p>
          </blockquote>
          <p>
            海外志会尽量维护现有资料，但部分品牌信息可能存在更新时间差。我们不保证提供实时同步、每天更新或自动监控服务。
          </p>

          <h2>品牌对比如何工作</h2>
          <p>
            <Link href="/compare">品牌对比 (/compare/)</Link> 工具主要把不同品牌的公开资料并列展示，包括套餐、价格、标签、公开功能与线路描述。
          </p>
          <p>
            <strong>重要：PVP 对比不是自动排行榜。</strong>我们不会生成总评分、宣布 Winner 或评选最佳品牌。用户应根据自身需求与预算自行判断。
          </p>

          <h2>站内搜索如何排序</h2>
          <p>
            <Link href="/search">站内搜索 (/search/)</Link> 纯粹根据关键词在标题、品牌名称、标签、Description 和正文中的匹配度进行相关性排序。
          </p>
          <p>推广佣金不作为站内搜索相关度权重。</p>

          <h2>相关文章推荐逻辑</h2>
          <p>
            文章页底部的相关文章主要依据以下条件进行计算与推荐：
          </p>
          <ul>
            <li>相同的关联品牌</li>
            <li>相同的 Tags</li>
            <li>相同的文章分类</li>
            <li>发布时间</li>
          </ul>
          <p>相关文章并非付费广告位，也不按品牌出价排序。</p>

          <h2>我们不会做什么</h2>
          <ul>
            <li>不伪造不存在的测速数据</li>
            <li>不虚构服务器数量、在线率或用户数量</li>
            <li>不伪造用户评价与虚假评分</li>
            <li>不因为佣金自动宣布 Winner</li>
            <li>不把品牌宣传语自动当作事实结论</li>
          </ul>

          <h2>资料可能过时怎么办</h2>
          <p>
            网络服务变化很快，价格、套餐、节点、域名、功能和优惠码随时可能调整。由于内容整理存在更新时差，用户在购买或使用前，应再次前往服务商当前官方页面查看最新动态。
          </p>

          <hr className="my-10 border-slate-200" />
          
          <p className="text-base text-slate-500">
            想了解更多关于我们的信息，请访问 <Link href="/about">关于我们</Link>。<br />
            了解关于佣金与推广链接的说明，请访问 <Link href="/disclosure">推广与邀请链接说明</Link>。
          </p>
        </div>
      </div>
    </div>
  );
}
