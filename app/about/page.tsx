export const metadata = {
  title: '关于海外志｜海外志',
  description: '关于海外志，这是一个围绕海外网络、机场、Clash、工具与数字生活经验做知识整理与内容记录的中文独立 Blog。',
  alternates: { canonical: 'https://haiwaijichang.online/about' }
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">关于海外志</h1>
      <div className="prose prose-lg text-slate-700">
        <p>海外志（Haiwai Journal）是一个围绕海外网络、机场、Clash、工具与数字生活经验做知识整理与内容记录的中文独立 Blog。</p>
        <p>在这个信息冗余的时代，我们希望用杂志感、编辑感的方式，提供干净、克制、有深度的阅读体验。我们相信，更好的网络可以让更多人更轻松地连接世界。</p>
        <p>我们坚持客观的内容记录，不提供虚假测速、不编造排行。希望能成为你探索数字生活的好帮手。</p>
      </div>
    </div>
  );
}