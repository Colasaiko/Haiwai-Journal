const fs = require('fs');
const path = require('path');

function getFiles(dir, ext, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, ext, fileList);
    } else if (fullPath.endsWith(ext)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const htmlFiles = getFiles('out', '.html');
const allHtmlRoutes = new Set();
htmlFiles.forEach(f => {
  const p = f.replace(/\\/g, '/').replace(/^out\//, '/').replace(/\.html$/, '');
  allHtmlRoutes.add(p);
  allHtmlRoutes.add(p + '/');
  if (p.endsWith('/index')) {
    allHtmlRoutes.add(p.replace('/index', ''));
    allHtmlRoutes.add(p.replace('/index', '/'));
  }
});
allHtmlRoutes.add('/');

const metrics = {
  missingTitle: 0,
  duplicateTitle: 0,
  missingDescription: 0,
  duplicateDescription: 0,
  missingH1: 0,
  multipleH1: 0,
  missingCanonical: 0,
  invalidCanonical: 0,
  wrongDomainCanonical: 0,
  missingLang: 0,
  internalLinks: 0,
  brokenInternalLinks: 0,
  brandsUndefined: 0,
  brandArticleLinkErrors: 0,
  compareLinkErrors: 0,
  missingLocalImage: 0,
  emptyImageFiles: 0,
  missingAltMainImage: 0,
  schemaParseErrors: 0,
  fakeReviewRatingSchema: 0,
  blogPostingCount: 0,
  breadcrumbSchemaCount: 0
};

const titles = {};
const descriptions = {};

const validBrandSlugs = new Set(["weifeng", "feimao", "wuyou", "lingmao", "firefly", "kuajie", "shanyue", "kuaili", "xingdaomeng", "yinxingren", "baoyun", "jiuyun", "bianyuan", "weitu", "bitznet", "yifanyun", "tiziyun", "sujie", "jilian", "feiv", "u1s1", "wavenet", "guangnian", "kexin", "sogo", "lingdong", "muguang", "ermao", "phantom", "nanocloud", "guangsu"]);
const validBrandIds = new Set(["brand-1", "brand-2", "brand-3", "brand-4", "brand-5", "brand-6", "brand-7", "brand-8", "brand-9", "brand-10", "brand-11", "brand-12", "brand-13", "brand-14", "brand-15", "brand-16", "brand-17", "brand-18", "brand-19", "brand-20", "brand-21", "brand-22", "brand-23", "brand-24", "brand-25", "brand-26", "brand-27", "brand-28", "brand-29", "brand-30", "brand-31"]);

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Title
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/);
  if (!titleMatch) {
    metrics.missingTitle++;
  } else {
    const title = titleMatch[1];
    if (!file.includes('/go/') && !file.includes('\\go\\')) {
      titles[title] = (titles[title] || 0) + 1;
    }
  }

  // Description
  const descMatch = content.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/);
  if (!descMatch) {
    metrics.missingDescription++;
  } else {
    const desc = descMatch[1];
    if (!file.includes('/go/') && !file.includes('\\go\\')) {
      descriptions[desc] = (descriptions[desc] || 0) + 1;
    }
  }

  // H1
  const h1Matches = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/g);
  if (!h1Matches) {
    if (!file.includes('404')) {
      metrics.missingH1++;
    }
  } else if (h1Matches.length > 1) {
    metrics.multipleH1++;
  }

  // Canonical
  const canonicalMatch = content.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/);
  if (!canonicalMatch) {
    if (!file.includes('404') && !file.includes('/go/') && !file.includes('\\go\\')) {
      metrics.missingCanonical++;
    }
  } else {
    const canonical = canonicalMatch[1];
    if (!canonical.startsWith('https://haiwaijichang.online')) {
      metrics.wrongDomainCanonical++;
    }
    try {
      new URL(canonical);
    } catch {
      metrics.invalidCanonical++;
    }
  }

  // Lang
  if (!content.match(/<html[^>]*lang="[^"]*"/)) {
    metrics.missingLang++;
  }

  // Links
  const links = content.match(/href="([^"]+)"/g) || [];
  links.forEach(l => {
    const href = l.replace('href="', '').replace('"', '');
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/images') && !href.startsWith('/rss.xml') && !href.startsWith('/sitemap.xml') && !href.startsWith('/icon.png') && !href.startsWith('/_next/') && !href.startsWith('/favicon') && !href.startsWith('/apple-touch-icon')) {
      metrics.internalLinks++;
      let target = href.split('?')[0].split('#')[0];
      if (!allHtmlRoutes.has(target) && target !== '/') {
        metrics.brokenInternalLinks++;
        console.log(`Broken link: ${target} in ${file}`);
      }
      
      if (href.startsWith('/brands/')) {
        const slug = target.replace('/brands/', '');
        if (slug && !validBrandSlugs.has(slug)) {
          metrics.brandArticleLinkErrors++;
        }
      }
      if (href.startsWith('/compare?brands=')) {
        const idsStr = href.replace('/compare?brands=', '').split('#')[0];
        const ids = idsStr.split(',');
        ids.forEach(id => {
          if (!validBrandIds.has(id)) {
            metrics.compareLinkErrors++;
          }
        });
      }
    }
  });

  if (content.includes('/brands/undefined')) metrics.brandsUndefined++;
  
  // Images
  const imgRegex = /<img[^>]*>/g;
  let m;
  while ((m = imgRegex.exec(content)) !== null) {
    const imgTag = m[0];
    const srcMatch = imgTag.match(/src="([^"]+)"/);
    if (srcMatch) {
      let src = srcMatch[1].split('?')[0]; 
      if (!src.startsWith('/_next/') && src.startsWith('/')) { 
        const localPath = path.join(process.cwd(), 'out', src);
        if (!fs.existsSync(localPath)) {
          metrics.missingLocalImage++;
        } else {
          if (fs.statSync(localPath).size === 0) {
            metrics.emptyImageFiles++;
          }
        }
      }
    }
    
    // Check alt
    if (!imgTag.includes('alt=') || imgTag.includes('alt=""')) {
      if (!imgTag.includes('aria-hidden="true"') && !imgTag.includes('role="presentation"')) {
        metrics.missingAltMainImage++;
      }
    }
  }

  // Schema
  const schemaRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let sm;
  while ((sm = schemaRegex.exec(content)) !== null) {
    try {
      const obj = JSON.parse(sm[1]);
      const checkType = (type, str) => {
        if (Array.isArray(type)) return type.includes(str);
        return type === str;
      };
      if (obj['@type'] && checkType(obj['@type'], 'BlogPosting')) metrics.blogPostingCount++;
      if (obj['@type'] && checkType(obj['@type'], 'BreadcrumbList')) metrics.breadcrumbSchemaCount++;
      if (obj['@type'] && (checkType(obj['@type'], 'Review') || checkType(obj['@type'], 'AggregateRating'))) {
        metrics.fakeReviewRatingSchema++;
      }
    } catch (e) {
      metrics.schemaParseErrors++;
    }
  }
});

Object.values(titles).forEach(count => {
  if (count > 1) metrics.duplicateTitle += (count - 1);
});
Object.values(descriptions).forEach(count => {
  if (count > 1) metrics.duplicateDescription += (count - 1);
});

console.log(JSON.stringify(metrics, null, 2));

const failConditions = [
  'missingTitle', 'duplicateTitle', 'missingDescription', 'duplicateDescription',
  'missingH1', 'multipleH1', 'missingCanonical', 'invalidCanonical', 'wrongDomainCanonical',
  'missingLang', 'brokenInternalLinks', 'brandArticleLinkErrors', 'compareLinkErrors',
  'missingLocalImage', 'emptyImageFiles', 'schemaParseErrors', 'fakeReviewRatingSchema'
];

let failed = false;
failConditions.forEach(c => {
  if (metrics[c] > 0) {
    console.error(`HARD FAIL: ${c} = ${metrics[c]}`);
    failed = true;
  }
});

if (failed) {
  process.exitCode = 1;
} else {
  console.log('All Hard SEO checks passed!');
}
