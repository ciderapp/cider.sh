<template>
  <div class="relative w-full h-[400vh]">
    <div class="sticky top-0 left-0 w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden pointer-events-none -mt-[10vh] md:mt-0">
      
      <!-- Blending Title Section -->
      <div 
        :class="[
          'absolute flex flex-col items-center justify-center w-full transition-all duration-700 ease-in-out px-4',
          activeIndex === -1 ? 'opacity-100 scale-100 translate-y-0 z-40' : 'opacity-0 scale-[1.1] -translate-y-16 z-0'
        ]"
      >
        <slot name="title"></slot>
      </div>

      <ClientOnly fallback-tag="div">
        <template #fallback>
          <div class="w-full max-w-5xl aspect-[16/9] px-4"></div>
        </template>
        <div class="relative w-full max-w-5xl aspect-[16/9] flex items-center justify-center px-4 md:px-8 -mt-[10vh] md:mt-24">
          
          <!-- Full Frame Backdrops -->
          <div class="fixed inset-0 z-20 pointer-events-none">
            <template v-for="(mode, index) in modes" :key="'backdrop-'+index">
              <div
                :class="[
                  'absolute inset-0 bg-background/60 dark:bg-black/70 backdrop-blur-xl',
                  isAnimating === index ? 'animate-full-backdrop-fade' : 'opacity-0 duration-500'
                ]"
              ></div>
            </template>
          </div>

          <!-- Mode Labels -->
          <div class="absolute -bottom-[15vh] md:-bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center z-30 w-full pointer-events-none">
            <template v-for="(mode, index) in modes" :key="'label-'+index">
              <div
                :class="[
                  'absolute flex flex-col items-center justify-center text-foreground transition-all',
                  isAnimating === index
                    ? 'animate-title-card opacity-100'
                    : activeIndex === index
                      ? 'opacity-100 duration-700 ease-out translate-y-0 scale-100 delay-200'
                      : activeIndex < index
                        ? 'opacity-0 translate-y-16 scale-90 duration-500 ease-in'
                        : 'opacity-0 -translate-y-16 scale-90 duration-500 ease-in'
                ]"
              >
                <div class="flex flex-col items-center justify-center px-8 py-4 md:px-12 md:py-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] dark:drop-shadow-[0_0_15px_rgba(96,165,250,0.2)]">
                  <Icon :name="mode.icon" class="h-6 w-6 md:h-10 md:w-10 mb-1 md:mb-2 text-primary" />
                  <span class="text-2xl md:text-4xl font-bold tracking-tighter">
                    {{ mode.name }} Mode
                  </span>
                </div>
              </div>
            </template>
          </div>

          <img
            v-for="(image, index) in images"
            :key="index"
            :src="image"
            :class="[
              'absolute w-full max-w-5xl transition-all object-contain',
              activeIndex === index
                ? 'opacity-100 scale-100 translate-y-0 z-10 duration-1000 ease-out delay-300'
                : activeIndex < index
                  ? 'opacity-0 scale-[0.98] translate-y-4 z-0 duration-500 ease-in'
                  : 'opacity-0 scale-[1.02] -translate-y-4 z-0 duration-500 ease-in'
            ]"
            alt="Cider Interface"
          />
        </div>
      </ClientOnly>
    </div>

    <!-- Scroll Triggers -->
    <div class="absolute top-0 left-0 w-full h-[400vh] pointer-events-none flex flex-col">
      <div ref="triggerIntro" class="w-full h-[100vh]"></div>
      <div ref="trigger0" class="w-full h-[100vh]"></div>
      <div ref="trigger1" class="w-full h-[100vh]"></div>
      <div ref="trigger2" class="w-full h-[100vh]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

const props = defineProps<{
  images: string[];
}>();

const modes = [
  { name: 'Immersive', icon: 'lucide:maximize' },
  { name: 'Comfy', icon: 'lucide:layout-template' },
  { name: 'Compact', icon: 'lucide:minimize-2' }
];

// -1 is the title/intro state
const activeIndex = ref(-1);
const isAnimating = ref<number | null>(null);
const hasAnimated = reactive<Record<number, boolean>>({});

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

useIntersectionObserver(triggerIntro, ([{ isIntersecting }]) => {
  if (isIntersecting) activeIndex.value = -1;
}, { threshold: 0, rootMargin: "-49% 0px -50% 0px" });

useIntersectionObserver(trigger0, ([{ isIntersecting }]) => {
  if (isIntersecting) activeIndex.value = 0;
}, { threshold: 0, rootMargin: "-49% 0px -50% 0px" });

useIntersectionObserver(trigger1, ([{ isIntersecting }]) => {
  if (isIntersecting) activeIndex.value = 1;
}, { threshold: 0, rootMargin: "-49% 0px -50% 0px" });

useIntersectionObserver(trigger2, ([{ isIntersecting }]) => {
  if (isIntersecting) activeIndex.value = 2;
}, { threshold: 0, rootMargin: "-49% 0px -50% 0px" });
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
  20%, 45% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
