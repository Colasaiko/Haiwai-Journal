const fs = require('fs');
const path = require('path');
const htmlFiles = [];
function getFiles(dir, ext) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, ext);
    } else if (fullPath.endsWith(ext)) {
      htmlFiles.push(fullPath);
    }
  });
}
getFiles('out', '.html');
const allRoutes = new Set();
htmlFiles.forEach(f => {
  const p = f.replace(/\\/g, '/').replace(/^out\//, '/').replace(/\.html$/, '');
  allRoutes.add(p);
  allRoutes.add(p + '/');
  if (p.endsWith('/index')) {
    allRoutes.add(p.replace('/index', ''));
    allRoutes.add(p.replace('/index', '/'));
  }
});
allRoutes.add('/');
let c = 0;
htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const links = content.match(/href="([^"]+)"/g) || [];
  links.forEach(l => {
    const href = l.replace('href="', '').replace('"', '');
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/images') && !href.startsWith('/rss.xml') && !href.startsWith('/sitemap.xml') && !href.startsWith('/icon.png')) {
      const target = href.split('?')[0].split('#')[0];
      if (!allRoutes.has(target) && target !== '/') {
        c++;
        if (c < 10) console.log('Broken:', target, 'in', f);
      }
    }
  });
});
console.log('Total:', c);
