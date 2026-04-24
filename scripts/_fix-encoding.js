const fs = require('fs');
for (const file of ['js/main.js', 'js/v2-renderer.js']) {
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(/→/g, '->')
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/▾/g, 'v')
    .replace(/−/g, '-')
    .replace(/▶/g, '>')
    .replace(/⏸/g, '||')
    .replace(/↺/g, 'reset')
    .replace(/✓/g, 'OK')
    .replace(/•/g, '-')
    .replace(/·/g, '-')
    .replace(/📋/g, '[ ]')
    .replace(/’/g, "'");
  fs.writeFileSync(file, text, 'utf8');
}
