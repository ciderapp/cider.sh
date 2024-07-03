<template>
  <div>
    <UiCommandDialog v-model:open="localModel">
      <UiDialogTitle class="sr-only">Doumnetation search modal</UiDialogTitle>
      <UiDialogDescription class="sr-only">
        Search the documentation for components, utilities, and more.
      </UiDialogDescription>

      <!-- <UiCommandInput placeholder="Search..." /> -->
      <UiVeeInput
        v-model="search"
        placeholder="Search..."
        icon="mdi:search"
        class="border-none focus:border-none"
      />

      <UiCommandList class="mt-2 bg-background">
        <UiScrollArea class="h-[400px] w-full">
          <UiCommandEmpty>No results found.</UiCommandEmpty>
          <template v-if="results" v-for="res in results.value">
            <NuxtLink :to="res.id">
              <div class="m-2 rounded border p-4" @click="localModel = false">
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
              </div>
            </NuxtLink>
          </template>

          <!-- <template v-for="(nav, i) in navigation" :key="i">
            <UiCommandGroup :heading="nav.title">
              <UiCommandItem
                v-for="(child, k) in nav.children"
                :key="k"
                class="px-4 py-2 first:mt-2"
                :value="child.title"
                @select="
                  $event.preventDefault();
                  navigateTo(child._path);
                  localModel = false;
                "
              >
                <Icon :name="nav.icon" class="h-4 w-4 text-muted-foreground/80" />
                <span>{{ child.title }}</span>
                <UiBadge v-if="child.label" class="ml-4 px-2 py-0 text-[10px] dark:bg-lime-500">{{
                  child.label
                }}</UiBadge>
              </UiCommandItem>
            </UiCommandGroup>
          </template> -->
          <UiCommandGroup heading="Theme">
            <UiCommandItem
              v-for="(mode, i) in modes"
              :key="i"
              class="px-4 py-2 first:mt-2"
              :value="mode.value"
              @select="setTheme($event, mode.value)"
            >
              <Icon :name="mode.icon" class="h-4 w-4 text-muted-foreground/80" />
              <span>{{ mode.title }}</span>
            </UiCommandItem>
          </UiCommandGroup>
        </UiScrollArea>
      </UiCommandList>
    </UiCommandDialog>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    modelValue?: boolean;
  }>();
  const modes = [
    { icon: "lucide:sun", title: "Light", value: "light" },
    { icon: "lucide:moon", title: "Dark", value: "dark" },
    { icon: "lucide:laptop", title: "System", value: "system" },
  ];

  // const input = ref("");
  // const results = searchContent(input);

  const emits = defineEmits<{
    "update:modelValue": [value: boolean];
  }>();
  const localModel = useVModel(props, "modelValue", emits, { passive: true });
  onMounted(() => {
    localModel.value = false;
  });
  // const { navigation } = useContent();
  const { data: navigation } = await useAsyncData("navigation", () => fetchContentNavigation());

  const colorMode = useColorMode();
  const setTheme = (e: Event, val: string) => {
    e.preventDefault();
    colorMode.preference = val;
    localModel.value = false;
  };
  const search = ref("");
  const results: any = ref(null);
  watch(search, async () => {
    if (search.value.length > 0) {
      results.value = await searchContent(search.value);
    } else {
      results.value = null;
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
      `<span class="bg-yellow-300 dark:bg-yellow-600 text-foreground font-bold">${term}</span>`
    );

    return text;
  }
</script>
