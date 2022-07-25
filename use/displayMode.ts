import { ref, computed, watch } from 'vue';

export type DisplayMode = 'light' | 'dark' | 'auto';

export function useDisplayMode(mode: DisplayMode) {
  const displayMode = ref(mode);

  const isLightMode = computed(() => displayMode.value === 'light');
  const isDarkMode = computed(() => displayMode.value === 'dark');

  function refreshDisplayMode() {
    if (process.client) {
      const classes = document.documentElement.classList;
      if (displayMode.value === 'dark') {
        classes.add('dark');
      } else {
        classes.remove('dark');
      }
    }
  }

  function toggleDisplayMode() {
    displayMode.value = isLightMode.value ? 'dark' : 'light';
  }

  watch(
    () => displayMode.value,
    () => refreshDisplayMode(),
    { immediate: true }
  );

  return {
    displayMode,
    isLightMode,
    isDarkMode,
    toggleDisplayMode,
  };
}
