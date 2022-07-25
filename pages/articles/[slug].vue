<template>
  <div class="max-w-3xl mx-auto px-4 bg-white dark:bg-gray-800 sm:rounded pb-8">
    <!-- Fetch and display the Markdown document from current path -->
    <ContentDoc class="prose prose-slate dark:prose-invert max-w-none prose-h2:text-2xl prose-h2:font-semibold">
      <!-- Slot if document is not found -->
      <template #not-found>
        <h1 class="text-2xl">Page not found</h1>
      </template>
    </ContentDoc>
  </div>
</template>
