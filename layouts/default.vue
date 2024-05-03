<template>
  <div>
    <Header v-if="!embedded" />
    <slot />
    <Footer v-if="!embedded" />
  </div>
</template>
<script setup lang="ts">
  const route = useRoute();
  const embedded = route.query.embedded == "true";
  useHead({
    meta: [
      { property: "og:title", content: `${route.meta.title} - Cider Collective` },
      { property: "twitter:title", content: `${route.meta.title} - Cider Collective` },
    ],
  });
</script>
