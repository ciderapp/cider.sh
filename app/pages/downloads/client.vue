<template>
  <DownloadItem.define v-slot="{ download }">

    <NuxtLink v-if="download.type == 'html'" v-html="download.html" />

    <NuxtLink v-else-if="download.type == 'image'" :to="download.url">
      <NuxtImg :src="download.image" :alt="download.alt"
        class="transition-[duration]-[1000ms] transform-gpu transition-all hover:-translate-y-1" />
    </NuxtLink>

    <NuxtLink v-else-if="download.type == 'icon'" class="" :to="download.url">
      <UiButton class="w-full py-7 text-lg">
        <Icon :name="download.icon" class="mr-2 h-10 w-10 shrink-0" />
        {{ download.text }}
      </UiButton>
    </NuxtLink>

    <div v-else-if="download.type == 'multiple'" class="flex">

      <div v-for="dl in download.downloads">

        <NuxtLink v-if="dl.type == 'image'" :to="dl.url">
          <NuxtImg :src="dl.image" :alt="dl.alt"
            class="transition-[duration]-[1000ms] max-w-xs transform-gpu transition-all hover:-translate-y-1" />
        </NuxtLink>

        <NuxtLink v-else-if="dl.type == 'icon'" :to="dl.url">

          <UiTooltip>
            <template #trigger>
              <UiTooltipTrigger as-child>
                <UiButton class="w-full py-7 text-lg" variant="outline">
                  <Icon :name="dl.icon" class="mr-2 h-10 w-10 shrink-0" />
                </UiButton>
              </UiTooltipTrigger>
            </template>

            <template #content>
              <UiTooltipContent>
                {{ dl.text }}
              </UiTooltipContent>
            </template>

          </UiTooltip>
        </NuxtLink>

      </div>

    </div>

  </DownloadItem.define>

  <UiContainer class="relative py-16 lg:py-24">
    <div class="mx-auto max-w-[760px] text-center">
      <p class="font-semibold text-primary">Download Cider Client</p>
      <h2 class="mb-4 mt-3 text-3xl font-black lg:mb-6 lg:text-6xl">Drink Up!</h2>
      <p class="text-lg text-muted-foreground lg:text-xl">
        Now for the fun part, pick your flavor of Cider. We have a few options for you to choose
        from.
      </p>
    </div>

    <UiTabs class="mx-auto mt-5 flex flex-col items-center lg:mt-7" default-value="version-2">
      <UiTabsList class="mb-10 grid h-auto w-auto grid-cols-2 md:w-[450px]">

        <UiTabsTrigger class="h-10" :value="source.value" v-for="source in sources">
          {{ source.name }}
          <UiBadge class="ml-2 hidden lg:block" variant="outline" v-if="source.isRecommended">Recommended</UiBadge>
        </UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent v-for="source in sources" :key="source.value" :value="source.value"
        class="grid w-full grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-8 lg:gap-y-12 lg:py-0">
        <template v-for="p in source.downloads">
          <UiCard class="overflow-hidden">
            <UiCardContent class="w-full px-0">
              <div class="flex flex-col-reverse gap-4 border-b px-6 pb-6 lg:flex-row lg:justify-between">
                <p class="text-xl font-semibold lg:text-2xl">
                  {{ p.title }}
                  <UiBadge v-if="p.isRecommended" class="ml-2 border-primary/50 text-primary" variant="outline">Popular
                  </UiBadge>
                </p>
                <p class="mt-1 text-muted-foreground">{{ p.description }}</p>
                <!-- <DownloadItem.reuse :download="p.download" v-if="p.download.type != 'multiple'" /> -->
              </div>
              <ul class="grid w-full grid-cols-1 gap-4 px-5 pt-8 md:grid-cols-2 lg:py-8">
                <li v-for="(perk, k) in p.features" :key="k" class="flex items-center gap-3">
                  <Icon name="heroicons:check-circle" class="h-6 w-6 shrink-0 text-primary" />
                  <span class="opacity-80">
                    <NuxtLink v-html="perk" />
                  </span>
                </li>
              </ul>
            </UiCardContent>

            <UiCardFooter class="flex justify-center">
              <DownloadItem.reuse :download="p.download" />
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

