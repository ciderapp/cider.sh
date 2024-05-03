<template>
  <UiContainer
    class="relative flex flex-col items-start justify-center gap-10 gap-y-12 py-10 lg:h-[550px] lg:flex-row"
  >
    <div class="absolute bottom-5 right-[50%] hidden lg:block">
      <div class="h-[300px] w-[300px]">
        <NuxtImg src="/fancy-arrow.svg" />
      </div>
    </div>
    <div class="flex h-full items-start justify-center text-center lg:text-left">
      <div>
        <h3 class="text-4xl font-black lg:text-6xl">Don't just take our word for it</h3>
        <p class="mt-10 text-xl text-muted-foreground lg:mr-20">
          Cider is the go-to choice for thousands of talented individuals (<kbd>{{
            memberCount
          }}</kbd>
          to be exact) like you! Our vibrant community is at the heart of everything we do. See what
          some of our satisfied users have to say...
        </p>
      </div>
    </div>
    <div
      class="flex h-[350px] w-full shrink-0 items-end p-2 md:w-[700px] lg:h-full lg:w-1/2 lg:p-8"
    >
      <Swiper
        :autoplay="{ delay: 4000 }"
        :modules="[SwiperAutoplay]"
        :speed="800"
        loop
        grab-cursor
        :slides-per-view="1"
        :breakpoints="{
          640: {
            slidesPerView: 1.1,
            spaceBetween: 20,
            autoplay: {
              delay: 7000,
            },
          },
        }"
      >
        <SwiperSlide v-for="t in testimonies" :key="t.author">
          <div
            class="light:border-black/20 light:bg-gray-700/10 rounded-lg border border-white/20 bg-gray-500/10 p-4 text-foreground backdrop-blur-lg lg:px-5 lg:py-6"
          >
            <p class="mb-5 text-xl font-semibold lg:mb-8 lg:text-2xl">“{{ t.quote }}”</p>
            <div class="mt-2 lg:mt-3">
              <p class="w-100 text-xl font-semibold">{{ t.author }}</p>
              <p>{{ t.position }}</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const memberCount = ref("13,567");
  const testimonies = [
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
        "I'm a huge believer in trying a product before paying for it. I have to say, this is 100% worth $.99 to play Apple Music. This does exactly what you need, is extremely smooth and not full of bloatware. Recommend this for anyone who is sick of iTunes, but loves Apple Music on their iPhone.",
    },
    {
      author: "Daniel",
      position: "Cider User",
      quote:
        "The only real drawback to Apple Music for me was the lack of a decent app for Windows. This seems to be a godsend for Window users. About 3 minutes into the trial period I knew this was the solution I was hoping for.",
    },
  ];
</script>
