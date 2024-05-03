<template>
  <header class="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
    <div class="container flex h-14 items-center justify-between">
      <div class="flex items-center gap-10">
        <div class="flex items-center gap-5">
          <UiButton
            size="icon-sm"
            variant="outline"
            class="h-9 w-9 lg:hidden"
            @click="mobileNav = true"
            ><Icon name="heroicons:bars-3" class="h-4 w-4" />
          </UiButton>

          <NuxtLink to="/" class="flex items-center text-lg font-bold">
            <div class="mr-2 flex rounded-md bg-black p-1 dark:bg-black/0">
              <NuxtImg src="/CC24-transparent.svg" class="h-8 w-8" />
            </div>

            <span class="hidden md:block">Cider Collective</span>
            <span class="text-md font-bold md:hidden">CC</span>
          </NuxtLink>
        </div>
        <nav class="hidden items-center space-x-6 text-sm font-medium lg:flex">
          <UiNavigationMenu>
            <UiNavigationMenuList>
              <UiNavigationMenuItem
                :class="[
                  currentPath.includes('/remote') || currentPath.includes('/downloads')
                    ? '!text-foreground'
                    : '',
                ]"
                class="text-foreground/60 transition-colors hover:text-foreground"
              >
                <UiNavigationMenuTrigger title="Products" />
                <UiNavigationMenuContent>
                  <div class="grid w-[350px] grid-cols-1 gap-5 p-4">
                    <ul class="flex flex-col gap-2">
                      <li
                        v-for="(item, i) in products"
                        :key="i"
                        class="rounded-md p-3 text-sm hover:bg-muted"
                      >
                        <NuxtLink :to="item.link">
                          <div class="flex w-full">
                            <p class="mb-1 font-semibold leading-none text-foreground">
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
              <UiNavigationMenuItem>
                <UiNavigationMenuLink
                  asChild
                  :class="[currentPath.includes('/changelogs') ? '!text-foreground' : '']"
                  class="text-foreground/60 transition-colors hover:text-foreground"
                >
                  <UiButton variant="link" to="/changelogs">Changelogs</UiButton>
                </UiNavigationMenuLink>
              </UiNavigationMenuItem>
              <UiNavigationMenuItem>
                <UiNavigationMenuLink
                  asChild
                  :class="[currentPath.includes('/docs') ? '!text-foreground' : '']"
                  class="text-foreground/60 transition-colors hover:text-foreground"
                >
                  <UiButton variant="link" to="/docs">Docs</UiButton>
                </UiNavigationMenuLink>
              </UiNavigationMenuItem>
              <UiNavigationMenuItem>
                <UiNavigationMenuLink
                  asChild
                  class="text-foreground/60 transition-colors hover:text-foreground"
                >
                  <UiButton variant="link" to="/marketplace">Marketplace</UiButton>
                  <!-- TODO: Update to https://marketplace.cider.sh when ready-->
                </UiNavigationMenuLink>
              </UiNavigationMenuItem>
            </UiNavigationMenuList>
          </UiNavigationMenu>
        </nav>
      </div>

      <div class="flex items-center">
        <UiButton
          size="sm"
          class="mr-2 hidden min-w-[300px] font-normal text-muted-foreground md:flex"
          variant="outline"
          @click="isOpen = true"
        >
          <Icon name="fe:search" />
          Search...
          <UiKbd class="ml-auto">{{ metaSymbol }}+K</UiKbd>
        </UiButton>
        <UiButton
          size="icon"
          class="mr-2 text-muted-foreground md:hidden"
          variant="ghost"
          @click="isOpen = true"
        >
          <Icon name="fe:search" class="mt-1 h-[25px] w-[25px]" />
        </UiButton>
        <div class="social-icons flex items-center gap-3">
          <NuxtLink v-for="link in socialLinks" :key="link.url" :to="link.url" target="_blank">
            <Icon :name="link.icon" />
          </NuxtLink>
        </div>
        <CommandSearch v-model="isOpen" />
      </div>
    </div>
    <MobileNav v-model="mobileNav" v-if="mobileNav" />
  </header>
</template>

<style scoped lang="scss">
  .social-icons .icon {
    width: auto;
    height: 1.35rem;
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }
</style>

<script lang="ts" setup>
  const currentPath = ref(useRoute().fullPath);
  watch(
    () => useRoute().fullPath,
    (val) => (currentPath.value = val)
  );
  const socialLinks = [
    {
      url: "https://github.com/ciderapp/",
      icon: "simple-icons:github",
    },
    {
      url: "https://x.com/useCider",
      icon: "simple-icons:x",
    },

    { url: "https://discord.gg/applemusic", icon: "simple-icons:discord" },
    {
      url: "https://opencollective.com/cider",
      icon: "simple-icons:opencollective",
    },
  ];

  const products = [
    {
      title: "Cider Client",
      description: "Available for Windows, macOS, and Linux! The main Cider client.",
      link: "/downloads/client",
    },
    {
      title: "Cider Remote",
      description: "Easily control your music from your phone or tablet.",
      link: "/downloads/remote",
    },
    {
      title: "Cider Connect",
      badgeText: "Coming Soon",
      description:
        "Get a Cider account to sync your client settings, host and join listening parties and more.",
      link: "#", // TODO: Update link when Connect is live
    },
  ];

  const modes = [
    { icon: "lucide:sun", title: "Light", value: "light" },
    { icon: "lucide:moon", title: "Dark", value: "dark" },
    { icon: "lucide:laptop", title: "System", value: "system" },
  ];

  const mobileNav = ref(false);

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
