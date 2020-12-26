const deps = require('./deps.json');

const getDependenciesIn = (filePrefix, dependencyPrefix) => new Set(
  deps
    .filter(([file]) => file.startsWith(filePrefix))
    .filter(([, dependency]) => !dependency.startsWith(filePrefix))
    .filter(([, dependency]) => dependency.startsWith(dependencyPrefix))
    .map(([, dependency]) => dependency),
);

const getDependenciesNotIn = (filePrefix, dependencyPrefixes) => new Set(
  deps
    .filter(([file]) => file.startsWith(filePrefix))
    .filter(([, dependency]) => !dependency.startsWith(filePrefix))
    .filter(([, dependency]) => !dependencyPrefixes.some((p) => dependency.startsWith(p)))
    .map(([, dependency]) => dependency),
);

const groupPrefixes = [
  'src/scripts/api',
  'src/scripts/store',
];

console.log('nb_dependencies\tfile_prefixes\tdependency_prefixes');
for (const g1 of groupPrefixes) {
  for (const g2 of groupPrefixes) {
    if (g1 === g2) continue;
    console.log([
      getDependenciesIn(g1, g2).size,
      g1,
      g2,
    ].join('\t'));
  }
  console.log([
    getDependenciesNotIn(g1, groupPrefixes.filter((g) => g !== g1)).size,
    g1,
    '*',
  ].join('\t'));
}
