<template>
  <main class="overflow-hidden">
    <div
      class="spin relative mx-auto flex h-max w-max items-center justify-center opacity-50 blur-[120px] filter"
    >
      <div class="absolute inset-0 flex items-center justify-center">
        <div
          class="absolute h-[40rem] w-[40rem] rounded-full bg-rose-600"
          style="transform: translate(-20%, 0)"
        ></div>
        <div
          class="bg-cider absolute h-[40rem] w-[40rem] rounded-full"
          style="transform: translate(10%, -35%)"
        ></div>
        <div
          class="absolute h-[40rem] w-[40rem] rounded-full bg-rose-800"
          style="transform: translate(10%, 35%)"
        ></div>
      </div>
    </div>
    <UiContainer class="relative flex flex-col items-center py-10 text-center lg:py-20">
      <div v-if="data">
        <UiBadge
          :to="data[0]?._path"
          variant="secondary"
          class="px-3 py-1.5 text-sm font-normal backdrop-blur-md dark:bg-transparent dark:backdrop-brightness-50 lg:py-2"
          >{{ data[0]?.navigation.headline }} <Icon class="ml-3 h-4 w-4" name="lucide:arrow-right"
        /></UiBadge>
      </div>
      <div class="flex flex-col-reverse md:flex-row">
        <div :class="[isUwu ? 'w-full max-w-[760px] max-w-xl justify-between !text-left' : '']">
          <h1
            class="mb-4 mt-7 text-4xl font-extrabold lg:mb-6 lg:mt-5 lg:text-center lg:text-5xl xl:text-6xl"
            :class="[isUwu ? '!text-left' : '']"
          >
            Listening to music<br />Redefined
          </h1>
          <p
            class="mx-auto max-w-[760px] text-lg text-muted-foreground lg:text-center lg:text-xl"
            :class="[isUwu ? '!text-left' : '']"
          >
            Cider is a new cross-platform Apple Music experience built on Vue.js and written from
            the ground up with performance in mind. 🚀
          </p>

          <div
            class="mt-8 flex w-full items-center justify-center gap-3 lg:mt-10"
            :class="[isUwu ? 'md:justify-start md:text-left' : '']"
          >
            <NuxtLink to="/downloads">
              <UiButton size="lg">Download</UiButton>
            </NuxtLink>
            <NuxtLink to="/learn-more">
              <UiButton
                size="lg"
                variant="ghost"
                class="learn-more hover:gap-5 hover:bg-transparent hover:underline"
              >
                Learn More <Icon name="material-symbols:arrow-right-alt-rounded" size="24px" />
              </UiButton>
            </NuxtLink>
          </div>
        </div>
        <div v-if="isUwu" class="max-w-xl md:pl-20">
          <NuxtImg src="/uwu-logo.png" alt="Cider Logo" class="mx-auto" />
        </div>
      </div>

      <Carousel :images="images" />
    </UiContainer>
    <BuiltUsing />
    <UiContainer class="features py-16 lg:p-20">
      <p class="text-center font-semibold text-primary">Features</p>
      <h2 class="mb-4 mt-3 text-center text-3xl font-semibold lg:mb-5 lg:text-4xl">
        Built for the Modern Music Lovers
      </h2>
      <p class="mx-auto max-w-[760px] text-center text-lg text-muted-foreground lg:text-xl">
        Cider is a powerful music player that allows you listen to your favorite tracks with style.
        Thanks to its modern design and intuitive interface, you can enjoy your music without any
        distractions.
      </p>

      <div
        class="grid grid-cols-1 gap-y-10 py-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:gap-y-16 lg:py-16"
      >
        <template v-for="(f, i) in features" :key="i">
          <div class="group flex flex-col items-center justify-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-md border">
              <Icon
                :name="f.icon"
                class="h-5 w-5 transition-colors group-hover:text-primary lg:h-6 lg:w-6"
              />
            </div>
            <h3
              class="mt-4 text-balance text-center text-lg font-semibold lg:mt-5 lg:text-xl"
              v-html="f.title"
            />
            <p
              class="mt-1 max-w-[400px] text-balance text-center text-muted-foreground lg:mt-2"
              v-html="f.description"
            />
          </div>
        </template>
      </div>
    </UiContainer>

    <Testimonies />
  </main>
</template>

<style scoped>
  .learn-more {
    color: var(--color-primary);
    border-color: var(--color-primary);
    transition: gap 0.2s ease-in-out;
  }
  .spin {
    animation: spin 20s linear infinite;
  }
  @keyframes spin {
    100% {
      transform: rotate(1turn);
    }
  }
</style>

<script lang="ts" setup>
  definePageMeta({
    title: "Home",
  });

  const { data } = await useAsyncData("latest-release", async () =>
    queryContent("/changelogs/client-releases")
      .sort({ releaseNo: -1, $numeric: true })
      .only(["_path", "navigation"])
      .limit(1)
      .find()
  );

  const path = useRoute().fullPath;
  const isUwu = ref(false);
  if (path.includes("?uwu")) {
    isUwu.value = true;
  }

  let images = ["/client-immersive.png", "/client-comfy.png", "/client-compact.png"];
  const features = [
    {
      icon: "heroicons:link",
      title: "Seamless Integrations",
      description:
        "Cider comes with out-of-the-box integration with services like Discord, Last.fm, Spotify, and many more.",
    },
    {
      icon: "material-symbols:spatial-tracking-rounded",
      title: "Audio Enhancements",
      description:
        "Audio Spatialization, Adrenaline Processor™, and equalizers are actively developed by our local audio engineer, Maikiwi.",
    },
    {
      icon: "material-symbols:nest-remote",
      title: "Remote Controllable (Soon!)",
      subtitle: "balls",
      description: `We know how annoying it is to keep hitting <kbd>Alt+Tab</kbd> while working or gaming, so we're creating a <a href="#">remote app</a> just for that.`,
    },
    {
      icon: "heroicons:bolt",
      title: "Fast as F*ck",
      description:
        "Cider has native backends for each operating system. This ensures minimal overhead and maximum performance.",
    },
    {
      icon: "material-symbols:dashboard-customize",
      title: "Customize however you like",
      description:
        "Built with customization in mind, you can customize your client from top to bottom! Cider also includes a robust plugin system for those who want to go the extra mile.",
    },
    {
      icon: "heroicons:heart",
      title: "And Much More!",
      description: `Cider is jam-packed with features, and we're always adding more. We are always looking for new ideas and suggestions from our users, so join our <a href="https://discord.gg/applemusic">Discord server</a> server to get involved!`,
    },
  ];
</script>
