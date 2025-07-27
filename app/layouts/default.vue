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
</script>
