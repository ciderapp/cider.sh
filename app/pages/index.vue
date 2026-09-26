<script lang="ts" setup>
  const site = useSiteConfig();

  useSeoMeta({
    title: "Cider: Cross-Platform Apple Music Client",
    description: "Cider is a community-run Apple Music client for Windows, macOS, and Linux. Fast, customizable, and built for listeners.",
    ogTitle: "Cider: Cross-Platform Apple Music Client",
    ogDescription: "Cider is a community-run Apple Music client for Windows, macOS, and Linux. Fast, customizable, and built for listeners.",
    twitterTitle: "Cider: Cross-Platform Apple Music Client",
    twitterDescription: "Cider is a community-run Apple Music client for Windows, macOS, and Linux. Fast, customizable, and built for listeners.",
    ogUrl: site.url,
    ogImage: `${site.url}/og/home.png`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterImage: `${site.url}/og/home.png`,
  });

  useDiscordComponentEmbed({
    title: "Cider",
    description: "Community-run Apple Music for Windows, macOS, and Linux.",
    thumbnailUrl: `${site.url}/icon.png`,
    buttons: [
      { label: "Buy", url: "https://taproom.cider.sh/purchase" },
      { label: "Website", url: site.url },
      { label: "Discord", url: "https://discord.gg/applemusic" },
    ],
  });

  useHead({
    link: [
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/host-grotesk-outline-800.woff2",
        crossorigin: "",
      },
    ],
    script: [
      {
        type: 'application/ld+json',
        key: 'structured-data',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              '@id': 'https://cider.sh/#website',
              url: 'https://cider.sh',
              name: 'Cider',
              description: 'A powerful, customizable Apple Music client for every platform.',
              inLanguage: 'en-US',
            },
            {
              '@type': 'Organization',
              '@id': 'https://cider.sh/#organization',
              name: 'Cider Collective',
              url: 'https://cider.sh',
              logo: {
                '@type': 'ImageObject',
                url: 'https://cider.sh/icon.png',
              },
              sameAs: [
                'https://twitter.com/UseCider',
                'https://github.com/ciderapp/cider',
                'https://discord.gg/applemusic',
              ],
            },
            {
              '@type': 'SoftwareApplication',
              '@id': 'https://cider.sh/#software',
              name: 'Cider',
              operatingSystem: 'Windows, macOS, Linux',
              applicationCategory: 'MultimediaApplication',
              offers: {
                '@type': 'Offer',
                price: '8.49',
                priceCurrency: 'USD',
              },
              description: 'A powerful, customizable Apple Music client for every platform.',
              softwareVersion: '4.0',
              author: {
                '@id': 'https://cider.sh/#organization',
              },
            },
          ],
        }),
      },
    ],
  });

  defineOgImageComponent('OgShareCard', {
    layout: 'home',
    site: 'cider',
    image: '/client-interface.png',
  });

  definePageMeta({ colorMode: "dark" });

  // Easter egg: /?uwu swaps in the uwu logo above the hero copy.
  const route = useRoute();
  const isUwu = computed(() => "uwu" in route.query);
</script>

<template>
  <main class="overflow-x-clip bg-ink text-chalk">
    <HomeHero :uwu="isUwu" />
    <HomeTicker />
    <HomeFeatures />
    <HomeAudio />
    <HomeAndroid />
    <HomeRemote />
    <HomeTestimonials />
    <HomeCta />
  </main>
</template>
