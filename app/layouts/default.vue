<template>
  <div class="pb-20 md:pb-0">
    <Header v-if="!embedded" />
    <slot />
    <Footer v-if="!embedded" />
    <MobileBottomNav v-if="!embedded" />
  </div>
</template>
<script setup lang="ts">
  const route = useRoute();
  const embedded = route.query.embedded == "true";
</script>
