<template>
  <NuxtLayout>
    <main class="bg-ink text-chalk">
      <div class="sg-shell flex min-h-[70vh] flex-col justify-center py-20">
        <p aria-hidden="true" class="sg-tk sg-outline text-[120px] leading-[0.8] md:text-[200px] lg:text-[260px]">
          {{ statusCode }}
        </p>
        <h1
          class="mt-8 max-w-[14em] text-balance text-[40px] font-extrabold uppercase leading-[0.9] tracking-[-0.045em] md:text-[64px]"
        >
          {{ title }}
        </h1>
        <p class="mt-5 max-w-[520px] text-pretty text-[17px] leading-relaxed text-chalk-dim md:text-lg">{{ detail }}</p>
        <div class="mt-8 flex flex-col gap-2.5 sm:flex-row">
          <button type="button" class="sg-btn sg-btn--primary sm:min-w-[220px]" @click="clearError({ redirect: '/' })">
            Take me home
            <Icon name="lucide:arrow-right" class="sg-arrow h-4 w-4" aria-hidden="true" />
          </button>
          <a href="https://discord.gg/applemusic" target="_blank" rel="noopener" class="sg-btn sg-btn--ghost">
            Ask on Discord
          </a>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<script lang="ts" setup>
  import type { NuxtError } from "#app";

  // Nuxt hands the error page a single `error` object.
  const props = defineProps<{ error: NuxtError }>();

  const statusCode = computed(() => props.error?.statusCode ?? 500);
  const title = computed(() =>
    statusCode.value === 404 ? "We can't find this page" : "Something went wrong on our end"
  );
  const detail = computed(() =>
    statusCode.value === 404
      ? "The link may be broken, or the page may have moved."
      : "Try again in a moment. If it keeps happening, let us know on Discord."
  );

  useSeoMeta({ title });
</script>
