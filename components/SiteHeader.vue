<template>
  <header class="flex justify-between items-center py-4 max-w-3xl mx-auto">
    <nav class="flex text-accent-500 space-x-2">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="font-bold tracking-wide px-4 py-3 rounded-md hover:bg-accent-50"
        active-class="text-white bg-accent-500 hover:bg-accent-700 shadow-md"
        >{{ link.label }}</NuxtLink
      >
    </nav>
    <div class="flex items-center space-x-2">
      <!--Twitter-->
      <a
        href="https://twitter.com/natedoggit"
        class="inline-flex justify-center items-center p-3 rounded-full text-accent-500 hover:bg-accent-50 cursor-pointer"
        target="_blank"
      >
        <IconTwitter />
      </a>
      <!--Github-->
      <a
        href="https://github.com/nathanreyes"
        class="inline-flex justify-center items-center p-3 rounded-full text-accent-500 hover:bg-accent-50 cursor-pointer"
        target="_blank"
      >
        <IconGithub />
      </a>
    </div>
  </header>
</template>

<script>
export default {
  setup() {
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
    return {
      links,
    };
  },
};
</script>
