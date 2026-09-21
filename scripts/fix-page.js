const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

c = c.replace(/<div className="absolute top-4 left-4 z-20">\s*<h1 className="sr-only">[\s\S]*?<\/h1>\s*<\/div>/, '');

c = c.replace('return (\n    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">',
  'const catMap: Record<string, string> = { "airport-observation": "机场测评", "network": "网络知识", "clash": "Clash 教程", "tools": "软件工具", "guides": "海外指南" };\n\n  return (\n    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">\n      <h1 className="text-2xl font-bold text-slate-900 px-2 mt-2 mb-4">海外志｜海外网络、机场测评与数字工具指南</h1>');

c = c.replace(/\{post\.category\}/g, '{catMap[post.category] || post.category}');
c = c.replace(/\{heroPost\.category\}/g, '{catMap[heroPost.category] || heroPost.category}');

fs.writeFileSync('app/page.tsx', c);
