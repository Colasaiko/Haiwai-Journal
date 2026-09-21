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

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Title
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/);
  if (!titleMatch) {
    metrics.missingTitle++;
  } else {
    const title = titleMatch[1];
    titles[title] = (titles[title] || 0) + 1;
  }

  // Description
  const descMatch = content.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/);
  if (!descMatch) {
    metrics.missingDescription++;
  } else {
    const desc = descMatch[1];
    descriptions[desc] = (descriptions[desc] || 0) + 1;
  }

  // H1
  const h1Matches = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/g);
  if (!h1Matches) {
    if (!file.includes('404')) {
      // 404 is allowed to not have h1 depending on design, but let's count it anyway
      metrics.missingH1++;
    }
  } else if (h1Matches.length > 1) {
    metrics.multipleH1++;
  }

  // Canonical
  const canonicalMatch = content.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/);
  if (!canonicalMatch) {
    if (!file.includes('404')) metrics.missingCanonical++;
  } else {
    const canonical = canonicalMatch[1];
    if (!canonical.startsWith('https://haiwaijichang.online')) {
      metrics.wrongDomainCanonical++;
    }
  }

  // Lang
  if (!content.match(/<html[^>]*lang="[^"]*"/)) {
    metrics.missingLang++;
  }

  // Links
  const links = content.match(/href="\/[^"]*"/g) || [];
  metrics.internalLinks += links.length;

  if (content.includes('/brands/undefined')) metrics.brandsUndefined++;

  // Schema
  if (content.includes('"@type":"BlogPosting"') || content.includes('"@type": "BlogPosting"')) metrics.blogPostingCount++;
  if (content.includes('"@type":"BreadcrumbList"') || content.includes('"@type": "BreadcrumbList"')) metrics.breadcrumbSchemaCount++;
  if (content.includes('"@type":"Review"') || content.includes('"@type":"AggregateRating"')) {
    metrics.fakeReviewRatingSchema++;
  }
});

Object.values(titles).forEach(count => {
  if (count > 1) metrics.duplicateTitle += (count - 1);
});
Object.values(descriptions).forEach(count => {
  if (count > 1) metrics.duplicateDescription += (count - 1);
});

console.log(JSON.stringify(metrics, null, 2));
