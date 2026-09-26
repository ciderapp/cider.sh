<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        id="site-mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        class="fixed inset-0 z-50 flex flex-col bg-ink text-chalk lg:hidden"
      >
        <div class="flex h-16 shrink-0 items-center gap-2 border-b border-[#1C1C20] px-5">
          <NuxtLink to="/" aria-label="Cider home" class="sg-focus mr-auto flex items-center gap-2.5 rounded-lg" @click="open = false">
            <img src="/icon.png" alt="" width="28" height="28" class="h-7 w-7" />
            <span class="font-wordmark text-[22px] font-bold tracking-[-0.01em]">Cider</span>
          </NuxtLink>
          <button type="button" class="sg-ibtn" aria-label="Search" @click="emit('search')">
            <Icon name="lucide:search" class="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
          <button ref="closeButton" type="button" class="sg-ibtn" aria-label="Close menu" @click="open = false">
            <Icon name="lucide:x" class="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Main" class="flex-1 overflow-y-auto px-5">
          <template v-for="group in groups" :key="group.label">
            <p class="mb-1 mt-7 font-label text-xs text-chalk-mute">{{ group.label }}</p>
            <NuxtLink
              v-for="link in group.links"
              :key="link.to"
              :to="link.to"
              class="sg-focus flex h-14 items-center justify-between border-b border-[#1C1C20] text-lg font-semibold tracking-[-0.01em] transition-colors hover:text-signal"
              @click="open = false"
            >
              {{ link.label }}
              <Icon name="lucide:chevron-right" class="h-4 w-4 text-bone-mute" aria-hidden="true" />
            </NuxtLink>
          </template>
        </nav>

        <div class="flex flex-col gap-3 px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-5">
          <NuxtLink to="/downloads" class="sg-btn sg-btn--primary sg-btn--center android:hidden" @click="open = false">
            Get Cider
          </NuxtLink>
          <NuxtLink
            to="/downloads/android"
            class="sg-btn sg-btn--primary sg-btn--center hidden android:inline-flex"
            @click="open = false"
          >
            Get Cider for Android
          </NuxtLink>
          <div class="flex justify-center gap-7 font-label text-xs">
            <a
              v-for="link in community"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener"
              class="sg-focus flex min-h-11 items-center text-chalk-dim transition-colors hover:text-chalk"
            >
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
  const open = defineModel<boolean>({ default: false });
  const emit = defineEmits<{ search: [] }>();

  const groups = [
    {
      label: "Products",
      links: [
        { label: "Cider", to: "/downloads" },
        { label: "Cider for Android", to: "/downloads/android" },
        { label: "Cider Remote", to: "/downloads/remote" },
      ],
    },
    {
      label: "Explore",
      links: [
        { label: "Marketplace", to: "/marketplace" },
        { label: "Taproom", to: "/taproom" },
        { label: "Changelog", to: "/changelogs" },
        { label: "About", to: "/about" },
      ],
    },
  ];

  const community = [
    { label: "Discord", href: "https://discord.gg/applemusic" },
    { label: "GitHub", href: "https://github.com/ciderapp" },
    { label: "X", href: "https://twitter.com/UseCider" },
  ];

  const closeButton = ref<HTMLButtonElement | null>(null);
  const scrollLocked = useScrollLock(import.meta.client ? document.body : null);
  let returnFocusTo: HTMLElement | null = null;

  watch(open, async (isOpen) => {
    scrollLocked.value = isOpen;
    if (isOpen) {
      returnFocusTo = document.activeElement as HTMLElement | null;
      await nextTick();
      closeButton.value?.focus();
    } else {
      returnFocusTo?.focus();
      returnFocusTo = null;
    }
  });

  onKeyStroke("Escape", () => {
    if (open.value) open.value = false;
  });

  const route = useRoute();
  watch(
    () => route.fullPath,
    () => (open.value = false)
  );
</script>
