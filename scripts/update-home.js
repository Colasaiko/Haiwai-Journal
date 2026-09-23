const fs = require('fs');

let code = fs.readFileSync('app/page.tsx', 'utf8');

if (!code.includes('canonical:')) {
  code = code.replace(
    'export const metadata: Metadata = {',
    'export const metadata: Metadata = { alternates: { canonical: "https://haiwaijichang.online/" },'
  );
}

const schemaStr = `
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '海外志',
    alternateName: 'HAIWAI JOURNAL',
    url: 'https://haiwaijichang.online/',
    inLanguage: 'zh-CN'
  };
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '海外志',
    url: 'https://haiwaijichang.online/'
  };
`;

if (!code.includes('websiteSchema')) {
  code = code.replace(
    'export default function Home() {',
    'export default function Home() {' + schemaStr
  );
}

if (!code.includes('application/ld+json')) {
  code = code.replace(
    '<div className="container mx-auto px-4 py-8 max-w-7xl">',
    '<div className="container mx-auto px-4 py-8 max-w-7xl">\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteSchema, orgSchema]) }} />'
  );
}

fs.writeFileSync('app/page.tsx', code);
console.log('Done app/page.tsx');
