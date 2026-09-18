const fs = require('fs');

const rawLinks = fs.readFileSync('new_aff_links.txt', 'utf8');
const airports = JSON.parse(fs.readFileSync('ordered_airports.json', 'utf8'));

// Parse the new links into a map or array
const newLinks = [];
rawLinks.split('\n').forEach(line => {
  if (!line.trim()) return;
  const parts = line.split('：');
  if (parts.length >= 2) {
    const name = parts[0].trim();
    const link = parts.slice(1).join('：').trim();
    newLinks.push({ name, link });
  }
});

let updatedCount = 0;

newLinks.forEach(nl => {
  // Try to find the airport by name
  // The provided names might have extra english words like "星岛梦 StarDream"
  // So we check if the airport name in JSON is included in the provided name, or vice versa
  const target = airports.find(a => 
    a.name.toLowerCase().includes(nl.name.split(' ')[0].toLowerCase()) || 
    nl.name.toLowerCase().includes(a.name.toLowerCase()) ||
    (nl.name.includes('飞为') && a.name.toLowerCase().includes('firefly'))
  );

  if (target) {
    // DO NOT update if it's the 11th or 12th (Jiuyun or Baoyun)
    if (target.name.includes('九云') || target.name.includes('宝云')) {
      console.log('Skipped 11/12:', target.name);
    } else {
      target.link = nl.link;
      updatedCount++;
      console.log('Updated:', target.name, '->', nl.link);
    }
  } else {
    console.log('Warning: Could not find matching airport for:', nl.name);
  }
});

fs.writeFileSync('ordered_airports.json', JSON.stringify(airports, null, 2));
console.log(`Updated ${updatedCount} links successfully.`);
