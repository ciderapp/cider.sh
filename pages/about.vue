<template>
  <UiContainer class="pb-10">
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
            class="mb-5 h-24 w-24 shadow-2xl shadow-primary/20 transition-all hover:shadow-primary"
            :src="member.avatar"
          />
          <p class="text-lg font-semibold">{{ member.name }}</p>
          <p class="text-primary">{{ member.role }}</p>
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
        We also want to give special thanks to our contributors in Github.
      </p>
      <NuxtLink to="https://github.com/ciderapp/cider/graphs/contributors" target="_blank">
        <img src="https://contrib.rocks/image?repo=ciderapp/cider&columns=20" />
      </NuxtLink>
    </section>
  </UiContainer>
</template>

<script lang="ts" setup>
  const headline = "About Us";
  const title = "Meet the Team";
  const description =
    "The Cider team is a group of passionate developers who are dedicated to making the best experience for Apple Music on every platform";

  const sponsors = [
    { text: "Jetbrains", icon: "logos:jetbrains" },
    {
      text: "MacStadium",
      icon: "MacStadiumLogo",
    },
    { text: "Company Three", icon: "logos:airbnb" },
    { text: "Company Four", icon: "logos:akamai" },
  ];
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
      role: "FOUNDER",
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
      role: "LEAD DEVELOPER",
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
      role: "DEVELOPER",
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
      role: "LEAD DEVELOPER",
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
      name: "vapormusic",
      github: "https://github.com/vapormusic",
      role: "DEVELOPER",
      roles: [],
      projects: ["ame", "cider-1", "cider-2"],
      avatar: "https://avatars.githubusercontent.com/u/27716185?v=4",
      quote: `eh`,
      color: "#000000",
      songId: "1440838060",
    },
    {
      name: "Maikiwi",
      github: "https://github.com/maikirakiwi",
      role: "LEAD DEVELOPER",
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
      role: "LEAD DEVELOPER",
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
      name: "GamingLiamStudios",
      github: "https://github.com/GamingLiamStudios",
      role: "DEVELOPER",
      roles: [],
      projects: ["cider-1", "cider-2"],
      avatar: "https://avatars.githubusercontent.com/u/58615717?v=4",
      twitter: "https://twitter.com/GLStudios_",
      email: "gls@cider.sh",
      quote: `you like jazz?`,
      songId: "1673536432",
      songTimestamp: 106,
    },
    {
      name: "Amaru",
      github: "https://github.com/Amaru8",
      role: "DEVELOPER",
      roles: [],
      projects: ["cider-1", "cider-2"],
      avatar: "https://avatars.githubusercontent.com/u/52407090?v=4",
    },
    {
      name: "lockieluke",
      github: "https://github.com/lockieluke",
      role: "LEAD DEVELOPER",
      roles: [],
      projects: ["cider-1", "cider-2", "cider-macos"],
      avatar: "https://avatars.githubusercontent.com/u/25424409?v=4",
      quote: `mum i did it!`,
      color: "rgb(110, 204, 175)",
      songId: "1122773680",
      songTimestamp: 69,
    },
    {
      name: "d3rpp",
      github: "https://github.com/d3rpp",
      role: "LEAD DEVELOPER",
      roles: [],
      projects: ["cider-2"],
      avatar: "https://avatars.githubusercontent.com/u/45675641?v=4",
      twitter: "https://twitter.com/d3rpp_dev",
      email: "d3rpp@cider.sh",
      quote: "look mum, I'm in the credits!",
      color: "#212121",
      songId: "1590796506",
    },
    {
      name: "Swiftzerr",
      github: "https://github.com/Swiftzerr",
      role: "DEVELOPER",
      roles: [],
      projects: ["cider-2", "connect"],
      avatar: "https://avatars.githubusercontent.com/u/67812203?v=4",
      twitter: "https://twitter.com/swiftzerr",
      quote: `Does the spotify stuff`,
      color: "rgb(200, 162, 200)",
      songId: "302987569",
    },
    {
      name: "Numinous",
      github: "https://github.com/StupeFied",
      role: "DEVELOPER",
      roles: [],
      projects: ["cider-2"],
      avatar: "https://avatars.githubusercontent.com/u/89881655?v=4",
      twitter: "https://twitter.com/personwhoisran",
      quote: `Like a sailor seeing the shore disappear, I watch my past recede, reduced to the ashes of memory.`,
      color: "rgb(41, 181, 219)",
      songId: "1591640885",
    },
    {
      name: "Monochromish",
      github: "https://github.com/Monochromish",
      role: "DEVELOPER",
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
      name: "SoNothing",
      github: "https://github.com/SoNothingMC",
      role: "DEVELOPER",
      roles: [],
      projects: ["cider-2"],
      avatar: "https://avatars.githubusercontent.com/u/32032824?v=4",
      twitter: "https://twitter.com/SoNotng",
      email: "sonothing@cider.sh",
      quote: `bigrat.monster`,
      color: "#211657",
      songId: "1704786170",
    },
  ];
</script>
