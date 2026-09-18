const fs = require('fs');
const path = require('path');

const rawText = fs.readFileSync(path.join(__dirname, 'raw_airports.txt'), 'utf8');

const blocks = rawText.split(/\n(?=[^\n]*aff链接)/).filter(b => b.trim().length > 0);

const airports = [];

// Standardized headers
const STANDARD_HEADERS = ['名称', '流量', '月付', '季付', '半年付', '年付', '一次性'];

blocks.forEach(block => {
  if (!block.trim()) return;

  const firstLine = block.trim().split('\n')[0];
  let name = firstLine.split(/aff链接/i)[0].replace(/[：:]+$/, '').trim();
  const affMatch = firstLine.match(/aff链接[：:]*\s*(https?:\/\/[^\s]+)/i);
  const link = affMatch ? affMatch[1] : '';

  const codeMatch = block.match(/优惠码：([^\n]+)/);
  const code = codeMatch ? codeMatch[1].trim() : '';

  const features = [];
  const featureMatches = block.matchAll(/✔\s*([^\n]+)/g);
  for (const m of featureMatches) {
    features.push(m[1].trim());
  }

  const lines = block.split('\n').map(l => l.trim());
  let inTable = false;
  let originalHeaders = [];
  const pricingRows = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if ((line.startsWith('名称') || line.startsWith('套餐')) && line.includes('流量')) {
      inTable = true;
      originalHeaders = line.split(/\s{2,}/).filter(Boolean);
      continue;
    }
    if (inTable) {
      if (line.startsWith('---')) continue;
      if (line === '' || line.startsWith('优惠码') || line.startsWith('✔') || line.startsWith('mac download') || line.includes('aff链接')) {
        inTable = false;
        continue;
      }
      
      // Clean up spaces in currency to prevent accidental splits
      let cleanLine = line.replace(/¥\s+/g, '¥');
      // Also clean up spaces inside parentheses e.g. （一次性  ¥200.00）
      cleanLine = cleanLine.replace(/（一次性\s+¥/g, '（一次性¥');
      
      let cols = cleanLine.split(/\s{2,}|\t/).filter(Boolean);
      
      if (cols.length > 0) {
        // Map the columns to standard headers
        let standardRow = ['-', '-', '-', '-', '-', '-', '-'];
        
        // Col 0: 名称
        standardRow[0] = cols[0] || '-';
        
        // Wait, if it's a one-time package, it might look like:
        // 信风 · 不限时 270 GB （一次性¥200.00） (3 cols)
        // Let's identify the columns by their original headers
        
        // Let's assign traffic
        if (cols[1] && (cols[1].includes('GB') || cols[1].includes('TB') || originalHeaders[1] === '流量')) {
          standardRow[1] = cols[1];
        }
        
        // For the rest of the columns, map them based on originalHeaders
        // Or heuristic mapping
        for (let c = 2; c < cols.length; c++) {
          let val = cols[c];
          let origHeader = originalHeaders[c];
          
          if (origHeader) {
             if (origHeader.includes('月付')) standardRow[2] = val;
             else if (origHeader.includes('季付')) standardRow[3] = val;
             else if (origHeader.includes('半年')) standardRow[4] = val;
             else if (origHeader.includes('年付')) standardRow[5] = val;
             else if (origHeader.includes('一次性')) {
                // remove parentheses
                standardRow[6] = val.replace(/[（）()]/g, '');
             }
          } else {
             // Unmapped column, maybe "一次性"?
             if (val.includes('一次性') || val.includes('¥')) {
                standardRow[6] = val.replace(/[（）()]/g, '');
             }
          }
        }
        
        // Heuristic: if any value explicitly says "一次性", put it in standardRow[6] and clear it from others
        for (let c = 2; c <= 6; c++) {
           if (standardRow[c].includes('一次性')) {
              // Extract just the price if possible
              let priceMatch = standardRow[c].match(/(?:一次性)?(¥[\d.]+)/);
              standardRow[6] = priceMatch ? priceMatch[1] : standardRow[c].replace(/[（）()一次性\s]/g, '');
              if (c !== 6) standardRow[c] = '-';
           }
        }
        
        // Also if we missed the explicit "一次性" header but it's an unlimited package:
        if (standardRow[0].includes('不限时') && standardRow[6] === '-') {
           // find the price in the columns and put it in 一次性
           let priceCol = cols.find(c => c.includes('¥'));
           if (priceCol) {
             standardRow[6] = priceCol.replace(/[（）()]/g, '');
             // clear others
             for (let j = 2; j <= 5; j++) standardRow[j] = '-';
           }
        }
        
        pricingRows.push(standardRow);
      }
    }
  }
  
  if (!name) return;

  airports.push({
    name,
    link,
    code,
    features,
    pricingHeaders: STANDARD_HEADERS,
    pricingRows: pricingRows,
    originalBlock: block.trim()
  });
});

const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());

const findAndExtract = (namesArray) => {
  const found = [];
  namesArray.forEach(n => {
    for (let i = airports.length - 1; i >= 0; i--) {
      if (airports[i].name.includes(n)) {
        found.push(airports.splice(i, 1)[0]);
      }
    }
  });
  return found;
}

const weifeng = findAndExtract(['微风'])[0];
if (weifeng) weifeng.link = '#'; 

const feimao = findAndExtract(['飞猫'])[0];
const group3to7 = shuffle(findAndExtract(['无忧', '跨界', 'firefly', '灵猫', '闪跃']));
const jiuyunBaoyun = shuffle(findAndExtract(['九云', '宝云']));

let rest = shuffle(airports);
const group8to10 = rest.splice(0, 3);
const finalRest = rest;

const finalOrder = [
  weifeng,
  feimao,
  ...group3to7,
  ...group8to10,
  ...jiuyunBaoyun,
  ...finalRest
].filter(Boolean); 

fs.writeFileSync(path.join(__dirname, 'ordered_airports.json'), JSON.stringify(finalOrder, null, 2));
console.log('Parsed and ordered', finalOrder.length, 'airports.');
