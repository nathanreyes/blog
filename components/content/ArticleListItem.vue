<script setup lang="ts">
interface Article {
  title: string;
  summary: string;
  date: Date;
  _path?: string;
}
interface Props {
  article: Article;
}
const props = defineProps<Props>();
const date = new Date(props.article.date);
</script>
<template>
  <div>
    <p class="text-sm text-gray-400 dark:text-gray-500 font-medium">{{ date.toDateString() }}</p>
    <h3 class="text-xl font-bold text-gray-700 dark:text-gray-300 mt-3">{{ article.title }}</h3>
    <p class="text-gray-500 dark:text-gray-400 mt-2">{{ article.summary }}</p>
    <NuxtLink
      :to="article._path"
      class="inline-block font-semibold text-accent-500 hover:text-accent-300 dark:text-accent-400 hover:dark:text-accent-600 mt-3"
      >Read more</NuxtLink
    >
  </div>
</template>
