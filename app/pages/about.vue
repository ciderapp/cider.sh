<template>
  <main class="bg-ink text-chalk">
    <SitePageHeader
      eyebrow="About us"
      title="Meet the team"
      description="The Cider team is a group of passionate developers who are dedicated to making the best experience for Apple Music on every platform."
    />

    <section class="sg-shell py-12 md:py-16 lg:py-20" aria-label="Team">
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        <li
          v-for="member in members"
          :key="member.name"
          class="group flex flex-col rounded-[20px] border border-ink-line bg-ink-panel p-6 transition-colors hover:border-ink-edge"
          :style="{ '--member': member.color ?? '#FF2B5E' }"
        >
          <img
            :src="member.avatar"
            alt=""
            width="64"
            height="64"
            loading="lazy"
            class="h-16 w-16 rounded-full bg-ink-raised ring-2 ring-transparent ring-offset-2 ring-offset-ink-panel transition-shadow group-hover:ring-[var(--member)]"
          />
          <p class="mt-5 text-xl font-bold tracking-[-0.02em]">{{ member.name }}</p>
          <p class="mt-1 font-label text-xs text-signal">{{ member.role }}</p>
          <p v-if="member.quote" class="mt-4 text-pretty text-[15px] leading-relaxed text-chalk-dim">&ldquo;{{ member.quote }}&rdquo;</p>
          <div class="mt-auto flex gap-2 pt-6">
            <a
              v-if="member.github"
              :href="member.github"
              target="_blank"
              rel="noopener"
              class="sg-ibtn"
              :aria-label="`${member.name} on GitHub`"
            >
              <Icon name="simple-icons:github" class="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              v-if="member.twitter"
              :href="member.twitter"
              target="_blank"
              rel="noopener"
              class="sg-ibtn"
              :aria-label="`${member.name} on X`"
            >
              <Icon name="simple-icons:x" class="h-4 w-4" aria-hidden="true" />
            </a>
            <a v-if="member.email" :href="`mailto:${member.email}`" class="sg-ibtn" :aria-label="`Email ${member.name}`">
              <Icon name="lucide:mail" class="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </li>
      </ul>
    </section>

    <section aria-labelledby="about-contributors" class="border-t border-ink-line">
      <div class="sg-shell py-12 md:py-16 lg:py-20">
        <h2
          id="about-contributors"
          class="text-[40px] font-extrabold uppercase leading-[0.9] tracking-[-0.045em] md:text-[56px]"
        >
          Contributors
        </h2>
        <p class="mt-4 max-w-[560px] text-[17px] leading-relaxed text-chalk-dim">
          We also want to give special thanks to our contributors on GitHub.
        </p>
        <a
          href="https://github.com/ciderapp/cider/graphs/contributors"
          target="_blank"
          rel="noopener"
          class="sg-focus mt-8 block rounded-[20px] border border-ink-line bg-ink-panel p-4 transition-colors hover:border-ink-edge md:p-6"
        >
          <img
            src="https://contrib.rocks/image?repo=ciderapp/cider&columns=20"
            alt="Avatars of everyone who has contributed to Cider on GitHub"
            loading="lazy"
            class="w-full"
          />
        </a>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
  const site = useSiteConfig();

  useSeoMeta({
    title: "About Cider Collective",
    description: "Meet the Cider Collective: the team building a better cross-platform Apple Music experience.",
    ogTitle: "About Cider Collective",
    ogDescription: "Meet the Cider Collective: the team building a better cross-platform Apple Music experience.",
    twitterTitle: "About Cider Collective",
    twitterDescription: "Meet the Cider Collective: the team building a better cross-platform Apple Music experience.",
    ogUrl: `${site.url}/about`,
    ogImage: `${site.url}/og/about.png`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterImage: `${site.url}/og/about.png`,
  });

  defineOgImageComponent('OgShareCard', {
    layout: 'secondary',
    title: 'About Cider Collective',
    description: 'The story behind Cider and the community building it.',
    footer: 'cider.sh/about',
    icon: '/og-icons/about.png',
    site: 'cider',
  });

  const rolePriority = {
    Founder: 1,
    "Lead Developer": 2,
    Developer: 3,
  };

  interface CollectiveMember {
    name: string;
    github?: string;
    role?: string;
    roles?: string[];
    projects?: string[];
    avatar?: string;
    twitter?: string;
    email?: string;
    quote?: string;
    color?: string;
    songId?: string;
    songTimestamp?: number;
  }

  const members: CollectiveMember[] = [
    {
      name: "cryptofyre",
      github: "https://github.com/cryptofyre",
      role: "Founder",
      roles: [
        "Founder",
        "Development Lead",
        "Apple Music Electron Veteran",
        "Cider 1.x Lead",
        "Cider 2.x Lead",
      ],
      projects: ["ame", "cider-1", "cider-2"],
      avatar: "https://avatars.githubusercontent.com/u/33162551?v=4",
      twitter: "https://twitter.com/cryptofyre",
      email: "cryptofyre@cider.sh",
      quote: `Void the premonition, take action within oneself.`,
      color: "#CD001A",
      songId: "1608897620",
    },
    {
      name: "Core",
      github: "https://github.com/coredev-uk",
      role: "Lead Developer",
      roles: [],
      projects: ["ame", "cider-1", "cider-2"],
      avatar: "https://avatars.githubusercontent.com/u/64542347?v=4",
      twitter: "https://twitter.com/core_hdd",
      email: "core@cider.sh",
      quote: "Apple who?",
      color: "#fe5433",
      songId: "1649798129",
      songTimestamp: 98,
    },
    {
      name: "Quacksire",
      github: "https://github.com/quacksire",
      role: "Developer",
      roles: [],
      projects: ["ame", "cider-1", "cider-2", "connect"],
      avatar: "https://avatars.githubusercontent.com/u/19170969?v=4",
      twitter: "https://twitter.com/duckdoquack",
      email: "quacksire@cider.sh",
      quote: `idk`,
      color: "rgb(100,149,237)",
      songId: "1482041827",
    },
    {
      name: "booploops",
      github: "https://github.com/booploops",
      role: "Lead Developer",
      roles: [],
      projects: ["ame", "cider-1", "cider-2"],
      avatar: "https://avatars.githubusercontent.com/u/49113086?v=4",
      twitter: "https://twitter.com/boopl00ps",
      email: "booploops@cider.sh",
      color: "#4032a8",
      songId: "1692195758",
      songTimestamp: 40,
    },
    {
      name: "Maikiwi",
      github: "https://github.com/maikirakiwi",
      role: "Lead Developer",
      roles: [],
      projects: ["cider-1", "cider-2"],
      avatar: "https://avatars.githubusercontent.com/u/74925636?v=4",
      twitter: "https://twitter.com/notmaikiwi",
      quote: `I cook black magic for your ears.`,
      email: "maikiwi@cider.sh",
      color: "#46647d",
      songId: "1585332602",
    },
    {
      name: "yazninja",
      github: "https://github.com/yazninja",
      role: "Lead Developer",
      roles: [],
      projects: ["cider-1", "cider-2"],
      avatar: "https://avatars.githubusercontent.com/u/71800112?v=4",
      twitter: "https://twitter.com/YazNinjaa",
      email: "yazninja@cider.sh",
      quote: `appl-ifying everything I use. It is more a disease than a hobby.`,
      songId: "452373171",
      songTimestamp: 24,
      color: "#d6aa68",
    },
    {
      name: "Amaru",
      github: "https://github.com/Amaru8",
      role: "Developer",
      roles: [],
      projects: ["cider-1", "cider-2"],
      avatar: "https://avatars.githubusercontent.com/u/52407090?v=4",
      email: "amaru@cider.sh",
      color: "#007709",
      songId: "1160370510",
    },
    {
      name: "lockieluke",
      github: "https://github.com/lockieluke",
      role: "Lead Developer",
      roles: [],
      projects: ["cider-1", "cider-2", "cider-macos"],
      avatar: "https://avatars.githubusercontent.com/u/25424409?v=4",
      quote: `mum i did it!`,
      color: "rgb(110, 204, 175)",
      songId: "1122773680",
      songTimestamp: 69,
    },
    {
      name: "Swiftzerr",
      github: "https://github.com/elliotjarnit",
      role: "Developer",
      roles: [],
      projects: ["cider-2", "connect"],
      avatar: "https://avatars.githubusercontent.com/u/67812203?v=4",
      twitter: "https://twitter.com/swiftzerr",
      email: "swiftzerr@cider.sh",
      quote: `Fix 1 thing, break 3 more`,
      color: "rgb(200, 162, 200)",
      songId: "693388969",
    },
    {
      name: "Monochromish",
      github: "https://github.com/Monochromish",
      role: "Lead Developer",
      roles: [],
      projects: ["cider-2"],
      avatar: "https://avatars.githubusercontent.com/u/79590499?v=4",
      twitter: "https://twitter.com/MonochromishDev",
      email: "monochromish@cider.sh",
      quote: `dithered emotions`,
      color: "#211657",
      songId: "1215409141",
    },
    {
      name: "DeadFrost",
      github: "https://github.com/DeadFrostt",
      role: "Developer",
      roles: [],
      projects: ["cider-2"],
      avatar: "https://avatars.githubusercontent.com/u/71704732?v=4",
      twitter: "https://twitter.com/DeadFrostt",
      quote: `Cider Janitor`,
      color: "#FFB7CE",
      songId: "157472443",
      songTimestamp: 327,
    },
    {
      name: "Lumaa",
      github: "https://github.com/lumaa-dev",
      role: "Remote Team Lead",
      roles: [],
      projects: ["cider-remote"],
      avatar: "https://avatars.githubusercontent.com/u/93350976?v=4",
      twitter: "https://twitter.com/lumaa_dev",
      quote: `Remote android? Ask cryptofyre`,
      email: "lumaa@lumaa.fr",
      color: `#004C90`,
      songId: "1773437922",
      songTimestamp: 62
    }
  ]
    .slice()
    .sort((a, b) => {
      return (rolePriority[a.role as keyof typeof rolePriority] ?? 99) - (rolePriority[b.role as keyof typeof rolePriority] ?? 99);
    });
</script>
