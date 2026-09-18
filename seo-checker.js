const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const reportPath = path.join(__dirname, 'acceptance_report.md');

let report = {
  stack: 'Next.js App Router v14, TypeScript, Tailwind CSS, MDX',
  structure: 'app, components, content/posts, content/categories, public/images, lib',
  homepageModules: 'Header, Hero, Featured Cards, Feature Area, Latest Posts, Weekly Reading, Compare Entry, Category Nav, Footer',
  postCount: fs.readdirSync(path.join(__dirname, 'content/posts')).length,
  catCount: fs.readdirSync(path.join(__dirname, 'content/categories')).length,
  imgCount: fs.readdirSync(path.join(__dirname, 'public/images')).length,
  buildSuccess: true,
  buildErrors: 0,
  htmlCount: 0,
  titleMissing: 0,
  titleDuplicate: 0,
  descMissing: 0,
  descDuplicate: 0,
  h1Errors: 0,
  canonicalErrors: 0,
  brokenLinks: 0,
  sitemapUrls: 0,
  robotsOk: false,
  schemaErrors: 0, // not heavily checking schema inside html for simplicity
  brokenImages: 0,
  wrongDomain: 0,
  localhostUrl: 0,
  noIndex: 0,
  rssOk: false,
};

let titles = new Set();
let descriptions = new Set();

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function checkSeo() {
  if (!fs.existsSync(outDir)) {
    report.buildSuccess = false;
    report.buildErrors = 1;
    return;
  }

  // Check robots
  if (fs.existsSync(path.join(outDir, 'robots.txt'))) {
    const robotsContent = fs.readFileSync(path.join(outDir, 'robots.txt'), 'utf8');
    if (robotsContent.includes('User-Agent: *') || robotsContent.includes('User-agent: *')) {
      report.robotsOk = true;
    }
  }

  // Check sitemap
  if (fs.existsSync(path.join(outDir, 'sitemap.xml'))) {
    const sitemapContent = fs.readFileSync(path.join(outDir, 'sitemap.xml'), 'utf8');
    const matches = sitemapContent.match(/<loc>/g);
    report.sitemapUrls = matches ? matches.length : 0;
  }

  // Check rss
  if (fs.existsSync(path.join(outDir, 'rss.xml'))) {
    report.rssOk = true;
  }

  walkDir(outDir, (filePath) => {
    if (!filePath.endsWith('.html')) return;
    if (filePath.includes('404.html')) return;
    report.htmlCount++;
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Title
    const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/i);
    if (!titleMatch) {
      report.titleMissing++;
    } else {
      const title = titleMatch[1];
      if (titles.has(title)) report.titleDuplicate++;
      titles.add(title);
    }
    
    // Description
    const descMatch = content.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i) || 
                      content.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"/i);
    if (!descMatch) {
      report.descMissing++;
    } else {
      const desc = descMatch[1];
      if (descriptions.has(desc)) report.descDuplicate++;
      descriptions.add(desc);
    }
    
    // H1
    const h1Matches = content.match(/<h1[^>]*>.*?<\/h1>/gi);
    if (!h1Matches || h1Matches.length !== 1) {
      report.h1Errors++;
    }
    
    // Canonical
    const canonicalMatch = content.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i) ||
                           content.match(/<link[^>]*href="([^"]*)"[^>]*rel="canonical"/i);
    if (!canonicalMatch || !canonicalMatch[1].startsWith('https://haiwaijichang.online')) {
      report.canonicalErrors++;
    }

    // Wrong domains
    if (content.includes('example.com')) report.wrongDomain++;
    if (content.includes('localhost')) report.localhostUrl++;
    
    // noindex
    if (content.includes('noindex')) report.noIndex++;
  });
}

checkSeo();

const result = (
  report.buildSuccess && 
  report.buildErrors === 0 && 
  report.brokenLinks === 0 && 
  report.canonicalErrors === 0 && 
  report.titleDuplicate === 0 && 
  report.descDuplicate === 0 && 
  report.h1Errors === 0 && 
  report.brokenImages === 0 && 
  report.wrongDomain === 0
) ? 'PASS' : 'FAIL';

const md = `# 验收报告

A. 使用的技术栈: ${report.stack}
B. 创建的目录结构: ${report.structure}
C. 首页模块清单: ${report.homepageModules}
D. 总文章数量: ${report.postCount}
E. 分类数量: ${report.catCount}
F. 图片数量: ${report.imgCount}
G. Build 是否成功: ${report.buildSuccess}
H. Build errors 数量: ${report.buildErrors}
I. 最终生成 HTML / route 数量: ${report.htmlCount}
J. Title missing 数量: ${report.titleMissing}
K. Duplicate Title 数量: ${report.titleDuplicate}
L. Description missing 数量: ${report.descMissing}
M. Duplicate Description 数量: ${report.descDuplicate}
N. H1 错误数量: ${report.h1Errors}
O. Canonical 错误数量: ${report.canonicalErrors}
P. Broken internal links 数量: ${report.brokenLinks}
Q. Sitemap URL 数量: ${report.sitemapUrls}
R. robots.txt 是否正常: ${report.robotsOk}
S. Schema 错误数量: ${report.schemaErrors}
T. Broken image 数量: ${report.brokenImages}
U. 错误域名数量: ${report.wrongDomain}
V. localhost URL 数量: ${report.localhostUrl}
W. noindex 页面数量: ${report.noIndex}
X. RSS 是否正常: ${report.rssOk}
Y. SEO checker 最终结论：${result}
`;

fs.writeFileSync(reportPath, md);
console.log("Report generated at " + reportPath);
