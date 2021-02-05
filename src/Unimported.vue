<template>
  <div>
    <p>
      Found {{ unimported.length }} unimported files
    </p>
    <p>
      They might be configs, root files, or used in test files.
    </p>
    <div v-for="file in unimported" :key="file">
      {{ file }}
    </div>
  </div>
</template>

<script>
import unimported from './unimported.json';

export default {
  data() {
    return {
      unimported,
    };
  },
};
</script>
