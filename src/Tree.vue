<template>
  <div>
    <div
      v-for="prefix of modelValue"
      :key="prefix"
      class="u-clickable"
      @click="onPrefixClick($event, prefix)"
    >
      {{ prefix }}
    </div>
  </div>
</template>

<script>
import deps from './deps.json';

export default {
  props: ['modelValue'],
  methods: {
    onPrefixClick(evt, prefix) {
      if (evt.ctrlKey) {
        this.fold(prefix);
      } else {
        this.expand(prefix);
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
      this.$emit('update:modelValue', this.modelValue
        .filter((p) => p !== prefix)
        .concat(newPrefixes)
        .sort());
    },
    fold(prefix) {
      const splitPrefix = prefix.split('/');
      const newPrefix = splitPrefix.slice(0, splitPrefix.length - 1).filter(Boolean).join('/');
      this.$emit('update:modelValue', this.modelValue
        .filter((p) => !p.startsWith(newPrefix))
        .concat([newPrefix])
        .sort());
    },
  },
};
</script>
