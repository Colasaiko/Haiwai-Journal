const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 1. Delete temp files
['temp_brand.txt', 'test.js'].forEach(f => {
    if (fs.existsSync(f)) {
        fs.unlinkSync(f);
        console.log(`Deleted ${f}`);
    }
});

// 2. Read brands
const brands = JSON.parse(fs.readFileSync('ordered_airports.json', 'utf8'));
const brandMap = new Map();
brands.forEach(b => brandMap.set(b.id, b));

// 3. Read all posts to find valid URLs
const postsDir = path.join(process.cwd(), 'content/posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

const allPosts = [];
files.forEach(f => {
    const raw = fs.readFileSync(path.join(postsDir, f), 'utf8');
    const { data } = matter(raw);
    if(data.category && data.title) {
        allPosts.push({ slug: f.replace('.mdx', ''), category: data.category, title: data.title });
    }
});

const getValidUrl = (keyword) => {
    // Map keywords to specific posts
    const mapping = {
        'IPLC': 'dedicated-line-iplc-iepl-explained',
        'IEPL': 'dedicated-line-iplc-iepl-explained',
        'Clash': 'clash-modes-explained',
        '原生 IP': 'native-ip-unlock-explained',
        '原生IP': 'native-ip-unlock-explained',
        '晚高峰': 'evening-peak-testing-methods', // guess? let's search
        '流媒体': 'netflix-airport-recommendations-unlock',
        'Netflix': 'netflix-airport-recommendations-unlock',
        '节点': 'what-is-airport-service',
        '跑路': 'how-to-avoid-airport-runaway',
        '测速': 'speed-test-guide'
    };
    
    // Find URL dynamically
    let targetSlug = mapping[keyword];
    
    if(!targetSlug) return null;
    
    const post = allPosts.find(p => p.slug === targetSlug || p.slug.includes(targetSlug.toLowerCase()));
    if (post) {
        return `/${post.category}/${post.slug}`;
    }
    
    // Fallback search
    const fallback = allPosts.find(p => p.title.includes(keyword) || p.slug.includes(keyword.toLowerCase()));
    if(fallback) return `/${fallback.category}/${fallback.slug}`;
    
    return null;
}

const keywords = ['IPLC', 'IEPL', 'Clash', '原生 IP', '原生IP', '晚高峰', '流媒体', 'Netflix', '节点', '跑路', '测速'];

let stats = {
    brandArticles: 0,
    internalLinksTotal: 0,
    minInternalLinks: Infinity,
    brokenLinks: 0,
    brandUrlErrors: 0,
    compareUrlErrors: 0,
    brandIdErrors: 0,
    missingCover: 0,
    authorFixed: false
};

const newArticles = files.filter(f => {
    const stat = fs.statSync(path.join(postsDir, f));
    // Filter newly created articles (within last 24h)
    return Date.now() - stat.mtimeMs < 24 * 60 * 60 * 1000 && !f.includes('start-here');
});

// We only process the 31 brand articles. We can identify them by checking if their brands field has 1 brand.
newArticles.forEach(f => {
    const filePath = path.join(postsDir, f);
    let raw = fs.readFileSync(filePath, 'utf8');
    let { data, content } = matter(raw);
    
    if(!data.brands || data.brands.length !== 1 || data.category !== 'airport-observation') return;
    
    const brandId = data.brands[0];
    const brandInfo = brandMap.get(brandId);
    if(!brandInfo) {
        stats.brandIdErrors++;
        return;
    }
    stats.brandArticles++;
    
    // Fix Author
    const invalidAuthors = ['海外志首席网络分析师', '高级评测专家', '技术研究员', 'Editorial Writer'];
    if (data.author && data.author !== '海外志编辑部' && data.author !== '海外志') {
        data.author = '海外志编辑部';
        stats.authorFixed = true;
    }
    if(!data.author) data.author = '海外志编辑部';
    
    // Ensure CoverImage exists
    if(data.coverImage) {
        const coverPath = path.join(process.cwd(), 'public', data.coverImage);
        if(!fs.existsSync(coverPath)) {
            stats.missingCover++;
            data.coverImage = '/images/nav-airport-v2.jpg'; // fallback
        }
    } else {
        stats.missingCover++;
        data.coverImage = '/images/nav-airport-v2.jpg';
    }
    
    // Check Brand Archive Link & Compare Link
    const brandArchiveUrl = `/brands/${brandInfo.slug}`;
    const compareUrl = `/compare?brands=${brandInfo.id}`;
    
    if(!content.includes(brandArchiveUrl)) {
        content += `\n\n## 进一步了解\n\n你可以前往查看 [${brandInfo.name} 完整品牌资料](${brandArchiveUrl})。`;
    }
    if(!content.includes(compareUrl)) {
        content += `也可以 [将 ${brandInfo.name} 加入品牌对比](${compareUrl})，与其他机场进行平行评估。`;
    }
    
    // Inject internal links naturally (max 4-8)
    let linksInjected = 0;
    const regex = new RegExp(`(${keywords.join('|')})`, 'g');
    const existingLinksCount = (content.match(/\]\(\//g) || []).length;
    
    // We only inject if less than 4 links
    if (existingLinksCount < 4) {
        let uniqueKeywordsInjected = new Set();
        
        content = content.replace(regex, (match) => {
            if (linksInjected >= 5 || uniqueKeywordsInjected.has(match)) return match;
            
            const url = getValidUrl(match);
            if (url) {
                linksInjected++;
                uniqueKeywordsInjected.add(match);
                return `[${match}](${url})`;
            }
            return match;
        });
    }
    
    // Calculate final links count
    const totalLinks = (content.match(/\]\(\//g) || []).length;
    stats.internalLinksTotal += totalLinks;
    if (totalLinks < stats.minInternalLinks) stats.minInternalLinks = totalLinks;
    
    // Write back
    const newFileContent = matter.stringify(content, data);
    fs.writeFileSync(filePath, newFileContent);
});

console.log(JSON.stringify(stats, null, 2));
