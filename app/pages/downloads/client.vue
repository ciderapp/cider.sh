<template>
  <DownloadItem.define v-slot="{ download }">
    <div class="w-full px-2" v-if="download.type != 'multiple'">
      <NuxtLink v-if="download.type == 'html'" v-html="download.html" />

      <NuxtLink v-else-if="download.type == 'image'" :to="download.url">
        <NuxtImg
          :src="download.image"
          :alt="download.alt"
          class="transition-[duration]-[1000ms] transform-gpu transition-all hover:-translate-y-1 w-full"
        />
      </NuxtLink>
    </div>

    <div v-else-if="download.type == 'multiple'" class="flex gap-4">
      <div v-for="dl in download.downloads" class="grow">
        <UiTooltip>
          <UiTooltipTrigger class="w-full">
            <UiButton class="w-full py-7 text-lg" variant="outline" :href="dl.url">
              <Icon :name="dl.icon" class="mr-2 h-10 w-10 shrink-0" />
            </UiButton>
          </UiTooltipTrigger>

          <UiTooltipContent align="center">
            {{ dl.text }}
          </UiTooltipContent>
        </UiTooltip>
      </div>
    </div>
  </DownloadItem.define>

  <UiContainer class="relative py-16 lg:py-24">
    <div class="mx-auto max-w-[760px] text-center">
      <p class="font-semibold text-primary">Get the Cider Client</p>
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
          <UiBadge class="ml-2 hidden lg:block" variant="outline" v-if="source.isRecommended"
            >Recommended</UiBadge
          >
        </UiTabsTrigger>
      </UiTabsList>

      <UiTabsContent
        v-for="source in sources"
        :key="source.value"
        :value="source.value"
        class="flex flex-wrap justify-center gap-y-10 lg:gap-8 lg:gap-y-12 lg:py-0"
      >
        <template v-for="p in source.downloads">
          <UiCard class="overflow-hidden flex-1 min-w-[300px] max-w-[600px] lg:basis-[48%] md:basis-[80%] sm:basis-full">
            <UiCardTitle class="flex items-center justify-between px-6 py-4">
              <p class="text-lg font-semibold lg:text-2xl">{{ p.title }}</p>
              <UiBadge v-if="p.sidenote" class="border-primary/50 text-primary" variant="outline"
                >{{ p.sidenote }}
              </UiBadge>
            </UiCardTitle>

            <UiCardDescription class="flex grow gap-4 px-6 py-4 items-center">
              <p class="text-muted-foreground flex-[50%]">{{ p.description }}</p>
              <DownloadItem.reuse
                :download="p.download"
                v-if="p.download.type != 'multiple'"
                class="flex-[50%] max-w-80"
              />
            </UiCardDescription>

            <UiCardContent class="w-full px-0">
              <ul class="grid w-full grid-cols-1 gap-4 px-5 pt-8 md:grid-cols-2 lg:py-8">
                <li v-for="(perk, k) in p.features" :key="k" class="flex items-center gap-3">
                  <Icon name="heroicons:check-circle" class="h-6 w-6 shrink-0 text-primary" />
                  <span class="opacity-80">
                    <NuxtLink v-html="perk" />
                  </span>
                </li>
              </ul>
            </UiCardContent>

            <UiCardFooter class="grid grid-rows-2 gap-4">
              <p class="text-xs text-muted-foreground" v-html="p.footer" v-if="p.footer" />

              <div class="flex justify-center">
                <DownloadItem.reuse
                  :download="p.download"
                  v-if="p.download.type == 'multiple'"
                  class="flex-auto"
                />
              </div>
            </UiCardFooter>
          </UiCard>
        </template>
      </UiTabsContent>
    </UiTabs>
  </UiContainer>

  <section class="m-4">
    <p id="footnote-label" class="sr-only">Footnotes</p>
    <ol class="text-xs text-muted-foreground">
      <li id="fn-1">1. Performance may vary depending on your device.</li>
    </ol>
  </section>
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
    html: string;
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
  };

  type Multiple = {
    type: "multiple";
    downloads: IconDownload[];
  };

  type Download = {
    title: string;
    description: string;
    sidenote?: string;
    features: string[];
    download: HTMLDownload | ImageDownload | Multiple;
    footer?: string;
  };

  interface Tab {
    name: string;
    value: string;
    isRecommended?: boolean;
    downloads: Download[];
  }

  const DownloadItem = createReusableTemplate<{
    download: Download["download"];
  }>();

  const sources: Tab[] = [
    {
      name: "Version 2",
      value: "version-2",
      isRecommended: true,
      downloads: [
        {
          title: "Direct",
          description:
            "Available for all users on Windows, macOS, and Linux. A full list of supported platforms can be found on Taproom.",
          sidenote: "Recommended & New!",
          features: [
            "Support us directly by purchasing Cider through Taproom",
            "Access to Windows, macOS, and Linux releases",
            "Faster Client Updates Compared to Other Storefronts",
            "Access to <a href='https://taproom.cider.sh' class='text-primary'>Taproom</a>",
            "Community Themes and Plugins verified by Cider Collective",
            "Over-the-air Updates",
            "Access to features specific to each platform",
            "Ton of customization options",
            "Audio Enhancements through our cutting Audio Lab technology",
            "Blazingly Fast <a class='inline-block align-top text-[0.5em] underline' href='#fn-1'>1</a>",
            "Help and Support from the Cider Community and Collective Team",
          ],
          download: {
            type: "image",
            url: "https://taproom.cider.sh/purchase",
            image: "/taproom.svg",
            alt: "taproom",
          },
        },
        {
          title: "Itch.io",
          description:
            "Available for all users on Windows, macOS, and Linux. A full list of supported platforms can be found on the Itch.io page.",
          sidenote: "Recommended",
          features: [
            "Access to Windows, macOS, and Linux releases",
            "Faster Client Updates Compared to Other Storefronts",
            "Access to <a href='https://taproom.cider.sh' class='text-primary'>Taproom</a>",
            "Community Themes and Plugins verified by Cider Collective",
            "Over-the-air Updates",
            "Access to features specific to each platform",
            "Ton of customization options",
            "Audio Enhancements through our cutting Audio Lab technology",
            "Blazingly Fast <a class='inline-block align-top text-[0.5em] underline' href='#fn-1'>1</a>",
            "Help and Support from the Cider Community and Collective Team",
          ],
          download: {
            type: "image",
            url: "https://cidercollective.itch.io/cider",
            image: "/itchio-black.svg",
            alt: "itch.io",
          },
        },
        {
          title: "Microsoft Store",
          description:
            "Available on the Microsoft Store for Windows 10 and 11 users. Containing all stable features from the last major release.",
          features: [
            "Windows 10 and 11 support",
            "Microsoft Store Specific Features",
            "Automatic Updates",
            "Community Themes and Plugins verified by Cider Collective",
            "Blazingly Fast <a class='inline-block align-top text-[0.5em] underline' href='#fn-1'>1</a>",
            "Access to features specific to each platform",
            "Over-the-air Updates",
            "Ton of customization options",
            "Audio Enhancements through our cutting Audio Lab technology",
          ],
          download: {
            type: "image",
            url: "https://apps.microsoft.com/detail/9PL8WPH0QK9M?mode=direct",
            image: "https://get.microsoft.com/images/en-us%20dark.svg",
            alt: "Microsoft Store",
          },
        },
        {
          title: "Supporter Edition",
          description:
            "Support the development of Cider and get access to exclusive early access builds and features.",
          features: [
            "All features available in the Itch.io version",
            "Early access to new features and versions",
            "Support the development of Cider with beta testing",
            "Access to <a href='https://taproom.cider.sh' class='text-primary'>Taproom</a>",
            "Available through a variety of platforms",
            "Access to Supporter Channels on Discord, where you can chat with the developers and other supporters",
          ],
          footer:
            "Minimum $4 donation required for access to Cider Supporter Edition. Donations at or over $20 will grant you access to the Cider Alpha Channel, which contains even more bleeding-edge features.",
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
              },
            ],
          },
        },
      ],
    },
    {
      name: "Version 1",
      value: "version-1",
      downloads: [
        {
          title: "Cider Classic",
          sidenote: "DEPRECATED",
          description:
            "The predecessor to Cider Version 2. Available for Windows, macOS, and Linux.",
          features: [
            "Free and open-source",
            "Community Themes and Plugins",
            "Customization Options",
            "Legacy Audio Lab Access",
          ],
          footer:
            "Cider Classic (v1.x) is deprecated and no longer supported. Support from the developers will <b>NOT</b> be provided. We recommend using Cider Version 2 for the best experience.",
          download: {
            type: "multiple",
            downloads: [
              {
                type: "icon",
                icon: "simple-icons:github",
                text: "Compile from GitHub",
                url: "https://github.com/ciderapp/cider",
              },
            ],
          },
        },
      ],
    },
  ];
</script>