<template>
  <main class="overflow-x-clip bg-ink text-chalk">
    <section aria-labelledby="android-title" class="border-b border-ink-line">
      <div class="sg-shell grid items-center gap-14 py-14 md:py-20 lg:grid-cols-12 lg:gap-6 lg:py-24">
        <div class="lg:col-span-7">
          <SiteDeviceNudge
            device="ios"
            title="On iPhone? Try Cider Remote"
            description="Cider for Android doesn't run on iPhone. Cider Remote controls Cider on your computer from your phone."
            to="/downloads/remote"
            icon="simple-icons:apple"
            class="mb-10"
          />
          <div class="flex items-center gap-2.5">
            <p class="font-label text-xs text-signal">Cider for Android</p>
            <span class="inline-flex h-6 items-center rounded-full border border-signal/60 px-2.5 font-label text-[11px] text-signal">
              Beta
            </span>
          </div>
          <h1
            id="android-title"
            class="mt-4 max-w-[11em] text-balance text-[44px] font-extrabold uppercase leading-[0.92] tracking-[-0.045em] md:mt-5 md:text-[72px] lg:text-[88px]"
          >
            {{ copy.title }}
          </h1>
          <p class="mt-5 max-w-[560px] text-pretty text-[17px] leading-normal text-chalk-dim md:mt-6 md:text-lg lg:text-xl">
            {{ copy.description }}
          </p>
          <div class="mt-7 flex flex-col gap-2.5 sm:flex-row lg:mt-9">
            <a :href="taproomUrl" target="_blank" rel="noopener" class="sg-btn sg-btn--primary sm:min-w-[260px]">
              <span class="flex items-center gap-2.5">
                <Icon name="mdi:android" class="h-4 w-4" aria-hidden="true" />
                Get the beta on Taproom
              </span>
              <Icon name="lucide:arrow-up-right" class="sg-arrow h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#beta" class="sg-btn sg-btn--ghost">How to join</a>
          </div>
          <SiteSpecList :rows="specs" class="mt-10 max-w-[560px] lg:mt-12" />
        </div>
        <div class="flex justify-center lg:col-span-5">
          <SitePhoneShot
            :src="shots.hero.src"
            :alt="shots.hero.alt"
            loading="eager"
            class="w-[240px] md:w-[280px] lg:w-[320px]"
          />
        </div>
      </div>
    </section>

    <section aria-label="Highlights" class="sg-shell py-14 md:py-20 lg:py-24">
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <li
          v-for="item in highlights"
          :key="item.title"
          class="flex flex-col rounded-[20px] border border-ink-line bg-ink-panel p-6 lg:p-7"
        >
          <span class="flex h-12 w-12 items-center justify-center rounded-[12px] border border-ink-edge" aria-hidden="true">
            <Icon :name="item.icon" class="h-5 w-5" />
          </span>
          <h2 class="mt-6 text-xl font-bold tracking-[-0.02em] lg:text-[22px]">{{ item.title }}</h2>
          <p class="mt-2 text-pretty text-[15px] leading-relaxed text-chalk-dim">{{ item.description }}</p>
        </li>
      </ul>
    </section>

    <section aria-label="Screenshots" class="pb-14 md:pb-20 lg:pb-24">
      <!-- A swipeable row on phones, a straight row from tablets up -->
      <ul
        class="sg-shell flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        <li v-for="shot in shots.gallery" :key="shot.alt" class="w-[64%] shrink-0 snap-center sm:w-[40%] md:w-auto">
          <SitePhoneShot :src="shot.src" :alt="shot.alt" :glow="false" />
        </li>
      </ul>
    </section>

    <section aria-labelledby="android-features" class="bg-bone text-ink">
      <div class="sg-shell py-14 md:py-[72px] lg:py-24">
        <h2
          id="android-features"
          class="max-w-[11em] text-balance text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.045em] md:text-[72px] lg:text-[88px]"
        >
          {{ copy.featuresTitle }}
        </h2>
        <ul class="mt-10 border-t-2 border-ink lg:mt-14">
          <li
            v-for="feature in features"
            :key="feature.title"
            class="grid gap-3 border-b border-bone-line py-6 md:grid-cols-12 md:gap-6 md:py-8"
          >
            <div class="flex items-center gap-4 md:col-span-5">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-ink" aria-hidden="true">
                <Icon :name="feature.icon" class="h-5 w-5" />
              </span>
              <h3 class="text-xl font-bold tracking-[-0.02em] md:text-2xl">{{ feature.title }}</h3>
            </div>
            <p class="text-pretty text-[15px] leading-relaxed text-bone-mute md:col-span-7 md:text-base">
              {{ feature.description }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <section aria-labelledby="android-quest" class="border-b border-ink-line">
      <div class="sg-shell grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div class="lg:col-span-5">
          <h2
            id="android-quest"
            class="text-balance text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.045em] md:text-[72px]"
          >
            {{ copy.questTitle }}
          </h2>
          <p class="mt-5 text-pretty text-[17px] leading-relaxed text-chalk-dim md:text-lg">{{ copy.questDescription }}</p>
          <ul class="mt-8 flex flex-col gap-5">
            <li v-for="point in quest" :key="point.title" class="flex gap-4">
              <span
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-ink-edge"
                aria-hidden="true"
              >
                <Icon :name="point.icon" class="h-5 w-5" />
              </span>
              <div>
                <h3 class="text-lg font-bold tracking-[-0.02em]">{{ point.title }}</h3>
                <p class="mt-1 text-pretty text-[15px] leading-relaxed text-chalk-dim">{{ point.description }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="lg:col-span-7">
          <SiteShowcase :src="shots.quest.src" :video="shots.quest.video" :alt="shots.quest.alt" :width="1600" :height="900" />
        </div>
      </div>
    </section>

    <section id="beta" aria-labelledby="android-beta" class="sg-shell scroll-mt-24 py-14 md:py-20 lg:py-24">
      <h2
        id="android-beta"
        class="max-w-[12em] text-balance text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.045em] md:text-[72px] lg:text-[88px]"
      >
        Join the beta
      </h2>
      <p class="mt-5 max-w-[620px] text-pretty text-[17px] leading-relaxed text-chalk-dim md:text-lg">
        {{ copy.betaDescription }}
      </p>

      <ol class="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14 lg:gap-6">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          class="flex flex-col rounded-[20px] border bg-ink-panel p-6 lg:p-8"
          :class="index === 0 ? 'border-signal/60' : 'border-ink-line'"
        >
          <span
            class="flex h-9 w-9 items-center justify-center rounded-full bg-chalk font-label text-sm font-semibold text-ink"
            aria-hidden="true"
          >
            {{ index + 1 }}
          </span>
          <h3 class="mt-6 text-xl font-bold tracking-[-0.02em] lg:text-[22px]">{{ step.title }}</h3>
          <p class="mt-2 text-pretty text-[15px] leading-relaxed text-chalk-dim">{{ step.description }}</p>
          <div v-if="step.actions?.length" class="mt-auto flex flex-wrap gap-2.5 pt-6">
            <a
              v-for="action in step.actions"
              :key="action.url"
              :href="action.url"
              target="_blank"
              rel="noopener"
              class="sg-btn sg-btn--sm"
              :class="action.primary ? 'sg-btn--primary' : 'sg-btn--ghost'"
            >
              <span class="flex items-center gap-2.5">
                <Icon v-if="action.icon" :name="action.icon" class="h-4 w-4" aria-hidden="true" />
                {{ action.label }}
              </span>
            </a>
          </div>
        </li>
      </ol>
    </section>

    <section aria-labelledby="android-faq" class="border-t border-ink-line">
      <div class="sg-shell grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-6 lg:py-24">
        <h2
          id="android-faq"
          class="text-balance text-[40px] font-extrabold uppercase leading-[0.9] tracking-[-0.045em] md:text-[56px] lg:col-span-4"
        >
          Questions
        </h2>
        <div class="lg:col-span-8">
          <details v-for="item in faq" :key="item.question" class="group border-b border-ink-line first:border-t">
            <summary
              class="sg-focus flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold tracking-[-0.01em] [&::-webkit-details-marker]:hidden"
            >
              {{ item.question }}
              <Icon
                name="lucide:plus"
                class="h-5 w-5 shrink-0 text-chalk-dim transition-transform group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <p class="max-w-[640px] pb-6 text-pretty text-[15px] leading-relaxed text-chalk-dim md:text-base">
              {{ item.answer }}
            </p>
          </details>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
  definePageMeta({ title: "Cider for Android" });
  const site = useSiteConfig();

  const taproomUrl = androidDownloadUrl;
  const shots = androidShots;

  const copy = {
    title: "Cider in your pocket",
    description:
      "Apple Music on your Android phone, with the lyrics, look, and integrations you know from Cider on your computer.",
    featuresTitle: "Everything in one app",
    questTitle: "Also on Meta Quest & Steam Frame",
    questDescription:
      "On Quest and Frame, Cider opens as a panel you can resize, with the player floating along the bottom.",
    betaDescription:
      "Cider for Android is in beta for Cider supporters while we finish it. You sign in with your Taproom account, and new builds arrive right inside the app.",
  };

  const specs = [
    { label: "Requires", value: "Android 13 or later" },
    { label: "Access", value: "Supporter beta, through Taproom" },
    { label: "You need", value: "An Apple Music subscription" },
    { label: "Also on", value: "Meta Quest & Steam Frame" },
  ];

  const highlights = [
    {
      icon: "lucide:mic-vocal",
      title: "Lyrics",
      description:
        "Word-by-word and line-synced lyrics from Apple Music, Musixmatch, and more, with translations.",
    },
    {
      icon: "lucide:monitor-smartphone",
      title: "Cider Connect",
      description:
        "Scan a QR code to pair with Cider on your computer. Control it from your phone, or move playback between the two.",
    },
    {
      icon: "simple-icons:discord",
      title: "Discord and Last.fm",
      description: "Show what you're listening to on Discord, and scrobble every track to Last.fm.",
    },
    {
      icon: "lucide:palette",
      title: "Made for Android",
      description:
        "Built natively, with Material You colors, light and dark themes, and a sidebar layout on tablets.",
    },
  ];

  const features = [
    {
      icon: "lucide:house",
      title: "Home, Browse, and Search",
      description: "Your personal picks, recently played, and the full Apple Music catalog.",
    },
    {
      icon: "lucide:library",
      title: "Your library",
      description: "Your playlists, artists, albums, and songs. Add music, favorite tracks, or ask for less of something.",
    },
    {
      icon: "lucide:radio",
      title: "Radio",
      description: "Apple Music radio stations, live and on demand.",
    },
    {
      icon: "lucide:list-music",
      title: "Queue",
      description: "Swipe a track to play it next or later. Shuffle and repeat work the way you'd expect.",
    },
    {
      icon: "lucide:audio-lines",
      title: "Smooth playback",
      description: "Crossfade, gapless playback, and Sound Check to keep the volume even between songs.",
    },
    {
      icon: "lucide:clapperboard",
      title: "Motion artwork",
      description: "Animated album covers, and a player that pulses along with the beat.",
    },
    {
      icon: "lucide:ticket",
      title: "Concerts",
      description: "Browse upcoming concerts, with shows near you if you choose to share your location.",
    },
    {
      icon: "lucide:hand",
      title: "Gestures",
      description:
        "Drag up to open the player, swipe sideways to skip, and pull up to see what's next. Cider shows you each one the first time.",
    },
  ];

  const quest = [
    {
      icon: "lucide:app-window",
      title: "Windows you can place",
      description: "Lyrics and Playing Next open in windows of their own. Put them anywhere and resize them.",
    },
    {
      icon: "lucide:box",
      title: "Immersive mode",
      description:
        "Switch it on from inside the app and Cider lays its panels out around your room over passthrough. Grab them to move them together.",
    },
    {
      icon: "lucide:glasses",
      title: "Supported headsets",
      description: "Quest 2, Quest Pro, Quest 3, and Quest 3S, plus Steam Frame. Immersive mode needs the VR build of the app.",
    },
  ];

  const steps = [
    {
      title: "Become a supporter",
      description: "Support Cider on any of these platforms. A donation of $8.49 or more gets you supporter access.",
      actions: [
        { label: "Patreon", url: "https://www.patreon.com/cidercollective", icon: "simple-icons:patreon" },
        { label: "Open Collective", url: "https://opencollective.com/ciderapp", icon: "simple-icons:opencollective" },
        { label: "GitHub Sponsors", url: "https://github.com/sponsors/ciderapp", icon: "simple-icons:githubsponsors" },
      ],
    },
    {
      title: "Download from Taproom",
      description:
        "Sign in to Taproom and download the app, or the VR build for a headset. Android will ask you to allow the install.",
      actions: [{ label: "Open Taproom", url: taproomUrl, primary: true }],
    },
    {
      title: "Sign in and listen",
      description: "Open Cider and sign in with Taproom, then with Apple Music. That's it.",
    },
  ];

  const faq = [
    {
      question: "Do I need an Apple Music subscription?",
      answer: "Yes. Cider plays music from Apple Music, so you need an active subscription.",
    },
    {
      question: "Which devices does it run on?",
      answer: "Phones and tablets running Android 13 or later, plus Meta Quest 2, Quest Pro, Quest 3, Quest 3S, and Steam Frame.",
    },
    {
      question: "Do I need Cider on my computer too?",
      answer:
        "No. Cider for Android plays music on its own. If you also use Cider on your computer, you can pair the two with Cider Connect.",
    },
    {
      question: "How do updates work?",
      answer:
        "Cider checks for new builds when you open it and installs them for you. The first time, Android asks you to allow installs from Cider.",
    },
    {
      question: "Is it on Google Play?",
      answer: "Not right now. During the beta, supporters download it from Taproom.",
    },
  ];

  useSeoMeta({
    title: "Cider for Android",
    description: "Apple Music on your Android phone and Meta Quest & Steam Frame. In beta for Cider supporters.",
    ogTitle: "Cider for Android",
    ogDescription: "Apple Music on your Android phone and Meta Quest & Steam Frame. In beta for Cider supporters.",
    twitterTitle: "Cider for Android",
    twitterDescription: "Apple Music on your Android phone and Meta Quest & Steam Frame. In beta for Cider supporters.",
    ogUrl: `${site.url}/downloads/android`,
  });

  defineOgImageComponent("OgShareCard", {
    layout: "secondary",
    title: "Cider for Android",
    description: "Apple Music on your Android phone and Meta Quest & Steam Frame. In beta for supporters.",
    footer: "cider.sh/downloads/android",
    icon: "/og-icons/downloads.png",
    site: "cider",
  });
</script>
