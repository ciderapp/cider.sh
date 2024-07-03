<script setup lang="ts">
  const props = withDefaults(defineProps<{ activeTocId: string | null }>(), {});

  const router = useRouter();

  const { data: blogPost } = await useAsyncData(`blogToc`, () => queryContent(`/`).findOne());
  const tocLinks = computed(() => blogPost.value?.body?.toc?.links ?? []);

  const onClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      router.push({ hash: `#${id}` });
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
</script>

<template>
  <div class="max-h-82 overflow-auto">
    <h4>Table of Contents</h4>
    <nav class="mt-4 flex">
      <ul class="ml-0 pl-4">
        <li
          v-for="{ id, text, children } in tocLinks"
          :id="`toc-${id}`"
          :key="id"
          class="mb-2 ml-0 cursor-pointer list-none text-sm last:mb-0"
          @click="onClick(id)"
        >
          {{ text }}
          <ul v-if="children" class="my-2 ml-3">
            <li
              v-for="{ id: childId, text: childText } in children"
              :id="`toc-${childId}`"
              :key="childId"
              class="mb-2 ml-0 cursor-pointer list-none text-xs last:mb-0"
              @click.stop="onClick(childId)"
            >
              {{ childText }}
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>
