const fs = require('fs');

const rawDeps = fs
  .readFileSync('./deps.csv', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map(line => line.split(','));

fs.writeFileSync('./src/deps.json', JSON.stringify(rawDeps, null, 2));
