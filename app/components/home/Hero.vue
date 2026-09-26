<template>
  <section aria-labelledby="home-hero-title" class="bg-ink text-chalk">
    <h1 id="home-hero-title" class="sr-only">{{ t("hero.title") }}, {{ t("hero.subtitle") }}</h1>

    <div
      class="flex h-[84px] items-center overflow-hidden border-b border-ink-line md:h-[140px] lg:h-[184px]"
      aria-hidden="true"
    >
      <div class="sg-marquee sg-marquee--slow">
        <span v-for="n in 4" :key="n">
          <span class="sg-tk sg-outline px-[18px] text-[80px] md:px-8 md:text-[140px] lg:px-11 lg:text-[200px]">
            {{ t("hero.title") }}
          </span>
          <span class="sg-dot h-4 w-4 md:h-[26px] md:w-[26px] lg:h-9 lg:w-9" />
        </span>
      </div>
    </div>

    <div
      class="flex h-[84px] items-center overflow-hidden border-b border-ink-line bg-signal text-ink md:h-[140px] lg:h-[184px]"
      aria-hidden="true"
    >
      <div class="sg-marquee sg-marquee--reverse">
        <span v-for="n in 6" :key="n">
          <span class="sg-tk px-[18px] text-[80px] md:px-8 md:text-[140px] lg:px-11 lg:text-[200px]">
            {{ t("hero.subtitle") }}
          </span>
          <span class="sg-dot sg-dot--ink h-4 w-4 md:h-[26px] md:w-[26px] lg:h-9 lg:w-9" />
        </span>
      </div>
    </div>

    <div class="sg-shell grid gap-6 pb-8 pt-7 md:pb-12 md:pt-10 lg:grid-cols-12 lg:items-end lg:gap-x-6 lg:pb-16 lg:pt-14">
      <div class="lg:col-span-6">
        <img v-if="uwu" src="/uwu-logo.png" alt="Cider" class="mb-6 w-48 md:w-64" />
        <p class="text-pretty text-[17px] leading-normal md:max-w-[600px] md:text-lg lg:max-w-none lg:text-[22px] lg:leading-[1.45]">
          {{ t("hero.description") }}
        </p>
        <ul class="mt-5 flex items-center gap-[18px] text-chalk-dim md:gap-5 lg:mt-6 lg:gap-[22px]" aria-label="Available on">
          <li v-for="platform in platforms" :key="platform.name">
            <Icon :name="platform.icon" class="h-6 w-6 lg:h-7 lg:w-7" aria-hidden="true" />
            <span class="sr-only">{{ platform.name }}</span>
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-2.5 sm:flex-row lg:col-span-5 lg:col-start-8 lg:justify-end">
        <NuxtLink to="/downloads" class="sg-btn sg-btn--primary android:hidden sm:min-w-[220px]">
          {{ t("hero.get_cider") }}
          <Icon name="lucide:arrow-right" class="sg-arrow h-4 w-4" aria-hidden="true" />
        </NuxtLink>
        <NuxtLink to="/downloads/android" class="sg-btn sg-btn--primary hidden android:inline-flex sm:min-w-[220px]">
          Get Cider for Android
          <Icon name="lucide:arrow-right" class="sg-arrow h-4 w-4" aria-hidden="true" />
        </NuxtLink>
        <NuxtLink to="/learn-more" class="sg-btn sg-btn--ghost">{{ t("hero.learn_more") }}</NuxtLink>
      </div>
    </div>

    <div class="sg-shell pb-14 md:pb-20 lg:pb-28">
      <SiteShowcaseCarousel :slides="screens" :width="2395" :height="1065" loading="eager" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  defineProps<{ uwu?: boolean }>();

  const { t } = useI18n();

  const platforms = [
    { name: "Windows", icon: "mdi:microsoft-windows" },
    { name: "macOS", icon: "mdi:apple" },
    { name: "Linux", icon: "mdi:linux" },
    { name: "Android", icon: "mdi:android" },
  ];

  const screens = [
    {
      src: "/client/album.webp",
      alt: "Cider on Windows showing an album page with the Up Next queue",
      label: "Album",
    },
    {
      src: "/client/artist.webp",
      alt: "An artist page in Cider, with top songs and upcoming concerts",
      label: "Artist",
    },
    {
      src: "/client/immersive.webp",
      alt: "Cider in Immersive mode, with full-screen artwork and synced lyrics",
      label: "Immersive",
      bleed: true,
    },
  ];
</script>
