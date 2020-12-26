<template>
  <div class="app">
    <Tree v-model="prefixes"/>
    <Graph :prefixes="prefixes"/>
  </div>
</template>

<script>
import Graph from './Graph.vue';
import Tree from './Tree.vue';

export default {
  components: {
    Graph,
    Tree,
  },
  data() {
    return {
      prefixes: ['src'],
    };
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
.app {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
}
.app > div:nth-child(1) {
  width: 400px;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid white;
}
.app > div:nth-child(2) {
  width: calc(100vw - 400px);
  height: 100vh;
  overflow-y: auto;
}
</style>
