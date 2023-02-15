import { defineNuxtConfig } from 'nuxt/config';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxtjs/color-mode'],
  app: {
    head: {
      link: [
        // Font
        { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
        { rel: 'stylesheet', href: 'https://use.typekit.net/bum8teg.css' },
      ],
    },
  },
  content: {
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: 'nord',
    },
  },
});
