<template>
  <section aria-labelledby="home-cta-title" class="sg-on-signal bg-signal text-ink">
    <div class="sg-hazard h-4 md:h-5" aria-hidden="true" />
    <div class="sg-shell grid items-center gap-y-6 py-12 md:py-[72px] lg:grid-cols-12 lg:gap-x-6 lg:py-[88px]">
      <div class="flex justify-end lg:order-2 lg:col-span-3" aria-hidden="true">
        <svg viewBox="0 0 380 380" class="h-[72px] w-[72px] md:h-40 md:w-40 lg:h-[318px] lg:w-[318px]">
          <circle
            class="sg-spin"
            cx="190"
            cy="190"
            r="172"
            fill="none"
            stroke="currentColor"
            stroke-width="10"
            stroke-dasharray="2 11.5"
          />
          <circle cx="190" cy="190" r="118" fill="none" stroke="currentColor" stroke-width="22" />
          <path d="M165 140 L232 190 L165 240 Z" fill="currentColor" stroke="currentColor" stroke-width="10" stroke-linejoin="round" />
        </svg>
      </div>

      <div class="lg:order-1 lg:col-span-9">
        <h2
          id="home-cta-title"
          class="text-[76px] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] md:text-[112px] lg:text-[150px]"
        >
          Ready<br class="md:hidden" />
          to get<br />
          started?
        </h2>
        <p class="mt-5 max-w-[560px] text-lg font-medium leading-[1.45] md:mt-7 lg:text-[22px]">
          Join thousands of other users and elevate your Apple Music experience today.
        </p>
        <div class="mt-7 flex flex-col gap-2.5 sm:flex-row lg:mt-10">
          <NuxtLink to="/downloads" class="sg-btn sg-btn--ink sm:min-w-[220px]">
            {{ t("hero.get_cider") }}
            <Icon name="lucide:arrow-right" class="sg-arrow h-4 w-4" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink to="/learn-more" class="sg-btn sg-btn--outline-ink">{{ t("hero.learn_more") }}</NuxtLink>
        </div>
      </div>
    </div>
    <div class="sg-hazard h-4 md:h-5" aria-hidden="true" />
  </section>
</template>

<script lang="ts" setup>
  const { t } = useI18n();
</script>
