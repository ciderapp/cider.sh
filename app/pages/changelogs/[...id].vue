<template>
  <div class="flex flex-col items-center">
    <!-- Embedded Content -->
    <div v-if="embedded" class="prose prose-lg prose-rose dark:prose-invert scroll-smooth">
      <div v-if="page?.image">
        <NuxtImg
          :src="image"
          :alt="page.title"
          class="mb-5 w-full overflow-hidden rounded-md border border-foreground/60 object-cover shadow-lg"
        />
      </div>
      <!-- Render markdown content as HTML -->
      <div v-if="renderedContent" v-html="renderedContent"></div>
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
            <LazyDocsNavlink :links="navigationData" />
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
          class="prose prose-lg prose-rose mx-auto w-full min-w-0 max-w-none py-5 dark:prose-invert lg:prose-base prose-headings:scroll-mt-16 prose-headings:tracking-tight prose-h2:mt-6 prose-h2:border-b prose-h2:pb-3 first:prose-h2:mt-10 prose-a:decoration-primary prose-a:underline-offset-2 hover:prose-a:text-primary prose-pre:text-lg lg:prose-pre:text-base scroll-smooth"
        >
          <div v-if="page?.image">
            <NuxtImg
              :src="image"
              :alt="page.title"
              class="mb-5 w-full overflow-hidden rounded-md border border-foreground/60 object-cover shadow-lg"
            />
          </div>
          <!-- Render markdown content as HTML -->
          <div v-if="renderedContent" v-html="renderedContent"></div>
        </div>
        <!-- Table of contents for current page -->
        <aside
          v-if="tableOfContents.length > 0"
          class="sticky top-14 z-20 hidden h-[calc(100dvh-57px)] overflow-y-auto border-l bg-background text-card-foreground xl:block"
        >
          <div class="p-5">
            <p class="mb-5 text-sm font-semibold">Page contents</p>
            <Suspense>
              <LazyDocsToclink
                :set-active="setActive"
                :active-id="activeId"
                :links="tableOfContents"
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
  import { marked } from 'marked';
  
  type ChangelogItem = {
    version: string;
    shortDesc: string;
    lastUpdated: number;
  };


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


  const embedded = ref(false);
  const page = ref<any>(null);


  const data = ref<RiseChangelogListResponse | null>(null);


  onMounted(async () => {
    const route = useRoute();
    embedded.value = route.query.embedded === "true";
    
    const id = route.params.id;
    const version = Array.isArray(id) ? id.join('/') : (id || 'latest');
    
          try {      
        const [pageResponse, navResponse] = await Promise.all([
          $fetch<RiseChangelogDetail>(`/api/changelogs/${version}`),
          $fetch<RiseChangelogListResponse>('/api/changelogs/list')
        ]);
      
      page.value = {
        title: `Cider ${pageResponse.version}`,
        description: pageResponse.shortDesc,
        image: pageResponse.thumbnail,
        version: pageResponse.version,
        longDesc: pageResponse.longDesc,
        highlights: pageResponse.highlights,
        lastUpdated: pageResponse.lastUpdated
      };
      
      data.value = navResponse;
    } catch (error) {
      console.error('Failed to fetch changelog:', error);
      throw createError({ statusCode: 404, statusMessage: `Changelog for version ${version} not found` });
    }
  });


  const image = computed(() => {
    return page.value?.image || '';
  });

  
  const navigationData = computed(() => {
    if (!data.value?.changelogs) return [];
    
    return data.value.changelogs.map((changelog: RiseChangelogListItem) => ({
      title: `Cider ${changelog.version}`,
      _path: `/changelogs/${changelog.version}`,
      navigation: {
        date: new Date(changelog.lastUpdated).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      },
      version: changelog.version
    }));
  });


  marked.setOptions({
    breaks: true,
    gfm: true,
  });


  const generateHeadingId = (text: string) => {
    return text.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };


  const renderedContent = computed(() => {
    if (!page.value?.longDesc) return '';
    try {
      let markdown = page.value.longDesc;
      
      // Preprocess markdown to fix common formatting issues
      // Fix bullet points that might be improperly formatted
      markdown = markdown.replace(/^-\s+/gm, '- ');
      
      // Handle the specific case where multiple bullet points are on one line
      // Split entries that end with " - " followed by bold text
      markdown = markdown.replace(/([^-\n]+)\s+-\s+(\*\*[^*]+\*\*:)/g, '$1\n- $2');
      
      // Ensure proper line breaks between bullet points
      markdown = markdown.replace(/(\*\*[^*]+\*\*:[^-]+)-\s+\*\*/g, '$1\n- **');
      
      // Fix bullet points mixed with other content on same line
      markdown = markdown.replace(/(\*\*[^*]+\*\*:[^-]+)\s+-\s+(\*\*[^*]+\*\*:)/g, '$1\n- $2');
      
      // Ensure proper spacing around bold text in lists
      markdown = markdown.replace(/^-\s*(\*\*[^*]+\*\*)/gm, '- $1');
      
      // Fix lines that start with content and have bullet points mixed in
      markdown = markdown.replace(/^([^-\n]*)-\s+(\*\*[^*]+\*\*:)/gm, '- $1\n- $2');
      
      // Add heading IDs
      markdown = markdown.replace(/^(#{1,6})\s+(.+)$/gm, (match: string, hashes: string, text: string) => {
        const id = generateHeadingId(text.trim());
        const level = hashes.length;
        return `<h${level} id="${id}" style="scroll-margin-top: 80px;">${text.trim()}</h${level}>`;
      });
      
      return marked(markdown);
    } catch (error) {
      console.error('Failed to render markdown:', error);
      return page.value.longDesc;
    }
  });


  const tableOfContents = computed(() => {
    if (!page.value?.longDesc) return [];
    
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings = [];
    let match;
    
    while ((match = headingRegex.exec(page.value.longDesc)) !== null) {
      if (match[1] && match[2]) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = generateHeadingId(text);
        
        headings.push({
          id,
          text,
          depth: level,
          children: []
        });
      }
    }
    
    return headings;
  });

  const targets: any = computed(() =>
    tableOfContents.value.flatMap(({ id, children = [] }: any) => [
      id,
      ...children.map(({ id }: { id: string }) => id),
    ])
  );

  const { activeId, setActive } = useActiveScroll(targets, {
    replaceHash: true,
    overlayHeight: 80,
  });


  definePageMeta({ 
    title: 'Cider Changelog'
  });


  useHead({
    title: computed(() => page.value?.title || 'Cider Changelog'),
    meta: [
      {
        name: 'description',
        content: computed(() => page.value?.description || 'Cider changelog')
      },
      {
        property: 'og:title',
        content: computed(() => page.value?.title || 'Cider Changelog')
      },
      {
        property: 'og:description', 
        content: computed(() => page.value?.description || 'Cider changelog')
      },
      {
        property: 'og:image',
        content: computed(() => image.value || '')
      }
    ]
  });


  useHead({
    htmlAttrs: {
      style: 'scroll-behavior: smooth;'
    }
  });
</script>
