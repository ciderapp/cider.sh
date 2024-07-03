<template>
  <UiContainer class="py-16 lg:py-24">
    <div class="text-center">
      <p class="mb-3 font-semibold text-primary">User Resources</p>
      <h1 class="mb-4 text-4xl font-semibold lg:mb-6 lg:text-5xl">Changelogs</h1>
      <p class="text-lg text-muted-foreground lg:text-xl">
        Stay up to date with the latest Cider releases, news, updates, and resources.
      </p>
    </div>
    <!-- Featured blog image -->
    <div
      title="Blog page on image"
      class="featured mt-10 hidden h-60 w-full items-end overflow-hidden rounded-lg bg-cover drop-shadow lg:mt-24 lg:flex lg:h-[720px]"
    >
      <div class="w-full border-t border-white/10 bg-black/40 p-10 text-white backdrop-blur-2xl">
        <NuxtLink :to="featuredRelease.path">
          <h2 class="mb-2 text-2xl font-semibold">
            {{ featuredRelease.title }}
          </h2>
        </NuxtLink>
        <p>
          {{ featuredRelease.description }}
        </p>
        <p class="mt-5 text-sm">Written by</p>
        <NuxtLink :to="featuredRelease.path">
          <div class="mt-2 flex items-center gap-3">
            <UiAvatar
              class="ring-1 ring-white/20"
              :src="'https://avatars.githubusercontent.com/' + featuredRelease.author + '?size=40'"
            />
            <span>{{ featuredRelease.author }}</span>
          </div>
        </NuxtLink>
        <div class="mt-5 flex flex-wrap items-center gap-2">
          <template v-for="t in ['Design', 'Research', 'Presentation']" :key="t">
            <UiBadge class="border-white px-3 py-1 text-sm text-white" variant="outline">{{
              t
            }}</UiBadge>
          </template>
        </div>
      </div>
    </div>

    <div class="mb-10 mt-16 lg:hidden">
      <NuxtLink :to="featuredRelease.path">
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <NuxtImg
          :src="featuredRelease.image"
          :alt="featuredRelease.title"
          class="mb-5 h-[240px] w-full rounded-lg object-cover shadow"
        />
      </NuxtLink>
      <p v-if="featuredRelease.date" class="mb-2 text-sm font-semibold text-primary">
        {{ featuredRelease.date }}
      </p>
      <NuxtLink :to="featuredRelease.path">
        <p class="mb-2 text-xl font-semibold lg:text-2xl">{{ featuredRelease.title }}</p>
      </NuxtLink>
      <p
        v-if="featuredRelease.description"
        class="mb-3 line-clamp-2 text-ellipsis text-muted-foreground"
      >
        {{ featuredRelease.description }}
      </p>
      <div class="flex flex-wrap items-center gap-2">
        <template v-for="t in featuredRelease.tags" :key="t">
          <UiBadge class="px-3 py-1 text-sm" variant="outline">{{ t }}</UiBadge>
        </template>
      </div>
    </div>

    <!-- Articles -->

    <section class="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
      <template v-for="r in releases" :key="r.path">
        <div>
          <NuxtLink :to="r.path">
            <!-- eslint-disable-next-line vue/html-self-closing -->
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
          <p v-if="r.description" class="mb-3 line-clamp-2 text-ellipsis text-muted-foreground">
            {{ r.description }}
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

<style lang="scss">
  .featured {
    --bg-image: v-bind("featuredRelease.image");
    background-image: var(--bg-image);
  }
</style>

<script lang="ts" setup>
  definePageMeta({ title: "Changelogs" });
  useSeoMeta({
    title: "Changelogs",
    description: "Stay up to date with the latest Cider releases, news, updates, and resources.",
    ogDescription: "Stay up to date with the latest Cider releases, news, updates, and resources.",
    ogUrl: "https://cider.sh/changelogs",
  });

  const { data } = await useAsyncData<any>("changelogs", () =>
    queryContent("/changelogs/client-releases").sort({ releaseNo: -1, $numeric: true }).find()
  );

  const releases = computed(() =>
    data.value.map((r: any) => {
      return {
        author: r.author,
        date: r.navigation.date,
        title: r.title,
        description: r.description,
        image:
          "https://github.com/ciderapp/changes/blob/main/1.client-releases/images/" +
          r.image +
          "?raw=true",
        path: r._path,
      };
    })
  );
  const featuredRelease = computed(() => releases.value.shift());
  featuredRelease.value.image = "url('" + featuredRelease.value.image + "')";
</script>
