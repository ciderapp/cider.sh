<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
  useSeoMeta({
    title: `Home`,
    titleTemplate: "%s | Cider Collective",
    twitterCard: "summary_large_image",
    twitterSite: "@UseCider",
    ogType: "website",
    ogSiteName: "Cider Collective",
    ogUrl: "https://cider.sh",
    themeColor: "#e83057",
    ogLocale: "en_US",
  });
  useHead({
    htmlAttrs: {
      lang: "en-US",
    },
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/logo.png",
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
