<template>
  <UiContainer class="relative flex flex-col items-start justify-center gap-10 gap-y-12 py-10 lg:h-[550px] lg:flex-row">
    <div class="absolute bottom-5 right-[50%] hidden lg:block">
      <div class="h-[300px] w-[300px]">
        <NuxtImg src="/fancy-arrow.svg" />
      </div>
    </div>
    <div class="flex h-full items-start justify-center text-center lg:text-left">
      <div>
        <h3 class="text-3xl font-black md:text-4xl lg:text-6xl">Don't just take our word for it</h3>
        <p class="mt-6 text-lg text-muted-foreground md:mt-10 md:text-xl lg:mr-20">
          Cider is the go-to choice for thousands of talented individuals (<kbd>{{
            memberCount
            }}</kbd>
          to be exact) like you! Our vibrant community is at the heart of everything we do. See what
          some of our satisfied users have to say...
        </p>
      </div>
    </div>
    <div class="flex h-auto w-full shrink-0 items-end px-4 py-2 md:w-[700px] lg:h-full lg:p-8">
      <ClientOnly fallback-tag="div">
        <template #fallback>
          <div class="flex h-[350px] w-full items-center justify-center rounded-2xl md:rounded-lg border border-border/50 bg-muted/20 md:h-[300px]">
            <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </template>
        <div class="w-full">
          <swiper-container
            autoplay-delay="5000"
            :speed="800"
            loop
            grab-cursor
            :slides-per-view="1"
            space-between="24"
            class="overflow-hidden ml-0 lg:ml-[100px]"
            :breakpoints="{
              640: {
                slidesPerView: 1.05,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 1.01,
                spaceBetween: 100,
              }
            }"
          >
            <template
              v-for="(t, index) in testimonies"
              :key="index"
            >
              <swiper-slide>
                <div
                  class="light:border-black/20 light:bg-gray-700/10 flex h-auto min-h-[300px] flex-col rounded-[2rem] md:rounded-lg border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent p-6 text-foreground backdrop-blur-xl md:h-[300px] lg:px-5 lg:py-6 shadow-2xl"
                >
                  <div class="mb-3 inline-flex grow text-lg md:mb-5 md:text-xl">
                    <p
                      class="italic leading-relaxed tracking-wide text-white/90 font-light"
                      v-html="addQuotes(t.quote)"
                    />
                  </div>
                  <div class="inset-x-0 bottom-0 mt-6 shrink-0 flex flex-col">
                    <p class="w-100 text-lg font-bold md:text-xl tracking-tight text-white">{{ t.author }}</p>
                    <p class="text-sm font-medium text-primary/80 md:text-base uppercase tracking-wider mt-1">{{ t.position }}</p>
                  </div>
                </div>
              </swiper-slide>
            </template>
          </swiper-container>
        </div>
      </ClientOnly>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
type Testimony = {
  author: string;
  position: string;
  quote: string;
};

const memberCount = ref("13,567");

function addQuotes(quote: string) {
  return `"${quote}"`;
}

const testimonies = ref<Testimony[]>([
  {
    author: "Kai",
    position: "Proud Cider User",
    quote:
      "After making the switch to Apple Music mid-2022, a Windows music client was all I needed to solidify the switch. Cider brings that and more to the table, with integrations for Last.fm, Spotify, and Discord, making it THE definitive music client for chronically online peeps.",
  },
  {
    author: "Bjorn",
    position: "Apple Enthusiast",
    quote:
      "I'm a huge believer in trying a product before paying for it. I have to say, this is 100% worth $3.99 to play Apple Music. This does exactly what you need, is extremely smooth and not full of bloatware. Recommend this for anyone who is sick of iTunes, but loves Apple Music on their iPhone.",
  },
  {
    author: "Daniel",
    position: "Cider User",
    quote:
      "The only real drawback to Apple Music for me was the lack of a decent app for Windows. This seems to be a godsend for Window users. About 3 minutes into the trial period I knew this was the solution I was hoping for.",
  },
  {
    author: "SoNothing",
    position: "UI Enthusiast (aka Nit-picker)",
    quote:
      "Cider completely changes the game for the desktop Apple Music experience. Gone are the blindingly ugly light mode of iTunes and the awful performance on official clients, replaced by an <b>absolute</b> beauty that zips around like a supercar. I for one welcome our new music overlords.",
  },
  {
    author: "RylanFM",
    position: "New Cider Enthusiast",
    quote:
      "I was a bit skeptical having never even heard of Cider until the afternoon I got it. A couple weeks in and I can confidently say that this is one of the best purchases I have ever made. The UI is so clean and intuitive. I have a vertical monitor and immersive mode looks amazing. Everyone in the Discord server was so kind and helped me get it set up in just a few minutes. I highly recommend giving Cider a try!",
  }
]);

onMounted(() => {
  testimonies.value = testimonies.value.sort(() => Math.random() - 0.5);
  // Duplicate testimonies to ensure Swiper loop mode has enough slides
  // We need at least 3x the slides per view for a smooth infinite loop
  testimonies.value = [...testimonies.value, ...testimonies.value, ...testimonies.value, ...testimonies.value];
})
</script>
