<template>
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-[760px]">
      <div class="text-center">
        <UiBadge variant="outline" class="gap-2 px-3 py-1.5 text-sm font-normal"
          ><Icon name="material-symbols:nest-remote" class="h-4 w-4 text-primary" />Remote</UiBadge
        >
      </div>
      <h2 class="mb-4 mt-3 text-center text-3xl font-semibold lg:mb-5 lg:mt-7 lg:text-4xl">
        Take full control, right from your phone
      </h2>
      <p class="mx-auto max-w-[760px] text-center text-lg text-muted-foreground lg:text-xl">
        Seamlessly control your Cider Devices without interruptions or delays.
      </p>
      <div class="mt-8 flex justify-center gap-8">
        <NuxtLink to="https://apps.apple.com/us/app/cider-remote/id6670149407">
          <UiButton variant="outline">
            <Icon name="logos:apple-app-store" />
            Get from the App Store
          </UiButton>
        </NuxtLink>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-y-12 p-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-16">
      <div class="flex flex-col gap-10 lg:gap-12">
        <template v-for="(f, i) in headlines[0]" :key="i">
          <div class="group flex flex-col">
            <div class="flex h-12 w-12 items-center justify-center rounded-md border">
              <Icon
                :name="f.icon"
                class="h-5 w-5 transition-colors group-hover:text-primary lg:h-6 lg:w-6"
              />
            </div>
            <h3
              class="mt-4 text-balance text-lg font-semibold lg:mt-5 lg:text-xl"
              v-text="f.title"
            />
            <p class="mt-1 text-balance text-muted-foreground lg:mt-2" v-text="f.description" />
            <a :href="f.link.url" v-if="f.link" class="font-semibold text-primary mt-2">{{ f.link.text }}</a>
          </div>
        </template>
      </div>
      <div class="order-last col-span-full lg:order-none lg:col-span-1">
        <img
          src="/remote_player.png"
          alt="Features section nine image"
          class="mx-auto w-[400px] object-contain object-top lg:h-[640px] lg:w-full"
          draggable="false"
        />
      </div>
      <div class="flex flex-col gap-10 lg:gap-12">
        <template v-for="(f, i) in headlines[1]" :key="i">
          <div class="group flex flex-col">
            <div class="flex h-12 w-12 items-center justify-center rounded-md border">
              <Icon
                :name="f.icon"
                class="h-5 w-5 transition-colors group-hover:text-primary lg:h-6 lg:w-6"
              />
            </div>
            <h3
              class="mt-4 text-balance text-lg font-semibold lg:mt-5 lg:text-xl"
              v-text="f.title"
            />
            <p class="mt-1 text-balance text-muted-foreground lg:mt-2" v-text="f.description" />
            <a :href="f.link.url" v-if="f.link" class="font-semibold text-primary mt-2">{{ f.link.text }}</a>
          </div>
        </template>
      </div>
    </div>

    <div class="mx-auto max-w-[760px] mt-16">
      <p class="text-center font-semibold text-primary">Features</p>
      <h2 class="mb-4 mt-3 text-center text-3xl font-semibold lg:mb-5 lg:text-4xl">
        Whatever you need, Remote has it
      </h2>
    </div>
    <div class="mt-6">
      <swiper-container
        :autoplay="{ delay: 3500 }"
        :speed="800"
        grab-cursor
        loop
        slides-per-view="auto"
        space-between="30"
        style="overflow: hidden; width: 100%;"
        >
        <template v-for="feature in features" :key="feature.title">
          <swiper-slide class="w-96">
            <div class="group border bg-gray-500/10 border-white/20 p-4 rounded-lg w-96 h-60">
              <div class="flex h-12 w-12 items-center justify-center rounded-md border">
                <Icon
                  :name="feature.icon"
                  class="h-5 w-5 transition-colors group-hover:text-primary lg:h-6 lg:w-6"
                />  
              </div>
              <h3 class="mt-4 text-balance text-lg font-semibold lg:mt-5 lg:text-xl">{{ feature.title }}</h3>
              <p class="mt-1 text-balance text-muted-foreground lg:mt-2">{{ feature.description }}</p>
            </div>
          </swiper-slide>
        </template>
      </swiper-container>
    </div>

    <div>
      <p class="text-center text-sm text-gray-500 pt-10">
        Cider Remote requires Cider v2.5.0 or later, and iOS 16.1 or later.
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  definePageMeta({ title: "Remote" });
  useSeoMeta({
    title: "Remote",
    description: "Take full control of Cider with Remote, a native iOS app.",
    ogTitle: "Remote",
    ogDescription: "Take full control of Cider with Remote, a native iOS app.",
    ogImage: "/og-remote.png",
    ogUrl: "https://cider.sh/remote",
    twitterTitle: "Remote",
    twitterDescription: "Take full control of Cider with Remote, a native iOS app.",
    twitterImage: "/og-remote.png",
  });

  const headlines = [[
    {
      icon: "heroicons:puzzle-piece-solid",
      title: "Native UI",
      description:
        "Leverage the power and performance of native UI for iOS. Writing natively allows for a more seamless experience and a cohesive design language.",
    },
    {
      icon: "heroicons:rectangle-group-solid",
      title: "Multi-instance support",
      description:
        "Have multiple Cider instances? No problem. Remote allows you to switch between instances with ease, so you can control all your music from one place.",
    },
  ], [
    {
      icon: "heroicons:adjustments-horizontal",
      title: "Real-time control",
      description: `No more delays or interruptions. With Remote, you can control your Cider instance with speed and precision, right from your phone.`,
    },
    {
      icon: "heroicons:code-bracket",
      title: "Open Source",
      description:
        "The whole codebase is open source, so you can inspect it, contribute to it, report bugs or ask for new features.",
      link: { text: "Learn more", url: "https://github.com/ciderapp/Cider-Remote" },
    },
  ]];

  const features = [
    {
      icon: "heroicons:rectangle-stack",
      title: "Live Activity",
      description:
        "See your currently playing track right on your lock screen, without having to unlock your phone. And play or pause your music with just a tap.",
    },
    {
      icon: "heroicons:squares-2x2",
      title: "Library Browser",
      description:
        "Get a hold of your Apple Music library, including your playlists and albums. Tap a track to play it.",
    },
    {
      icon: "heroicons:identification",
      title: "Horizontal Layout",
      description:
        "Portrait or landscape, Remote adapts to your iPhone's orientation. Leave your phone on the side and it'll never turn off.",
    },
    {
      icon: "heroicons:numbered-list",
      title: "Queue Management",
      description: "Manage your playback queue with ease. Remove and reorder tracks in your queue, all from the Remote app.",
    },
    {
      icon: "heroicons:microphone",
      title: "Sing along the lyrics",
      description: "Remote supports Apple Music lyrics as well as 3rd party lyrics providers like Musixmatch. Use the Horizontal Layout to activate Immersive Lyrics.",
    },
    {
      icon: "heroicons:play-pause",
      title: "Playback Control Center",
      description:
        "With iOS 18, you can add playback controls to your Control Center. Play, pause, skip tracks, and more, everything you'd need to control your music quickly.",
    },
    {
      icon: "heroicons:magnifying-glass",
      title: "Liquid Glass",
      description: "With iOS 26, Remote gets a fresh coat of paint with the new Liquid Glass design, offered by the latest operating systems.",
    }
  ]
</script>
