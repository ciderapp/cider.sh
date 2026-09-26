<template>
  <img
    v-if="image"
    :src="image"
    :alt="alt"
    :loading="loading"
    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
  />
  <div
    v-else
    class="relative flex h-full w-full items-end overflow-hidden bg-ink-raised p-5 [container-type:inline-size] md:p-6"
    role="img"
    :aria-label="alt"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_100%_0%,rgba(255,43,94,0.2),transparent_70%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      aria-hidden="true"
    />
    <span
      class="sg-outline relative whitespace-nowrap text-[26cqw] font-extrabold leading-[0.8] tracking-[-0.045em]"
      aria-hidden="true"
    >
      {{ version }}
    </span>
  </div>
</template>

<script lang="ts" setup>
  // Releases without artwork get their version number set in outline type. The template
  // keeps a single root (no comments between v-if and v-else) so class fallthrough hydrates.
  withDefaults(
    defineProps<{
      version: string;
      alt: string;
      image?: string;
      loading?: "lazy" | "eager";
    }>(),
    { image: undefined, loading: "lazy" }
  );
</script>
