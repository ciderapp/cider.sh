<template>
  <UiContainer class="py-4 lg:py-8">
    <p class="mb-8 text-center text-muted-foreground">
      {{ props.isDesktop ? "Cider" : "Remote" }} was built using these amazing frameworks and libraries
    </p>
    <div class="flex flex-wrap items-center justify-center gap-5">
      <template v-for="n in companies" :key="n.text">
        <UiTooltip disable-closing-trigger>
          <template #trigger>
            <UiTooltipTrigger as-child>
              <NuxtLink :to="n.link">
                <span class="sr-only">{{ n.text }}</span>
                <Icon :name="n.icon" class="h-24 w-24" v-if="!n.icon.startsWith('/')"/>
                <img :src="n.icon" class="h-24 w-24" v-if="n.icon.startsWith('/')"/>
              </NuxtLink>
            </UiTooltipTrigger>
          </template>
          <template #content>
            <UiTooltipContent align="center">
              <p>{{ n.text }}</p>
            </UiTooltipContent>
          </template>
        </UiTooltip>
      </template>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = defineProps({
    isDesktop: {
      type: Boolean,
      default: true,
    },
  })

  const companies = props.isDesktop ? [
    { text: "Quasar", icon: "vscode-icons:file-type-quasar", link: "https://quasar.dev" },
    { text: "Vue", icon: "logos:vue", link: "https://vuejs.org" },
    { text: "Socket.io", icon: "logos:socket-io", link: "https://socket.io" },
    {
      text: ".NET (for Windows Builds)",
      icon: "logos:dotnet",
      link: "https://dotnet.microsoft.com",
    },
    {
      text: "Electron (for macOS and Linux)",
      icon: "logos:electron",
      link: "https://electronjs.org",
    },
  ] : [
    { text: "SwiftUI", icon: "/swiftui.png", link: "https://developer.apple.com/swiftui/" },
    { text: "Socket.io", icon: "logos:socket-io", link: "https://socket.io" },
  ];
</script>
