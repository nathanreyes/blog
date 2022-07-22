<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const matches = ref(false);

const listener = (event) => {
  matches.value = event.matches;
};

const mediaQuery = '(max-width: 400px)';
let mediaQueryList = null;

onMounted(() => {
  if (window && 'matchMedia' in window) {
    mediaQueryList = window.matchMedia(mediaQuery);
    mediaQueryList.addEventListener('change', listener);
    matches.value = mediaQueryList.matches;
  }
});

onUnmounted(() => {
  if (mediaQueryList) {
    mediaQueryList.removeEventListener('change', listener);
    mediaQueryList = undefined;
  }
});
</script>

<template>
  <div class="flex space-x-2 px-4 py-2 bg-gray-100 border rounded-md">
    <span class="font-bold">Matches:</span><span>{{ matches }}</span>
  </div>
</template>
