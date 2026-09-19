import { Post } from './mdx';
import { getAllPosts } from './mdx';

export function getRelatedPosts(currentPost: Post): Post[] {
  const allPosts = getAllPosts().filter(p => p.slug !== currentPost.slug);

  const scoredPosts = allPosts.map(post => {
    let score = 0;
    
    // Same category: +1
    if (post.category === currentPost.category) score += 1;
    
    // Same tags: +2 per tag
    if (currentPost.tags && post.tags) {
      const sharedTags = currentPost.tags.filter(t => post.tags?.includes(t));
      score += sharedTags.length * 2;
    }

    // Same brands: +4 per brand
    if (currentPost.brands && post.brands) {
      const sharedBrands = currentPost.brands.filter(b => post.brands?.includes(b));
      score += sharedBrands.length * 4;
    }

    return { post, score };
  });

  // Sort by score desc, then by date desc
  scoredPosts.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    return a.post.date > b.post.date ? -1 : 1;
  });

  // We need 3 posts. If scored posts are > 0, return top 3.
  const topScored = scoredPosts.filter(p => p.score > 0).map(p => p.post);
  
  // If we don't have 3, fill with same category
  if (topScored.length < 3) {
    const sameCat = allPosts
      .filter(p => p.category === currentPost.category && !topScored.some(t => t.slug === p.slug))
      .sort((a, b) => (a.date > b.date ? -1 : 1));
    
    return [...topScored, ...sameCat].slice(0, 3);
  }

  return topScored.slice(0, 3);
}

export function getNextAndPrevPosts(currentPost: Post): { prev: Post | null, next: Post | null } {
  // allPosts are sorted new to old
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === currentPost.slug);
  
  if (currentIndex === -1) return { prev: null, next: null };

  // Previous post (chronologically) is the one created *before* this one, 
  // since the array is new -> old, the one before is at currentIndex + 1
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  // Next post (chronologically) is the one created *after* this one, so currentIndex - 1
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return { prev: prevPost, next: nextPost };
}

// Generate a stable ID for a heading text
export function generateHeadingId(text: string, count: number): string {
  // simple slugify for chinese + english
  let id = text.toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  if (!id) id = 'section';
  if (count > 0) id += `-${count}`;
  return id;
}

export function extractToc(content: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  
  const idCounts: Record<string, number> = {};

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    let text = match[2].trim();
    // remove markdown links and formatting if any
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*`_]/g, '');
    
    let baseId = generateHeadingId(text, 0);
    if (idCounts[baseId] !== undefined) {
      idCounts[baseId]++;
      baseId = generateHeadingId(text, idCounts[baseId]);
    } else {
      idCounts[baseId] = 0;
    }

    headings.push({ id: baseId, text, level });
  }

  return headings;
}
