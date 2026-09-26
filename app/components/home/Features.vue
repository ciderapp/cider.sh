<template>
  <section id="features" aria-labelledby="home-features-title" class="bg-bone text-ink">
    <div class="sg-shell py-14 md:py-[72px] lg:py-24">
      <p class="font-label text-xs text-signal-deep">{{ t("features_section.label") }}</p>
      <h2
        id="home-features-title"
        class="mt-4 max-w-[8.9em] text-balance text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.045em] md:mt-5 md:text-[84px] lg:text-[100px]"
      >
        {{ t("features_section.title") }}
      </h2>

      <div class="mt-9 border-t-2 border-ink md:mt-10 md:grid md:grid-cols-2 md:border-l md:border-l-bone-line lg:mt-14 lg:grid-cols-3">
        <article
          v-for="(feature, i) in features"
          :key="feature.key"
          class="border-b transition-colors md:flex md:h-[320px] md:flex-col md:border-r md:px-7 md:pb-8 md:pt-7 lg:px-8"
          :class="[
            feature.inverted
              ? 'border-bone-line md:border-ink md:bg-ink md:text-chalk md:hover:bg-[#141417]'
              : 'border-bone-line md:text-ink md:hover:bg-[#E3E0DA]',
            open === i ? 'max-md:bg-ink max-md:text-chalk' : '',
          ]"
        >
          <span
            class="hidden h-14 w-14 items-center justify-center rounded-[14px] md:flex"
            :class="feature.inverted ? 'bg-signal text-ink' : 'border border-ink'"
            aria-hidden="true"
          >
            <Icon :name="feature.icon" class="h-6 w-6" />
          </span>

          <h3 class="hidden text-[30px] font-bold leading-[1.05] tracking-[-0.025em] md:mt-auto md:block lg:text-[32px]">
            {{ feature.title }}
          </h3>
          <h3 class="md:hidden">
            <button
              type="button"
              class="sg-focus flex h-[72px] w-full items-center justify-between gap-3 px-4 text-left text-xl font-bold leading-tight tracking-[-0.02em]"
              :aria-expanded="open === i"
              :aria-controls="`feature-${feature.key}`"
              @click="open = open === i ? -1 : i"
            >
              {{ feature.title }}
              <Icon
                name="lucide:plus"
                class="h-5 w-5 shrink-0 transition-transform duration-300"
                :class="open === i ? 'rotate-45 text-signal' : ''"
                aria-hidden="true"
              />
            </button>
          </h3>

          <div
            :id="`feature-${feature.key}`"
            class="px-4 pb-6 md:mt-3 md:block md:px-0 md:pb-0"
            :class="open === i ? 'block' : 'hidden'"
          >
            <p
              class="text-[15px] leading-[1.55] md:text-base"
              :class="feature.inverted ? 'text-chalk-dim' : open === i ? 'text-bone-mute max-md:text-chalk-dim' : 'text-bone-mute'"
            >
              {{ feature.description }}
              <template v-if="feature.key === 'much_more'">
                <a
                  href="https://discord.gg/applemusic"
                  target="_blank"
                  rel="noopener"
                  class="sg-focus font-semibold underline decoration-1 underline-offset-2"
                  :class="open === i ? 'text-signal-deep max-md:text-signal' : 'text-signal-deep'"
                  >Discord server</a
                >
                to get involved!
              </template>
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  const { t } = useI18n();
  const open = ref(0);

  const features = computed(() => [
    { key: "seamless_integrations", icon: "lucide:link-2" },
    { key: "audio_enhancements", icon: "lucide:audio-lines" },
    { key: "remote_controllable", icon: "lucide:smartphone" },
    { key: "fast", icon: "lucide:zap", inverted: true },
    { key: "customize", icon: "lucide:sliders-horizontal" },
    { key: "much_more", icon: "lucide:plus" },
  ].map((feature) => ({
    ...feature,
    title: t(`features.${feature.key}.title`),
    description: t(`features.${feature.key}.description`),
  })));
</script>
