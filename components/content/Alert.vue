<script setup lang="ts">
defineProps({
  title: { type: String, default: 'Note' },
});
</script>

<template>
  <div class="not-prose pl-6 border-l-2 border-accent-400">
    <h4 class="text-sm text-accent-400 font-bold tracking-wide uppercase">{{ title }}</h4>
    <div class="text-gray-500 dark:text-gray-300 mt-3">
      <slot />
    </div>
  </div>
</template>
