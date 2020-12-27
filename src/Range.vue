<template>
  <div>
    <p>
      Modifying these
    </p>
    <textarea v-model="filesString" :rows="filesString.split('\n').length || 1"></textarea>
    <p>
      will impact these {{ range.length }} files
    </p>
    <div v-for="file of range" :key="file">
      {{ file }}
    </div>
  </div>
</template>

<script>
import deps from './deps.json';

export default {
  data() {
    return {
      filesString: '',
    };
  },
  computed: {
    range() {
      const dependents = {};
      for (const [file, dependency] of deps) {
        if (!dependents[dependency]) dependents[dependency] = [];
        dependents[dependency].push(file);
      }

      const files = this.filesString.split('\n').filter(Boolean);
      const range = new Set(files);
      const toVisit = new Set();
      for (const file of files) {
        for (const dependent of dependents[file] || []) {
          if (range.has(dependent)) continue;
          toVisit.add(dependent);
        }
      }

      while (toVisit.size) {
        const visiting = toVisit.values().next().value;
        for (const dependent of dependents[visiting] || []) {
          if (range.has(dependent)) continue;
          toVisit.add(dependent);
        }
        toVisit.delete(visiting);
        range.add(visiting);
      }

      for (const file of files) {
        range.delete(file);
      }

      return [...range.values()].sort();
    },
  },
};
</script>
