import fs from 'fs';
import path from 'path';

export interface BrandRaw {
  id: string;
  name: string;
  link: string;
  code: string;
  features: string[];
  pricingHeaders: string[];
  pricingRows: string[][];
}

export interface PricingSummary {
  planCount: number;
  minMonthly: string | null;
  minQuarterly: string | null;
  minYearly: string | null;
  hasOneTime: boolean;
}

export interface Brand extends BrandRaw {
  slug: string;
  tags: string[];
  pricingSummary: PricingSummary;
}

const SLUG_MAPPING: Record<string, string> = {
  "brand-1": "weifeng",
  "brand-2": "feimao",
  "brand-3": "wuyou",
  "brand-4": "lingmao",
  "brand-5": "firefly",
  "brand-6": "kuajie",
  "brand-7": "shanyue",
  "brand-8": "kuaili",
  "brand-9": "xingdaomeng",
  "brand-10": "yinxingren",
  "brand-11": "baoyun",
  "brand-12": "jiuyun",
  "brand-13": "bianyuan",
  "brand-14": "weitu",
  "brand-15": "bitznet",
  "brand-16": "yifanyun",
  "brand-17": "tiziyun",
  "brand-18": "sujie",
  "brand-19": "jilian",
  "brand-20": "feiv",
  "brand-21": "u1s1",
  "brand-22": "wavenet",
  "brand-23": "guangnian",
  "brand-24": "kexin",
  "brand-25": "sogo",
  "brand-26": "lingdong",
  "brand-27": "muguang",
  "brand-28": "ermao",
  "brand-29": "phantom",
  "brand-30": "nanocloud",
  "brand-31": "guangsu"
};

function extractMinPrice(rows: string[][], colIndex: number): string | null {
  if (colIndex === -1) return null;
  
  let minPrice = Infinity;
  let minPriceStr: string | null = null;
  
  for (const row of rows) {
    if (row.length > colIndex) {
      const val = row[colIndex].trim();
      if (val !== '-' && val !== '' && !val.includes('暂无')) {
        const match = val.match(/[\d.]+/);
        if (match) {
          const num = parseFloat(match[0]);
          if (!isNaN(num) && num < minPrice) {
            minPrice = num;
            minPriceStr = val; // Store original format like ¥11.00
          }
        }
      }
    }
  }
  return minPriceStr;
}

function calculatePricingSummary(brand: BrandRaw): PricingSummary {
  const headers = brand.pricingHeaders;
  const rows = brand.pricingRows;
  
  const monthIdx = headers.findIndex(h => h.includes('月付'));
  const quarterIdx = headers.findIndex(h => h.includes('季付'));
  const yearIdx = headers.findIndex(h => h.includes('年付'));
  const oneTimeIdx = headers.findIndex(h => h.includes('一次性'));

  let hasOneTime = false;
  if (oneTimeIdx !== -1) {
    hasOneTime = rows.some(row => row.length > oneTimeIdx && row[oneTimeIdx].trim() !== '-' && row[oneTimeIdx].trim() !== '');
  }

  return {
    planCount: rows.length,
    minMonthly: extractMinPrice(rows, monthIdx),
    minQuarterly: extractMinPrice(rows, quarterIdx),
    minYearly: extractMinPrice(rows, yearIdx),
    hasOneTime
  };
}

function generateTags(features: string[]): string[] {
  const allText = features.join(' ').toLowerCase();
  const tags = new Set<string>();
  
  if (allText.includes('iplc')) tags.add('IPLC');
  if (allText.includes('iepl')) tags.add('IEPL');
  if (allText.includes('原生 ip') || allText.includes('原生ip')) tags.add('原生 IP');
  if (allText.includes('netflix') || allText.includes('disney') || allText.includes('流媒体')) tags.add('流媒体');
  if (allText.includes('chatgpt') || allText.includes('ai')) tags.add('AI 解锁');
  if (allText.includes('不限制设备') || allText.includes('不限设备') || allText.includes('多设备')) tags.add('不限设备');
  
  return Array.from(tags);
}

let cachedBrands: Brand[] | null = null;

export function getAllBrands(): Brand[] {
  if (cachedBrands) return cachedBrands;
  
  try {
    const filePath = path.join(process.cwd(), 'ordered_airports.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const rawBrands: BrandRaw[] = JSON.parse(rawData);
    
    cachedBrands = rawBrands.map(raw => ({
      ...raw,
      slug: SLUG_MAPPING[raw.id] || raw.id,
      tags: generateTags(raw.features),
      pricingSummary: calculatePricingSummary(raw)
    }));
    
    return cachedBrands;
  } catch (error) {
    console.error('Error loading brands:', error);
    return [];
  }
}

export function getBrandById(id: string): Brand | undefined {
  return getAllBrands().find(b => b.id === id);
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return getAllBrands().find(b => b.slug === slug);
}

