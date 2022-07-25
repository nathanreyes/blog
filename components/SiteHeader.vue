<template>
  <header class="flex justify-between items-center py-4 max-w-3xl mx-auto">
    <nav class="flex text-accent-500 dark:text-accent-400 space-x-2">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="font-bold tracking-wide px-4 py-3 rounded-md hover:bg-accent-50 dark:hover:bg-gray-700"
        active-class="text-white bg-accent-500 hover:bg-accent-700 dark:hover:bg-accent-700 shadow-md"
        >{{ link.label }}</NuxtLink
      >
    </nav>
    <div class="flex items-center space-x-2">
      <!--Twitter-->
      <a href="https://twitter.com/natedoggit" :class="linkClass" target="_blank">
        <IconTwitter />
      </a>
      <!--Github-->
      <a href="https://github.com/nathanreyes" :class="linkClass" target="_blank">
        <IconGithub />
      </a>
      <!--Dark mode-->
      <button :class="linkClass" @click="toggleDisplayMode">
        <IconMoon v-if="isLightMode" />
        <IconSun v-else />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAppState } from '@/use/appState';

const { isLightMode, toggleDisplayMode } = useAppState();

const linkClass =
  'inline-flex justify-center items-center p-3 rounded-full hover:bg-accent-50 dark:hover:bg-gray-700 text-accent-500 dark:text-accent-400 cursor-pointer';

const links = ref([
  {
    label: 'Nathan Reyes',
    to: '/',
  },
  {
    label: 'Articles',
    to: '/articles',
  },
  {
    label: 'About',
    to: '/about',
  },
]);
</script>
