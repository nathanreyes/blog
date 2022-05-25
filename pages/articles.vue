<script setup>
const include = ['title', 'description', 'image', '_path', 'date'];
const { data: articles } = await useAsyncData('articles', () => queryContent('/articles').only(include).find());
</script>
<template>
  <main class="max-w-3xl mx-auto px-4 mb-8">
    <h2 class="text-3xl text-gray-800 font-bold">Articles</h2>
    <div class="space-y-4 mt-10">
      <ArticleListItem v-for="article in articles" :key="article" :article="article" />
    </div>
  </main>
</template>
