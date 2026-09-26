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
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300..800&family=Martian+Mono:wght@400..600&display=swap",
      },
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
        // Tag the device before first paint so prerendered pages can point Android visitors at
        // Cider for Android and iPhone visitors at Cider Remote, without a flash or a hydration
        // mismatch. Meta Quest's browser counts as Android, since Cider for Android runs there.
        key: "device",
        tagPosition: "head",
        tagPriority: "critical",
        innerHTML:
          '(function(){try{var n=navigator,u=n.userAgent||"",d="desktop";if(/Android|OculusBrowser|Quest/i.test(u))d="android";else if(/iPhone|iPad|iPod/.test(u)||(n.platform==="MacIntel"&&n.maxTouchPoints>1))d="ios";document.documentElement.setAttribute("data-device",d)}catch(e){}})()',
      },
      {
        defer: true,
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        "data-cf-beacon": '{"token": "3b01b333ebe84443a628f1605bb45cea"}',
      },
    ],
  });
</script>
