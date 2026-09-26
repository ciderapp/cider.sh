<template>
  <section aria-labelledby="home-audio-title" class="bg-ink text-chalk">
    <div class="sg-shell grid gap-y-8 py-14 md:py-[72px] lg:grid-cols-12 lg:items-start lg:gap-x-6 lg:py-28">
      <div class="lg:col-span-5">
        <p class="font-label text-xs text-chalk-mute">Audio</p>
        <h2
          id="home-audio-title"
          class="mt-5 text-[76px] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] md:text-[120px] lg:mt-6"
        >
          Tuned<br />in-house.
        </h2>
        <p class="mt-6 max-w-[460px] text-pretty text-[17px] leading-normal text-chalk-dim md:text-lg lg:mt-8 lg:text-xl">
          {{ t("features.audio_enhancements.description") }}
        </p>
      </div>

      <div class="overflow-hidden rounded-[18px] border border-ink-line bg-ink-panel lg:col-span-6 lg:col-start-7 lg:rounded-[20px]">
        <ul>
          <li
            v-for="name in enhancements"
            :key="name"
            class="flex h-16 items-center border-b border-ink-line px-4 text-[17px] font-semibold tracking-[-0.01em] lg:h-[72px] lg:px-6 lg:text-xl"
          >
            {{ name }}
          </li>
        </ul>
        <div class="grid grid-cols-10 gap-x-1.5 p-4 lg:gap-x-3 lg:px-6 lg:pb-5 lg:pt-6" aria-hidden="true">
          <div v-for="band in bands" :key="band.label" class="flex flex-col gap-2 lg:gap-2.5">
            <span class="block h-40 lg:h-[220px]">
              <span class="sg-eq-bar" :style="{ animation: band.animation, '--eq-rest': band.rest }" />
            </span>
            <span class="text-center font-label text-[9.5px] text-chalk-mute lg:text-[10px]">{{ band.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  const { t } = useI18n();

  const enhancements = ["Spatialization", "Adrenaline Processor™", "Equalizer"];

  // [label, curve, duration, delay, resting height used when motion is reduced]
  const bands = [
    ["32", "a", "1.1s", "-0.2s", 42],
    ["64", "b", "1.4s", "-0.9s", 24],
    ["125", "a", "0.9s", "-0.4s", 32],
    ["250", "c", "1.2s", "-0.1s", 50],
    ["500", "b", "1.0s", "-0.6s", 20],
    ["1K", "a", "1.3s", "-1.1s", 36],
    ["2K", "c", "0.8s", "-0.3s", 54],
    ["4K", "b", "1.15s", "-0.7s", 30],
    ["8K", "a", "0.95s", "-0.5s", 46],
    ["16K", "c", "1.25s", "-0.8s", 60],
  ].map(([label, curve, duration, delay, rest]) => ({
    label,
    animation: `sg-eq-${curve} ${duration} ease-in-out ${delay} infinite alternate`,
    rest: `inset(${rest}% 0 0 0)`,
  }));
</script>
