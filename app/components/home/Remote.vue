<template>
  <section
    aria-labelledby="home-remote-title"
    class="border-t border-ink-line bg-ink-panel text-chalk android:hidden"
  >
    <div class="sg-shell grid items-center gap-y-9 py-14 md:grid-cols-2 md:gap-x-10 md:py-[72px] lg:grid-cols-12 lg:gap-x-6 lg:py-[100px]">
      <div class="flex justify-center lg:col-span-6">
        <img
          src="/remote_player.png"
          alt="Cider Remote on iPhone, showing the now-playing screen"
          width="1350"
          height="2760"
          loading="lazy"
          decoding="async"
          class="h-auto w-[190px] md:w-[260px] lg:w-[330px]"
        />
      </div>

      <div class="lg:col-span-6">
        <h2
          id="home-remote-title"
          class="text-[92px] font-extrabold uppercase leading-[0.84] tracking-[-0.05em] md:text-[88px] lg:text-[136px]"
        >
          Cider<br />Remote
        </h2>
        <p class="mt-6 max-w-[560px] text-pretty text-[17px] leading-normal text-chalk-dim md:text-lg lg:mt-8 lg:text-xl">
          Take full control of Cider with Remote, a native iPhone app. No matter what you're doing away from your
          keyboard, control Cider however you like.
        </p>
        <SiteSpecList :rows="specs" class="mt-7 lg:mt-8" />
        <NuxtLink to="/downloads/remote" class="sg-btn sg-btn--ghost mt-7 w-full sm:w-auto lg:mt-8">
          Get Remote
          <Icon name="lucide:arrow-right" class="sg-arrow h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  // Remote is iPhone only, so Android visitors don't see this section; the Android one above
  // covers them.
  const specs = [
    { label: "Requires", value: "Cider v2.5.0 or later" },
    { label: "Platform", value: "iOS 17 or later" },
    { label: "Built with", value: "SwiftUI · Socket.io" },
  ];
</script>
