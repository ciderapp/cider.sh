<template>
  <UiContainer class="relative py-16 lg:py-24">
    <div class="mx-auto max-w-[760px] text-center">
      <p class="font-semibold text-primary">Download Cider Client</p>
      <h2 class="mb-4 mt-3 text-3xl font-black lg:mb-6 lg:text-6xl">Drink Up!</h2>
      <p class="text-lg text-muted-foreground lg:text-xl">
        Now for the fun part, pick your flavor of Cider. We have a few options for you to choose
        from.
      </p>
    </div>

    <UiTabs class="mx-auto mt-5 flex flex-col items-center lg:mt-7" default-value="latest">
      <UiTabsList class="mb-10 grid h-auto w-auto grid-cols-2 md:w-[450px]">
        <UiTabsTrigger class="h-10" value="latest">
          Latest<UiBadge class="ml-2 hidden lg:block" variant="outline">Recommended</UiBadge>
        </UiTabsTrigger>
        <UiTabsTrigger class="h-10" value="other">Other Downloads</UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent
        value="latest"
        class="grid w-full grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-8 lg:gap-y-12 lg:py-0"
      >
        <template v-for="p in downloads">
          <UiCard class="overflow-hidden">
            <UiCardContent class="w-full px-0">
              <div
                class="flex flex-col-reverse gap-4 border-b px-6 pb-6 lg:flex-row lg:justify-between"
              >
                <div>
                  <p class="text-xl font-semibold lg:text-2xl">
                    {{ p.title }}
                    <UiBadge
                      v-if="p.isRecommended"
                      class="ml-2 border-primary/50 text-primary"
                      variant="outline"
                      >Popular</UiBadge
                    >
                  </p>
                  <p class="mt-1 text-muted-foreground">{{ p.description }}</p>
                </div>
                <div>
                  <div v-if="p.download.html" class="" v-html="p.download.html" />
                  <NuxtLink v-else :to="p.download.url">
                    <NuxtImg
                      :src="p.download.image"
                      alt="itch.io"
                      class="transition-[duration]-[1000ms] max-w-xs transform-gpu transition-all hover:-translate-y-1"
                    />
                  </NuxtLink>
                </div>
              </div>
              <ul class="grid w-full grid-cols-1 gap-4 px-5 pt-8 md:grid-cols-2 lg:py-8">
                <li v-for="(perk, k) in p.perks" :key="k" class="flex items-center gap-3">
                  <Icon name="heroicons:check-circle" class="h-6 w-6 shrink-0 text-primary" />
                  <span class="opacity-80">{{ perk }}</span>
                </li>
              </ul>
            </UiCardContent>
          </UiCard>
        </template>
      </UiTabsContent>
      <UiTabsContent
        value="other"
        class="grid w-full grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-8 lg:gap-y-12 lg:py-0"
      >
        <template v-for="(p, i) in otherDownloads" :key="i">
          <UiCard class="overflow-hidden">
            <UiCardContent class="w-full px-0">
              <div
                class="flex flex-col-reverse gap-4 border-b px-6 pb-6 lg:flex-row lg:justify-between"
              >
                <div>
                  <p class="text-xl font-semibold lg:text-2xl">
                    {{ p.title }}
                  </p>
                  <p class="mt-1 text-muted-foreground">{{ p.subtitle }}</p>
                </div>
              </div>
              <ul class="grid w-full grid-cols-1 gap-4 px-5 pt-8 md:grid-cols-2 lg:py-8">
                <li v-for="(perk, k) in p.perks" :key="k" class="flex items-center gap-3">
                  <Icon name="heroicons:check-circle" class="h-6 w-6 shrink-0 text-primary" />
                  <span class="opacity-80">{{ perk }}</span>
                </li>
              </ul>
            </UiCardContent>
            <UiCardFooter class="border-t !pt-6 dark:border-muted/50">
              <UiButton class="w-full py-7 text-lg">
                <Icon :name="p.download.icon" class="mr-2 h-10 w-10 shrink-0" />
                {{ p.download.text }}
              </UiButton>
            </UiCardFooter>
          </UiCard>
        </template>
      </UiTabsContent>
    </UiTabs>
  </UiContainer>
</template>

<script lang="ts" setup>
  definePageMeta({
    title: "Downloads",
    documentDriven: {
      page: {
        _path: "/downloads",
      },
    },
  });
  useSeoMeta({
    description: "Download Cider for Windows, macOS, and Linux",
    ogDescription: "Download Cider for Windows, macOS, and Linux",
    ogImage: "/client-images/immersive.png",
    ogUrl: "https://cider.sh/downloads",
  });

  useHead({
    script: [
      {
        type: "module",
        src: "https://get.microsoft.com/badge/ms-store-badge.bundled.js",
      },
    ],
  });
  type Download = {
    url: string;
    icon?: string;
    text?: string;
    html?: string;
    image?: string;
  };

  type Price = {
    icon: string;
    title: string;
    isRecommended?: boolean;
    subtitle?: string;
    price: number;
    perks: string[];
    download: Download;
  };
  const downloads = [
    {
      title: "Microsoft Store",
      description: "Cider is available on the Microsoft Store for Windows 10 and 11 users",
      isRecommended: false,
      price: 20,
      perks: [
        "Windows 10 and 11 Support",
        "Windows specific features",
        "Automatic Updates",
        "Discord, Spotify, Last.FM Integrations",
        "Audio Enhancement (Cider Audio)",
        "Cider Remote Support",
        "Blazingly Fast",
        "Tons of Customization Options",
        "Community Plugins",
        "Community Themes",
      ],
      download: {
        html: '<ms-store-badge productid="9PL8WPH0QK9M" window-mode="popup" theme="auto" language="en-us" animation="on" class="w-full"> </ms-store-badge>',
      },
    },
    {
      title: "Itch.io",
      description: "Cider is available on Itch.io for ALL users on Windows, macOS, and Linux",
      price: 20,
      isRecommended: true,
      perks: [
        "One download for all platforms",
        "Multi-platform support",
        "More frequent updates",
        "Discord, Spotify, Last.FM Integrations",
        "Audio Enhancement (Cider Audio)",
        "Cider Remote Support",
        "Blazingly Fast",
        "Tons of Customization Options",
        "Community Plugins",
        "Community Themes",
      ],
      download: {
        url: "https://cidercollective.itch.io/cider",
        image: "/itchio-color.svg",
      },
    },
  ];
  const otherDownloads = [
    {
      icon: "heroicons:bolt",
      title: "Cider Nightly",
      subtitle:
        "For those daring to live on the edge. Includes early access to new features (Donation Required)",
      price: 40,
      perks: [
        "All features in Cider",
        "Early access to new features",
        "Beta testing",
        "Priority support",
      ],
      download: {
        url: "https://discord.gg/applemusic",
        icon: "simple-icons:discord",
        text: "Become a Patron on Discord",
      },
    },
    {
      icon: "heroicons:bolt",
      title: "Cider Classic",
      subtitle:
        "[DEPRECATED] The original Cider app. No longer supported or maintained. Use at your own risk.",
      price: 10,
      perks: ["Free and open-source", "Community Plugins", "Community Themes"],
      download: {
        url: "https://github.com/ciderapp/cider/releases",
        icon: "simple-icons:github",
        text: "Get Cider Classic from GitHub",
      },
    },
  ];
</script>
