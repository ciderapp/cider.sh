<template>
  <UiContainer class="py-16 lg:py-24">
    <div class="text-center">
      <p class="mb-3 font-semibold text-primary">User Resources</p>
      <h1 class="mb-4 text-4xl font-semibold lg:mb-6 lg:text-5xl">Changelogs</h1>
      <p class="text-lg text-muted-foreground lg:text-xl">
        Stay up to date with the latest Cider releases, news, updates, and resources.
      </p>
    </div>

    <!-- Latest Release -->
    <div title="Latest Release" v-if="latest">
      <NuxtLink :to="latest.path">
        <NuxtImg v-if="latest.image" :src="latest.image" :alt="latest.title"
          class="mt-10 h-60 w-full items-end overflow-hidden rounded-lg bg-cover drop-shadow lg:mt-24 lg:flex lg:h-[720px]" />
      </NuxtLink>
      <div class="w-full border-t border-white/10 bg-black/40 p-10 text-white backdrop-blur-2xl">
        <p v-if="latest.date" class="mb-2 text-lg font-semibold text-primary">
          {{ latest.date }}
        </p>
        <NuxtLink :to="latest.path">
          <h2 class="mb-2 text-4xl font-semibold">
            {{ latest.title }}
          </h2>
        </NuxtLink>
        <p v-if="latest.summary != latest.title">
          {{ latest.summary }}
        </p>
        <div class="mt-5 flex flex-wrap items-center gap-2">
          <template v-for="t in latest.tags" :key="t">
            <UiBadge class="border-white px-3 py-1 text-sm text-white" variant="outline">{{
              t
              }}</UiBadge>
          </template>
        </div>
      </div>
    </div>

    <!-- Changelogs -->
    <section class="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
      <template v-for="r in releases.slice(1)" :key="r.path">
        <div>
          <NuxtLink :to="r.path">
            <NuxtImg v-if="r.image" :src="r.image" :alt="r.title"
              class="mb-5 h-[240px] w-full rounded-lg object-cover shadow" />
          </NuxtLink>
          <p v-if="r.date" class="mb-2 text-sm font-semibold text-primary">
            {{ r.date }}
          </p>
          <NuxtLink :to="r.path">
            <p class="mb-2 text-xl font-semibold lg:text-2xl">{{ r.title }}</p>
          </NuxtLink>
          <p v-if="r.summary" class="mb-3 line-clamp-2 text-ellipsis text-muted-foreground">
            {{ r.summary }}
          </p>
          <div class="flex flex-wrap items-center gap-2">
            <template v-for="t in r.tags" :key="t">
              <UiBadge class="px-3 py-1 text-sm" variant="outline">{{ t }}</UiBadge>
            </template>
          </div>
        </div>
      </template>
    </section>
  </UiContainer>
</template>

<script lang="ts" setup>
definePageMeta({ title: "Changelogs" });
useSeoMeta({
  title: "Changelogs",
  description: "Stay up to date with the latest Cider releases, news, updates, and resources.",
  ogDescription: "Stay up to date with the latest Cider releases, news, updates, and resources.",
  ogUrl: "https://cider.sh/changelogs",
});

interface Release {
  author: string;
  date: string;
  title: string;
  summary: string;
  image?: string;
  path: string;
  tags: string[];
}

const source = "https://github.com/ciderapp/changes/blob/main/changelogs/1.client-releases";

type Changelog = { author: string; title: string; description: string; image: string; _path: string; navigation: { date: string }; tags: string[], _draft: boolean };

const { data } = await useAsyncData("changelogs", () =>
  queryContent("/changelogs/client-releases").sort({ releaseNo: -1, $numeric: true }).find()
) as { data: { value: Changelog[] } };

const releases = computed<Release[]>(() => {
  // filter drafts and return the data
  return data.value.map((r) => {
    return {
      author: r.author,
      date: r.navigation.date,
      title: r.title,
      summary: r.description,
      ...r.image ? {
        image:
          `${source}/images/${r.image}?raw=true`,
      } : {},
      path: r._path,
      tags: r.tags
    };
  })
});
const latest = computed<Release | undefined>(() => releases.value[0]);


</script>
