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
  <Example>
    <span class="font-bold">Matches:</span><span>{{ matches }}</span>
  </Example>
</template>
