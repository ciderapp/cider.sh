<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] pointer-events-none -z-10 overflow-hidden flex flex-col items-center justify-center md:justify-start md:pt-[5vh]">
    
    <!-- Ambient Background Glow -->
    <div class="absolute top-[50%] md:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] md:w-[80vw] h-[60vh] bg-red-600/40 dark:bg-red-600/30 blur-[100px] md:blur-[120px] rounded-[100%] mix-blend-screen dark:mix-blend-lighten"></div>

    <!-- Desktop Tilted App Mockup Background -->
    <div 
      class="relative hidden md:block w-[120vw] max-w-[1800px] perspective-container opacity-100 dark:opacity-80 mask-fade transition-transform [transition-duration:50ms] ease-out mt-12"
      :style="{ transform: `translateY(-${y * 0.4}px)` }"
    >
      <div class="hero-mockup-desktop animate-float-desktop blur-[8px]">
        <img src="/client-immersive.png" alt="Cider Interface Background" class="w-full h-auto shadow-[0_0_120px_rgba(250,40,78,0.5)] border border-white/10 rounded-[2rem]" />
      </div>
    </div>

    <!-- Mobile Tilted App Mockup Background -->
    <div 
      class="relative block md:hidden w-[350vw] sm:w-[250vw] max-w-none perspective-container-mobile opacity-100 dark:opacity-80 mask-fade-mobile transition-transform [transition-duration:50ms] ease-out mt-[20vh]"
      :style="{ transform: `translateY(-${y * 0.4}px)` }"
    >
      <div class="hero-mockup-mobile animate-float-mobile blur-[6px]">
        <img src="/client-immersive.png" alt="Cider Interface Background" class="w-full h-auto shadow-[0_0_120px_rgba(250,40,78,0.5)]" />
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';

// Get reactive scroll position for parallax effect
const { y } = useWindowScroll();
</script>

<style scoped>
.perspective-container {
  perspective: 1500px;
}
.perspective-container-mobile {
  perspective: 800px;
}

.hero-mockup-desktop {
  /* Tilted backwards to lay "flat" into the screen */
  transform: rotateX(45deg) rotateY(0deg) rotateZ(-2deg) scale(1);
  transform-style: preserve-3d;
  will-change: transform;
}

.hero-mockup-mobile {
  /* Steeper tilt for mobile to make it look deeper but still clear */
  transform: rotateX(40deg) rotateY(0deg) rotateZ(-1deg) scale(1);
  transform-style: preserve-3d;
  will-change: transform;
}

/* Mask to smoothly fade the image out at the bottom and edges so it seamlessly blends */
.mask-fade {
  mask-image: radial-gradient(ellipse at top center, rgba(0,0,0,1) 10%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0) 60%);
  -webkit-mask-image: radial-gradient(ellipse at top center, rgba(0,0,0,1) 10%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0) 60%);
}

.mask-fade-mobile {
  mask-image: radial-gradient(ellipse at top center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0) 50%);
  -webkit-mask-image: radial-gradient(ellipse at top center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0) 50%);
}

.animate-float-desktop {
  animation: floatMockupDesktop 5s ease-in-out infinite alternate;
}

.animate-float-mobile {
  animation: floatMockupMobile 5s ease-in-out infinite alternate;
}

@keyframes floatMockupDesktop {
  0% { transform: rotateX(45deg) rotateY(0deg) rotateZ(-2deg) scale(1) translateY(0); }
  100% { transform: rotateX(45deg) rotateY(0deg) rotateZ(-2deg) scale(1) translateY(-30px); }
}

@keyframes floatMockupMobile {
  0% { transform: rotateX(40deg) rotateY(0deg) rotateZ(-1deg) scale(1) translateY(0); }
  100% { transform: rotateX(40deg) rotateY(0deg) rotateZ(-1deg) scale(1) translateY(-20px); }
}
</style>