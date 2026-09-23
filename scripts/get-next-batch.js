const fs = require('fs');
const path = require('path');

const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));
const postsDir = path.join(__dirname, '..', 'content', 'posts');

let batch = [];
for (const task of tasks) {
  const mdxPath = path.join(postsDir, task.slug + '.mdx');
  if (!fs.existsSync(mdxPath)) {
    batch.push(task);
    if (batch.length === 4) break;
  }
}

if (batch.length === 0) {
  console.log("ALL_DONE");
} else {
  console.log(JSON.stringify(batch, null, 2));
}
