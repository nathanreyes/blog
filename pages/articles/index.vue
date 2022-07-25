<script setup lang="ts">
const { data: articles } = await useAsyncData('articles', () =>
  queryContent('/articles').where({ published: true }).sort({ date: 0 }).find()
);
</script>
<template>
  <main class="max-w-3xl mx-auto px-4 mb-8">
    <div class="my-6">
      <h2 class="text-3xl text-gray-800 font-bold">Articles</h2>
      <div class="space-y-10 mt-8">
        <ArticleListItem v-for="article in articles" :key="article.date" :article="article" />
      </div>
    </div>
  </main>
</template>
