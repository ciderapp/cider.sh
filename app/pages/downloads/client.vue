<template>
  <main class="bg-ink text-chalk">
    <SitePageHeader
      eyebrow="Get Cider"
      title="Drink up!"
      description="Now for the fun part: pick your flavor of Cider. There are a few ways to get it."
    />

    <section class="sg-shell py-12 md:py-16 lg:py-20" aria-label="Ways to get Cider">
      <SiteDeviceNudge
        device="android"
        title="On Android? Cider runs right on your phone"
        description="Cider for Android is in beta for supporters. The options below are for your computer."
        to="/downloads/android"
        icon="mdi:android"
        class="mb-6 md:mb-8"
      />
      <SiteDeviceNudge
        device="ios"
        title="On iPhone? Pair it with Cider Remote"
        description="Cider runs on your computer. Install it there, then control it from your phone with Cider Remote."
        to="/downloads/remote"
        icon="simple-icons:apple"
        class="mb-6 md:mb-8"
      />
      <div class="grid gap-4 md:gap-6 lg:grid-cols-2">
        <article
          v-for="option in options"
          :key="option.title"
          class="flex flex-col rounded-[20px] border bg-ink-panel p-6 md:p-8"
          :class="option.featured ? 'border-signal/60' : 'border-ink-line'"
        >
          <div class="flex items-start justify-between gap-4">
            <h2 class="text-2xl font-bold tracking-[-0.02em] md:text-[28px]">{{ option.title }}</h2>
            <div v-if="option.badges.length" class="flex flex-wrap justify-end gap-2 pt-0.5 md:pt-1">
              <span
                v-for="badge in option.badges"
                :key="badge.label"
                class="inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 font-label text-[11px]"
                :class="badge.tone === 'signal' ? 'border-signal/60 text-signal' : 'border-ink-edge text-chalk-dim'"
              >
                <Icon v-if="badge.icon" :name="badge.icon" class="h-3.5 w-3.5" aria-hidden="true" />
                {{ badge.label }}
              </span>
            </div>
          </div>
          <p class="mt-3 text-pretty text-[15px] leading-relaxed text-chalk-dim md:text-base">{{ option.description }}</p>

          <ul class="mt-6 grid gap-x-6 gap-y-3 border-t border-ink-line pt-6 sm:grid-cols-2">
            <li v-for="perk in option.perks" :key="perk" class="flex gap-3 text-[15px] leading-snug text-chalk-dim">
              <Icon name="lucide:check" class="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
              <!-- Perks are trusted, hard-coded strings; some carry a link or footnote marker -->
              <span
                class="[&_a:hover]:underline [&_a]:text-signal [&_a]:underline-offset-2 [&_sup]:ml-0.5"
                v-html="perk"
              />
            </li>
          </ul>

          <p v-if="option.note" class="mt-6 text-sm leading-relaxed text-chalk-mute">{{ option.note }}</p>

          <div class="mt-auto flex flex-wrap gap-2.5 pt-8">
            <a
              v-for="action in option.actions"
              :key="action.url"
              :href="action.url"
              target="_blank"
              rel="noopener"
              class="sg-btn"
              :class="[action.primary ? 'sg-btn--primary' : 'sg-btn--ghost', option.actions.length > 1 ? 'sg-btn--sm' : 'w-full sm:w-auto']"
            >
              <span class="flex items-center gap-2.5">
                <Icon v-if="action.icon" :name="action.icon" class="h-4 w-4" aria-hidden="true" />
                {{ action.label }}
              </span>
              <Icon v-if="option.actions.length === 1" name="lucide:arrow-up-right" class="sg-arrow h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>

      <p id="fn-1" class="mt-8 text-xs text-chalk-mute">1. Performance may vary depending on your device.</p>
    </section>
  </main>
</template>

