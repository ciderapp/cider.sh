<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="localModel" 
        class="fixed inset-0 z-40 bg-background/40 backdrop-blur-sm md:hidden"
        @click="localModel = false"
      ></div>
    </Transition>

    <!-- Flyout Menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-8 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-8 scale-95"
    >
      <div
        v-if="localModel"
        class="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] left-4 right-4 z-50 flex flex-col rounded-[2rem] border border-border/50 bg-background/90 p-5 shadow-2xl backdrop-blur-xl md:hidden overflow-hidden"
      >
        <div class="flex items-center justify-between mb-4 px-2">
          <div class="flex items-center gap-3">
            <div class="flex rounded-xl bg-black p-1.5 dark:bg-black/0">
              <NuxtImg src="/CC24-transparent.svg" class="h-6 w-6" />
            </div>
            <p class="text-xl font-bold tracking-tight">Cider Collective</p>
          </div>
          <UiButton size="icon" variant="ghost" class="h-8 w-8 rounded-full bg-muted/50 hover:bg-muted" @click="localModel = false">
            <Icon name="lucide:x" class="h-4 w-4" />
          </UiButton>
        </div>

        <UiScrollArea class="h-auto max-h-[60vh] w-full">
          <div class="flex flex-col gap-1.5 font-medium px-2 pb-4">
            <NuxtLink to="/downloads/remote" class="flex items-center rounded-2xl p-3 hover:bg-muted/50 transition-all active:scale-[0.98]" @click="localModel = false">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary mr-4">
                <Icon name="mdi:remote" class="h-5 w-5" />
              </div>
              <span class="text-[0.95rem]">Remote</span>
            </NuxtLink>
            
            <NuxtLink to="/downloads" class="flex items-center rounded-2xl p-3 hover:bg-muted/50 transition-all active:scale-[0.98]" @click="localModel = false">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary mr-4">
                <Icon name="mdi:downloads" class="h-5 w-5" />
              </div>
              <span class="text-[0.95rem]">Download</span>
            </NuxtLink>
            
            <NuxtLink to="/taproom" class="flex items-center rounded-2xl p-3 hover:bg-muted/50 transition-all active:scale-[0.98]" @click="localModel = false">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary mr-4">
                <Icon name="mdi:book-open" class="h-5 w-5" />
              </div>
              <span class="text-[0.95rem]">Taproom</span>
            </NuxtLink>
            
            <NuxtLink to="/changelogs" class="flex items-center rounded-2xl p-3 hover:bg-muted/50 transition-all active:scale-[0.98]" @click="localModel = false">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary mr-4">
                <Icon name="mdi:history" class="h-5 w-5" />
              </div>
              <span class="text-[0.95rem]">Changelogs</span>
            </NuxtLink>
          </div>
        </UiScrollArea>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
  import { useVModel } from '@vueuse/core';
  
  const { data: navigation } = await useAsyncData("navigation", () => fetchContentNavigation());

  const props = defineProps<{
    modelValue?: boolean;
  }>();
  const emits = defineEmits<{
    "update:modelValue": [value: boolean];
  }>();

  const localModel = useVModel(props, "modelValue", emits, { passive: true });
</script>