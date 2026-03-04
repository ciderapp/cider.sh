<script setup lang="ts">
defineProps<{ open: boolean }>()
</script>

<template>
  <div class="menu-toggle" :class="{ open }">
    <span class="dot dot-1" />
    <span class="dot dot-2" />
    <span class="dot dot-3" />
  </div>
</template>

<style scoped>
.menu-toggle {
  position: relative;
  width: 20px;
  height: 20px;
}

.dot {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  top: 50%;
  left: 50%;
  transition: all 0.3s var(--ease-out-expo);
}

.dot-1 {
  transform: translate(calc(-50% - 6px), -50%);
}

.dot-2 {
  transform: translate(-50%, -50%);
}

.dot-3 {
  transform: translate(calc(-50% + 6px), -50%);
}

.open .dot-1 {
  width: 16px;
  height: 2px;
  border-radius: 1px;
  transform: translate(-50%, -50%) rotate(45deg);
}

.open .dot-2 {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
}

.open .dot-3 {
  width: 16px;
  height: 2px;
  border-radius: 1px;
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>
