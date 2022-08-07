---
title: 'Vue Screen Utils: Deep Dive, Part 2'
summary: In part 2 of this 3-part series, I'll share how `vue-screen-utils` observes size changes with HTML elements using ResizeObserver.
date: 2022-08-05T05:00:00.000Z
published: true
---

# Vue Screen Utils: Deep Dive, Part 2

In [part 1](./vue-screen-utils) of this 3-part series, we explored the logic used in [vue-screen-utils](https://github.com/nathanreyes/vue-screen-utils) to evaluate simple media queries. In part 2, we'll explore how it observes size changes with HTML elements using [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

ResizeObserver reports changes to the dimensions of an element's content or border box, or the bounding box of an SVG element. It can do this efficiently, so we can avoid subscribing to window resize events or other hacky solutions.

Much like [Part 1](./vue-screen-utils), we'll start with a simple example. Then, we'll apply the technique in a simple Vue component, and then extract the logic out into a composable function.

## Simple example

First, let's consider a simple example.

```html
<textarea id="textarea" rows="10" />
```

```js
const el = document.querySelector('#textarea');
const resizeObserver = new ResizeObserver((entries) => {
  const entry = entries[0];
  el.value = JSON.stringify(entry.contentRect, null, 2);
});
resizeObserver.observe(el);
```

To observe an element's content rect, we just create a new `ResizeObserver` instance and observe the element. In the callback, we can view the `contentRect` for the first entry. In this example, as you drag the size of the textarea element, the `contentRect` data is printed within the textbox itself.

::alert
By default, the observer will observe changes to the element's `content-box`, which is the size of the content area as defined in CSS. Other options are observing the `border-box` (size of the box border area as defined in CSS) or `device-pixel-content-box` (size of the content area as defined in CSS, in device pixels).
::

View this example in [Code Sandbox](https://codesandbox.io/s/vue-screen-utils-resize-observer-1-qfn3io).

## Component integration

Let's take a first attempt to integrate this code for integration within a Vue component.

```vue
<template>
  <div>
    <textarea ref="textarea" :value="textContent" rows="10" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const textarea = ref(null);
let observer = null;
const rect = ref();
const textContent = computed(() => JSON.stringify(rect.value || '', null, 2));

const listener = (entries) => {
  const entry = entries[0];
  rect.value = entry.contentRect;
};

watch(
  () => textarea.value,
  (val) => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
    if (window && 'ResizeObserver' in window && val) {
      observer = new ResizeObserver(listener);
      observer.observe(textarea.value);
    }
  },
  {
    immediate: true,
    flush: 'post',
  }
);
</script>
```

There are a few differences from the simple example above worth discussing.

First, we use Vue's method of getting access to the element by adding the `textarea` ref to the element. Then, we simply create the ref in our script section.

```html
<textarea ref="textarea" ... />
```

```js
const textarea = ref(null);
```

Since the `textarea` ref value will get updated when the component is mounted, we can simply watch it and setup the `ResizeObserver` when a new element value is assigned. This is why we don't need to set anything up in the `onMounted` hook.

```js
watch(
  () => textarea.value,
  (val) => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
    if (window && 'ResizeObserver' in window && val) {
      observer = new ResizeObserver(listener);
      observer.observe(textarea.value);
    }
  },
  {
    immediate: true,
    flush: 'post',
  }
);
```

Notice that before we create the observer, we make sure to check if it already exists and disconnect it if so. Also, we pass the `flush: 'post'` option to the `watch()` function because we want Vue to update the DOM before it calls our watcher.

### Refactor for cleanup

We still need to disconnect the observer when the component is unmounted, so let's extract that logic into a separate `stopObserver()` method. For good measure, we can stop watching the `textarea` ref during that time as well.

```js
let observer = null;

const stopObserver = () => {
  if (observer) {
    observer.disconnect();
    observer = undefined;
  }
};

const stopWatch = watch(
  () => textarea.value,
  (val) => {
    stopObserver();
    if (window && 'ResizeObserver' in window && val) {
      observer = new ResizeObserver(listener);
      observer.observe(textarea.value);
    }
  }
);
```

Now, when the component is unmounted, we can stop the observer and stop the watcher in a separate `cleanup()` method.

```js
const cleanup = () => {
  stopObserver();
  stopWatch();
};

onUnmounted(() => cleanup());
```

In summary, this is the component code.

```vue
<template>
  <div>
    <textarea ref="textarea" :value="textContent" rows="10" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';

const textarea = ref(null);
let observer = null;
const rect = ref();
const textContent = computed(() => JSON.stringify(rect.value || '', null, 2));

const listener = (entries) => {
  const entry = entries[0];
  rect.value = entry.contentRect;
};

const stopObserver = () => {
  if (observer) {
    observer.disconnect();
    observer = undefined;
  }
};

const stopWatch = watch(
  () => textarea.value,
  (val) => {
    stopObserver();
    if (window && 'ResizeObserver' in window && val) {
      observer = new ResizeObserver(listener);
      observer.observe(textarea.value);
    }
  }
);

const cleanup = () => {
  stopObserver();
  stopWatch();
};

onUnmounted(() => cleanup());
</script>
```

View this example in [Code Sandbox](https://codesandbox.io/s/vue-screen-utils-resize-observer-2-s8jey3).

## Building the composable

Our component integration is now setup to properly setup and cleanup the `ResizeObserver`.

However, there is a lot of code here. We definitely want to extract it into a composable that can easily be reused across multiple components.

Much like [part 1](./vue-screen-utils), we can first express the desired API.

```vue
<!-- ParentComponent.vue -->

<template>
  <div>
    <textarea ref="textarea" :value="textContent" rows="10" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useResizeObserver } from '@/use/resizeObserver';

const textarea = ref(null);
const { rect } = useResizeObserver(textarea);
const textContent = computed(() => JSON.stringify(rect.value || '', null, 2));
</script>
```

If we simply copy the code we had into a separate function (with slight adjustments), we are left with the following code.

```js
// src/use/resizeObserver.js

import { ref, watch, onUnmounted } from 'vue';

export function useResizeObserver(target, options = {}) {
  let observer = null;
  const rect = ref();

  const listener = (entries) => {
    const entry = entries[0];
    rect.value = entry.contentRect;
  };

  const stopObserver = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };
  const stopWatch = watch(
    () => target.value,
    (val) => {
      stopObserver();
      if (window && 'ResizeObserver' in window && val) {
        observer = new ResizeObserver(listener);
        observer.observe(target.value, options);
      }
    }
  );

  const cleanup = () => {
    stopObserver();
    stopWatch();
  };

  onUnmounted(() => cleanup());

  return { rect, cleanup };
}
```

The first change we made was adding an `options` parameter that gets passed when observing the target value.

```js
// src/use/resizeObserver.js

export function useResizeObserver(target, options = {}) {
  // ...
  if (window && 'ResizeObserver' in window && val) {
    observer = new ResizeObserver(listener);
    observer.observe(target.value, options);
  }
  // ...
}
```

This would allow the consumer to observe `boder-box` or `device-pixel-content-box` box models.

```js
// ParentComponent.vue

import { useResizeObserver } from '@/use/resizeObserver';
// ...
const { rect } = useResizeObserver(textarea, { box: 'border-box' });
```

Finally, note that we export the `rect` ref and the `cleanup()` function to support manual cleanup by the consumer.

### Handle custom callback

If the consumer wants access to the raw data passed to the event handler by the `ResizeObserver`, we can add a separate `callback` parameter that gets called within our `listener()` function.

```js
export function useResizeObserver(target, callback = null, options = {}) {
  // ...
  const listener = (..args) => {
    if (callback) callback(...args);
    // `entries` is now the first element in `args`
    const entry = args[0][0];
    rect.value = entry.contentRect;
  };
  // ...
}
```

### Handling Vue component refs

Until now, our examples have simply been observing a `textarea` element for size changes. Now that we have extracted the logic into a separate composable function, it would be nice to support Vue component refs as well.

```vue
<!-- ParentComponent.vue -->

<template>
  <MyCustomComponent ref="myComponent" />
</template>

<script setup>
import { ref } from 'vue';
import { useResizeObserver } from '@/use/resizeObserver';

const myComponent = ref(null);
const { rect } = useResizeObserver(myComponent);
</script>
```

To support this option, the composable can use the component's `$el` property to observe the root DOM node that the component instance is managing.

```js
// useResizeObserver.js
const stopWatch = watch(
  () => target.value,
  (elOrComp) => {
    stopObserver();
    if (window && 'ResizeObserver' in window && elOrComp) {
      observer = new ResizeObserver(listener);
      observer.observe(elOrComp.$el ?? elOrComp, resizeOptions);
    }
  },
  { immediate: true, flush: 'post' }
);
```

Now we have a fully composable function that can observe a ref for an HTML element or Vue component. At this point, within the consumer component, you could create your own computed property derived from the target `rect`, including `width`, `height`, `top`, `bottom`, `left`, `right`, `x` or `y`.

```js
const { rect } = useResizeObserver(myComponent);
const width = computed(() => rect.value.width);
const height = computed(() => rect.value.height);
```

## Wrap-up

In part 2 of this series, we showed a simple use of the `ResizeObserver` API. We applied the logic into a separate Vue component, and then extracted the logic into a separate composable function in the same way that it is achieved in [`vue-screen-utils`](https://github.com/nathanreyes/vue-screen-utils).

While we kept the example simple for the scope of this article, I'd recommend [this tutorial](https://blog.logrocket.com/how-to-use-the-resizeobserver-api-a-tutorial-with-examples/), written by my co-worker and friend [Kevin Drum](https://kevindrum.com), for a more advanced use case of the `ResizeObserver` API.

In part 3, we'll explore on a more specialized use-case of creating computed values from different screen sizes in a simple, declarative manner.
