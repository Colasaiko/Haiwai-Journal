const fs = require('fs');
let c = fs.readFileSync('scripts/check-seo.js', 'utf8');
c = c.replace(
  "&& !href.startsWith('/images') && !href.startsWith('/rss.xml') && !href.startsWith('/sitemap.xml') && !href.startsWith('/icon.png')",
  "&& !href.startsWith('/images') && !href.startsWith('/rss.xml') && !href.startsWith('/sitemap.xml') && !href.startsWith('/icon.png') && !href.startsWith('/_next/') && !href.startsWith('/favicon') && !href.startsWith('/apple-touch-icon')"
);
fs.writeFileSync('scripts/check-seo.js', c);
