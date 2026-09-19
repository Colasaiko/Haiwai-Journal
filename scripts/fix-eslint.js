const fs = require('fs');

let mdx = fs.readFileSync('components/article/MDXRenderer.tsx', 'utf8');
mdx = mdx.replace(/import Image from 'next\/image';\n/, '');
mdx = mdx.replace(/: any/g, ': React.ComponentProps<any>');
mdx = mdx.replace(/let headingCount/g, 'const headingCount');
mdx = mdx.replace(/let cleanText/g, 'const cleanText');
mdx = mdx.replace(/<img /g, '/* eslint-disable-next-line @next/next/no-img-element */ <img ');
fs.writeFileSync('components/article/MDXRenderer.tsx', mdx);

let toc = fs.readFileSync('components/article/ArticleTOC.tsx', 'utf8');
toc = toc.replace(/import Link from 'next\/link';\n/, '');
fs.writeFileSync('components/article/ArticleTOC.tsx', toc);

let brands = fs.readFileSync('components/article/RelatedBrands.tsx', 'utf8');
brands = brands.replace(/Package, ArrowRight, Scale/, 'Package, Scale');
fs.writeFileSync('components/article/RelatedBrands.tsx', brands);
