const fs = require('fs');

let code = fs.readFileSync('app/brands/[slug]/page.tsx', 'utf8');

if (!code.includes('openGraph:')) {
  code = code.replace(
    'alternates: {',
    `openGraph: {
      title: \`\${brand.name} 品牌档案与套餐资料｜海外志\`,
      description: \`查看 \${brand.name} 的线路特点、套餐价格、流媒体解锁支持及相关资料。\`,
      url: \`https://haiwaijichang.online/brands/\${params.slug}\`,
      type: 'website',
      images: [{ url: '/images/anime_desk.jpg' }]
    },
    twitter: {
      card: 'summary_large_image',
      title: \`\${brand.name} 品牌档案与套餐资料｜海外志\`,
      description: \`查看 \${brand.name} 的线路特点、套餐价格、流媒体解锁支持及相关资料。\`,
      images: ['/images/anime_desk.jpg']
    },
    alternates: {`
  );
  fs.writeFileSync('app/brands/[slug]/page.tsx', code);
}
console.log('Done brands slug page');
