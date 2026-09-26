<template>
  <dl
    class="grid grid-cols-[112px_minmax(0,1fr)] border-t border-ink-line font-label text-xs lg:grid-cols-[160px_minmax(0,1fr)]"
  >
    <template v-for="row in rows" :key="row.label">
      <dt class="border-b border-ink-line py-3.5 text-chalk-mute">{{ row.label }}</dt>
      <dd class="border-b border-ink-line py-3.5">
        <NuxtLink v-if="row.to" :to="row.to" class="sg-focus text-signal hover:underline hover:underline-offset-2">
          {{ row.value }}
        </NuxtLink>
        <a v-else-if="row.href" :href="row.href" target="_blank" rel="noopener" class="sg-focus hover:text-signal">
          {{ row.value }}
        </a>
        <template v-else>{{ row.value }}</template>
      </dd>
    </template>
  </dl>
</template>

<script lang="ts" setup>
  // Label and value rows in mono type, as used beside product screenshots.
  defineProps<{
    rows: Array<{ label: string; value: string; to?: string; href?: string }>;
  }>();
</script>
