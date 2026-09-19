import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-20 border-t-4 border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-1">海外志</h2>
          <p className="text-xs text-slate-500 tracking-widest uppercase mb-4">Haiwai Journal</p>
          <p className="text-sm leading-relaxed text-slate-400">海外志是一个围绕海外网络、机场服务、Clash、网络工具与数字生活经验整理内容的独立中文 Blog。我们相信，更好的网络可以让更多人更轻松地连接世界。</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-white font-semibold mb-4">网站导航</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">首页</Link></li>
              <li><Link href="/articles" className="hover:text-white transition-colors">全部文章</Link></li>
              <li><Link href="/airport-observation" className="hover:text-white transition-colors">机场观察</Link></li>
              <li><Link href="/network" className="hover:text-white transition-colors">网络知识</Link></li>
              <li><Link href="/clash" className="hover:text-white transition-colors">Clash 教程</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">&nbsp;</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools" className="hover:text-white transition-colors">软件工具</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">海外指南</Link></li>
              <li><Link href="/brands" className="hover:text-white transition-colors">品牌库</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">品牌对比</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ 常见问题</Link></li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">关于海外志</h3>
          <ul className="space-y-2 text-sm mb-6">
            <li><Link href="/start-here" className="hover:text-white transition-colors">从这里开始</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">关于我们</Link></li>
            <li><Link href="/methodology" className="hover:text-white transition-colors">内容与资料方法</Link></li>
            <li><Link href="/disclosure" className="hover:text-white transition-colors">推广说明</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">隐私政策</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">使用条款</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link></li>
            <li><Link href="/rss.xml" className="hover:text-white transition-colors">RSS 订阅</Link></li>
          </ul>
          <div className="flex">
            <input type="email" placeholder="输入邮箱订阅更新" className="bg-slate-800 border-none text-sm px-4 py-2 w-full text-white placeholder-slate-500 focus:ring-1 focus:ring-slate-500 outline-none" />
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm transition-colors">订阅</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
        &copy; 2026 海外志 / haiwaijichang.online. All rights reserved.
      </div>
    </footer>
  );
}