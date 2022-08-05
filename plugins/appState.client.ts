import { initAppState } from '@/use/appState';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    initAppState();
  });
});
