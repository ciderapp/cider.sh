<template>
  <NuxtLink
    v-if="release"
    :to="`/changelogs/${release.version}`"
    class="sg-focus group flex h-9 items-stretch border-b border-ink-line bg-ink font-label text-xs text-chalk-dim"
  >
    <span class="sg-hazard w-10 shrink-0 md:w-[72px]" aria-hidden="true" />
    <span class="flex min-w-0 flex-1 items-center gap-3 pl-3.5 pr-4 md:gap-[18px] md:pl-5 md:pr-8 lg:pr-12">
      <span class="shrink-0 text-signal">New release</span>
      <span class="shrink-0 text-chalk">Cider {{ release.version }}</span>
      <span class="hidden min-w-0 truncate md:block">{{ release.shortDesc }}</span>
      <span class="ml-auto flex shrink-0 items-center gap-2.5 text-chalk transition-colors group-hover:text-signal">
        <span class="hidden sm:inline">Read changelog</span>
        <Icon name="lucide:arrow-right" class="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </span>
  </NuxtLink>

  <header class="sticky top-0 z-40 border-b border-ink-line bg-ink/85 text-chalk backdrop-blur-xl">
    <div class="sg-shell flex h-16 items-center gap-3 md:h-[76px]">
      <NuxtLink to="/" aria-label="Cider home" class="sg-focus flex items-center gap-3 rounded-lg">
        <img src="/icon.png" alt="" width="30" height="30" class="h-7 w-7 md:h-[30px] md:w-[30px]" />
        <span class="font-wordmark text-[22px] font-bold tracking-[-0.01em] md:text-2xl">Cider</span>
      </NuxtLink>

      <nav aria-label="Main" class="ml-auto hidden lg:block">
        <UiNavigationMenu>
          <UiNavigationMenuList class="gap-0.5">
            <UiNavigationMenuItem>
              <UiNavigationMenuTrigger
                title="Products"
                class="h-11 rounded-[10px] bg-transparent px-3.5 font-label text-[13px] font-medium text-chalk-dim hover:bg-transparent hover:text-chalk focus:bg-transparent focus:text-chalk data-[active]:bg-transparent data-[state=open]:bg-ink-raised data-[state=open]:text-chalk"
              />
              <UiNavigationMenuContent>
                <ul class="grid w-[340px] gap-1 p-2">
                  <li v-for="product in products" :key="product.to">
                    <UiNavigationMenuLink as-child>
                      <NuxtLink :to="product.to" class="block rounded-[10px] p-3 transition-colors hover:bg-ink-raised">
                        <span class="block text-[15px] font-semibold text-chalk">{{ product.title }}</span>
                        <span class="mt-1 block text-sm leading-snug text-chalk-dim">{{ product.description }}</span>
                      </NuxtLink>
                    </UiNavigationMenuLink>
                  </li>
                </ul>
              </UiNavigationMenuContent>
            </UiNavigationMenuItem>
            <UiNavigationMenuItem v-for="link in links" :key="link.to">
              <UiNavigationMenuLink as-child :active="isActive(link.to)">
                <NuxtLink
                  :to="link.to"
                  class="sg-focus flex h-11 items-center rounded-[10px] px-3.5 font-label text-[13px] text-chalk-dim transition-colors hover:text-chalk data-[active]:text-chalk"
                >
                  {{ link.label }}
                </NuxtLink>
              </UiNavigationMenuLink>
            </UiNavigationMenuItem>
          </UiNavigationMenuList>
        </UiNavigationMenu>
      </nav>

      <div class="ml-auto flex items-center gap-2 md:gap-2.5 lg:ml-4">
        <button type="button" class="sg-ibtn hidden md:inline-flex" :aria-label="`Search (${metaSymbol} K)`" @click="searchOpen = true">
          <Icon name="lucide:search" class="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
        <NuxtLink to="/downloads" class="sg-btn sg-btn--primary sg-btn--sm android:hidden">
          Get Cider
          <Icon name="lucide:arrow-right" class="sg-arrow hidden h-3.5 w-3.5 md:block" aria-hidden="true" />
        </NuxtLink>
        <!-- On Android the app runs right there, so the button leads to it -->
        <NuxtLink to="/downloads/android" class="sg-btn sg-btn--primary sg-btn--sm hidden android:inline-flex">
          Get Cider
          <Icon name="lucide:arrow-right" class="sg-arrow hidden h-3.5 w-3.5 md:block" aria-hidden="true" />
        </NuxtLink>
        <button
          type="button"
          class="sg-ibtn lg:hidden"
          aria-label="Open menu"
          aria-controls="site-mobile-menu"
          :aria-expanded="menuOpen"
          @click="menuOpen = true"
        >
          <Icon name="lucide:menu" class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>

    <CommandSearch v-model="searchOpen" />
    <SiteMobileMenu v-model="menuOpen" @search="openSearchFromMenu" />
  </header>
</template>

<script lang="ts" setup>
  const route = useRoute();
  const { data: release } = await useLatestRelease();

  const products = [
    {
      title: "Cider",
      description: "Our flagship Apple Music client, built for performance and customization.",
      to: "/downloads",
    },
    {
      title: "Cider for Android",
      description: "Apple Music on Android phones and VR headsets. In beta for pre-orders and supporters.",
      to: "/downloads/android",
    },
    {
      title: "Cider Remote",
      description: "Control Cider on your computer from your iPhone.",
      to: "/downloads/remote",
    },
  ];

  const links = [
    { label: "Marketplace", to: "/marketplace" },
    { label: "Taproom", to: "/taproom" },
    { label: "Changelog", to: "/changelogs" },
    { label: "About", to: "/about" },
  ];

  const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`);

  const searchOpen = ref(false);
  const menuOpen = ref(false);

  const { metaSymbol } = useShortcuts();
  defineShortcuts({
    meta_k: () => {
      searchOpen.value = !searchOpen.value;
    },
  });

  function openSearchFromMenu() {
    menuOpen.value = false;
    searchOpen.value = true;
  }
</script>
