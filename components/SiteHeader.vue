<template>
  <header class="flex justify-between items-center py-6 max-w-4xl mx-auto">
    <nav class="flex text-gray-800 space-x-3">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="font-bold tracking-wide px-4 py-3 rounded-md hover:bg-gray-100"
        active-class="text-white bg-gray-900 hover:bg-gray-800 shadow"
        >{{ link.label }}</NuxtLink
      >
    </nav>
    <div class="flex items-center space-x-2">
      <!--Resume-->
      <NuxtLink
        to="/resume"
        class="inline-flex justify-center items-center p-3 rounded-full hover:bg-gray-100 cursor-pointer"
        active-class="text-white bg-gray-900 hover:bg-gray-800 shadow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-file-text"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </NuxtLink>
      <!--Twitter-->
      <a
        href="https://twitter.com/natedoggit"
        class="inline-flex justify-center items-center p-3 rounded-full hover:bg-gray-100 cursor-pointer"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
          ></path>
        </svg>
      </a>
      <!--Github-->
      <a
        href="https://github.com/nathanreyes"
        class="inline-flex justify-center items-center p-3 rounded-full hover:bg-gray-100 cursor-pointer"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-github"
        >
          <path
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
          ></path>
        </svg>
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
      // {
      //   label: 'Projects',
      //   to: '/projects',
      // },
      {
        label: 'Blog',
        to: '/blog',
      },
      {
        label: 'Screencasts',
        to: '/screencasts',
      },
    ]);
    return {
      links,
    };
  },
};
</script>
