import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: '机场与科学上网 FAQ：新手防坑、流媒体解锁与节点配置知识库',
  description: '汇集了 150+ 关于翻墙机场、代理节点、Clash/Shadowrocket 配置、流媒体解锁的常见问题解答。无论是新手入门还是进阶问题排查，这里都有详细答案。',
  alternates: {
    canonical: 'https://haiwaijichang.online/faq',
  }
};

export default function FaqPage() {
  const dataPath = path.join(process.cwd(), 'data', 'faq.json');
  let faqData: { category: string, questions: { q: string, a: string }[] }[] = [];
  try {
    faqData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (e) {
    console.error("Failed to load faq.json", e);
  }

  // Generate structured data for Google FAQPage
  const mainEntity = [];
  for (const cat of faqData) {
    for (const q of cat.questions) {
      mainEntity.push({
        "@type": "Question",
        "name": q.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.a
        }
      });
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainEntity
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqClient data={faqData} />
    </div>
  );
}
