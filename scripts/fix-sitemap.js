const fs = require('fs');
let c = fs.readFileSync('app/sitemap.ts', 'utf8');

c = c.replace(/const posts = getAllPosts\(\)\.map\(\(post\) => \(\{\n\s*url: `\$\{baseUrl\}\/\$\{post\.category\}\/\$\{post\.slug\}`,\n\s*lastModified: new Date\(\),\n\s*\}\)\);/, 
  `const posts = getAllPosts().map((post) => ({
    url: \`\${baseUrl}/\${post.category}/\${post.slug}\`,
    lastModified: post.updated ? new Date(post.updated) : (post.date ? new Date(post.date) : new Date()),
  }));`);

c = c.replace(/lastModified: new Date\(\),/g, ''); // Removes it from categories, routes, brands.

fs.writeFileSync('app/sitemap.ts', c);
