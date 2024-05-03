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
        Native UI for iOS & Android. Seamlessly control your Cider Instances without interruptions
        or delays.
      </p>
      <div class="mt-8 flex justify-center gap-8">
        <NuxtLink to="https://testflight.apple.com/join/bI48Y8FL">
          <UiButton variant="outline">
            <Icon name="logos:apple-app-store" />
            Get from TestFlight
          </UiButton>
        </NuxtLink>
        <NuxtLink to="https://cdn.cider.sh/cider-remote-0.3.0-b2.apk">
          <UiButton variant="outline">
            <Icon name="logos:android-icon" />
            Download APK
          </UiButton>
        </NuxtLink>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-y-12 py-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-16 lg:py-20">
      <div class="flex flex-col gap-10 lg:gap-12">
        <template v-for="(f, i) in features1" :key="i">
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
          </div>
        </template>
      </div>
      <div class="order-last col-span-full lg:order-none lg:col-span-1">
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img
          src="/remote.png"
          alt="Features section nine image"
          class="mx-auto h-[360px] w-[400px] object-cover object-top lg:h-[640px] lg:w-full lg:object-contain"
        />
      </div>
      <div class="flex flex-col gap-10 lg:gap-12">
        <template v-for="(f, i) in features2" :key="i">
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
          </div>
        </template>
      </div>
    </div>
    <div>
      <p class="text-center text-sm text-gray-500">
        * Requires Cider v2.2.0 or later, and a device running iOS 14.0 or later, or Android 5.0 or
        later.
      </p>
      <p class="text-center text-sm text-gray-500">
        * Cider Remote is currently in beta, and may contain bugs or issues. Please report any
        problems you encounter.
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  definePageMeta({ title: "Remote" });
  useSeoMeta({
    title: "Remote",
    description:
      "Take full control of your Cider instance with Remote, a native iOS & Android app.",
    ogDescription:
      "Take full control of your Cider instance with Remote, a native iOS & Android app.",
    ogImage: "/client-images/remote.png",
    ogUrl: "https://cider.sh/remote",
  });
  const features1 = [
    {
      icon: "heroicons:puzzle-piece-solid",
      title: "Native UI",
      description:
        "Leverage the power and performance of native UI for iOS and Android. Writing natively allows for a more seamless experience and a cohesive design language.",
    },
    {
      icon: "heroicons:rectangle-group-solid",
      title: "Multi-instance support",
      description:
        "Have multiple Cider instances? No problem. Remote allows you to switch between instances with ease, so you can control all your music from one place.",
      link: { text: "Learn more", url: "#" },
    },
  ];
  const features2 = [
    {
      icon: "heroicons:adjustments-horizontal",
      title: "Real-time control",
      description: `No more delays or interruptions. With Remote, you can control your Cider instance with speed and precision, right from your phone.`,
    },
    {
      icon: "heroicons:bolt",
      title: "Many MANY more planned features",
      description:
        "We're constantly working on new features and improvements for Remote. Stay tuned for updates and new releases.",
    },
  ];
</script>
