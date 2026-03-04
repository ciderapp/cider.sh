<script setup lang="ts">
import { useRoute } from '@booploops/pod-router'

const route = useRoute()
</script>

<template>
  <main class="placeholder">
    <div class="placeholder-inner">
      <h1>{{ route.currentRoute?.name }}</h1>
      <p>This page is under construction. Check back later.</p>
    </div>
  </main>
</template>

<style scoped>
.placeholder {
  min-height: 100vh;
  padding-top: var(--navbar-height);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-inner {
  text-align: center;
}

.placeholder-inner h1 {
  font-size: 28px;
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: 8px;
}

.placeholder-inner p {
  color: var(--color-text-secondary);
  font-size: 15px;
}
</style>
