<template>
  <div>
    <SiteHeader v-if="!embedded" />
    <slot />
    <SiteFooter v-if="!embedded" />
  </div>
</template>
<script setup lang="ts">
  const route = useRoute();
  const embedded = route.query.embedded == "true";
</script>
