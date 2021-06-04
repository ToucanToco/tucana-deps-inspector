<template>
  <div>
    <p>
      Found {{ unimported.length }} files imported nowhere. They might still be configs or root files though.
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
