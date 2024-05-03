<template>
  <div class="flex flex-col">
    <div v-if="embedded" class="prose prose-lg prose-rose dark:prose-invert">
      <div v-if="page?.image">
        <NuxtImg
          :src="
            'https://github.com/ciderapp/changes/blob/main/1.client-releases/images/' +
            page.image +
            '?raw=true'
          "
          :alt="page.title"
          class="mb-5 w-full overflow-hidden rounded-md border border-foreground/60 object-cover shadow-lg"
        />
      </div>
      <LazyContentDoc />
    </div>
    <!-- Main content -->
    <main v-else class="container grid grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-10">
      <!-- Left sidebar with page links -->
      <div
        class="sticky top-14 z-20 hidden h-[calc(100dvh-57px)] border-r text-card-foreground lg:block"
      >
        <UiScrollArea class="h-[calc(100dvh-57px)] bg-background px-2 py-5" orientation="vertical">
          <p class="text-md mb-8 font-semibold">Client Releases</p>
          <Suspense>
            <LazyDocsNavlink :links="data" />
            <template #fallback>
              <UiSkeleton class="h-[calc(100dvh-57px)] w-full" />
            </template>
          </Suspense>
        </UiScrollArea>
      </div>
      <!-- Page content -->
      <div class="xl:grid xl:grid-cols-[1fr,250px] xl:gap-5">
        <!-- Page content -->
        <div
          class="prose prose-lg prose-rose mx-auto w-full min-w-0 max-w-none py-5 dark:prose-invert lg:prose-base prose-headings:scroll-mt-16 prose-headings:tracking-tight prose-h2:mt-6 prose-h2:border-b prose-h2:pb-3 first:prose-h2:mt-10 prose-a:decoration-primary prose-a:underline-offset-2 hover:prose-a:text-primary prose-pre:text-lg lg:prose-pre:text-base"
        >
          <div v-if="page?.image">
            <NuxtImg
              :src="
                'https://github.com/ciderapp/changes/blob/main/1.client-releases/images/' +
                page.image +
                '?raw=true'
              "
              :alt="page.title"
              class="mb-5 w-full overflow-hidden rounded-md border border-foreground/60 object-cover shadow-lg"
            />
          </div>
          <LazyContentDoc />
        </div>
        <!-- Table of contents for current page -->
        <aside
          v-if="page && page.body && page.body.toc && page.body.toc.links.length > 0"
          class="sticky top-14 z-20 hidden h-[calc(100dvh-57px)] overflow-y-auto border-l bg-background text-card-foreground xl:block"
        >
          <div class="p-5">
            <p class="mb-5 text-sm font-semibold">Page contents</p>
            <Suspense>
              <LazyDocsToclink
                :set-active="setActive"
                :active-id="activeId"
                :links="page.body.toc.links"
              />
              <template #fallback>
                <UiSkeleton class="h-[calc(100dvh-57px)] w-full" />
              </template>
            </Suspense>
            <NuxtLink to="https://cidercollective.itch.io/cider">
              <NuxtImg src="/itchio-color.svg" alt="itch.io" class="my-2 w-full p-3" />
            </NuxtLink>
            <!-- <div v-if="p.download.html" class="" v-html="p.download.html" />
                  <NuxtLink v-else :to="p.download.url">
                    <NuxtImg
                      :src="p.download.image"
                      alt="itch.io"
                      class="transition-[duration]-[1000ms] max-w-xs transform-gpu transition-all hover:-translate-y-1"
                    />
                  </NuxtLink>
                </div> -->
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import { useActiveScroll } from "vue-use-active-scroll";

  useHead({
    script: [
      {
        type: "module",
        src: "https://get.microsoft.com/badge/ms-store-badge.bundled.js",
      },
    ],
  });

  const $route = useRoute();
  const embedded = $route.query.embedded == "true";
  const { data: page } = await useAsyncData("page-data", () => queryContent($route.path).findOne());

  const { data } = await useAsyncData<any>("changelogs", () =>
    queryContent("/changelogs/client-releases").sort({ releaseNo: -1, $numeric: true }).find()
  );

  const targets: any = computed(() =>
    page.value?.body?.toc?.links.flatMap(({ id, children = [] }: any) => [
      id,
      ...children.map(({ id }: { id: string }) => id),
    ])
  );

  const { activeId, setActive } = useActiveScroll(targets, {
    replaceHash: true,
    overlayHeight: 80,
  });

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
</script>
