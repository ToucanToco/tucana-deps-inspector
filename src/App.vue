<template>
  <div>
    <div
      v-for="prefix of prefixes"
      :key="prefix"
      class="u-clickable"
      :class="{ '--selected': selected === prefix }"
      @click="onPrefixClick($event, prefix)"
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
  data() {
    return {
      prefixes: ['src'],
      selected: 'src',
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
  methods: {
    onPrefixClick(evt, prefix) {
      if (evt.ctrlKey) {
        this.expand(prefix);
      } else if (evt.altKey) {
        this.fold(prefix);
      } else {
        this.selected = prefix;
      }
    },
    expand(prefix) {
      const files = [...new Set(deps.flat())];
      const prefixDepth = prefix.split('/').length;
      const newPrefixes = [...new Set(
        files
          .filter((file) => file.startsWith(prefix))
          .map((file) => file.split('/').slice(0, prefixDepth + 1).filter(Boolean).join('/')),
      )];
      this.prefixes = this.prefixes
        .filter((p) => p !== prefix)
        .concat(newPrefixes)
        .sort();
    },
    fold(prefix) {
      const splitPrefix = prefix.split('/');
      const newPrefix = splitPrefix.slice(0, splitPrefix.length - 1).filter(Boolean).join('/');
      this.prefixes = this.prefixes
        .filter((p) => !p.startsWith(newPrefix))
        .concat([newPrefix])
        .sort();
    },
  },
};
</script>

<style>
body {
  background-color: #222;
  color: white;
  font-family: monospace;
}
.u-clickable:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>

<style scoped>
.--selected {
  color: red;
}
</style>
