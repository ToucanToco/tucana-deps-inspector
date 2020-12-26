<template>
  <div>
    <div
      v-for="prefix of prefixes"
      :key="prefix"
      class="u-clickable"
      :class="{ '--selected': selected === prefix }"
      @click="selected = prefix"
    >
      {{ dependences[prefix]?.[selected] ? 'e' : '&nbsp;' }}
      {{ dependences[selected]?.[prefix] ? 'i' : '&nbsp;' }}
      {{ deepDependences[prefix]?.[selected] ? 'E' : '&nbsp;' }}
      {{ deepDependences[selected]?.[prefix] ? 'I' : '&nbsp;' }}
      {{ prefix }}
    </div>
  </div>
</template>

<script>
import deps from './deps.json';

const dependsOn = (p1, p2) => deps
  .filter(([file]) => file.startsWith(p1))
  .filter(([, dependency]) => !dependency.startsWith(p1))
  .some(([, dependency]) => dependency.startsWith(p2));

const deepRange = (src, dependences) => {
  const visited = new Set([]);
  const toVisit = new Set([src]);
  while (toVisit.size) {
    const visiting = toVisit.values().next().value;
    for (const dst in dependences[visiting]) {
      if (!dependences[visiting][dst]) continue;
      if (visited.has(dst)) continue;
      toVisit.add(dst);
    }
    visited.add(visiting);
    toVisit.delete(visiting);
  }
  visited.delete(src);
  return visited;
};

export default {
  props: ['prefixes'],
  data() {
    return {
      selected: this.prefixes[0],
    };
  },
  computed: {
    dependences() {
      const dependences = {};
      for (const p1 of this.prefixes) {
        dependences[p1] = {};
        for (const p2 of this.prefixes) {
          if (p1 === p2) continue;
          dependences[p1][p2] = dependsOn(p1, p2);
        }
      }
      return dependences;
    },
    deepDependences() {
      return Object.fromEntries(this.prefixes.map((prefix) => [
        prefix,
        Object.fromEntries([...deepRange(prefix, this.dependences).values()].map((v) => [v, true])),
      ]));
    },
  },
};
</script>

<style>
.--selected {
  color: red;
}
</style>
