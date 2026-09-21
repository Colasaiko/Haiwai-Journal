const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

const targetStr1 = 'return (\n    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">';
const targetStr2 = 'return (\r\n    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">';

const repl = `const catMap: Record<string, string> = { "airport-observation": "机场测评", "network": "网络知识", "clash": "Clash 教程", "tools": "软件工具", "guides": "海外指南" };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <h1 className="text-3xl font-bold text-slate-900 px-4 md:px-0 mt-4 mb-2">海外志｜海外网络、机场测评与数字工具指南</h1>`;

c = c.replace(targetStr1, repl).replace(targetStr2, repl);

// I must fix the H2 link because the link href must use original raw category slug, not the Chinese mapping!!
// <Link href={`/${heroPost.category}/${heroPost.slug}`} 
// Oh wait! I replaced `{heroPost.category}` with `{catMap[heroPost.category] || heroPost.category}` which broke the URL!
// Let me revert URL replacements and only replace UI texts!

c = c.replace(/href=\{`\/\$\{catMap\[heroPost\.category\] \|\| heroPost\.category\}\/\$\{heroPost\.slug\}`\}/g, 'href={`/${heroPost.category}/${heroPost.slug}`}');
c = c.replace(/href=\{`\/\$\{catMap\[post\.category\] \|\| post\.category\}\/\$\{post\.slug\}`\}/g, 'href={`/${post.category}/${post.slug}`}');

fs.writeFileSync('app/page.tsx', c);
