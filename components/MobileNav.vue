<template>
  <UiSheet v-model:open="localModel">
    <UiSheetContent class="p-1">
      <template #content>
        <UiSheetTitle title="Mobile menu" class="sr-only" />
        <UiSheetDescription description="A list of navigation items for mobile" class="sr-only" />
        <UiScrollArea class="h-[calc(100dvh-20px)] w-full p-5">
          <div class="sticky top-0 mb-3 w-full bg-background">
            <div class="flex items-center gap-3.5">
              <div class="mr-2 flex rounded-md bg-black p-1 dark:bg-black/0">
                <NuxtImg src="/CC24-transparent.svg" class="h-8 w-8" />
              </div>
              <p class="text-xl font-bold">Cider Collective</p>
              <UiSheetClose class="ml-auto">
                <Icon name="lucide:x" />
              </UiSheetClose>
            </div>
            <UiSeparator class="my-4" />
          </div>
          <div class="links my-6 flex flex-col gap-y-5 font-bold">
            <NuxtLink to="/remote" class="hover:text-primary">
              <Icon name="mdi:remote" class="mr-3" /> Remote
            </NuxtLink>
            <NuxtLink to="/downloads">
              <Icon name="mdi:downloads" class="mr-3" /> Download
            </NuxtLink>
            <NuxtLink to="/docs"> <Icon name="mdi:book-open" class="mr-3" /> Docs </NuxtLink>
            <NuxtLink to="/changelogs">
              <Icon name="mdi:history" class="mr-3" /> Changelogs
            </NuxtLink>
          </div>
          <UiSeparator class="mt-4" />
          <p class="mb-4 mt-6 text-2xl font-bold">Site Pages</p>
          <DocsNavlink :links="navigation" />
        </UiScrollArea>
      </template>
    </UiSheetContent>
  </UiSheet>
</template>

<script lang="ts" setup>
  const { data: navigation } = await useAsyncData("navigation", () => fetchContentNavigation());

  const props = defineProps<{
    modelValue?: boolean;
  }>();
  const emits = defineEmits<{
    "update:modelValue": [value: boolean];
  }>();

  const localModel = useVModel(props, "modelValue", emits, { passive: true });
</script>
