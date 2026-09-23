const fs = require('fs');
const path = require('path');

function getFiles(dir, ext, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
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

const sitemapPath = path.join('out', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error("sitemap.xml not found in out/");
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const urlsInSitemap = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].replace(/\/$/, ''));

let duplicateSitemapUrl = 0;
const urlSet = new Set();
urlsInSitemap.forEach(u => {
  if (urlSet.has(u)) duplicateSitemapUrl++;
  urlSet.add(u);
});

const htmlFiles = getFiles('out', '.html');
let missingFromSitemap = 0;
let noindexInSitemap = 0;
let invalidSitemapUrl = 0;
let missingRequiredNoindex = 0;
let accidentalNoindex = 0;

htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let p = f.replace(/\\/g, '/').replace(/^out/, '').replace(/\.html$/, '');
  if (p.endsWith('/index')) p = p.replace('/index', '');
  if (p === '') p = '/';
  
  const fullUrl = ('https://haiwaijichang.online' + p).replace(/\/$/, '');
  
  const isNoindex = content.includes('content="noindex') || content.includes('name="robots" content="noindex');
  
  const isRequiredNoindexRoute = p.startsWith('/search') || p.startsWith('/site-check') || p.startsWith('/go/');
  const is404 = p === '/404';

  if (isRequiredNoindexRoute) {
    if (!isNoindex) {
      missingRequiredNoindex++;
      console.error(`HARD FAIL: Missing noindex on required route: ${p}`);
    }
  } else if (!is404) {
    // Normal route
    if (isNoindex) {
      accidentalNoindex++;
      console.error(`HARD FAIL: Accidental noindex on indexable route: ${p}`);
    }
  }

  if (isNoindex) {
    if (urlSet.has(fullUrl) || urlSet.has(fullUrl + '/')) {
      noindexInSitemap++;
      console.error(`Noindex URL in sitemap: ${fullUrl}`);
    }
  } else {
    if (!is404 && !urlSet.has(fullUrl) && !urlSet.has(fullUrl + '/')) {
      missingFromSitemap++;
      console.error(`Indexable URL missing from sitemap: ${fullUrl}`);
    }
  }
});

// Check if URLs in sitemap actually exist in out
urlsInSitemap.forEach(u => {
  const p = u.replace('https://haiwaijichang.online', '');
  let expectedFile = path.join('out', p + '.html');
  if (p === '' || p === '/') expectedFile = path.join('out', 'index.html');
  
  let expectedIndexFile = path.join('out', p, 'index.html');
  
  if (!fs.existsSync(expectedFile) && !fs.existsSync(expectedIndexFile)) {
    invalidSitemapUrl++;
    console.error(`Sitemap URL does not correspond to an HTML file: ${u}`);
  }
});

console.log({
  duplicateSitemapUrl,
  missingFromSitemap,
  noindexInSitemap,
  invalidSitemapUrl,
  missingRequiredNoindex,
  accidentalNoindex
});

if (duplicateSitemapUrl > 0 || missingFromSitemap > 0 || noindexInSitemap > 0 || invalidSitemapUrl > 0 || missingRequiredNoindex > 0 || accidentalNoindex > 0) {
  process.exitCode = 1;
} else {
  console.log("Sitemap checks passed!");
}
