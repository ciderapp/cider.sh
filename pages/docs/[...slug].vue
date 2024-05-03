<template>
  <div class="flex flex-col">
    <!-- Main content -->
    <main class="container grid grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-10">
      <!-- Left sidebar with page links -->
      <div
        class="sticky top-14 z-20 hidden h-[calc(100dvh-57px)] border-r text-card-foreground lg:block"
      >
        <UiScrollArea
          v-if="navigation"
          class="h-[calc(100dvh-57px)] bg-background px-2 py-5"
          orientation="vertical"
        >
          <DocsNavlink :links="navigation[0].children!" />
        </UiScrollArea>
      </div>
      <!-- Page content -->
      <div class="xl:grid xl:grid-cols-[1fr,250px] xl:gap-5">
        <!-- Page content -->
        <div
          class="prose prose-lg prose-rose mx-auto w-full min-w-0 max-w-none py-5 dark:prose-invert lg:prose-base prose-headings:scroll-mt-16 prose-headings:tracking-tight prose-h2:mt-6 prose-h2:border-b prose-h2:pb-3 first:prose-h2:mt-10 prose-a:decoration-primary prose-a:underline-offset-2 hover:prose-a:text-primary prose-pre:text-lg lg:prose-pre:text-base"
        >
          <ContentDoc />
        </div>
        <!-- Table of contents for current page -->
        <aside
          v-if="page && page.body && page.body.toc && page.body.toc.links.length > 0"
          class="sticky top-14 z-20 hidden h-[calc(100dvh-57px)] overflow-y-auto border-l bg-background text-card-foreground xl:block"
        >
          <div class="p-5">
            <p class="mb-5 text-sm font-semibold">Page contents</p>
            <DocsToclink
              :set-active="setActive"
              :active-id="activeId"
              :links="page.body.toc.links"
            />
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import { useActiveScroll } from "vue-use-active-scroll";

  const $route = useRoute();

  const { data: page } = await useAsyncData("page-data", () => queryContent($route.path).findOne());
  const { data: navigation } = await useAsyncData("docs-navigation", () =>
    fetchContentNavigation({ where: [{ _path: { $icontains: "/docs" } }] })
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
</script>
