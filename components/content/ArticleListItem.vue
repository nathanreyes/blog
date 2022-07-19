<script setup lang="ts">
interface Article {
  title: string;
  description: string;
  date: string;
  _path: string;
}
interface Props {
  article: Article;
}
const props = defineProps<Props>();
const date = new Date(props.article.date);
</script>
<template>
  <div>
    <p class="text-sm text-gray-400 font-medium">{{ date.toDateString() }}</p>
    <h3 class="text-2xl font-bold text-gray-800 mt-2">{{ article.title }}</h3>
    <p class="text-gray-500 mt-3">{{ article.description }}</p>
    <NuxtLink :to="article._path" class="inline-block font-semibold text-indigo-500 hover:text-indigo-300 mt-3"
      >Read more</NuxtLink
    >
  </div>
</template>
