<template>
  <main class="bg-ink text-chalk">
    <SitePageHeader
      eyebrow="Changelog"
      title="What's new in Cider"
      description="Stay up to date with the latest Cider releases, news, updates, and resources."
    />

    <section class="sg-shell py-12 md:py-16 lg:py-20" aria-label="Releases">
      <NuxtLink
        v-if="latest"
        :to="latest.path"
        class="sg-focus group grid overflow-hidden rounded-[20px] border border-ink-line bg-ink-panel transition-colors hover:border-ink-edge lg:grid-cols-2"
      >
        <div class="relative aspect-[16/9] overflow-hidden bg-ink-raised lg:aspect-auto lg:min-h-[380px]">
          <SiteReleaseArt
            :image="latest.image"
            :version="latest.version"
            :alt="latest.title"
            loading="eager"
            class="absolute inset-0"
          />
          <span class="absolute left-4 top-4 rounded-full bg-signal px-3 py-1.5 font-label text-[11px] font-semibold text-ink">
            Latest
          </span>
        </div>
        <div class="flex flex-col p-6 md:p-10">
          <p v-if="latest.date" class="font-label text-xs text-chalk-mute">{{ latest.date }}</p>
          <h2 class="mt-3 text-[40px] font-extrabold uppercase leading-[0.9] tracking-[-0.045em] md:text-[56px]">
            {{ latest.title }}
          </h2>
          <p v-if="latest.summary" class="mt-4 text-pretty text-[17px] leading-relaxed text-chalk-dim md:text-lg">
            {{ latest.summary }}
          </p>
          <ul v-if="latest.tags.length" class="mt-5 flex flex-wrap gap-2">
            <li
              v-for="tag in latest.tags"
              :key="tag"
              class="inline-flex h-7 items-center rounded-full border border-ink-edge px-3 font-label text-[11px] text-chalk-dim"
            >
              {{ tag }}
            </li>
          </ul>
          <span
            class="mt-auto inline-flex items-center gap-2 pt-8 font-label text-xs text-chalk transition-colors group-hover:text-signal"
          >
            Read the release notes
            <Icon name="lucide:arrow-right" class="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </NuxtLink>

      <template v-if="earlier.length">
        <h2 class="mt-14 font-label text-xs text-chalk-mute md:mt-20">Earlier releases</h2>
        <ul class="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <li v-for="release in earlier" :key="release.path">
            <NuxtLink
              :to="release.path"
              no-prefetch
              class="sg-focus group flex h-full flex-col overflow-hidden rounded-[20px] border border-ink-line bg-ink-panel transition-colors hover:border-ink-edge"
            >
              <div class="aspect-[16/9] overflow-hidden bg-ink-raised">
                <SiteReleaseArt :image="release.image" :version="release.version" :alt="release.title" />
              </div>
              <div class="flex flex-1 flex-col p-5 md:p-6">
                <p v-if="release.date" class="font-label text-xs text-chalk-mute">{{ release.date }}</p>
                <h3 class="mt-2 text-xl font-bold tracking-[-0.02em] md:text-2xl">{{ release.title }}</h3>
                <p v-if="release.summary" class="mt-2 line-clamp-2 text-[15px] leading-relaxed text-chalk-dim">
                  {{ release.summary }}
                </p>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </template>
    </section>
  </main>
</template>

<script lang="ts" setup>
  definePageMeta({ title: "Changelogs" });
  const site = useSiteConfig();

  useSeoMeta({
    title: "Changelogs",
    description: "Stay up to date with the latest Cider releases, news, updates, and resources.",
    ogTitle: "Changelogs",
    ogDescription: "Stay up to date with the latest Cider releases, news, updates, and resources.",
    twitterTitle: "Changelogs",
    twitterDescription: "Stay up to date with the latest Cider releases, news, updates, and resources.",
    ogUrl: `${site.url}/changelogs`,
    ogImage: `${site.url}/og/changelogs.png`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterImage: `${site.url}/og/changelogs.png`,
  });

  defineOgImageComponent("OgShareCard", {
    layout: "secondary",
    title: "Changelogs",
    description: "What's new in Cider: releases and notes.",
    footer: "cider.sh/changelogs",
    icon: "/og-icons/changelogs.png",
    site: "cider",
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
    date: string;
    title: string;
    summary: string;
    image?: string;
    path: string;
    tags: string[];
    version: string;
  }

  const { data: changelogsList } = await useAsyncData("changelogs-list", () =>
    $fetch<RiseChangelogListResponse>("/api/changelogs/list")
  );

  const { data: latestChangelog } = await useAsyncData("latest-changelog", async () => {
    try {
      return await $fetch<RiseChangelogDetail>("/api/changelogs/latest");
    } catch (error) {
      console.error("Failed to fetch latest changelog:", error);
      return null;
    }
  });

  const releases = computed<Release[]>(() =>
    (changelogsList.value?.changelogs ?? []).map((changelog) => ({
      date: new Date(changelog.lastUpdated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      title: `Cider ${changelog.version}`,
      summary: changelog.shortDesc,
      image: changelog.thumbnail,
      path: `/changelogs/${changelog.version}`,
      tags: [],
      version: changelog.version,
    }))
  );

  const latest = computed<Release | undefined>(() => {
    const first = releases.value[0];
    if (!first || !latestChangelog.value) return undefined;
    return { ...first, tags: latestChangelog.value.highlights?.map((h) => h.name) ?? [] };
  });

  const earlier = computed(() => (latest.value ? releases.value.slice(1) : releases.value));
</script>
