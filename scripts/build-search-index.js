const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Helpers for brand tag/pricing logic (mimicking lib/brands.ts)
function extractFeatures(htmlStr) {
  if (!htmlStr) return [];
  const regex = /<li[^>]*>([\s\S]*?)<\/li>/g;
  const features = [];
  let match;
  while ((match = regex.exec(htmlStr)) !== null) {
    let text = match[1].replace(/<[^>]+>/g, '').trim();
    if (text) features.push(text);
  }
  return features;
}

function extractTags(features) {
  const tags = [];
  const text = features.join(' ').toLowerCase();
  if (text.includes('iplc') || text.includes('专线')) tags.push('IPLC');
  if (text.includes('iepl')) tags.push('IEPL');
  if (text.includes('原生')) tags.push('原生 IP');
  if (text.includes('解锁') || text.includes('流媒体')) tags.push('流媒体');
  if (text.includes('chatgpt') || text.includes('ai')) tags.push('AI 解锁');
  if (text.includes('不限')) tags.push('不限设备');
  return tags;
}

function extractPricing(pricingHtml) {
  if (!pricingHtml) return { planCount: 0, minMonthly: '', minYearly: '', hasOneTime: false };
  const rowRegex = /<tr>([\s\S]*?)<\/tr>/g;
  const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/g;
  let rowMatch;
  let planCount = 0;
  let minMonthly = Infinity;
  let minYearly = Infinity;
  let hasOneTime = false;
  
  while ((rowMatch = rowRegex.exec(pricingHtml)) !== null) {
    const rowHtml = rowMatch[1];
    if (rowHtml.includes('<th>') || rowHtml.includes('<th ')) continue;
    
    const cells = [];
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowHtml)) !== null) {
      cells.push(cellMatch[1].replace(/<[^>]+>/g, '').trim());
    }
    
    if (cells.length >= 3) {
      planCount++;
      const duration = cells[1].toLowerCase();
      const priceStr = cells[2];
      const match = priceStr.match(/[\d.]+/);
      const price = match ? parseFloat(match[0]) : null;
      
      if (price !== null) {
        if ((duration.includes('月') || duration.includes('month')) && !duration.includes('季')) {
          if (price < minMonthly) minMonthly = price;
        } else if (duration.includes('年') || duration.includes('year')) {
          if (price < minYearly) minYearly = price;
        } else if (duration.includes('永久') || duration.includes('一次性') || duration.includes('不限时')) {
          hasOneTime = true;
        }
      }
    }
  }
  
  return {
    planCount,
    minMonthly: minMonthly !== Infinity ? `¥${minMonthly}` : '',
    minYearly: minYearly !== Infinity ? `¥${minYearly}` : '',
    hasOneTime
  };
}

function buildIndex() {
  const searchIndex = [];

  // 1. Posts
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir);
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
        const { data, content } = matter(raw);
        const cleanContent = content.replace(/!\[.*?\]\(.*?\)/g, '')
                                    .replace(/\[.*?\]\(.*?\)/g, '')
                                    .replace(/<[^>]*>?/gm, '')
                                    .replace(/#/g, '')
                                    .replace(/\n+/g, ' ')
                                    .substring(0, 500); 
        
        searchIndex.push({
          id: file.replace('.mdx', ''),
          type: 'article',
          title: data.title || '',
          description: data.description || '',
          url: `/${data.category}/${file.replace('.mdx', '')}`,
          category: data.category || '',
          tags: [],
          keywords: data.keywords ? data.keywords.split(',').map(k => k.trim()) : [],
          content: cleanContent,
          date: data.date ? new Date(data.date).toISOString().split('T')[0] : ''
        });
      }
    }
  }

  // 2. Categories
  const catDir = path.join(process.cwd(), 'content', 'categories');
  if (fs.existsSync(catDir)) {
    const files = fs.readdirSync(catDir);
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const raw = fs.readFileSync(path.join(catDir, file), 'utf8');
        const { data } = matter(raw);
        searchIndex.push({
          id: file.replace('.mdx', ''),
          type: 'category',
          title: data.name || '',
          description: data.description || '',
          url: `/${file.replace('.mdx', '')}`,
          category: '',
          tags: [],
          keywords: [],
          content: ''
        });
      }
    }
  }

  // 3. Brands
  const brandsFile = path.join(process.cwd(), 'ordered_airports.json');
  if (fs.existsSync(brandsFile)) {
    const raw = fs.readFileSync(brandsFile, 'utf8');
    const brands = JSON.parse(raw);
    for (const b of brands) {
      const features = extractFeatures(b.features);
      const tags = extractTags(features);
      const pricing = extractPricing(b.pricing);
      
      const slugMapping = {
        'WgetCloud': 'wgetcloud', 'NanoCloud': 'nanocloud', 'FlyingBird': 'flyingbird',
        'XFLINK': 'xflink', 'STC': 'stc', 'Ytoo': 'ytoo', 'Nexitally': 'nexitally',
        'TAG': 'tag', 'Kuromis': 'kuromis', 'Kycloud': 'kycloud', 'BitzNet': 'bitznet',
        'FlowVPN': 'flowvpn', 'Flyint': 'flyint', 'Gatern': 'gatern', 'WeeVPN': 'weevpn',
        'Dler': 'dler', 'AmyTelecom': 'amytelecom', 'Miaona': 'miaona', 'Monocloud': 'monocloud',
        'Nirvana': 'nirvana', 'RelayCloud': 'relaycloud', 'Blinkload': 'blinkload',
        'Yoyu': 'yoyu', 'ImmTel': 'immtel', 'V2RaySS': 'v2rayss', 'CloudLink': 'cloudlink',
        'FastLink': 'fastlink', 'Hutao': 'hutao', 'Wuyou': 'wuyou', 'Feimao': 'feimao',
        'Weifeng': 'weifeng'
      };
      
      let slug = slugMapping[b.name];
      if (!slug) slug = b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      searchIndex.push({
        id: b.id,
        type: 'brand',
        title: b.name,
        description: b.name + ' - 机场品牌档案',
        url: `/brands/${slug}`,
        category: '品牌',
        tags: tags,
        keywords: [b.name, slug, '机场', '加速器', 'VPN', ...tags],
        content: features.join(' '),
        meta: {
          minMonthly: pricing.minMonthly,
          planCount: pricing.planCount
        }
      });
    }
  }

  // 4. FAQ
  const faqFile = path.join(process.cwd(), 'data', 'faq.json');
  if (fs.existsSync(faqFile)) {
    const raw = fs.readFileSync(faqFile, 'utf8');
    const faqs = JSON.parse(raw);
    for (const group of faqs) {
      if (group.questions) {
        for (let i = 0; i < group.questions.length; i++) {
          const f = group.questions[i];
          const ans = f.a || '';
          searchIndex.push({
            id: `faq-${group.category}-${i}`,
            type: 'faq',
            title: f.q,
            description: ans.substring(0, 100) + (ans.length > 100 ? '...' : ''),
            url: `/faq`,
            category: group.category || '',
            tags: [],
            keywords: [],
            content: ans
          });
        }
      }
    }
  }

  // Write index
  const pubDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir);
  fs.writeFileSync(path.join(pubDir, 'search-index.json'), JSON.stringify(searchIndex), 'utf8');
  console.log(`Generated search-index.json with ${searchIndex.length} entries.`);
}

buildIndex();
