const fs = require('fs');
const path = require('path');
const https = require('https');

const imagesDir = path.join(__dirname, 'public', 'images');

const images = {
  // Main Hero post (为什么机场晚上会变慢？)
  'airport-3.jpg': 'https://images.unsplash.com/photo-1570599182352-78d2b380eb6d?auto=format&fit=crop&w=1200&q=80', 
  // Other featured posts
  'airport-1.jpg': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80', 
  'network-1.jpg': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80', 
  'clash-1.jpg': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80', 
  'tools-1.jpg': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80', 

  // Feature Area
  'hero-1.jpg': 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80', 

  // Category Navs
  'nav-airport.jpg': 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80', 
  'nav-network.jpg': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80', 
  'nav-clash.jpg': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', 
  'nav-tools.jpg': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80', 
  'nav-guides.jpg': 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=800&q=80', 

  // Remaining posts
  'airport-2.jpg': 'https://images.unsplash.com/photo-1512289984044-071903207f5e?auto=format&fit=crop&w=1200&q=80',
  'airport-4.jpg': 'https://images.unsplash.com/photo-1483375801503-374c5f660610?auto=format&fit=crop&w=1200&q=80',
  'airport-5.jpg': 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&w=1200&q=80',
  'network-2.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  'network-3.jpg': 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1200&q=80',
  'network-4.jpg': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  'clash-2.jpg': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  'clash-3.jpg': 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
  'clash-4.jpg': 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
  'guides-1.jpg': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  'feature-1.jpg': 'https://images.unsplash.com/photo-1499540633125-484965b60031?auto=format&fit=crop&w=1200&q=80',
  'about-1.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        reject(new Error('Failed to get ' + url + ' (' + response.statusCode + ')'));
        return;
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  const entries = Object.entries(images);
  console.log(`Starting download of ${entries.length} images...`);
  
  // Download in chunks of 5 to avoid overwhelming the network
  for (let i = 0; i < entries.length; i += 5) {
    const chunk = entries.slice(i, i + 5);
    const promises = chunk.map(([filename, url]) => {
      const dest = path.join(imagesDir, filename);
      console.log(`Downloading ${filename}...`);
      return download(url, dest).catch(e => console.error(`Error downloading ${filename}: ${e.message}`));
    });
    await Promise.all(promises);
  }
  
  console.log('All images downloaded successfully.');
}

run();
