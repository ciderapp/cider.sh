<template>
  <UiContainer class="pt-28 pb-16 lg:pt-36 lg:pb-24">
    <div class="flex flex-col gap-10 md:flex-row md:gap-12 lg:gap-16">
      <!-- Sidebar Navigation -->
      <aside class="w-full md:w-60 md:shrink-0">
        <div class="sticky top-28 flex flex-col gap-4">
          <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Legal Documents
          </p>
          <ContentList path="/legal" v-slot="{ list }">
            <ul class="flex flex-col gap-1">
              <li
                v-for="article of list"
                :key="article._path"
              >
                <NuxtLink
                  :to="article._path"
                  class="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground"
                  :class="[
                    currentPath === article._path
                      ? 'bg-muted font-semibold text-primary'
                      : 'text-muted-foreground font-medium',
                  ]"
                >
                  {{ article.title }}
                </NuxtLink>
              </li>
            </ul>
          </ContentList>
        </div>
      </aside>

      <!-- Main Legal Content -->
      <main class="min-w-0 flex-1">
        <div v-if="page" class="rounded-2xl border border-border/40 bg-card/20 p-6 md:p-10">
          <ContentRenderer
            class="prose prose-rose max-w-none dark:prose-invert"
            :value="page"
          />
        </div>
        <div v-else class="py-12 text-center text-muted-foreground">
          <p>Document not found.</p>
        </div>
      </main>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const $route = useRoute();

  const currentPath = computed(() => {
    const p = $route.path.replace(/\/$/, "");
    return p === "/legal" ? "/legal/privacy" : p;
  });

  const { data: page } = await useAsyncData(() => currentPath.value + "-data", () =>
    queryContent(currentPath.value).findOne()
  );

  useSeoMeta({
    title: page.value?.title ? `${page.value.title} - Cider Collective` : "Legal - Cider Collective",
    ogTitle: page.value?.title ? `${page.value.title} - Cider Collective` : "Legal - Cider Collective",
    ogDescription: page.value?.description,
  });
</script>
