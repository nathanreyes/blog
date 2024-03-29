<script setup lang="ts">
import type { Article } from '@/types';

const projects = [
  {
    icon: resolveComponent('IconCalendar'),
    title: 'V-Calendar',
    summary: 'An elegant calendar and datepicker plugin for Vue.',
    url: 'https://vcalendar.io',
  },
  {
    icon: resolveComponent('IconCoffee'),
    title: 'GifMyCoffee',
    summary: `A free coffee timer app that helps people brew various coffee recipes using gifs.`,
    url: 'https://gifmycoffee.com',
  },
  {
    icon: resolveComponent('IconMaximize'),
    title: 'Vue Screen Utils',
    summary: 'A dependency-free collection of utility plugins and functions for using media queries in Vue 3.',
    url: 'https://github.com/nathanreyes/vue-screen-utils',
  },
];

const { data: articles } = await useAsyncData('articles', () =>
  queryContent<Article>('/articles').where({ published: true }).sort({ date: 0 }).limit(4).find()
);
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 pb-8">
    <!--Intro-->
    <div class="py-12">
      <div class="flex space-x-14">
        <div class="flex-shrink-0 flex-grow-0">
          <img src="/profile.jpg" class="w-56 h-56 rounded-full shadow-xl" />
        </div>
        <div class="flex flex-col justify-center">
          <h3 class="text-gray-700 dark:text-gray-200 text-5xl font-extrabold">Howdy!</h3>
          <p class="text-gray-500 dark:text-gray-400 text-xl mt-8">I'm Nathan, a web developer in Texas.</p>
        </div>
      </div>
    </div>
    <div class="space-y-12">
      <!--Summary-->
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-300 leading-8">
          Since 2012, I've worked as a full-stack developer, delivering productivity software for clients and developers
          alike. I'm a self-described client-side enthusiast, often reaching for
          <a
            href="https://vuejs.org"
            target="_blank"
            class="text-accent-500 hover:text-accent-300 dark:text-accent-400 hover:dark:text-accent-600"
            >Vue</a
          >,
          <a
            href="https://tailwindcss.com/"
            class="text-accent-500 hover:text-accent-300 dark:text-accent-400 hover:dark:text-accent-600"
            >Tailwind</a
          >
          and
          <a
            href="https://adonisjs.com/"
            class="text-accent-500 hover:text-accent-300 dark:text-accent-400 hover:dark:text-accent-600"
            >AdonisJS</a
          >
          for new projects.
        </p>
      </div>
      <!--Projects-->
      <div>
        <h4 class="text-2xl pb-6 border-b font-extrabold dark:border-gray-600">Projects</h4>
        <div class="space-y-6 mt-6">
          <div v-for="{ icon, title, summary, url } in projects" class="flex items-start space-x-5 h-12">
            <component :is="icon" class="flex-shrink-0 w-5 h-5 text-accent-300 dark:text-accent-500" />
            <p class="flex-grow text-gray-600 dark:text-gray-400">
              <span class="text-gray-800 dark:text-gray-100 font-semibold tracking-wide">{{ title }}</span> &mdash;
              {{ summary }}
            </p>
            <a
              :href="url"
              class="flex-shrink-0 inline-block font-semibold text-accent-500 hover:text-accent-300 dark:text-accent-400 hover:dark:text-accent-600 text-sm"
              target="_blank"
              >Visit</a
            >
          </div>
        </div>
      </div>
      <div>
        <h4 class="text-2xl pb-6 border-b font-extrabold dark:border-gray-600">Latest articles</h4>
        <div class="space-y-10 mt-6">
          <ArticleListItem v-for="article in articles" :key="article.title" :article="article" />
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
