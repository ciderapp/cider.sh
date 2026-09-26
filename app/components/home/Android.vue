<template>
  <section id="android" aria-labelledby="home-android-title" class="overflow-hidden border-t border-ink-line bg-ink text-chalk">
    <div class="sg-shell pt-14 md:pt-[72px] lg:pt-28">
      <div class="grid gap-y-7 lg:grid-cols-12 lg:items-end lg:gap-x-6">
        <div class="lg:col-span-7">
          <div class="flex items-center gap-2.5">
            <p class="font-label text-xs text-signal">Cider for Android</p>
            <span class="inline-flex h-6 items-center rounded-full border border-signal/60 px-2.5 font-label text-[11px] text-signal">
              Beta
            </span>
          </div>
          <h2
            id="home-android-title"
            class="mt-5 text-[64px] font-extrabold uppercase leading-[0.84] tracking-[-0.05em] md:text-[112px] lg:mt-6 lg:text-[144px]"
          >
            Now on<br />Android
          </h2>
        </div>
        <div class="lg:col-span-5">
          <p class="max-w-[520px] text-pretty text-[17px] leading-normal text-chalk-dim md:text-lg lg:text-xl">
            The full Cider experience, now directly in your pocket. Fast, efficient, and elegant all in one package.
          </p>
          <div class="mt-7 flex flex-col gap-2.5 sm:flex-row lg:mt-8">
            <NuxtLink to="/downloads/android" class="sg-btn sg-btn--primary sm:min-w-[260px]">
              Get Cider for Android
              <Icon name="lucide:arrow-right" class="sg-arrow h-4 w-4" aria-hidden="true" />
            </NuxtLink>
            <NuxtLink to="/downloads/android#beta" class="sg-btn sg-btn--ghost">Join the beta</NuxtLink>
          </div>
        </div>
      </div>

      <ul class="mt-10 flex flex-wrap gap-2 lg:mt-14" aria-label="Highlights">
        <li
          v-for="item in highlights"
          :key="item.label"
          class="inline-flex h-9 items-center gap-2 rounded-full border border-ink-edge px-3.5 font-label text-xs text-chalk-dim"
        >
          <Icon :name="item.icon" class="h-3.5 w-3.5 text-signal" aria-hidden="true" />
          {{ item.label }}
        </li>
      </ul>
    </div>

    <div class="sg-fan mt-10 h-[520px] md:mt-14 md:h-[690px] lg:h-[810px]">
      <div
        class="pointer-events-none absolute left-1/2 top-0 h-full w-[140%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,43,94,0.26),transparent)]"
        aria-hidden="true"
      />
      <div class="absolute inset-x-0 top-[22%] overflow-hidden md:top-[24%]" aria-hidden="true">
        <div class="sg-marquee sg-marquee--slow">
          <span v-for="n in 6" :key="n">
            <span
              class="sg-tk sg-outline px-6 text-[120px] opacity-30 md:px-10 md:text-[200px] lg:px-14 lg:text-[280px]"
            >
              Android
            </span>
            <span class="sg-dot h-5 w-5 opacity-60 md:h-8 md:w-8 lg:h-11 lg:w-11" />
          </span>
        </div>
      </div>

      <SitePhoneShot
        v-for="phone in phones"
        :key="phone.src"
        :src="phone.src"
        :alt="phone.alt"
        :glow="phone.glow"
        class="sg-fan__phone"
        :class="phone.class"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
  const highlights = [
    { icon: "lucide:mic-vocal", label: "Synced lyrics" },
    { icon: "lucide:monitor-smartphone", label: "Cider Connect" },
    { icon: "simple-icons:discord", label: "Discord" },
    { icon: "simple-icons:lastdotfm", label: "Last.fm" },
    { icon: "lucide:palette", label: "Material You" },
    { icon: "lucide:glasses", label: "Meta Quest & Steam Frame" },
  ];

  const [home, album, fresh, radio] = androidShots.gallery;

  // Positions are written out in full so Tailwind picks up every class. The outer pair only
  // shows from tablets up.
  const phones = [
    {
      ...fresh!,
      glow: false,
      class:
        "z-10 hidden md:block [--r:-12deg] [--top:200px] [--w:190px] [--x:-420px] lg:[--top:230px] lg:[--w:230px] lg:[--x:-560px]",
    },
    {
      ...radio!,
      glow: false,
      class:
        "z-10 hidden md:block [--r:12deg] [--top:200px] [--w:190px] [--x:420px] lg:[--top:230px] lg:[--w:230px] lg:[--x:560px]",
    },
    {
      ...album!,
      glow: false,
      class:
        "z-20 [--r:-7deg] [--top:76px] [--w:160px] [--x:-118px] md:[--top:112px] md:[--w:220px] md:[--x:-232px] lg:[--top:132px] lg:[--w:260px] lg:[--x:-302px]",
    },
    {
      ...home!,
      glow: false,
      class:
        "z-20 [--r:7deg] [--top:76px] [--w:160px] [--x:118px] md:[--top:112px] md:[--w:220px] md:[--x:232px] lg:[--top:132px] lg:[--w:260px] lg:[--x:302px]",
    },
    {
      ...androidShots.hero,
      glow: true,
      class: "z-30 [--top:24px] [--w:200px] md:[--top:40px] md:[--w:260px] lg:[--top:48px] lg:[--w:300px]",
    },
  ];
</script>
