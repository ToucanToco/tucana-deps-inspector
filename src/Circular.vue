<template>
  <div>
    <p>Index: <input v-model="index"></p>
    <p>Dependency cycles ({{ uniqueCycles.length }}):</p>
    <div class="cycle" v-for="(cycle, index) of uniqueCycles" :key="index">
      <div v-for="file of cycle" :key="file">
        {{ file }}
      </div>
    </div>
  </div>
</template>

<script>
import deps from './deps.json';

const files = new Set(deps.flat());

const dependencies = {};
for (const file of files) {
  dependencies[file] = [];
}
for (const [file, dependency] of deps) {
  dependencies[file].push(dependency);
}

const index = 'src/main.ts';
const visited = new Set();
const toVisit = new Set(dependencies[index]);
const pathTo = {};
for (const dependency of dependencies[index]) {
  pathTo[dependency] = [index];
}

const cycles = [];

while (toVisit.size) {
  const visiting = toVisit.values().next().value;

  for (const dependency of dependencies[visiting]) {
    if (pathTo[visiting].includes(dependency)) {
      cycles.push([
        ...pathTo[visiting].slice(pathTo[visiting].indexOf(dependency)),
        visiting,
      ]);
    }
    if (visited.has(dependency)) continue;
    toVisit.add(dependency);
    pathTo[dependency] = [...pathTo[visiting], visiting];
  }

  toVisit.delete(visiting);
  visited.add(visiting);
}

const uniqueCycleStrings = new Set();
const uniqueCycles = [];
for (const cycle of cycles) {
  const cycleString = JSON.stringify(cycle);
  if (uniqueCycleStrings.has(cycleString)) continue;
  uniqueCycleStrings.add(cycleString);
  uniqueCycles.push(cycle);
}

export default {
  data() {
    return {
      index: 'src/main.ts',
      uniqueCycles,
    };
  },
};
</script>

<style scoped>
.cycle {
  margin: 1em 0;
}
</style>