<script lang="ts" setup>
  definePageMeta({
    title: "Downloads",
    documentDriven: {
      page: {
        _path: "/downloads",
      },
    },
  });
  const site = useSiteConfig();

  useSeoMeta({
    title: "Download Cider",
    description: "Get the desktop client for Windows, macOS, and Linux.",
    ogTitle: "Download Cider",
    ogDescription: "Get the desktop client for Windows, macOS, and Linux.",
    twitterTitle: "Download Cider",
    twitterDescription: "Get the desktop client for Windows, macOS, and Linux.",
    ogUrl: `${site.url}/downloads/client`,
    ogImage: `${site.url}/og/downloads-client.png`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterImage: `${site.url}/og/downloads-client.png`,
  });

  useDiscordComponentEmbed({
    title: "Get Cider",
    description: "Desktop client for Windows, macOS, and Linux. Fast, customizable, and built for listeners.",
    thumbnailUrl: `${site.url}/icon.png`,
    buttons: [
      { label: "Buy", url: "https://taproom.cider.sh/purchase" },
      { label: "Website", url: site.url },
      { label: "Discord", url: "https://discord.gg/applemusic" },
    ],
  });

  defineOgImageComponent("OgShareCard", {
    layout: "secondary",
    title: "Download Cider",
    description: "Get the desktop client for Windows, macOS, and Linux.",
    footer: "cider.sh/downloads",
    icon: "/og-icons/downloads.png",
    site: "cider",
  });

  interface Option {
    title: string;
    description: string;
    featured?: boolean;
    badges: Array<{ label: string; tone: "signal" | "muted"; icon?: string }>;
    perks: string[];
    note?: string;
    actions: Array<{ label: string; url: string; icon?: string; primary?: boolean }>;
  }

  const taproom = "Access to <a href='https://taproom.cider.sh' target='_blank' rel='noopener'>Taproom</a>";
  const fast = "Blazingly fast<sup><a href='#fn-1' aria-label='Footnote 1'>1</a></sup>";

  const options: Option[] = [
    {
      title: "Direct",
      featured: true,
      description:
        "Available for all users on Windows, macOS, and Linux. A full list of supported platforms can be found on Taproom.",
      badges: [
        { label: "Recommended", tone: "signal" },
        { label: "New", tone: "signal" },
      ],
      perks: [
        "Support us directly by purchasing Cider through Taproom",
        "Access to Windows, macOS, and Linux releases",
        "Faster client updates than other storefronts",
        taproom,
        "Community themes and plugins verified by Cider Collective",
        "Over-the-air updates",
        "Access to features specific to each platform",
        "Tons of customization options",
        "Audio enhancements from our Audio Lab",
        fast,
        "Help and support from the Cider community and Collective team",
      ],
      actions: [{ label: "Buy on Taproom", url: "https://taproom.cider.sh/purchase", primary: true }],
    },
    {
      title: "itch.io",
      description:
        "Available for all users on Windows, macOS, and Linux. A full list of supported platforms can be found on the itch.io page.",
      badges: [{ label: "Recommended", tone: "signal" }],
      perks: [
        "Access to Windows, macOS, and Linux releases",
        "Faster client updates than other storefronts",
        taproom,
        "Community themes and plugins verified by Cider Collective",
        "Over-the-air updates",
        "Access to features specific to each platform",
        "Tons of customization options",
        "Audio enhancements from our Audio Lab",
        fast,
        "Help and support from the Cider community and Collective team",
      ],
      actions: [
        { label: "Get it on itch.io", url: "https://cidercollective.itch.io/cider", icon: "simple-icons:itchdotio" },
      ],
    },
    {
      title: "Microsoft Store",
      description:
        "Available on the Microsoft Store for Windows 10 and 11 users, with all stable features from the last major release. This version is held at 3.1 while we resolve storefront issues that prevent us from pushing 4.0.",
      badges: [{ label: "Currently on 3.1", tone: "muted", icon: "lucide:triangle-alert" }],
      perks: [
        "Windows 10 and 11 support",
        "Microsoft Store specific features",
        "Automatic updates",
        "Community themes and plugins verified by Cider Collective",
        fast,
        "Access to features specific to each platform",
        "Over-the-air updates",
        "Tons of customization options",
        "Audio enhancements from our Audio Lab",
      ],
      actions: [
        {
          label: "Get it from Microsoft",
          url: "https://apps.microsoft.com/detail/9PL8WPH0QK9M?mode=direct",
          icon: "mdi:microsoft-windows",
        },
      ],
    },
    {
      title: "Supporter Edition",
      description: "Support the development of Cider and get access to exclusive early access builds and features.",
      badges: [],
      perks: [
        "All features available in the itch.io version",
        "Early access to new features and versions",
        "Support the development of Cider with beta testing",
        taproom,
        "Available through a variety of platforms",
        "Access to supporter channels on Discord, where you can chat with the developers and other supporters",
      ],
      note: "Minimum $8.49 donation required for access to Cider Supporter Edition. Donations at or over $20 will grant you access to the Cider Alpha Channel, which contains even more bleeding-edge features.",
      actions: [
        { label: "Discord", url: "https://discord.gg/applemusic", icon: "simple-icons:discord" },
        { label: "Patreon", url: "https://www.patreon.com/cidercollective", icon: "simple-icons:patreon" },
        { label: "Open Collective", url: "https://opencollective.com/ciderapp", icon: "simple-icons:opencollective" },
        { label: "GitHub Sponsors", url: "https://github.com/sponsors/ciderapp", icon: "simple-icons:githubsponsors" },
      ],
    },
  ];
</script>
