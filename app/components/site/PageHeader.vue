<template>
  <div class="border-b border-ink-line bg-ink text-chalk">
    <div class="sg-shell pb-10 pt-14 md:pb-14 md:pt-20 lg:pb-16 lg:pt-24">
      <p v-if="eyebrow" class="font-label text-xs text-signal">{{ eyebrow }}</p>
      <h1
        class="mt-4 max-w-[14em] text-balance text-[44px] font-extrabold uppercase leading-[0.92] tracking-[-0.045em] md:mt-5 md:text-[72px] lg:text-[96px]"
      >
        <slot name="title">{{ title }}</slot>
      </h1>
      <p
        v-if="description"
        class="mt-5 max-w-[640px] text-pretty text-[17px] leading-normal text-chalk-dim md:mt-6 md:text-lg lg:text-xl"
      >
        {{ description }}
      </p>
      <div v-if="$slots.default" class="mt-7 flex flex-col gap-2.5 sm:flex-row lg:mt-9">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    /** Small mono label above the title */
    eyebrow?: string;
    title?: string;
    description?: string;
  }>();
</script>
