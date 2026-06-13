<template>
  <div class="relative h-[400vh] w-full">
    <div
      class="pointer-events-none sticky left-0 top-0 -mt-[10vh] flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-8 md:mt-0 lg:px-12"
    >
      <!-- Blending Title Section -->
      <div
        :class="[
          'absolute flex w-full flex-col items-center justify-center px-4 transition-all duration-700 ease-in-out',
          activeIndex === -1
            ? 'z-40 translate-y-0 scale-100 opacity-100'
            : 'z-0 -translate-y-16 scale-[1.1] opacity-0',
        ]"
      >
        <slot name="title"></slot>
      </div>

      <ClientOnly fallback-tag="div">
        <template #fallback>
          <div class="mx-auto aspect-[2395/1065] w-full max-w-5xl"></div>
        </template>
        <div
          class="relative mx-auto -mt-[10vh] flex aspect-[2395/1065] w-full max-w-5xl items-center justify-center md:mt-0"
        >
          <!-- Full Frame Backdrops — only mounted while a mode transition plays
               so idle backdrop-blur layers aren't left on the compositor. -->
          <div class="pointer-events-none fixed inset-0 z-20">
            <template v-for="(mode, index) in modes" :key="'backdrop-' + index">
              <div
                v-if="isAnimating === index"
                class="animate-full-backdrop-fade absolute inset-0 bg-background/60 backdrop-blur-xl dark:bg-black/70"
              ></div>
            </template>
          </div>

          <!-- Mode Labels -->
          <div
            class="pointer-events-none absolute -bottom-[15vh] left-1/2 z-30 flex w-full -translate-x-1/2 items-center justify-center md:-bottom-24"
          >
            <template v-for="(mode, index) in modes" :key="'label-' + index">
              <div
                :class="[
                  'absolute flex flex-col items-center justify-center text-foreground transition-all',
                  isAnimating === index
                    ? 'animate-title-card opacity-100'
                    : activeIndex === index
                      ? 'translate-y-0 scale-100 opacity-100 delay-200 duration-700 ease-out'
                      : activeIndex < index
                        ? 'translate-y-16 scale-90 opacity-0 duration-500 ease-in'
                        : '-translate-y-16 scale-90 opacity-0 duration-500 ease-in',
                ]"
              >
                <div
                  class="flex flex-col items-center justify-center px-8 py-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] dark:drop-shadow-[0_0_15px_rgba(96,165,250,0.2)] md:px-12 md:py-6"
                >
                  <Icon
                    :name="mode.icon"
                    class="mb-1 h-6 w-6 text-primary md:mb-2 md:h-10 md:w-10"
                  />
                  <span class="text-2xl font-bold tracking-tighter md:text-4xl">
                    {{ mode.name }}
                  </span>
                </div>
              </div>
            </template>
          </div>

          <img
            v-for="(image, index) in images"
            :key="index"
            :src="image"
            :style="{ boxShadow: imageShadow(index) }"
            :class="[
              'absolute inset-0 h-full w-full rounded-xl object-cover transition-all',
              activeIndex === index
                ? 'z-10 translate-y-0 scale-100 opacity-100 delay-300 duration-1000 ease-out'
                : activeIndex < index
                  ? 'z-0 translate-y-4 scale-[0.98] opacity-0 duration-500 ease-in'
                  : 'z-0 -translate-y-4 scale-[1.02] opacity-0 duration-500 ease-in',
            ]"
            alt="Cider Interface"
          />
        </div>
      </ClientOnly>
    </div>

    <!-- Scroll Triggers -->
    <div class="pointer-events-none absolute left-0 top-0 flex h-[400vh] w-full flex-col">
      <div ref="triggerIntro" class="h-[100vh] w-full"></div>
      <div ref="trigger0" class="h-[100vh] w-full"></div>
      <div ref="trigger1" class="h-[100vh] w-full"></div>
      <div ref="trigger2" class="h-[100vh] w-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useIntersectionObserver } from "@vueuse/core";
  import { reactive, ref, watch } from "vue";

  const props = defineProps<{
    images: string[];
  }>();

  // `glow` is the backsplash color sampled from each screenshot ("r, g, b").
  const modes = [
    { name: "Immersive Mode", icon: "lucide:maximize", glow: "250, 40, 78" },
    { name: "Intuitive Interface", icon: "lucide:layout-template", glow: "250, 40, 78" },
    { name: "Built for Music Lovers", icon: "lucide:heart", glow: "200, 140, 85" },
  ];

  // -1 is the title/intro state
  const activeIndex = ref(-1);
  const isAnimating = ref<number | null>(null);
  const hasAnimated = reactive<Record<number, boolean>>({});

  // An opaque inner border masks the screenshot's edge aliasing (the faint
  // clipping on Windows window captures); the active frame also gets a soft
  // glow tinted to that screenshot's own dominant color.
  function imageShadow(index: number) {
    const border = "inset 0 0 0 1.5px #000";
    if (activeIndex.value !== index) return border;
    const glow = modes[index]?.glow ?? "250, 40, 78";
    return `${border}, 0 24px 150px -10px rgba(${glow}, 0.55)`;
  }

  const triggerIntro = ref<HTMLElement | null>(null);
  const trigger0 = ref<HTMLElement | null>(null);
  const trigger1 = ref<HTMLElement | null>(null);
  const trigger2 = ref<HTMLElement | null>(null);

  watch(activeIndex, (newVal) => {
    if (newVal >= 0 && !hasAnimated[newVal]) {
      isAnimating.value = newVal;
      hasAnimated[newVal] = true;
      setTimeout(() => {
        if (isAnimating.value === newVal) {
          isAnimating.value = null;
        }
      }, 1500);
    }
  });

  useIntersectionObserver(
    triggerIntro,
    ([{ isIntersecting }]) => {
      if (isIntersecting) activeIndex.value = -1;
    },
    { threshold: 0, rootMargin: "-49% 0px -50% 0px" }
  );

  useIntersectionObserver(
    trigger0,
    ([{ isIntersecting }]) => {
      if (isIntersecting) activeIndex.value = 0;
    },
    { threshold: 0, rootMargin: "-49% 0px -50% 0px" }
  );

  useIntersectionObserver(
    trigger1,
    ([{ isIntersecting }]) => {
      if (isIntersecting) activeIndex.value = 1;
    },
    { threshold: 0, rootMargin: "-49% 0px -50% 0px" }
  );

  useIntersectionObserver(
    trigger2,
    ([{ isIntersecting }]) => {
      if (isIntersecting) activeIndex.value = 2;
    },
    { threshold: 0, rootMargin: "-49% 0px -50% 0px" }
  );
</script>

<style scoped>
  .animate-title-card {
    animation: titleCardDrop 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @media (min-width: 768px) {
    .animate-title-card {
      animation: titleCardDropDesktop 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  }

  .animate-full-backdrop-fade {
    animation: fullBackdropFade 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes titleCardDrop {
    0% {
      transform: translateY(10vh) scale(0.9);
      opacity: 0;
    }
    20% {
      transform: translateY(-20vh) scale(1.05);
      opacity: 1;
    }
    45% {
      transform: translateY(-20vh) scale(1.05);
      opacity: 1;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  @keyframes titleCardDropDesktop {
    0% {
      transform: translateY(20vh) scale(0.8);
      opacity: 0;
    }
    20% {
      transform: translateY(-40vh) scale(1.2);
      opacity: 1;
    }
    45% {
      transform: translateY(-40vh) scale(1.2);
      opacity: 1;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  @keyframes fullBackdropFade {
    0% {
      opacity: 0;
    }
    20%,
    45% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
