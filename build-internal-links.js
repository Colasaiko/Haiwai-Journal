const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, 'content', 'posts');

let posts = [];
fs.readdirSync(postsDir).forEach(file => {
  if (file.endsWith('.mdx')) {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const parsed = matter(content);
    posts.push({
      file,
      slug: file.replace('.mdx', ''),
      data: parsed.data,
      content: parsed.content,
      primary: parsed.data.primary_keyword || '',
      url: `/${parsed.data.category}/${file.replace('.mdx', '')}`,
      linksIn: 0,
      linksOut: 0
    });
  }
});

// For keyword map and linking
const keywordsMap = [];

posts.forEach(post => {
  // Extract secondary keywords (if any passed, but we hardcoded primary in the last step. Let's infer some)
  // To keep it simple, we use the primary_keyword for linking.
  const keyword = post.primary;
  
  if (keyword) {
    keywordsMap.push({
      keyword,
      url: post.url,
      title: post.data.title,
      category: post.data.category,
      slug: post.slug
    });
  }
});

let totalInLinks = 0;

// Apply internal links
posts.forEach(post => {
  let newContent = post.content;
  
  // Try to find keywords of OTHER posts in this post's content and link them
  keywordsMap.forEach(k => {
    if (k.slug !== post.slug && k.keyword) {
      // Regex to match keyword not already in a link or heading
      // Basic regex: match the keyword if it's not preceded by [ or followed by ] or inside markdown link
      const regex = new RegExp(`(?<!\\[)([^\\[]*?)(${k.keyword})([^\\]]*?)(?!\\]|\\))`, 'g');
      
      // We only want to replace the first occurrence per post to avoid keyword stuffing
      let replaced = false;
      newContent = newContent.replace(new RegExp(`(${k.keyword})`, 'i'), (match) => {
        if (!replaced) {
          replaced = true;
          post.linksOut++;
          const target = posts.find(p => p.slug === k.slug);
          if (target) target.linksIn++;
          totalInLinks++;
          return `[${match}](${k.url})`;
        }
        return match;
      });
    }
  });

  if (newContent !== post.content) {
    const fileContent = matter.stringify(newContent, post.data);
    fs.writeFileSync(path.join(postsDir, post.file), fileContent);
  }
});

// Generate SEO_KEYWORD_MAP.md
let mapContent = `# SEO Keyword Map\n\n`;
mapContent += `| URL | Article Title | Primary Keyword | Category | Links In | Links Out |\n`;
mapContent += `| --- | --- | --- | --- | --- | --- |\n`;

posts.forEach(post => {
  mapContent += `| ${post.url} | ${post.data.title} | ${post.primary || 'N/A'} | ${post.data.category} | ${post.linksIn} | ${post.linksOut} |\n`;
});

fs.writeFileSync(path.join(__dirname, 'SEO_KEYWORD_MAP.md'), mapContent);
console.log('Internal links added and SEO_KEYWORD_MAP.md generated.');
console.log(`Total new internal links: ${totalInLinks}`);
