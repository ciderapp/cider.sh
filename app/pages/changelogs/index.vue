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
    <div v-if="latest" class="mt-10 lg:mt-24">
      <div class="mx-auto max-w-md md:max-w-2xl lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8 lg:items-center">
        <div class="relative">
          <NuxtLink :to="latest.path">
            <NuxtImg
              v-if="latest.image"
              :src="latest.image"
              :alt="latest.title"
              class="mb-5 h-[280px] w-full rounded-lg object-cover shadow lg:mb-0 lg:h-[360px]"
            />
          </NuxtLink>
          <UiBadge class="absolute left-3 top-3 bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
            Latest
          </UiBadge>
        </div>
        <div class="lg:pl-4">
          <p v-if="latest.date" class="mb-2 text-sm font-semibold text-primary lg:text-base">
            {{ latest.date }}
          </p>
          <NuxtLink :to="latest.path">
            <h2 class="mb-3 text-xl font-semibold lg:text-3xl xl:text-4xl">{{ latest.title }}</h2>
          </NuxtLink>
          <p v-if="latest.summary" class="mb-4 text-muted-foreground lg:text-lg">
            {{ latest.summary }}
          </p>
          <div class="flex flex-wrap items-center gap-2">
            <template v-for="t in latest.tags" :key="t">
              <UiBadge class="px-3 py-1 text-sm" variant="outline">{{ t }}</UiBadge>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Changelogs -->
    <section class="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
      <template v-for="r in releases.slice(1)" :key="r.path">
        <div>
          <NuxtLink :to="r.path">
            <NuxtImg
              v-if="r.image"
              :src="r.image"
              :alt="r.title"
              class="mb-5 h-[240px] w-full rounded-lg object-cover shadow"
            />
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


  interface RiseChangelogListItem {
    version: string;
    shortDesc: string;
    thumbnail?: string;
    lastUpdated: number;
  }

  interface RiseChangelogListResponse {
    changelogs: RiseChangelogListItem[];
    total: number;
  }

  interface RiseChangelogDetail {
    shortDesc: string;
    longDesc: string;
    thumbnail?: string;
    highlights: Array<{
      name: string;
      desc: string;
      icon: string;
    }>;
    version: string;
    lastUpdated: number;
  }

  interface Release {
    author: string;
    date: string;
    title: string;
    summary: string;
    image?: string;
    path: string;
    tags: string[];
    version: string;
  }


  const { data: changelogsList } = await useAsyncData('changelogs-list', async () => {
    const response = await $fetch<RiseChangelogListResponse>('/api/changelogs/list');
    return response;
  });


  const { data: latestChangelog } = await useAsyncData('latest-changelog', async () => {
    try {
      const response = await $fetch<RiseChangelogDetail>('/api/changelogs/latest');
      return response;
    } catch (error) {
      console.error('Failed to fetch latest changelog:', error);
      return null;
    }
  });

  const releases = computed<Release[]>(() => {
    if (!changelogsList.value?.changelogs) return [];
    
    return changelogsList.value.changelogs.map((changelog: RiseChangelogListItem) => {

      const date = new Date(changelog.lastUpdated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      return {
        author: 'Cider Collective',
        date,
        title: `Cider ${changelog.version}`,
        summary: changelog.shortDesc,
        image: changelog.thumbnail,
        path: `/changelogs/${changelog.version}`,
        tags: [],
        version: changelog.version,
      };
    });
  });

  const latest = computed<Release | undefined>(() => {
    if (!releases.value.length || !latestChangelog.value) return undefined;
    
    const latestRelease = releases.value[0];
    if (!latestRelease) return undefined;
    
    return {
      author: latestRelease.author,
      date: latestRelease.date,
      title: latestRelease.title,
      summary: latestRelease.summary,
      image: latestRelease.image,
      path: latestRelease.path,
      version: latestRelease.version,
      tags: latestChangelog.value.highlights?.map((h: {name: string, desc: string, icon: string}) => h.name) || [],
    };
  });
</script>
