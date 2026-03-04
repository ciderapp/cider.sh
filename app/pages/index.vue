<script lang="ts" setup>
  const { t, locale } = useI18n();

  useSeoMeta({
    title: t('seo.title'),
    description: t('seo.description'),
    ogDescription: t('seo.description'),
    twitterDescription: t('seo.description'),
    ogImage: "/og.png",
    twitterImage: "/og.png",
  });

  interface RiseChangelogDetail {
    shortDesc: string;
    longDesc: string;
    thumbnail?: string;
    highlights: Array<{
      name: string;
      desc: string;
      icon: string;
    }>;
    version: string;
    lastUpdated: number;
  }


  const { data } = await useAsyncData("latest-release", async () => {
    try {
      const response = await $fetch<RiseChangelogDetail>('/api/changelogs/latest');
      
      return [{
        _path: `/changelogs/${response.version}`,
        navigation: {
          headline: `New Release: Cider ${response.version}`,
          date: new Date(response.lastUpdated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        },
        title: `Cider ${response.version}`,
        description: response.shortDesc
      }];
    } catch (error) {
      console.error('Failed to fetch latest release:', error);
      return null;
    }
  });

  const path = useRoute().fullPath;
  const isUwu = ref(false);
  if (path.includes("?uwu")) {
    isUwu.value = true;
  }

  let images = ["/client-immersive.png", "/client-comfy.png", "/client-compact.png"];

  const features = computed(() => [
    {
      icon: "heroicons:link",
      title: t("features.seamless_integrations.title"),
      description: t("features.seamless_integrations.description"),
    },
    {
      icon: "material-symbols:spatial-tracking-rounded",
      title: t("features.audio_enhancements.title"),
      description: t("features.audio_enhancements.description"),
    },
    {
      icon: "material-symbols:nest-remote",
      title: t("features.remote_controllable.title"),
      description: t("features.remote_controllable.description"),
    },
    {
      icon: "heroicons:bolt",
      title: t("features.fast.title"),
      description: t("features.fast.description"),
    },
    {
      icon: "material-symbols:dashboard-customize",
      title: t("features.customize.title"),
      description: t("features.customize.description"),
    },
    {
      icon: "heroicons:heart",
      title: t("features.much_more.title"),
      description: t("features.much_more.description"),
    },
  ]);
</script>

<template>
  <main class="overflow-x-clip">
    <ShowcaseScroll :images="images">
      <template #title>
        <HeroBackground />
        <div class="flex flex-col items-center justify-center text-center mt-8 md:mt-12 z-10 relative">
          <div v-if="data">
            <UiBadge
              :to="data[0]?._path"
              variant="secondary"
              class="px-3 py-1.5 text-sm font-normal backdrop-blur-md bg-secondary/50 dark:bg-black/40 lg:py-2 pointer-events-auto"
            >
              {{ data[0]?.navigation.headline }}
              <Icon class="ml-3 h-4 w-4" name="lucide:arrow-right" />
            </UiBadge>
          </div>
          <div class="flex flex-col-reverse md:flex-row">
            <div :class="[isUwu ? 'w-full max-w-[760px] max-w-xl justify-between !text-left' : '']">
              <h1
                class="mb-6 mt-7 text-5xl font-extrabold leading-tight tracking-tight lg:mb-8 lg:mt-8 lg:text-center lg:text-6xl xl:text-7xl"
                :class="[isUwu ? '!text-left' : '']"
              >
                {{ $t('hero.title') }}<br />
                <span class="inline-block">
                  <span
                    v-for="(char, index) in String($t('hero.subtitle')).split('')"
                    :key="index"
                    class="animate-wave-char whitespace-pre"
                    :style="{ animationDelay: `${index * 0.08 + 0.2}s` }"
                  >{{ char }}</span>
                </span>
              </h1>
              <p
                class="mx-auto hidden max-w-[760px] text-lg leading-relaxed text-muted-foreground md:block lg:text-center lg:text-xl"
                :class="[isUwu ? '!text-left' : '']"
              >
                {{ $t('hero.description') }}
              </p>

              <div
                class="mt-8 flex w-full flex-col items-center justify-center gap-6 lg:mt-12 pointer-events-auto"
                :class="[isUwu ? 'md:items-start md:text-left' : '']"
              >
                <NuxtLink to="/downloads" class="hidden md:block">
                  <UiButton size="lg" class="rounded-full px-8 text-base">
                    <Icon name="lucide:shopping-bag" class="mr-2 h-5 w-5" />
                    {{ $t('hero.get_cider') }}
                  </UiButton>
                </NuxtLink>
                <div class="animate-float flex flex-col items-center gap-2 text-muted-foreground mt-12 lg:mt-24 opacity-80">
                  <span class="text-xs font-semibold uppercase tracking-widest">See more</span>
                  <Icon name="lucide:chevron-down" size="32px" />
                </div>
              </div>
            </div>
            <div v-if="isUwu" class="max-w-xl md:pl-20">
              <NuxtImg src="/uwu-logo.png" alt="Cider Logo" class="mx-auto" />
            </div>
          </div>
        </div>
      </template>
    </ShowcaseScroll>

    <BuiltUsing />
    <UiContainer class="features py-16 lg:p-20">
      <p class="text-center font-semibold text-primary" v-motion :initial="{ opacity: 0 }" :visible-once="{ opacity: 1, transition: { duration: 500 } }">{{ $t('features_section.label') }}</p>
      <h2 class="mb-4 mt-3 text-center text-3xl font-semibold lg:mb-5 lg:text-4xl"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
      >
        {{ $t('features_section.title') }}
      </h2>
      <p class="mx-auto max-w-[760px] text-center text-lg text-muted-foreground lg:text-xl"
         v-motion
         :initial="{ opacity: 0, y: 30 }"
         :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
      >
        {{ $t('features_section.description') }}
      </p>

      <div
        class="grid grid-cols-1 gap-y-4 py-10 md:grid-cols-2 md:gap-y-10 lg:grid-cols-3 lg:gap-8 lg:gap-y-16 lg:py-16"
      >
        <template v-for="(f, i) in features" :key="i">
          <div class="group flex flex-row items-center gap-5 rounded-3xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:flex-col md:justify-center md:gap-0 md:p-8"
               v-motion
               :initial="{ opacity: 0, y: 50 }"
               :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 50 } }"
          >
            <div class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border bg-background/50 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/50 md:h-12 md:w-12 md:rounded-xl">
              <Icon
                :name="f.icon"
                class="h-6 w-6 transition-colors group-hover:text-primary md:h-5 md:w-5 lg:h-6 lg:w-6"
              />
            </div>
            <div class="flex flex-col text-left md:text-center">
              <h3
                class="text-balance text-lg font-semibold md:mt-5 lg:mt-6 lg:text-xl"
              >
                {{ f.title }}
              </h3>
              <p
                class="mt-1 text-balance text-sm text-muted-foreground md:mt-2 md:text-base lg:mt-3"
              >
                {{ f.description }}
                <template v-if="f.icon === 'heroicons:heart'">
                  <a href="https://discord.gg/applemusic" class="text-primary hover:underline">Discord server</a> to get involved!
                </template>
              </p>
            </div>
          </div>
        </template>
      </div>
    </UiContainer>

    <Testimonies />

    <!-- Bottom CTA Section -->
    <UiContainer class="py-20 lg:py-32">
      <div class="flex flex-col items-center justify-center text-center">
        <h2 class="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        >
          Ready to get started?
        </h2>
        <p class="mx-auto max-w-[600px] text-lg text-muted-foreground lg:text-xl"
           v-motion
           :initial="{ opacity: 0, y: 30 }"
           :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
        >
          Join thousands of other users and elevate your Apple Music experience today.
        </p>
        <div class="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row lg:mt-12"
             v-motion
             :initial="{ opacity: 0, y: 30 }"
             :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
        >
          <NuxtLink to="/downloads" class="w-full sm:w-auto hidden md:block">
            <UiButton size="lg" class="w-full rounded-full px-8 text-base sm:w-auto">
              {{ $t('hero.get_cider') }}
            </UiButton>
          </NuxtLink>
          <NuxtLink to="/learn-more" class="w-full sm:w-auto">
            <UiButton
              size="lg"
              type="button"
              variant="secondary"
              class="learn-more w-full rounded-full px-8 text-base hover:gap-5 sm:w-auto"
            >
              {{ $t('hero.learn_more') }}
              <Icon name="material-symbols:arrow-right-alt-rounded" size="24px" class="ml-2" />
            </UiButton>
          </NuxtLink>
        </div>
      </div>
    </UiContainer>
  </main>
</template>

<style scoped>
  .learn-more {
    color: var(--color-primary);
    border-color: var(--color-primary);
    transition: gap 0.2s ease-in-out;
  }

  .animate-wave-char {
    display: inline-block;
    animation: gentle-lift 1.2s ease-in-out both;
  }

  @keyframes gentle-lift {
    0%, 100% { transform: translateY(0); }
    40% { transform: translateY(-12px); }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
  }
</style>
