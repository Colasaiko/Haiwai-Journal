const fs = require('fs');
const https = require('https');
const path = require('path');

const KEY = process.env.INDEXNOW_KEY;
const HOST = 'haiwaijichang.online';
const ENDPOINT = 'api.indexnow.org';

const isSubmit = process.argv.includes('--submit');

if (!KEY) {
  console.log('SKIPPED: INDEXNOW_KEY not configured');
  process.exit(0);
}

// verify key file exists in out/ or public/
const keyPathOut = path.join('out', `${KEY}.txt`);
const keyPathPublic = path.join('public', `${KEY}.txt`);

if (!fs.existsSync(keyPathOut) && !fs.existsSync(keyPathPublic)) {
  console.log('ERROR: IndexNow key file not found');
  process.exit(0); // Safely exit without submitting
}

const sitemapPath = path.join('out', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.log('SKIPPED: sitemap.xml not found');
  process.exit(0);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const urls = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

if (urls.length === 0) {
  console.log('No URLs found in sitemap');
  process.exit(0);
}

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: urls
});

console.log(`Prepared IndexNow payload with ${urls.length} URLs`);

if (!isSubmit) {
  console.log('DRY RUN READY');
  console.log('SUBMISSION CODE READY');
  process.exit(0);
}

const options = {
  hostname: ENDPOINT,
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  console.log(`IndexNow Response: ${res.statusCode}`);
  res.on('data', (d) => process.stdout.write(d));
});

req.on('error', (e) => {
  console.error(`IndexNow Error: ${e.message}`);
});

req.write(payload);
req.end();
