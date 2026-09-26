<template>
  <!-- Embedded view (e.g. inside the Cider app): release notes only -->
  <div v-if="embedded" class="bg-ink p-4 text-chalk md:p-6">
    <img v-if="release?.thumbnail" :src="release.thumbnail" :alt="title" class="mb-6 w-full rounded-[12px] border border-ink-line" />
    <SiteProse>
      <div class="[&>h1:first-child]:hidden" v-html="renderedContent" />
    </SiteProse>
  </div>

  <main v-else class="bg-ink text-chalk">
    <div
      class="sg-shell grid gap-10 py-10 md:py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 lg:py-16 xl:grid-cols-[220px_minmax(0,1fr)_200px]"
    >
      <nav aria-label="Releases" class="hidden lg:block">
        <div class="sticky top-[100px] max-h-[calc(100dvh-120px)] overflow-y-auto pr-2">
          <p class="font-label text-xs text-chalk-mute">Releases</p>
          <ul class="mt-3 flex flex-col gap-0.5">
            <li v-for="item in releases" :key="item.path">
              <NuxtLink
                :to="item.path"
                no-prefetch
                class="sg-focus flex flex-col rounded-[10px] px-3 py-2 transition-colors hover:bg-ink-panel"
                :class="item.version === release?.version ? 'bg-ink-panel text-chalk' : 'text-chalk-dim'"
                :aria-current="item.version === release?.version ? 'page' : undefined"
              >
                <span class="text-[15px] font-semibold">{{ item.title }}</span>
                <span class="font-label text-[11px] text-chalk-mute">{{ item.date }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>

      <article class="min-w-0">
        <NuxtLink
          to="/changelogs"
          class="sg-focus inline-flex items-center gap-2 font-label text-xs text-chalk-mute transition-colors hover:text-chalk"
        >
          <Icon name="lucide:arrow-left" class="h-3.5 w-3.5" aria-hidden="true" />
          All releases
        </NuxtLink>
        <p v-if="date" class="mt-8 font-label text-xs text-signal">{{ date }}</p>
        <h1
          class="mt-3 text-[44px] font-extrabold uppercase leading-[0.92] tracking-[-0.045em] md:text-[72px] lg:text-[88px]"
        >
          {{ title }}
        </h1>
        <p v-if="release?.shortDesc" class="mt-5 max-w-[680px] text-pretty text-[17px] leading-relaxed text-chalk-dim md:text-lg">
          {{ release.shortDesc }}
        </p>
        <ul v-if="release?.highlights?.length" class="mt-5 flex flex-wrap gap-2">
          <li
            v-for="highlight in release.highlights"
            :key="highlight.name"
            class="inline-flex h-7 items-center rounded-full border border-ink-edge px-3 font-label text-[11px] text-chalk-dim"
          >
            {{ highlight.name }}
          </li>
        </ul>
        <img
          v-if="release?.thumbnail"
          :src="release.thumbnail"
          :alt="title"
          class="mt-8 w-full rounded-[12px] border border-ink-line"
        />
        <SiteProse class="mt-10">
          <!-- The notes open with their own "# Cider x.y.z" heading; the page title already says it -->
          <div class="[&>h1:first-child]:hidden" v-html="renderedContent" />
        </SiteProse>
      </article>

      <aside v-if="tableOfContents.length" class="hidden xl:block">
        <div class="sticky top-[100px]">
          <p class="font-label text-xs text-chalk-mute">On this page</p>
          <ul class="mt-3 flex flex-col gap-1 border-l border-ink-line">
            <li v-for="heading in tableOfContents" :key="heading.id">
              <a
                :href="`#${heading.id}`"
                class="sg-focus -ml-px block border-l py-1 text-sm transition-colors hover:text-chalk"
                :class="[
                  heading.id === activeId ? 'border-signal text-chalk' : 'border-transparent text-chalk-dim',
                  heading.depth > 2 ? 'pl-6' : 'pl-3',
                ]"
                @click="setActive(heading.id)"
              >
                {{ heading.text }}
              </a>
            </li>
          </ul>
          <div class="mt-8 rounded-[16px] border border-ink-line bg-ink-panel p-5">
            <p class="text-[15px] font-semibold">Get this update</p>
            <p class="mt-1 text-sm text-chalk-dim">Available now on Windows, macOS, and Linux.</p>
            <NuxtLink to="/downloads" class="sg-btn sg-btn--primary sg-btn--sm mt-4 w-full">
              Get Cider
              <Icon name="lucide:arrow-right" class="sg-arrow h-3.5 w-3.5" aria-hidden="true" />
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>
  </main>
