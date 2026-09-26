<template>
  <main class="bg-ink text-chalk">
    <SitePageHeader eyebrow="Legal" :title="page?.title ?? 'Legal'" :description="page?.description" />

    <div class="sg-shell grid gap-10 py-12 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12 lg:py-16">
      <nav aria-label="Legal documents">
        <div class="md:sticky md:top-[100px]">
          <p class="font-label text-xs text-chalk-mute">Documents</p>
          <ContentList path="/legal" v-slot="{ list }">
            <ul class="mt-3 flex flex-wrap gap-2 md:flex-col md:gap-0.5">
              <li v-for="article of list" :key="article._path">
                <NuxtLink
                  :to="article._path"
                  class="sg-focus block rounded-[10px] border px-3 py-2 text-[15px] transition-colors md:border-transparent"
                  :class="
                    currentPath === article._path
                      ? 'border-ink-edge bg-ink-panel font-semibold text-chalk'
                      : 'border-ink-line text-chalk-dim hover:bg-ink-panel hover:text-chalk'
                  "
                  :aria-current="currentPath === article._path ? 'page' : undefined"
                >
                  {{ article.title }}
                </NuxtLink>
              </li>
            </ul>
          </ContentList>
        </div>
      </nav>

      <div class="min-w-0 max-w-[760px]">
        <SiteProse v-if="page">
          <ContentRenderer :value="page" />
        </SiteProse>
        <p v-else class="py-12 text-chalk-dim">Document not found.</p>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
  const $route = useRoute();

  const currentPath = computed(() => {
    const p = $route.path.replace(/\/$/, "");
    return p === "/legal" ? "/legal/privacy" : p;
  });

  const { data: page } = await useAsyncData(
    () => currentPath.value + "-data",
    () => queryContent(currentPath.value).findOne()
  );

  useSeoMeta({
    title: page.value?.title ? `${page.value.title} - Cider Collective` : "Legal - Cider Collective",
    ogTitle: page.value?.title ? `${page.value.title} - Cider Collective` : "Legal - Cider Collective",
    ogDescription: page.value?.description,
  });
</script>
