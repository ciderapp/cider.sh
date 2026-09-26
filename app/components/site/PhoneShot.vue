<template>
  <figure class="sg-phone">
    <img v-if="src && glow" :src="src" alt="" aria-hidden="true" class="sg-showcase__glow" />
    <div class="sg-phone__frame">
      <div class="sg-phone__screen">
        <img
          v-if="src"
          :src="src"
          :alt="alt"
          :loading="loading"
          decoding="async"
          class="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div v-else class="flex h-full flex-col items-center justify-center gap-3 p-6 text-center" role="img" :aria-label="alt">
          <Icon name="lucide:smartphone" class="h-6 w-6 text-chalk-mute" aria-hidden="true" />
          <span class="font-label text-[11px] text-chalk-mute">{{ alt }}</span>
        </div>
        <span class="sg-shot__bezel" aria-hidden="true" />
      </div>
    </div>
  </figure>
</template>

<script lang="ts" setup>
  // Until a screenshot is supplied, the frame shows what belongs in it.
  withDefaults(
    defineProps<{
      alt: string;
      src?: string;
      loading?: "eager" | "lazy";
      glow?: boolean;
    }>(),
    { src: undefined, loading: "lazy", glow: true }
  );
</script>
