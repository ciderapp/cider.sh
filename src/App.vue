<script setup lang="ts">
import { defineComponent } from 'vue'
import { PodRouter } from '@booploops/pod-router'
import Navbar from './components/Navbar.vue'
import { routes, routeTitles } from './router'

const SUFFIX = ' | Cider Collective'

function updateHead(path: string) {
  const title = (routeTitles[path] ?? 'Cider') + SUFFIX
  document.title = title
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', title)
  document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', title)
}

const HeadUpdater = defineComponent({
  props: { path: { type: String, required: true } },
  watch: {
    path: { handler(val: string) { updateHead(val) }, immediate: true },
  },
  render() { return null },
})
</script>

<template>
  <PodRouter :routes="routes" history="history">
    <template #default="{ Component, route }">
      <Navbar />
      <HeadUpdater :path="route.path" />
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </template>
  </PodRouter>
</template>

<style>
.page-enter-active {
  transition:
    opacity 350ms cubic-bezier(0.1, 0.9, 0.2, 1),
    transform 350ms cubic-bezier(0.1, 0.9, 0.2, 1);
}

.page-leave-active {
  transition: opacity 100ms cubic-bezier(0.1, 0.9, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.page-leave-to {
  opacity: 0;
}
</style>
