<script lang="ts" setup>
  const search = ref("");
  const results: any = ref(null);
  const content = ref("");
  watch(search, async () => {
    if (search.value.length > 0) {
      results.value = await searchContent(search.value);
    }
  });
  // console.log(results);

  function surroundingText(content: string, term: string) {
    const SURROUND_FACTOR = 100;
    const index = content.indexOf(term);
    let start = index > SURROUND_FACTOR ? index - SURROUND_FACTOR : 0;
    let end = index < content.length - SURROUND_FACTOR ? index + SURROUND_FACTOR : content.length;
    let text = content.slice(start, end);

    if (start > 0) {
      text = `...${text}`;
    }
    if (end < content.length) {
      text = `${text}...`;
    }
    // highlight the search term

    text = text.replace(
      new RegExp(term, "gi"),
      `<span class="bg-yellow-300 dark:bg-yellow-500 text-background">${term}</span>`
    );

    return text;
  }
</script>

<template>
  <main>
    <input v-model="search" class="bg-background text-foreground" />
    <!-- <pre>{{ results }}</pre> -->
    <UiScrollArea class="h-screen max-w-[560px]">
      <template v-if="results" v-for="res in results.value">
        <div class="m-2 rounded border p-4">
          <div>
            <span class="text-sm font-bold text-foreground" v-for="t in res.titles" :key="t">
              {{ t }} <Icon name="mdi:chevron-right" />
            </span>
          </div>
          <h1 class="text-lg font-bold text-foreground text-primary">{{ res.title }}</h1>
          <div
            class="text-xs text-foreground/80"
            v-html="surroundingText(res.content, search)"
          ></div>
          <!-- <p class="text-foreground">{{ res }}</p> -->
          <!-- <pre>{{ res }}</pre> -->
        </div>
      </template>
    </UiScrollArea>
  </main>
</template>
