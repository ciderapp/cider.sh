<script setup lang="ts">
import { computed } from 'vue'
import { NucleoIcons } from '@/icons'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
  }>(),
  { size: 18 },
)

const svg = computed(() => NucleoIcons[props.name] ?? '')
const px = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
  <span
    v-if="svg"
    class="n-icon"
    :style="{ width: px, height: px }"
    aria-hidden="true"
    v-html="svg"
  />
</template>

<style scoped>
.n-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
}

.n-icon :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>
