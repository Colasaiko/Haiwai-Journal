import { getAllPosts } from '@/lib/mdx';
import { Feed } from 'feed';

export async function GET() {
  const posts = getAllPosts();
  const site_url = 'https://haiwaijichang.online';

  const feedOptions = {
    title: '海外志｜海外机场、网络知识与 Clash 使用指南',
    description: '探索更大的世界，从更好的网络开始。',
    id: site_url,
    link: site_url,
    language: 'zh-CN',
    favicon: `${site_url}/favicon.ico`,
    copyright: 'All rights reserved 2026, 海外志',
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
    },
  };

  const feed = new Feed(feedOptions);

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${site_url}/${post.category}/${post.slug}`,
      link: `${site_url}/${post.category}/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      author: [{ name: post.author }],
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
