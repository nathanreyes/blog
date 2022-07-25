<script setup lang="ts">
import type { Article } from '@/types';

const { data: articles } = await useAsyncData('articles', () =>
  queryContent<Article>('/articles').where({ published: true }).sort({ date: 0 }).find()
);
</script>
<template>
  <main class="max-w-3xl mx-auto px-4 pb-8">
    <div class="my-6">
      <h2 class="text-3xl font-bold">Articles</h2>
      <div class="space-y-10 mt-8">
        <ArticleListItem v-for="article in articles" :key="article.title" :article="article" />
      </div>
    </div>
  </main>
</template>
