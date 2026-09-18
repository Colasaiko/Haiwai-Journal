import fs from 'fs';
import path from 'path';

export const metadata = {
  title: '2026 机场推荐与品牌对比榜单｜海外志',
  description: '全网最全的海外网络加速器（机场）对比。涵盖 IPLC、IEPL 专线，支持 Netflix 顶级解锁，最新可用推荐榜单。',
  alternates: { canonical: 'https://haiwaijichang.online/compare' }
};

export default function Compare() {
  const dataPath = path.join(process.cwd(), 'ordered_airports.json');
  let airports: { id: string, name: string, link: string, code: string, features: string[], pricingHeaders: string[], pricingRows: string[][] }[] = [];
  try {
    airports = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (e) {
    console.error("Failed to load airports", e);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">2026 机场推荐与品牌榜单</h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          经过我们长期的观察与合作，整理出了以下高速、稳定的海外网络加速服务。无论你是需要流媒体解锁，还是硬核研发需求，这里都能找到适合你的选择。
        </p>
      </div>

      <div className="space-y-12">
        {airports.map((airport, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden relative">
            
            {/* Top Bar / Rank */}
            <div className="bg-slate-50 border-b border-slate-100 px-4 sm:px-6 py-4 flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm shrink-0">
                  #{idx + 1}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 break-words">{airport.name}</h2>
              </div>
              {airport.link && airport.link !== '#' && (
                <a 
                  href={`/go/${airport.id}`} 
                  target="_blank" 
                  rel="noopener noreferrer nofollow"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2 rounded-lg font-medium transition-colors text-sm shrink-0 whitespace-nowrap"
                >
                  前往官网
                </a>
              )}
            </div>

            <div className="p-6 md:p-8 space-y-8">
              
              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">核心优势</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {airport.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start text-sm text-slate-600 leading-relaxed">
                      <svg className="w-5 h-5 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                
                {airport.code && !airport.code.includes('暂无优惠') && (
                  <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-lg inline-block">
                    <span className="text-sm font-medium text-orange-800 mr-2">专属优惠码：</span>
                    <code className="text-lg font-bold text-orange-600">{airport.code}</code>
                  </div>
                )}
              </div>

              {/* Pricing Table */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">套餐价格</h3>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm overflow-x-auto">
                  <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                      <tr>
                        {airport.pricingHeaders?.map((h, i) => (
                          <th key={i} className="px-5 py-3 font-medium tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {airport.pricingRows?.map((row, ridx) => (
                        <tr key={ridx} className="hover:bg-blue-50/50 transition-colors">
                          {row.map((cell, cidx) => (
                            <td key={cidx} className={`px-5 py-3 ${cidx === 0 ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}