const fs = require('fs');
const path = require('path');

const mapping = {
  'understanding-node-multiplier.mdx': 'anime_desk.jpg',
  'v2rayn-airport-recommendations-windows.mdx': 'anime_sky.jpg',
  'apple-tv-router-airport-recommendations.mdx': 'anime_journey.jpg'
};

for (const [file, img] of Object.entries(mapping)) {
  const p = path.join('content/posts', file);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/coverImage: \/images\/[^\n]+/, `coverImage: /images/${img}`);
    fs.writeFileSync(p, content);
    console.log(`Updated ${file} with ${img}`);
  }
}
