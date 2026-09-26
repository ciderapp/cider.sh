<template>
  <main class="bg-ink text-chalk">
    <SitePageHeader
      eyebrow="Learn more"
      title="The perfect client for Apple Music users"
      description="Cider not only provides a refreshing alternative to Apple's official music client, it transforms your entire music experience with its emphasis on design and user experience."
    >
      <NuxtLink to="/downloads" class="sg-btn sg-btn--primary sm:min-w-[220px]">
        Get Cider
        <Icon name="lucide:arrow-right" class="sg-arrow h-4 w-4" aria-hidden="true" />
      </NuxtLink>
    </SitePageHeader>

    <section class="sg-shell py-12 md:py-16 lg:py-20" aria-label="Cider in numbers">
      <ul class="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-x-4 gap-y-8 lg:grid-cols-[repeat(4,minmax(0,1fr))] lg:gap-x-6">
        <li v-for="stat in stats" :key="stat.text" class="border-t border-ink-line pt-5">
          <p class="text-[32px] font-extrabold leading-none tracking-[-0.045em] text-signal sm:text-[44px] md:text-[64px]">
            {{ stat.value }}
          </p>
          <p class="mt-2 text-lg font-semibold">{{ stat.text }}</p>
          <p class="mt-2 hidden text-pretty text-[15px] leading-relaxed text-chalk-dim md:block">{{ stat.description }}</p>
        </li>
      </ul>
      <div class="mt-12 md:mt-16">
        <SiteShowcase
          src="/client/immersive.webp"
          alt="Cider immersive mode with full-screen artwork and synced lyrics"
          :width="2395"
          :height="1065"
          bleed
        />
      </div>
    </section>

    <section aria-labelledby="learn-compare" class="bg-bone text-ink">
      <div class="sg-shell py-14 md:py-[72px] lg:py-24">
        <h2
          id="learn-compare"
          class="text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.045em] md:text-[72px] lg:text-[88px]"
        >
          Feature comparison
        </h2>
        <p class="mt-5 max-w-[560px] text-[17px] leading-relaxed text-bone-mute md:text-lg">
          Check how Cider stacks up against the competition.
        </p>

        <div class="relative mt-10 overflow-x-auto rounded-[20px] border border-bone-line bg-[#F4F2EE] lg:mt-14">
          <table class="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr class="border-b border-bone-line font-label text-xs text-bone-mute">
                <th scope="col" class="sticky left-0 bg-[#F4F2EE] px-5 py-4 font-medium">Feature</th>
                <th
                  v-for="column in columns"
                  :key="column.key"
                  scope="col"
                  class="px-4 py-4 text-center font-medium"
                  :class="column.key === 'cider2' ? 'bg-ink text-chalk' : ''"
                >
                  {{ column.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="feature in features" :key="feature.name" class="border-b border-bone-line last:border-b-0">
                <th scope="row" class="sticky left-0 bg-[#F4F2EE] px-5 py-4 text-[15px] font-semibold">
                  {{ feature.name }}
                  <sup v-if="feature.footnote" :id="`fnref-${feature.footnote}`">
                    <a :href="`#fn-${feature.footnote}`" class="text-signal-deep" :aria-label="`Footnote ${feature.footnote}`">{{
                      feature.footnote
                    }}</a>
                  </sup>
                </th>
                <td
                  v-for="column in columns"
                  :key="column.key"
                  class="px-4 py-4 text-center"
                  :class="column.key === 'cider2' ? 'bg-ink text-signal' : ''"
                >
                  <Icon
                    :name="feature[column.key] ? 'lucide:check' : 'lucide:minus'"
                    class="mx-auto h-5 w-5"
                    :class="feature[column.key] ? '' : column.key === 'cider2' ? 'text-chalk-mute' : 'text-bone-mute'"
                    aria-hidden="true"
                  />
                  <span class="sr-only">{{ feature[column.key] ? "Yes" : "No" }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section aria-labelledby="learn-faq" class="sg-shell py-14 md:py-20 lg:py-24">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div class="lg:col-span-4">
          <h2 id="learn-faq" class="text-[40px] font-extrabold uppercase leading-[0.9] tracking-[-0.045em] md:text-[56px]">
            Frequently asked questions
          </h2>
          <p class="mt-4 text-[17px] leading-relaxed text-chalk-dim">Everything you need to know about Cider.</p>
        </div>
        <div class="lg:col-span-8">
          <details v-for="item in faq" :key="item.title" class="group border-b border-ink-line first:border-t">
            <summary
              class="sg-focus flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold tracking-[-0.01em] [&::-webkit-details-marker]:hidden"
            >
              {{ item.title }}
              <Icon
                name="lucide:plus"
                class="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-45 group-open:text-signal"
                aria-hidden="true"
              />
            </summary>
            <p class="pb-6 pr-10 text-pretty text-[15px] leading-relaxed text-chalk-dim md:text-base">{{ item.content }}</p>
          </details>

          <div
            class="mt-10 flex flex-col gap-5 rounded-[20px] border border-ink-line bg-ink-panel p-6 md:flex-row md:items-center md:justify-between md:p-8"
          >
            <div>
              <p class="text-xl font-bold tracking-[-0.02em]">Still have questions?</p>
              <p class="mt-1 text-[15px] text-chalk-dim">Can't find the answer you're looking for? Our community can help.</p>
            </div>
            <a href="https://discord.gg/applemusic" target="_blank" rel="noopener" class="sg-btn sg-btn--ghost shrink-0">
              <span class="flex items-center gap-2.5">
                <Icon name="simple-icons:discord" class="h-4 w-4" aria-hidden="true" />
                Ask on Discord
              </span>
            </a>
          </div>

          <ol class="mt-8 text-xs text-chalk-mute">
            <li id="fn-1">
              1. Support for Adjustable Vocals not currently included.
              <a
                href="#fnref-1"
                class="sg-focus inline-flex align-middle text-chalk-dim hover:text-chalk"
                aria-label="Back to reference"
              >
                <Icon name="lucide:arrow-up" class="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
  const site = useSiteConfig();

  useSeoMeta({
    title: "Learn More",
    description: "Features, platforms, and why people choose Cider.",
    ogTitle: "Learn More",
    ogDescription: "Features, platforms, and why people choose Cider.",
    twitterTitle: "Learn More",
    twitterDescription: "Features, platforms, and why people choose Cider.",
    ogUrl: `${site.url}/learn-more`,
    ogImage: `${site.url}/og/learn-more.png`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterImage: `${site.url}/og/learn-more.png`,
  });

  defineOgImageComponent('OgShareCard', {
    layout: 'secondary',
    title: 'Learn more',
    description: 'Features, platforms, and why people choose Cider.',
    footer: 'cider.sh/learn-more',
    site: 'cider',
  });

  const columns = [
    { key: "cider2", label: "Cider" },
    { key: "cider1", label: "Cider Classic" },
    { key: "musicWeb", label: "Apple Music web" },
    { key: "musicMac", label: "Apple Music for Mac" },
    { key: "musicWin", label: "Apple Music for Windows" },
  ] as const;

  const features: Array<{
    name: string;
    footnote?: number;
    cider1: boolean;
    cider2: boolean;
    musicWeb: boolean;
    musicMac: boolean;
    musicWin: boolean;
  }> = [
    {
      name: "iCloud library",
      cider1: true,
      cider2: true,
      musicWeb: true,
      musicMac: true,
      musicWin: true,
    },
    {
      name: "Community driven",
      cider1: true,
      cider2: true,
      musicWeb: false,
      musicMac: false,
      musicWin: false,
    },
    {
      name: "Chromecast",
      cider1: true,
      cider2: true,
      musicWeb: true,
      musicMac: false,
      musicWin: false,
    },
    {
      name: "AirPlay",
      cider1: true,
      cider2: true,
      musicWeb: false,
      musicMac: true,
      musicWin: true,
    },
    {
      name: "Built-in Last.fm and Discord integrations",
      cider1: true,
      cider2: true,
      musicWeb: false,
      musicMac: false,
      musicWin: false,
    },

    {
      name: "Apple Music Sing",
      footnote: 1,
      cider1: true,
      cider2: true,
      musicWeb: true,
      musicMac: false,
      musicWin: false,
    },
    {
      name: "Seamless library browsing",
      cider1: false,
      cider2: true,
      musicWeb: false,
      musicMac: true,
      musicWin: false,
    },
    {
      name: "Visual customization",
      cider1: true,
      cider2: true,
      musicWeb: false,
      musicMac: false,
      musicWin: false,
    },
    {
      name: "Audio enhancements",
      cider1: true,
      cider2: true,
      musicWeb: false,
      musicMac: false,
      musicWin: false,
    },
    {
      name: "Custom themes and plugins",
      cider1: true,
      cider2: true,
      musicWeb: false,
      musicMac: false,
      musicWin: false,
    },
    {
      name: "Constant updates and new features",
      cider1: false,
      cider2: true,
      musicWeb: false,
      musicMac: false,
      musicWin: false,
    },
  ];

  const faq: { title: string; content: string }[] = [
    {
      title: "Is lossless audio supported?",
      content:
        "Unfortunately, we do not support lossless audio at this time. This is not currently possible in the MusicKit.js library due to there being no ability to decrypt the lossless music.",
    },
    {
      title: "Do you collect my data?",
      content:
        "No! We have a strict no data collection policy. We do not collect any personal data.",
    },
    {
      title: "Is it free to use?",
      content:
        "Cider is a paid application, available through Taproom, itch.io, donation, or the Microsoft Store. Purchasing through itch.io or through donation will allow you to get the latest updates and features through Taproom.",
    },
    {
      title: "Can I customize with my own theme?",
      content:
        "Absolutely! We provide a powerful theming system that lets you create your own custom theme or choose from a selection of approved community themes available on the Cider Marketplace.",
    },
    {
      title: "Is signing into Cider safe?",
      content: "Yes. We only use the Apple Music API to access your library.",
    },
    {
      title: "Is there a free trial available?",
      content: "Unfortunately, we do not offer a free trial.",
    },
    {
      title: "Can I transfer my Cider license from one store to another?",
      content:
        "No, unfortunately, we do not support transferring licenses between stores. If you have purchased Cider from itch.io, you will need to purchase it again from the Microsoft Store and vice versa, so make sure you purchase from the store you want to use it on. itch.io will give you the best available builds.",
    },
  ];

  const stats = [
    {
      text: "GitHub Stars",
      value: "7.1K+",
      description: "Cider Classic has earned over 7.1K stars on GitHub. We know our stuff.",
    },
    {
      text: "Enjoyment factor",
      value: "600%",
      description: "Cider is filled with cool quirks and features. Many more yet to come.",
    },
    {
      text: "Open-source integrations",
      value: "10+",
      description:
        "We offer first-party integrations for Discord and Last.fm with much more available through plugins made by the community.",
    },
    {
      text: "Customization",
      value: "Unlimited",
      description:
        "Your client, your style. Don't let large companies dictate how your apps should look and feel.",
    },
  ];
</script>