</template>

<script lang="ts" setup>
  import { useActiveScroll } from "vue-use-active-scroll";
  import { marked } from "marked";

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

  definePageMeta({
    title: "Cider Changelog",
  });

  const route = useRoute();
  const embedded = computed(() => route.query.embedded === "true");
  const version = computed(() => {
    const id = route.params.id;
    return Array.isArray(id) ? id.join("/") : id || "latest";
  });

  const formatDate = (timestamp: number) =>
    new Date(timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const { data: release, error } = await useAsyncData(
    () => `changelog-${version.value}`,
    () => $fetch<RiseChangelogDetail>(`/api/changelogs/${version.value}`)
  );
  if (error.value || !release.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `Changelog for version ${version.value} not found`,
      fatal: true,
    });
  }

  const { data: list } = await useAsyncData("changelogs-list", () =>
    $fetch<RiseChangelogListResponse>("/api/changelogs/list")
  );

  const title = computed(() => (release.value ? `Cider ${release.value.version}` : "Cider Changelog"));
  const date = computed(() => (release.value ? formatDate(release.value.lastUpdated) : ""));

  const releases = computed(() =>
    (list.value?.changelogs ?? []).map((changelog) => ({
      title: `Cider ${changelog.version}`,
      path: `/changelogs/${changelog.version}`,
      date: formatDate(changelog.lastUpdated),
      version: changelog.version,
    }))
  );

  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  function generateHeadingId(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  const renderedContent = computed(() => {
    const longDesc = release.value?.longDesc;
    if (!longDesc) return "";
    try {
      let markdown = longDesc;

      // Preprocess markdown to fix common formatting issues in Rise's notes
      markdown = markdown.replace(/^-\s+/gm, "- ");
      markdown = markdown.replace(/([^-\n]+)\s+-\s+(\*\*[^*]+\*\*:)/g, "$1\n- $2");
      markdown = markdown.replace(/(\*\*[^*]+\*\*:[^-]+)-\s+\*\*/g, "$1\n- **");
      markdown = markdown.replace(/(\*\*[^*]+\*\*:[^-]+)\s+-\s+(\*\*[^*]+\*\*:)/g, "$1\n- $2");
      markdown = markdown.replace(/^-\s*(\*\*[^*]+\*\*)/gm, "- $1");
      markdown = markdown.replace(/^([^-\n]*)-\s+(\*\*[^*]+\*\*:)/gm, "- $1\n- $2");

      // Give headings stable ids for the table of contents
      markdown = markdown.replace(/^(#{1,6})\s+(.+)$/gm, (_match: string, hashes: string, text: string) => {
        const level = hashes.length;
        return `<h${level} id="${generateHeadingId(text.trim())}">${text.trim()}</h${level}>`;
      });

      return marked(markdown) as string;
    } catch (renderError) {
      console.error("Failed to render markdown:", renderError);
      return longDesc;
    }
  });

  // Section headings only: the notes' own h1 duplicates the page title.
  const tableOfContents = computed(() => {
    const longDesc = release.value?.longDesc;
    if (!longDesc) return [];
    const headings: Array<{ id: string; text: string; depth: number }> = [];
    for (const match of longDesc.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
      const text = match[2]!.trim();
      headings.push({ id: generateHeadingId(text), text, depth: match[1]!.length });
    }
    return headings;
  });

  const targets = computed(() => tableOfContents.value.map((heading) => heading.id));
  const { activeId, setActive } = useActiveScroll(targets, {
    replaceHash: true,
    overlayHeight: 100,
  });

  useSeoMeta({
    title: () => title.value,
    description: () => release.value?.shortDesc || "Cider changelog",
    ogTitle: () => title.value,
    ogDescription: () => release.value?.shortDesc || "Cider changelog",
    ogImage: () => release.value?.thumbnail || undefined,
  });

  useHead({
    htmlAttrs: {
      style: "scroll-behavior: smooth;",
    },
  });
</script>
