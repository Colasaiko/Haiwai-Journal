const fs = require('fs');
const path = require('path');

const brokenLinks = [
  '/posts/streaming-unlock-troubleshooting',
  '/posts/proxy-protocols-comparison',
  '/posts/advanced-routing-rules-guide',
  '/posts/feimao-subscription-setup',
  '/airport-observation/transit-vs-direct-lines',
  '/airport-observation/streaming-unlock-guide',
  '/airport-observation/how-to-choose-airport',
  '/posts/feimao-subscription-guide',
  '/posts/airport-tun-mode-guide',
  '/posts/how-to-choose-best-proxy-nodes',
  '/streaming/netflix-unlock-guide/',
  '/tutorial/openwrt-passwall/',
  '/tutorial/clash-rules-guide/',
  '/airport-observation/how-to-speedtest/',
  '/tutorial/clash-windows-setup/',
  '/posts/iplc-vs-iepl-guide',
  '/posts/home-network-proxy-setup',
  '/posts/airport-purchase-anti-fraud-guide',
  '/posts/all-platform-clients-guide',
  '/posts/weifeng-latest-url',
  '/posts/ios-proxy-clients-guide',
  '/posts/best-windows-proxy-clients',
  '/posts/clash-shadowrocket-basic-guide',
  '/posts/airport-node-speed-test-guide',
  '/posts/dns-pollution-solutions',
  '/posts/tun-vs-system-proxy',
  '/posts/weifeng-nodes-speed-test-guide',
  '/posts/weifeng-troubleshooting-setup-guide',
  '/clash/clash-yaml-config-guide',
  '/clash/clash-node-timeout-fix',
  '/clash/clash-verge-rev-tutorial',
  '/network/proxy-protocols-guide',
  '/network/transparent-proxy-gateway',
  '/network/developer-proxy-setup',
  '/network/how-to-write-proxy-rules',
  '/category/ai-services-region-account-guide',
  '/category/node-selection-speed-test',
  '/category/proxy-tools-basic-guide',
  '/category/network-connectivity-troubleshooting',
  '/network/what-is-tun-mode',
  '/network/windows-network-fix-guide',
  '/network/uwp-loopback-exemption',
  '/network/what-is-proxy-node-routing',
  '/network/ipv6-impact-on-proxy',
  '/security/dns-leak-prevention',
  '/client/how-to-choose-proxy-client',
  '/troubleshooting/airport-connection-timeout'
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.mdx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      brokenLinks.forEach(link => {
        // Find markdown links with this exact URL: [text](/link)
        // Note: some might not have trailing slash, so handle that
        const regex1 = new RegExp(`\\]\\(${link.replace(/\//g, '\\\\/')}\\/?\\)`, 'g');
        const regex2 = new RegExp(`href=["']${link.replace(/\//g, '\\\\/')}\\/?["']`, 'g');
        
        if (content.match(regex1) || content.match(regex2)) {
          // Just point it back to /airport-observation or /network depending on context
          let replacementUrl = '/airport-observation';
          if (link.includes('network') || link.includes('proxy')) replacementUrl = '/network';
          if (link.includes('clash')) replacementUrl = '/clash';
          
          content = content.replace(regex1, `](${replacementUrl})`);
          content = content.replace(regex2, `href="${replacementUrl}"`);
          changed = true;
        }
      });
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Fixed links in ${fullPath}`);
      }
    }
  }
}

processDir('content/posts');
