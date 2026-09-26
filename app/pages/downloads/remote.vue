<template>
  <main class="bg-ink text-chalk">
    <section aria-labelledby="remote-title" class="border-b border-ink-line">
      <div class="sg-shell grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-6 lg:py-24">
        <div class="lg:col-span-7">
          <SiteDeviceNudge
            device="android"
            title="On Android? Get the full Cider app instead"
            description="Cider Remote is for iPhone. On Android, Cider for Android plays your music and controls Cider on your computer."
            to="/downloads/android"
            icon="mdi:android"
            class="mb-10"
          />
          <p class="font-label text-xs text-signal">Cider Remote</p>
          <h1
            id="remote-title"
            class="mt-4 max-w-[12em] text-balance text-[44px] font-extrabold uppercase leading-[0.92] tracking-[-0.045em] md:mt-5 md:text-[72px] lg:text-[88px]"
          >
            Take full control, right from your phone
          </h1>
          <p class="mt-5 max-w-[560px] text-pretty text-[17px] leading-normal text-chalk-dim md:mt-6 md:text-lg lg:text-xl">
            Seamlessly control your Cider devices without interruptions or delays.
          </p>
          <div class="mt-7 flex flex-col gap-2.5 sm:flex-row lg:mt-9">
            <a
              href="https://apps.apple.com/us/app/cider-remote/id6670149407"
              target="_blank"
              rel="noopener"
              class="sg-btn sg-btn--primary android:hidden sm:min-w-[260px]"
            >
              <span class="flex items-center gap-2.5">
                <Icon name="simple-icons:appstore" class="h-4 w-4" aria-hidden="true" />
                Download on the App Store
              </span>
              <Icon name="lucide:arrow-up-right" class="sg-arrow h-4 w-4" aria-hidden="true" />
            </a>
            <NuxtLink to="/downloads/android" class="sg-btn sg-btn--primary hidden android:inline-flex sm:min-w-[260px]">
              <span class="flex items-center gap-2.5">
                <Icon name="mdi:android" class="h-4 w-4" aria-hidden="true" />
                Get Cider for Android
              </span>
              <Icon name="lucide:arrow-right" class="sg-arrow h-4 w-4" aria-hidden="true" />
            </NuxtLink>
            <a href="#android" class="sg-btn sg-btn--ghost android:hidden">Using Android?</a>
          </div>
          <SiteSpecList :rows="specs" class="mt-10 max-w-[560px] lg:mt-12" />
        </div>
        <div class="flex justify-center lg:col-span-5">
          <img
            src="/remote_player.png"
            alt="Cider Remote on iPhone, showing the now-playing screen"
            width="1350"
            height="2760"
            decoding="async"
            class="h-auto w-[220px] md:w-[280px] lg:w-[340px]"
          />
        </div>
      </div>
    </section>

    <section aria-label="Highlights" class="sg-shell py-14 md:py-20 lg:py-24">
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <li
          v-for="item in highlights"
          :key="item.title"
          class="flex flex-col rounded-[20px] border border-ink-line bg-ink-panel p-6 lg:p-7"
        >
          <span class="flex h-12 w-12 items-center justify-center rounded-[12px] border border-ink-edge" aria-hidden="true">
            <Icon :name="item.icon" class="h-5 w-5" />
          </span>
          <h2 class="mt-6 text-xl font-bold tracking-[-0.02em] lg:text-[22px]">{{ item.title }}</h2>
          <p class="mt-2 text-pretty text-[15px] leading-relaxed text-chalk-dim">{{ item.description }}</p>
          <a
            v-if="item.link"
            :href="item.link.url"
            target="_blank"
            rel="noopener"
            class="sg-focus mt-auto inline-flex items-center gap-2 pt-5 font-label text-xs text-chalk transition-colors hover:text-signal"
          >
            {{ item.link.text }}
            <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </section>

    <section aria-labelledby="remote-features" class="bg-bone text-ink">
      <div class="sg-shell py-14 md:py-[72px] lg:py-24">
        <p class="font-label text-xs text-signal-deep">Features</p>
        <h2
          id="remote-features"
          class="mt-4 max-w-[10em] text-balance text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.045em] md:mt-5 md:text-[72px] lg:text-[88px]"
        >
          Whatever you need, Remote has it
        </h2>
        <ul class="mt-10 border-t-2 border-ink lg:mt-14">
          <li
            v-for="feature in features"
            :key="feature.title"
            class="grid gap-3 border-b border-bone-line py-6 md:grid-cols-12 md:gap-6 md:py-8"
          >
            <div class="flex items-center gap-4 md:col-span-5">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-ink" aria-hidden="true">
                <Icon :name="feature.icon" class="h-5 w-5" />
              </span>
              <h3 class="text-xl font-bold tracking-[-0.02em] md:text-2xl">{{ feature.title }}</h3>
            </div>
            <p class="text-pretty text-[15px] leading-relaxed text-bone-mute md:col-span-7 md:text-base">
              {{ feature.description }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <section id="android" aria-labelledby="remote-android" class="sg-shell scroll-mt-24 py-14 md:py-20 lg:py-24">
      <div class="rounded-[20px] border border-ink-line bg-ink-panel p-6 md:p-10 lg:grid lg:grid-cols-12 lg:gap-6">
        <div class="lg:col-span-5">
          <h2
            id="remote-android"
            class="text-[40px] font-extrabold uppercase leading-[0.9] tracking-[-0.045em] md:text-[56px]"
          >
            Using Android?
          </h2>
        </div>
        <div class="mt-6 flex flex-col gap-4 text-pretty text-[17px] leading-relaxed text-chalk-dim lg:col-span-7 lg:mt-0">
          <p>Cider Remote is for iPhone, and it isn't coming to Android.</p>
          <p>
            Instead, Cider for Android brings the full app to your phone. It plays Apple Music on its own, and it can
            pair with Cider on your computer so you can control it or move playback between the two.
          </p>
          <NuxtLink to="/downloads/android" class="sg-btn sg-btn--ghost mt-2 w-full sm:w-auto sm:self-start">
            Cider for Android
            <Icon name="lucide:arrow-right" class="sg-arrow h-4 w-4" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
  definePageMeta({ title: "Remote" });
  const site = useSiteConfig();

  useSeoMeta({
    title: "Cider Remote",
    description: "Take full control of Cider with Remote, a native iOS app.",
    ogTitle: "Cider Remote",
    ogDescription: "Take full control of Cider with Remote, a native iOS app.",
    twitterTitle: "Cider Remote",
    twitterDescription: "Take full control of Cider with Remote, a native iOS app.",
    ogUrl: `${site.url}/downloads/remote`,
    ogImage: `${site.url}/og/downloads-remote.png`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterImage: `${site.url}/og/downloads-remote.png`,
  });

  defineOgImageComponent("OgShareCard", {
    layout: "secondary",
    title: "Cider Remote",
    description: "Control your music from your phone.",
    footer: "cider.sh/downloads/remote",
    icon: "/og-icons/remote.png",
    site: "cider",
  });

  const specs = [
    { label: "Requires", value: "Cider v2.5.0 or later" },
    { label: "Platform", value: "iOS 17 or later" },
    { label: "Built with", value: "SwiftUI · Socket.io" },
    { label: "Source", value: "Open source on GitHub", href: "https://github.com/ciderapp/Cider-Remote" },
  ];

  const highlights = [
    {
      icon: "lucide:layout-template",
      title: "Native UI",
      description:
        "Leverage the power and performance of native UI for iOS. Writing natively allows for a more seamless experience and a cohesive design language.",
    },
    {
      icon: "lucide:layers",
      title: "Multi-instance support",
      description:
        "Have multiple Cider instances? No problem. Remote lets you switch between instances with ease, so you can control all your music from one place.",
    },
    {
      icon: "lucide:zap",
      title: "Real-time control",
      description:
        "No more delays or interruptions. With Remote, you can control your Cider instance with speed and precision, right from your phone.",
    },
    {
      icon: "lucide:code",
      title: "Open source",
      description:
        "The whole codebase is open source, so you can inspect it, contribute to it, report bugs or ask for new features.",
      link: { text: "View on GitHub", url: "https://github.com/ciderapp/Cider-Remote" },
    },
  ];

  const features = [
    {
      icon: "lucide:lock",
      title: "Live Activity",
      description:
        "See your currently playing track right on your lock screen, without having to unlock your phone. Play or pause your music with just a tap.",
    },
    {
      icon: "lucide:library",
      title: "Library browser",
      description: "Get a hold of your Apple Music library, including your playlists and albums. Tap a track to play it.",
    },
    {
      icon: "lucide:rectangle-horizontal",
      title: "Horizontal layout",
      description:
        "Portrait or landscape, Remote adapts to your iPhone's orientation. Leave your phone on the side and it'll never turn off.",
    },
    {
      icon: "lucide:list-ordered",
      title: "Queue management",
      description: "Manage your playback queue with ease. Remove and reorder tracks in your queue, all from the Remote app.",
    },
    {
      icon: "lucide:mic-vocal",
      title: "Sing along with lyrics",
      description:
        "Remote supports Apple Music lyrics as well as third-party lyrics providers like Musixmatch. Use the horizontal layout to turn on Immersive Lyrics.",
    },
    {
      icon: "lucide:sliders-horizontal",
      title: "Playback in Control Center",
      description:
        "With iOS 18, you can add playback controls to your Control Center. Play, pause, skip tracks and more, everything you need to control your music quickly.",
    },
    {
      icon: "lucide:droplet",
      title: "Liquid Glass",
      description: "With iOS 26, Remote gets a fresh coat of paint with the new Liquid Glass design.",
    },
  ];
</script>
