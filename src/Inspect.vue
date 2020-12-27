<template>
  <div>
    <p>
      Inspect the dependencies of
      <input v-model="src">
      inside
      <input v-model="dst">
    </p>
    <p>
      Found {{ uniqueDependencies.size }} unique dependencies
    </p>
    <div v-for="uniqueDependency of uniqueDependencies" :key="uniqueDependency">{{ uniqueDependency }}</div>
    <p>Detail</p>
    <div v-for="(fileDependencies, file) in dependencies" :key="file">
      <div>{{ file }}</div>
      <div v-for="fileDependency of fileDependencies" :key="fileDependency">
        &nbsp;&nbsp;{{ fileDependency }}
      </div>
    </div>
  </div>
</template>

<script>
import deps from './deps.json';

export default {
  data() {
    return {
      src: 'src/',
      dst: 'src/',
    };
  },
  computed: {
    dependencies() {
      const dependencies = {};
      for (const [file, dependency] of deps) {
        if (!file.startsWith(this.src)) continue;
        if (dependency.startsWith(this.src)) continue;
        if (!dependency.startsWith(this.dst)) continue;
        if (!dependencies[file]) dependencies[file] = [];
        dependencies[file].push(dependency);
      }
      return dependencies;
    },
    uniqueDependencies() {
      return new Set(Object.values(this.dependencies).flat().sort());
    },
  },
};
</script>
