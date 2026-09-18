import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '便宜机场推荐 2026｜高性价比、一元试用、按量计费低价机场排行',
  description: '整理 2026 年最新高性价比便宜机场推荐，涵盖按量计费（不限时流量包）、一元试用、月付低价等平价科学上网方案，学生党和轻度用户首选。',
  alternates: {
    canonical: 'https://haiwaijichang.online/cheap',
  }
};

export default function CheapHubPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">高性价比与便宜机场推荐指南</h1>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          预算有限？用量不大？为您精选 2026 年最划算的低价机场、按量计费套餐和支持一元免费试用的靠谱品牌，让每一分钱都花在刀刃上。
        </p>
      </div>

      <div className="space-y-12">
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">按量计费机场推荐 (不限时流量包)</h2>
          <p className="text-slate-600 mb-6">
            如果您只是偶尔查资料、用 ChatGPT，每个月连 10G 都用不到，那么传统的“月付套餐”非常浪费。**按量计费（不限时套餐）**买一次流量（如 50G/50元），没有过期时间，用完为止，极具性价比！
          </p>
          <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
            <h3 className="text-lg font-bold text-amber-900 mb-2">如何挑选？</h3>
            <p className="text-amber-800 text-sm">前往 <Link href="/compare" className="font-bold underline hover:text-amber-600">品牌对比中心</Link>，在价格表中查看最后一列 <strong>“一次性”</strong>，只要有明确标价的，即代表该机场提供极其划算的不限时流量包！</p>
          </div>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">便宜稳定机场推荐 (学生党首选)</h2>
          <p className="text-slate-600 mb-6">
            “便宜”不等于“垃圾”。市面上有很多月付在 10~15 元左右，但依然提供直连或优质中转线路的平价机场，非常适合日常刷推、看网页的学生党。
          </p>
          <ul className="list-disc list-inside space-y-3 text-slate-700">
            <li><strong>避坑指南 1</strong>：千万不要买“1元1000G”的极度低价机场，99% 会在两个月内卷款跑路。</li>
            <li><strong>避坑指南 2</strong>：便宜机场晚高峰（晚上8-11点）卡顿是正常现象，如果不接受，请加钱购买 IPLC 专线。</li>
            <li><strong>机场优惠码</strong>：很多中高端机场在节假日（如双十一、黑五）会放出 5-7 折优惠码，折算下来年付价格可以与便宜机场媲美，且质量更高！</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
