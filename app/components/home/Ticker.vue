<template>
  <section
    aria-label="Integrations and platforms"
    class="flex h-[88px] items-center overflow-hidden border-y border-ink-line bg-ink text-chalk md:h-[112px] lg:h-[140px]"
  >
    <div class="sg-marquee">
      <span v-for="copy in 2" :key="copy" :aria-hidden="copy > 1 ? 'true' : undefined">
        <template v-for="(item, i) in items" :key="item">
          <span
            class="sg-tk px-[22px] text-5xl md:px-[30px] md:text-[64px] lg:px-10 lg:text-[88px]"
            :class="{ 'sg-outline': i % 2 === 1 }"
          >
            {{ item }}
          </span>
          <span class="sg-dot h-2.5 w-2.5 md:h-3.5 md:w-3.5 lg:h-[18px] lg:w-[18px]" aria-hidden="true" />
        </template>
      </span>
    </div>
  </section>
</template>

<script lang="ts" setup>
  const items = ["Discord", "Last.fm", "Immersive", "Windows", "macOS", "Linux", "Android", "Cider Remote", "Plugins"];
</script>
