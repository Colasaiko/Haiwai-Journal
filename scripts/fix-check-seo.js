const fs = require('fs');

let code = fs.readFileSync('scripts/check-seo.js', 'utf8');

code = code.replace(
  'let expectedP = p;',
  `let p = file.replace(/\\\\/g, '/').replace(/^out/, '').replace(/\\.html$/, '').replace(/\\/index$/, '');
    let expectedP = p;`
);

fs.writeFileSync('scripts/check-seo.js', code);
