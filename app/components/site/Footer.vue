<template>
  <footer class="relative overflow-hidden border-t border-ink-line bg-ink text-chalk">
    <div class="sg-shell pt-12 md:pt-20">
      <div class="grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
        <div class="lg:col-span-4">
          <NuxtLink to="/" aria-label="Cider home" class="sg-focus inline-flex items-center gap-3 rounded-lg">
            <img src="/icon.png" alt="" width="36" height="36" class="h-8 w-8 md:h-9 md:w-9" />
            <span class="font-wordmark text-[26px] font-bold tracking-[-0.01em] md:text-[30px]">Cider</span>
          </NuxtLink>
          <p class="mt-4 max-w-xs text-base leading-normal text-chalk-dim md:mt-5 md:text-[17px]">
            Community-run Apple Music for Windows, macOS, Linux, and Android.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:col-span-8 lg:gap-x-6">
          <div v-for="column in columns" :key="column.title">
            <p class="mb-3.5 font-label text-xs text-chalk-mute md:mb-[18px]">{{ column.title }}</p>
            <ul class="flex flex-col gap-2.5 md:gap-3">
              <li v-for="link in column.links" :key="link.label">
                <a
                  v-if="link.href"
                  :href="link.href"
                  target="_blank"
                  rel="noopener"
                  class="sg-focus text-[15px] text-chalk-dim transition-colors hover:text-chalk md:text-base"
                >
                  {{ link.label }}
                </a>
                <NuxtLink
                  v-else
                  :to="link.to"
                  class="sg-focus text-[15px] text-chalk-dim transition-colors hover:text-chalk md:text-base"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-10 flex h-14 items-center justify-between border-t border-ink-line font-label text-xs text-chalk-mute md:mt-14">
        <span>&copy; {{ year }} Cider Collective</span>
        <a href="#" class="sg-focus flex min-h-11 items-center gap-2.5 text-chalk transition-colors hover:text-signal">
          Back to top
          <Icon name="lucide:arrow-up" class="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      <p
        aria-hidden="true"
        class="-mb-[0.12em] mt-2 whitespace-nowrap font-wordmark text-[min(34vw,500px)] font-bold leading-[0.8] tracking-[-0.01em] text-transparent [-webkit-text-stroke:1.5px_#2E2E33]"
      >
        Cider
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
  const year = new Date().getFullYear();

  const columns: Array<{ title: string; links: Array<{ label: string; to?: string; href?: string }> }> = [
    {
      title: "Navigate",
      links: [
        { label: "Home", to: "/" },
        { label: "News", to: "/changelogs" },
        { label: "Taproom", to: "/taproom" },
        { label: "About us", to: "/about" },
        { label: "Legal", to: "/legal/privacy" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Cider", to: "/downloads" },
        { label: "Cider for Android", to: "/downloads/android" },
        { label: "Cider Remote", to: "/downloads/remote" },
        { label: "Marketplace", to: "/marketplace" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Discord", href: "https://discord.gg/applemusic" },
        { label: "GitHub", href: "https://github.com/ciderapp" },
        { label: "X / Twitter", href: "https://twitter.com/UseCider" },
      ],
    },
    {
      title: "Built with",
      links: [
        { label: "Quasar", href: "https://quasar.dev" },
        { label: "Vue", href: "https://vuejs.org" },
        { label: "Socket.io", href: "https://socket.io" },
        { label: ".NET (Windows)", href: "https://dotnet.microsoft.com" },
        { label: "Electron (macOS, Linux)", href: "https://electronjs.org" },
      ],
    },
  ];
</script>
