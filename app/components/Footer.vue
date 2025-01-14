<template>
  <UiContainer
    as="footer"
    class="flex flex-col items-center justify-between gap-7 border-t py-12 lg:flex-row"
  >
    <NuxtLink to="#" class="flex items-center gap-3">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <NuxtImg
        src="/CC24-transparent.svg"
        fit="contain"
        alt="Company Logo"
        title="Company Logo"
        class="h-10 object-contain lg:h-8"
      />
      <span class="text-xl font-semibold lg:text-lg">Cider Collective</span>
    </NuxtLink>
    <ul class="flex flex-wrap gap-5">
      <li v-for="l in links" :key="l.title">
        <NuxtLink class="hover:text-primary" :to="l.path">{{ l.title }}</NuxtLink>
      </li>
    </ul>

    <p class="text-muted-foreground">&copy; {{ new Date().getFullYear() }} Cider Collective.</p>
  </UiContainer>
</template>
<script lang="ts" setup>
  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "News",
      path: "/changelogs",
    },
    {
      title: "Docs",
      path: "/docs",
    },
    {
      title: "About Us",
      path: "/about",
    },
  ];
</script>
