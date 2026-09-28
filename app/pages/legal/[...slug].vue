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
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
  const $route = useRoute();

  // Use the catch-all param so locale prefixes (/es/legal/privacy) resolve to
  // the English content path (/legal/privacy). Do not look up /es/legal/...
  const currentPath = computed(() => {
    const slugParam = $route.params.slug;
    const parts = Array.isArray(slugParam) ? slugParam : slugParam ? [String(slugParam)] : [];
    const slug = parts.filter(Boolean).join("/");
    return slug ? `/legal/${slug}` : "/legal/privacy";
  });

  const { data: page } = await useAsyncData(
    () => currentPath.value + "-data",
    () => queryContent(currentPath.value).findOne()
  );

  if (!page.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Legal document not found",
      fatal: true,
    });
  }

  useSeoMeta({
    title: page.value.title ? `${page.value.title} - Cider Collective` : "Legal - Cider Collective",
    ogTitle: page.value.title ? `${page.value.title} - Cider Collective` : "Legal - Cider Collective",
    ogDescription: page.value.description,
  });
</script>
