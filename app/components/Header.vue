<template>
  <header class="fixed left-1/2 top-4 z-40 w-full max-w-4xl -translate-x-1/2 px-4 transition-all duration-300 hidden md:block">
    <div class="flex h-[3.25rem] items-center justify-between rounded-full border border-border/50 bg-background/50 px-5 shadow-lg backdrop-blur-xl">
      <!-- Left: Logo -->
      <div class="flex flex-1 items-center justify-start">
        <NuxtLink to="/" class="flex items-center text-lg font-bold transition-transform hover:scale-[1.02]">
          <div class="mr-2 flex rounded-xl bg-black p-1 dark:bg-black/0">
            <NuxtImg src="/CC24-transparent.svg" class="h-6 w-6" />
          </div>

          <span class="hidden text-base md:block">Cider Collective</span>
          <span class="text-md font-bold md:hidden">CC</span>
        </NuxtLink>
      </div>

      <!-- Center: Nav Links -->
      <div class="hidden flex-shrink-0 items-center justify-center md:flex">
        <nav class="flex items-center space-x-1 text-sm font-medium">
          <UiNavigationMenu>
            <UiNavigationMenuList>
              <UiNavigationMenuItem
                :class="[
                  currentPath.includes('/remote') || currentPath.includes('/downloads')
                    ? '!text-foreground'
                    : '',
                ]"
                class="text-foreground/70 transition-colors hover:text-foreground"
              >
            <UiNavigationMenuTrigger title="Products" class="h-8 rounded-full bg-transparent px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted" />
                <UiNavigationMenuContent>
                  <div class="grid w-[350px] grid-cols-1 gap-5 p-4">
                    <ul class="flex flex-col gap-1">
                      <li
                        v-for="(item, i) in products"
                        :key="i"
                        class="group rounded-xl p-3 text-sm transition-colors hover:bg-muted/50"
                      >
                        <NuxtLink :to="item.link">
                          <div class="flex w-full items-center">
                            <p class="mb-1.5 font-medium leading-none text-foreground transition-colors group-hover:text-primary">
                              {{ item.title }}
                              <UiBadge
                                v-if="item.badgeText"
                                class="ml-2 inline-block border-primary text-primary"
                                variant="outline"
                                >{{ item.badgeText }}</UiBadge
                              >
                            </p>
                          </div>

                          <p class="line-clamp-2 text-muted-foreground">{{ item.description }}</p>
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </UiNavigationMenuContent>
              </UiNavigationMenuItem>

              <!-- Changelogs -->
              <!-- Marketplace -->
              <UiNavigationMenuItem>
                <UiNavigationMenuLink
                  asChild
                  :class="[currentPath.includes('/marketplace') ? '!bg-primary/10 !text-primary' : '']"
                  class="rounded-full text-foreground/70 transition-colors"
                >
                  <UiButton variant="ghost" size="sm" class="rounded-full hover:bg-muted hover:text-foreground" to="/marketplace">Marketplace</UiButton>
                </UiNavigationMenuLink>
              </UiNavigationMenuItem>

              <!-- Taproom (formerly Docs) -->
              <UiNavigationMenuItem>
                <UiNavigationMenuLink
                  asChild
                  :class="[currentPath.includes('/taproom') ? '!bg-primary/10 !text-primary' : '']"
                  class="rounded-full text-foreground/70 transition-colors"
                >
                  <UiButton variant="ghost" size="sm" class="rounded-full hover:bg-muted hover:text-foreground" to="/taproom">Taproom</UiButton>
                </UiNavigationMenuLink>
              </UiNavigationMenuItem>
            </UiNavigationMenuList>
          </UiNavigationMenu>
        </nav>
      </div>

      <!-- Right: Search -->
      <div class="flex flex-1 items-center justify-end">
        <UiButton
          size="sm"
          class="hidden h-[2.125rem] w-48 items-center justify-between rounded-full bg-muted/50 pl-3 pr-1.5 font-normal text-muted-foreground transition-colors hover:bg-muted lg:flex"
          variant="ghost"
          @click="isOpen = true"
        >
          <span class="flex items-center gap-2">
            <Icon name="fe:search" class="h-4 w-4" />
            <span class="text-sm">Search...</span>
          </span>
          <UiKbd class="flex h-5 items-center rounded-md border-none bg-background/50 px-1.5 font-sans text-[11px] font-medium">{{ metaSymbol }} K</UiKbd>
        </UiButton>
        <UiButton
          size="icon"
          class="text-muted-foreground lg:hidden"
          variant="ghost"
          @click="isOpen = true"
        >
          <Icon name="fe:search" class="h-5 w-5" />
        </UiButton>
        <CommandSearch v-model="isOpen" />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
  const route = useRoute();
  const currentPath = ref(route.fullPath);
  watch(
    () => route.fullPath,
    (val) => (currentPath.value = val)
  );

  interface Product {
    title: string;
    description: string;
    link: string;
    badgeText?: string;
  }

  const products: Product[] = [
    {
      title: "Cider",
      description: "Our flagship Apple Music client, built for performance and customization.",
      link: "/downloads",
    },
    {
      title: "Cider Remote",
      description: "Control your listening experience seamlessly from any mobile device.",
      link: "/remote",
    },
    // {
    //   title: "Cider Connect",
    //   badgeText: "Coming Soon",
    //   description:
    //     "Get a Cider account to sync your client settings, host and join listening parties and more.",
    //   link: "#", // TODO: Update link when Connect is live
    // },
  ];

  const modes = [
    { icon: "lucide:sun", title: "Light", value: "light" },
    { icon: "lucide:moon", title: "Dark", value: "dark" },
    { icon: "lucide:laptop", title: "System", value: "system" },
  ];

  const isOpen = ref(false);

  const { metaSymbol } = useShortcuts();
  defineShortcuts({
    meta_k: () => {
      isOpen.value = !isOpen.value;
    },
  });

  const externalProjects = [
    { name: "Settings Dashboard", link: "https://settings-dash.behonbaker.com/" },
    { name: "ETag Topup UI", link: "https://etag-ui.behonbaker.com/" },
  ];
</script>
