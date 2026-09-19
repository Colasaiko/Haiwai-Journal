import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '推广与邀请链接说明｜海外志',
  description: '了解海外志网站中的推广链接、邀请链接、优惠码和可能存在的佣金或推荐奖励关系。',
  alternates: {
    canonical: 'https://haiwaijichang.online/disclosure',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function DisclosurePage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-8 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-10">
          <Link href="/" className="hover:text-blue-600 transition-colors">首页</Link>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <span className="text-slate-900 font-medium">推广与邀请链接说明</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">
            海外志推广与邀请链接说明
          </h1>
          <div className="prose prose-slate prose-lg text-slate-600">
            <p className="font-semibold text-slate-800">
              海外志部分文章、品牌页面与按钮，可能包含推广链接（Affiliate Link）或邀请链接（Referral Link）。如果用户通过这些链接注册、购买或订阅服务，海外志可能获得佣金、推荐奖励、返利或其他形式的奖励。
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:underline">
          
          <h2>关于最终价格</h2>
          <p>
            通过本站的邀请链接或专属推广链接进行购买，是否影响最终价格、享受优惠或权益，以服务商实际结算页面为准。
          </p>

          <h2>关于优惠码</h2>
          <p>
            站内展示的优惠码、邀请码、折扣和促销信息，可能存在有效期、适用套餐、最低消费、次数限制或地区限制。我们无法保证所有优惠码永久有效，最终请以服务商实际结算页面为准。
          </p>

          <h2>推广与编辑内容关系</h2>
          <p>
            推广关系可能给网站带来收入。同时，站内搜索和 PVP 品牌比较不应因为佣金金额直接决定搜索排序、Winner 归属或评分。
          </p>
          <p>
            海外志尽量把公开事实、编辑说明与推广关系区分展示，致力于为读者提供有价值的参考信息。
          </p>

          <h2>内容参考与潜在风险</h2>
          <p>
            品牌的网络质量、价格、稳定性、线路、可用性以及公司状态可能随时发生变化。本站内容仅用于信息整理与使用参考。
          </p>
          <p>
            在决定购买长期套餐或进行大额消费前，用户应自行确认该品牌的最新情况、短周期测试表现以及官方退款条款，理性评估使用风险。
          </p>

          <hr className="my-10 border-slate-200" />
          
          <p className="text-base text-slate-500">
            了解我们如何整理资料，请访问 <Link href="/methodology">内容与资料方法</Link>。<br />
            了解更多信息，请访问 <Link href="/about">关于我们</Link>。
          </p>
        </div>
      </div>
    </div>
  );
}
