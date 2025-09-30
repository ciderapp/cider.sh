<template>
  <main class="overflow-hidden">
    <div
      class="relative mx-auto flex h-max w-max items-center justify-center opacity-50 blur-[120px] filter"
    >
      <div class="absolute inset-0 flex items-center justify-center">
        <div
          class="circle absolute h-[40rem] w-[40rem] rounded-full"
          :style="{ backgroundColor: circleColor }"
        ></div>
      </div>
    </div>
    <UiContainer class="relative pb-10">
      <UiContainer class="py-16 text-center lg:py-24">
        <slot name="headline">
          <p v-if="headline" class="font-semibold text-primary">{{ headline }}</p>
        </slot>
        <slot name="title">
          <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">{{ title }}</h2>
        </slot>
        <slot name="description">
          <p class="mx-auto max-w-[768px] text-lg text-muted-foreground lg:text-xl">
            {{ description }}
          </p>
        </slot>
        <div class="mt-5 flex w-full flex-col-reverse justify-center gap-3 lg:w-auto lg:flex-row">
          <slot />
        </div>
      </UiContainer>
      <section class="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-10">
        <template v-for="member in members" :key="member.name">
          <div class="flex w-44 flex-col items-center">
            <UiAvatar
              class="coloredShadow mb-5 h-24 w-24 transition-all"
              :src="member.avatar"
              @mouseenter="handleHover(member)"
              @mouseleave="handleHover()"
              :style="{
                '--tw-shadow-color': member.color,
              }"
            />
            <p class="text-lg font-bold">{{ member.name }}</p>
            <p class="text-sm">{{ member.role.toUpperCase() }}</p>
            <div class="mt-2 flex gap-2">
              <NuxtLink :to="member.github" v-if="member.github">
                <Icon name="mdi:github" class="h-6 w-6 transform-gpu hover:scale-110" />
              </NuxtLink>
              <NuxtLink :to="member.twitter" v-if="member.twitter">
                <Icon name="mdi:twitter" class="h-6 w-6 transform-gpu hover:scale-110" />
              </NuxtLink>
              <NuxtLink :to="`mailto:${member.email}`" v-if="member.email">
                <Icon name="mdi:email" class="h-6 w-6 transform-gpu hover:scale-110" />
              </NuxtLink>
            </div>
          </div>
        </template>

        <!-- <template v-for="member in members" :key="member.name">
        <div class="flex w-44 flex-col items-center">
          <UiAvatar class="mb-5 h-24 w-24 ring-1 ring-ring/20" :src="member.avatar" />
          <p class="text-lg font-semibold">{{ member.name }}</p>
          <p class="text-primary">{{ member.role }}</p>
          <div class="mt-2 flex gap-2">
            <NuxtLink :to="member.github" v-if="member.github">
              <Icon name="mdi:github" class="h-5 w-5" />
            </NuxtLink>
            <NuxtLink :to="member.twitter" v-if="member.twitter">
              <Icon name="mdi:twitter" class="h-5 w-5" />
            </NuxtLink>
            <NuxtLink :to="`mailto:${member.email}`" v-if="member.email">
              <Icon name="mdi:email" class="h-5 w-5" />
            </NuxtLink>
          </div>
        </div>
      </template> -->
      </section>
      <section class="pt-20">
        <p class="mb-8 text-center text-lg text-muted-foreground">
          We also want to give special thanks to our contributors in GitHub.
        </p>
        <NuxtLink to="https://github.com/ciderapp/cider/graphs/contributors" target="_blank">
          <img src="https://contrib.rocks/image?repo=ciderapp/cider&columns=20" />
        </NuxtLink>
      </section>
    </UiContainer>
  </main>
</template>

<style scoped>
  .circle {
    transition: ease-in-out 0.2s;
  }
  .coloredShadow:hover {
    box-shadow:
      0 4px 6px -1px var(--tw-shadow-color),
      0 10px 15px -3px var(--tw-shadow-color);
  }
</style>

<script lang="ts" setup>
  const headline = "About Us";
  const title = "Meet the Team";
  const description =
    "The Cider team is a group of passionate developers who are dedicated to making the best experience for Apple Music on every platform.";

  const sponsors = [
    { text: "JetBrains", icon: "logos:jetbrains" },
    {
      text: "MacStadium",
      icon: "MacStadiumLogo",
    },
    { text: "Company Three", icon: "logos:airbnb" },
    { text: "Company Four", icon: "logos:akamai" },
  ];

  const circleColor = ref("#f32c56");

  function handleHover(member: CollectiveMember | undefined) {
    circleColor.value = member?.color ?? "#f32c56";
  }

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
      return rolePriority[a.role] - rolePriority[b.role];
    });
</script>
