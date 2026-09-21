const fs = require('fs');
const brands = fs.readFileSync('lib/brands.ts', 'utf8');
const idx = brands.lastIndexOf('brand-26');
console.log(brands.substring(idx - 100, idx + 1000));
