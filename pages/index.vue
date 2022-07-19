<script setup lang="ts">
const projects = [
  {
    icon: resolveComponent('IconCalendar'),
    title: 'V-Calendar',
    description: 'An elegant calendar and datepicker plugin for Vue.',
    url: 'https://vcalendar.io',
  },
  {
    icon: resolveComponent('IconMaximize'),
    title: 'Vue Screen Utils',
    description: 'A dependency-free collection of utility plugins and functions for using media queries in Vue 3.',
    url: 'https://github.com/nathanreyes/vue-screen-utils',
  },
  {
    icon: resolveComponent('IconCoffee'),
    title: 'GifMyCoffee',
    description: `A free coffee timer app that helps people brew various coffee recipes using gifs.`,
    url: 'https://gifmycoffee.com',
  },
];
</script>

<template>
  <main class="max-w-3xl mx-auto mb-8">
    <!--Intro-->
    <div class="py-12">
      <div class="flex space-x-14">
        <div class="flex-shrink-0 flex-grow-0">
          <img src="assets/profile.jpg" class="w-56 h-56 rounded-full shadow-xl" />
        </div>
        <div class="flex flex-col justify-center">
          <h3 class="text-gray-700 text-6xl font-medium">Howdy!</h3>
          <p class="text-gray-500 text-xl mt-8">I'm Nathan, a web developer in Texas.</p>
        </div>
      </div>
    </div>
    <div class="space-y-12">
      <!--Summary-->
      <div class="space-y-4">
        <p class="text-gray-600 leading-8">
          Since 2012, I've worked as a full-stack developer, delivering productivity software for clients and developers
          alike. I'm a self-described client-side enthusiast, often reaching for Vue, Tailwind and Adonis for new
          projects.
        </p>
      </div>
      <!--Projects-->
      <div>
        <h4 class="uppercase text-sm font-semibold tracking-wide text-gray-400">Projects</h4>
        <div class="space-y-6 mt-6">
          <div v-for="{ icon, title, description, url } in projects" class="flex items-start space-x-6 h-12">
            <component :is="icon" class="flex-shrink-0 w-6 h-6 text-accent-300" />
            <p class="flex-grow text-gray-600">
              <span class="text-gray-800 font-semibold tracking-wide">{{ title }}</span> &mdash; {{ description }}
            </p>
            <a
              :href="url"
              class="flex-shrink-0 inline-block font-semibold text-indigo-500 hover:text-indigo-300 text-sm"
              target="_blank"
              >Visit</a
            >
          </div>
        </div>
      </div>
      <div class="space-y-4">
        <h4 class="uppercase text-sm font-semibold tracking-wide text-gray-400">Latest Posts</h4>
      </div>
    </div>
  </main>
</template>

<style></style>
