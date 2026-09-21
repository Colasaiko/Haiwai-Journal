import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '2026 梯子推荐与科学上网工具排行榜｜手机电脑翻墙软件精选',
  description: '整理 2026 年最新稳定好用的梯子推荐、翻墙工具与科学上网软件排行榜。无论您使用手机还是电脑，我们为您挑选最快、最稳定的梯子软件与机场节点。',
  alternates: {
    canonical: 'https://haiwaijichang.online/tizi',
  }
};

export default function TiziHubPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">2026 梯子推荐与科学上网工具排行榜</h1>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          寻找好用、稳定的科学上网梯子？我们为您整理了全平台（手机、电脑）最主流的梯子软件与翻墙节点推荐。拒绝跑路，只推荐真正靠谱的魔法上网工具。
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/compare" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            查看 2026 机场排行榜
          </Link>
          <Link href="/faq" className="bg-slate-100 text-slate-800 px-6 py-3 rounded-lg font-medium hover:bg-slate-200 transition">
            新手翻墙指南
          </Link>
        </div>
      </div>

      <div className="space-y-12">
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">电脑梯子软件推荐 (Windows & Mac)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Clash Verge / Meta</h3>
              <p className="text-slate-600 text-sm mb-4">目前 PC 端最强大、界面最现代的科学上网客户端。支持规则分流，自动更新订阅。</p>
              <Link href="/clash/clash-subscription-update-failed" className="text-blue-600 text-sm font-semibold hover:underline">查看教程 &rarr;</Link>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-xl font-bold text-blue-700 mb-2">v2rayN</h3>
              <p className="text-slate-600 text-sm mb-4">Windows 平台老牌梯子工具，占用极低，极客首选，支持 Xray/V2Ray 内核。</p>
              <Link href="/clash" className="text-blue-600 text-sm font-semibold hover:underline">查看教程 &rarr;</Link>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">手机梯子软件推荐 (iOS & Android)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Shadowrocket (小火箭)</h3>
              <p className="text-slate-600 text-sm mb-4">iOS 苹果端必装神器！界面简单，支持所有机场协议，一键扫码即可科学上网。</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Clash for Android</h3>
              <p className="text-slate-600 text-sm mb-4">安卓手机首选梯子工具，开源免费，完美支持代理规则和多节点测速自动切换。</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
