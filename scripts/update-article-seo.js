const fs = require('fs');

let code = fs.readFileSync('app/[category]/[slug]/page.tsx', 'utf8');

// Fix title repeating
code = code.replace(
  /\`\$\{post\.title\}｜\$\{getCategoryBySlug\(post\.category\)\?\.title \|\| "海外志"\} - 海外志\`/g,
  '`${post.title}｜海外志`'
);

// Add Twitter card to metadata if not exists
if (!code.includes('twitter: {')) {
  code = code.replace(
    'alternates: {',
    `twitter: {
          card: 'summary_large_image',
          title: post.title,
          description: post.description,
          images: [post.coverImage]
        },
        alternates: {`
  );
}

// Check BreadcrumbList schema
if (!code.includes('BreadcrumbList')) {
  const breadcrumbSchema = `
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: 'https://haiwaijichang.online/' },
      { '@type': 'ListItem', position: 2, name: categoryTitle, item: \`https://haiwaijichang.online/\${params.category}\` },
      { '@type': 'ListItem', position: 3, name: post.title, item: \`https://haiwaijichang.online/\${params.category}/\${params.slug}\` }
    ]
  };
  `;
  
  // Insert before jsonLd declaration
  code = code.replace(
    'const jsonLd: Record<string, unknown> = {',
    breadcrumbSchema + 'const jsonLd: Record<string, unknown> = {'
  );

  // Update dangerouslySetInnerHTML
  code = code.replace(
    'dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}',
    'dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbLd]) }}'
  );
}

fs.writeFileSync('app/[category]/[slug]/page.tsx', code);
console.log('Updated app/[category]/[slug]/page.tsx');