type HTMLDownload = {
  type: "html";
  html: string
};

type ImageDownload = {
  type: "image";
  url: string;
  image: string;
  alt: string;
};

type IconDownload = {
  type: "icon";
  icon: string;
  text: string;
  url: string;
}

type Multiple = {
  type: "multiple";
  downloads: ImageDownload[] | IconDownload[]
}

type Download = {
  title: string;
  description: string;
  isRecommended?: boolean;
  features: string[];
  download: HTMLDownload | ImageDownload | IconDownload | Multiple
}

interface Tab {
  name: string;
  value: string;
  isRecommended: boolean;
  downloads: Download[]
}

const DownloadItem = createReusableTemplate<{
  download: Download["download"]
}>();

const sources: Tab[] = [
  {
    name: "Version 2",
    value: "version-2",
    isRecommended: true,
    downloads: [
      {
        title: "Itch.io",
        description:
          "Available for all users on Windows, macOS, and Linux. A full list of supported platforms can be found on the Itch.io page.",
        isRecommended: true,
        features: [
          "Access to Windows, macOS, and Linux releases",
          "Faster Updates",
          "Access to <a href='https://cider.sh/taproom' class='text-primary'>Taproom</a>",
        ],
        download: {
          type: "image",
          url: "https://cidercollective.itch.io/cider",
          image: "/itchio-color.svg",
          alt: "itch.io",
        },
      },
      {
        title: "Microsoft Store",
        description: "Available on the Microsoft Store for Windows 10 and 11 users.",
        isRecommended: false,
        features: [
          "Windows 10 and 11 support",
          "Store specific features",
          "Automatic Updates",
          "Discord and Last.fm Integrations",
          "Audio Enhancements (through our Audio Lab)",
          "Blazingly Fast",
          "Tons of Customization Options",
          "Community Themes verified by the Collective",
          "Community Plugins verified by the Collective",
        ],
        download: {
          type: "html",
          html: '<ms-store-badge productid="9PL8WPH0QK9M" window-mode="popup" theme="auto" language="en-us" animation="on" class="w-full"> </ms-store-badge>',
        },
      },
      {
        title: "Supporter Edition",
        description: "Support the development of Cider and get access to exclusive early access builds and features.",
        isRecommended: false,
        features: [
          "All features available in the Itch.io version",
          "Early access to new features and versions",
          "Support the development of Cider with beta testing",
          "Access to <a href='https://cider.sh/taproom' class='text-primary'>Taproom</a>",
        ],
        download: {
          type: "multiple",
          downloads: [
            {
              type: "icon",
              url: "https://discord.gg/applemusic",
              icon: "simple-icons:discord",
              text: "Discord Sponsorship",
            },
            {
              type: "icon",
              url: "https://www.patreon.com/cidercollective",
              icon: "simple-icons:patreon",
              text: "Patreon Supporter",
            },
            {
              type: "icon",
              url: "https://opencollective.com/ciderapp",
              icon: "simple-icons:opencollective",
              text: "Open Collective",
            },
            {
              type: "icon",
              url: "https://github.com/sponsors/ciderapp",
              icon: "simple-icons:github",
              text: "GitHub Sponsorship",
            }
          ]
        },
      }
    ],
  },
  {
    name: "Version 1",
    value: "version-1",
    isRecommended: false,
    downloads: [
      {
        title: "Cider Classic",
        description: "[DEPRECATED] The original Cider app. No longer supported or maintained. Use at your own risk.",
        features: ["Free and open-source", "Community Plugins", "Community Themes"],
        download: {
          type: "icon",
          url: "https://github.com/ciderapp/cider/releases",
          icon: "simple-icons:github",
          text: "Get Cider Classic from GitHub",
        },
      }
    ],
  },
];
</script>
