export type SearchItemType = 'article' | 'brand' | 'category' | 'faq';

export interface SearchItem {
  id: string;
  type: SearchItemType;
  title: string;
  description: string;
  url: string;
  category?: string;
  tags?: string[];
  keywords?: string[];
  content?: string;
  date?: string;
  meta?: Record<string, string | number | boolean>;
}

export interface SearchResult extends SearchItem {
  score: number;
}

// Simple query normalizer
export function normalizeQuery(q: string): string {
  return q.trim().replace(/\s+/g, ' ').toLowerCase();
}

// Calculate search score for an item
export function scoreItem(item: SearchItem, query: string): number {
  if (!query) return 0;
  
  const q = normalizeQuery(query);
  let score = 0;
  
  const title = (item.title || '').toLowerCase();
  const desc = (item.description || '').toLowerCase();
  const content = (item.content || '').toLowerCase();
  const tags = (item.tags || []).map(t => t.toLowerCase());
  
  // Exact title match: highest
  if (title === q) {
    score += 100;
  } else if (title.includes(q)) {
    score += 50;
  }
  
  // Brand name exact match (usually in title/keywords)
  if (item.type === 'brand') {
    if (title === q) score += 30; // Boost brands slightly if exact
  }
  
  // Tags / Keywords match
  const allKeywords = [...tags, ...(item.keywords || []).map(k => k.toLowerCase())];
  if (allKeywords.some(k => k === q)) {
    score += 80;
  } else if (allKeywords.some(k => k.includes(q))) {
    score += 40;
  }
  
  // Description match
  if (desc.includes(q)) {
    score += 20;
  }
  
  // Content match
  if (content.includes(q)) {
    score += 5;
  }
  
  return score;
}

export function search(index: SearchItem[], query: string, typeFilter?: SearchItemType | 'all'): SearchResult[] {
  if (!query.trim()) return [];
  
  const results: SearchResult[] = [];
  for (const item of index) {
    if (typeFilter && typeFilter !== 'all' && item.type !== typeFilter) continue;
    
    const score = scoreItem(item, query);
    if (score > 0) {
      results.push({ ...item, score });
    }
  }
  
  return results.sort((a, b) => b.score - a.score);
}
