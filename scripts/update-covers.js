const fs = require('fs');
const path = require('path');

const mapping = {
  'how-to-find-airport-promo-codes-and-trials.mdx': 'airport-2.jpg',
  'student-budget-airport-recommendations.mdx': 'airport-3.jpg',
  'established-old-airport-recommendations.mdx': 'airport-1.jpg',
  'what-is-airport-meaning.mdx': 'nav-airport-v2.jpg',
  'can-airports-be-used-for-gaming.mdx': 'network-4.jpg',
  'monthly-vs-yearly-airport-recommendations.mdx': 'airport-4.jpg',
  'pay-as-you-go-unlimited-airport-recommendations.mdx': 'airport-5.jpg',
  'dedicated-line-iplc-iepl-explained.mdx': 'network-1.jpg',
  'clash-airport-recommendations-2026.mdx': 'clash-1.jpg',
  'how-to-import-clash-subscription.mdx': 'nav-clash-v2.jpg',
  'clash-modes-explained.mdx': 'clash-2.jpg',
  'shadowrocket-airport-recommendations-2026.mdx': 'clash-3.jpg',
  'streaming-chatgpt-airport-recommendations.mdx': 'guides-1.jpg',
  'tiktok-airport-recommendations-and-native-ip.mdx': 'nav-guides-v2.jpg',
  'mac-clashx-surge-airport-recommendations.mdx': 'tools-1.jpg',
  'cn2-gia-bgp-routing-airport-recommendations.mdx': 'network-2.jpg',
  'quantumultx-surge-airport-recommendations.mdx': 'tools-2.jpg',
  'disney-plus-airport-recommendations-unlock.mdx': 'nav-tools-v2.jpg',
  'android-clash-v2rayng-airport-recommendations.mdx': 'nav-network-v2.jpg',
  'is-lower-latency-always-better.mdx': 'network-3.jpg',
  'understanding-node-multiplier.mdx': 'airport-2.jpg',
  'v2rayn-airport-recommendations-windows.mdx': 'clash-1.jpg',
  'apple-tv-router-airport-recommendations.mdx': 'network-4.jpg',
  'peak-hours-stable-airport-recommendations.mdx': 'airport-3.jpg',
  'native-ip-vs-broadcast-ip.mdx': 'network-1.jpg',
  'how-to-avoid-airport-runaway-scams.mdx': 'guides-1.jpg',
  'how-to-test-airport-speed.mdx': 'tools-2.jpg',
  'clash-subscription-update-failed.mdx': 'clash-2.jpg',
  'self-hosted-nodes-vs-buying-airport.mdx': 'nav-tools-v2.jpg',
  'how-to-read-speed-test-results.mdx': 'nav-guides-v2.jpg',
  'sing-box-hiddify-airport-recommendations.mdx': 'clash-3.jpg',
  'github-reddit-airport-recommendations.mdx': 'nav-airport-v2.jpg'
};

for (const [file, img] of Object.entries(mapping)) {
  const p = path.join('content/posts', file);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/coverImage: \/images\/[^\n]+/, `coverImage: /images/${img}`);
    fs.writeFileSync(p, content);
  }
}
