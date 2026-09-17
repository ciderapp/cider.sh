<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
  const { locale } = useI18n();

  useSeoMeta({
    titleTemplate: "%s | Cider Collective",
    twitterCard: "summary_large_image",
    twitterSite: "@UseCider",
    ogType: "website",
    ogSiteName: "Cider Collective",
    themeColor: "#dc0f54",
    ogLocale: () => locale.value,
  });
  useHead({
    htmlAttrs: {
      lang: () => locale.value,
    },
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/icon.png",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
      },
    ],
    script: [
      {
        defer: true,
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        "data-cf-beacon": '{"token": "3b01b333ebe84443a628f1605bb45cea"}',
      },
    ],
  });
</script>
