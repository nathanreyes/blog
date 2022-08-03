---
title: 'Vue Screen Utils: Part 1'
summary: In part 1 of this 3-part series, I'll share how this utility is used to evaluate simple media queries.
date: 2022-07-21T05:00:00.000Z
published: true
---

# Vue Screen Utils: Part 1

[Media queries](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) and [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) are some of the most useful ways to get notifications about size and layout changes in your web application. With Vue 3, we can harness their power in some pretty interesting ways.

In part 1 of this 3-part series, we'll explore the logic used in [vue-screen-utils](https://github.com/nathanreyes/vue-screen-utils) to evaluate simple media queries. In part 2, we'll explore how it is used to observe size changes with HTML elements using ResizeObserver. Finally, in part 3 will touch on a more specialized use-case of creating computed values from different screen sizes in a simple, declarative manner.

To get started, import the package into your Vue application.

```sh
npm i vue-screen-utils
```

## Media queries

With media queries, we can get information about a device's general environment (print vs. screen), screen resolution, viewport dimensions and other handy [media features](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#syntax). With `window.matchMedia`, we can bring all this information into our Vue apps in simple, expressive ways.

Let consider a simple CSS media query.

```js
const mediaQuery = '(max-width: 400px)';
```

To get updates when the browser match status changes (matched or unmatched), we can register an event listener on a `MediaQueryList` object returned from `window.matchMedia`.

```js
const mediaQueryList = window.matchMedia(mediaQuery);
mediaQueryList.addEventListener('change', (event) => {
  if (event.matches) {
    console.log('The window is less than 400px');
  } else {
    console.log('The window is greater than 400px');
  }
});
```

Simple enough. If we want to apply this into a more useful example within a Vue component, we can do the following.

::vue-screen-utils
::

```vue
<template>
  <div class="flex space-x-2 px-4 py-2 bg-gray-100 border rounded-md">
    <span class="font-bold">Matches:</span><span>{{ matches }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const matches = ref(false);

const listener = (event) => {
  matches.value = event.matches;
};

const mediaQuery = '(max-width: 400px)';
let mediaQueryList = null;

onMounted(() => {
  mediaQueryList = window.matchMedia(mediaQuery);
  mediaQueryList.addEventListener('change', listener);
  matches.value = mediaQueryList.matches;
});

onUnmounted(() => {
  if (mediaQueryList) {
    mediaQueryList.removeEventListener('change', listener);
    mediaQueryList = undefined;
  }
});
</script>
```

Let's quickly examine the code above.

First, we really only want to know if a media query matches or not. We can create a simple `matches` ref to store that value.

Then we extract the media query event listener into a separate function so that it can be easily cleaned up when the component is unmounted (end of the script).

Finally, we create the query and register the media query handler just like before. Also, we wait until the component is mounted to ensure that the `window` is more likely available.

## Refactor

While we now have a working pattern for working with media queries in Vue, there is still an opportunity for encapsulating this logic so that it can be made more reusable in the future, as well as cleaning up the code from our consumer components.

We can declaratively express how we'd like such an api to work.

```vue
<script setup>
import { useMediaQuery } from './useMediaQuery';

const { matches } = useMediaQuery('(max-width: 400px)');
</script>
```

Here, there is clearly less mental overhead involved in understanding the primary objective, which is evaluating a media query. Less code allows our component to be more easily understood in real-world use and makes working with media queries more maintainable since it is relegated to a single function.

```js
// useMediaQuery.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useMediaQuery(query: string, callback: (ev?: MediaQueryListEvent) => void) {
  let mediaQuery: MediaQueryList | undefined;
  const matches = ref(false);

  // Wrap optional callback to assign `matches`
  function listener(ev: MediaQueryListEvent) {
    if (callback) callback(ev);
    matches.value = ev.matches;
  }

  function cleanup() {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', listener);
      mediaQuery = undefined;
    }
  }

  function setup(newQuery = query) {
    cleanup();
    if (window && 'matchMedia' in window && newQuery) {
      mediaQuery = window.matchMedia(newQuery);
      mediaQuery.addEventListener('change', listener);
      matches.value = mediaQuery.matches;
    }
  }

  onMounted(() => setup());

  onUnmounted(() => cleanup());

  return { matches, setup, cleanup };
}
```

The function is very similar to the code we had in the Vue component.

First, we want to support passing a callback function, just in case the consumer is interested in inspecting the raw event data. The callback function argument is wrapped into a the separate `listener()` function so that the exported `matches` ref can be updated.

Another item of note is we extract the code for adding and removing the event listener into separate functions so that they can be exported for the consumer to manually call if desired. We still call `setup()` in `onMounted` and `cleanup()` in `onUnmounted`, so manually calling is most likely not necessary.

## Wrap-up

In part 1 of this series, we showed a simple use of the `window.matchMedia` function. Then, we adapted the logic for use into a Vue component. Finally, we saw how the logic could be extracted into a `useMediaQuery` composable function to be re-used and easily maintained.

In fact, this is the same function that `vue-screen-utils` provides. But now you can build it yourself.

```js
import { useMediaQuery } from 'vue-screen-utils';

const { matches } = useMediaQuery('(max-width: 400px)');
```

In part 2, we'll apply many of the same concepts for observing element size changes using the `ResizeObserver` api.
