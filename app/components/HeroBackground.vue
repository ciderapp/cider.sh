<template>
  <div
    class="pointer-events-none absolute left-1/2 top-1/2 -z-10 flex h-[100vh] w-[100vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-hidden md:justify-start md:pt-[5vh]"
  >
    <!-- Ambient Background Glow -->
    <div
      class="absolute left-1/2 top-[50%] h-[60vh] w-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-red-600/40 mix-blend-screen blur-[100px] dark:bg-red-600/30 dark:mix-blend-lighten md:top-[30%] md:w-[80vw] md:blur-[120px]"
    ></div>

    <!-- Desktop Tilted App Mockup Background -->
    <div
      ref="parallaxDesktop"
      class="perspective-container mask-fade relative mt-12 hidden w-[120vw] max-w-[1800px] opacity-100 will-change-transform dark:opacity-80 md:block"
    >
      <div class="hero-mockup-desktop animate-float-desktop blur-[8px]">
        <img
          src="/client-immersive.png"
          alt="Cider Interface Background"
          class="h-auto w-full rounded-[2rem] border border-white/10 shadow-[0_0_120px_rgba(250,40,78,0.5)]"
        />
      </div>
    </div>

    <!-- Mobile Tilted App Mockup Background -->
    <div
      ref="parallaxMobile"
      class="perspective-container-mobile mask-fade-mobile relative mt-[20vh] block w-[350vw] max-w-none opacity-100 will-change-transform dark:opacity-80 sm:w-[250vw] md:hidden"
    >
      <div class="hero-mockup-mobile animate-float-mobile blur-[6px]">
        <img
          src="/client-immersive.png"
          alt="Cider Interface Background"
          class="h-auto w-full shadow-[0_0_120px_rgba(250,40,78,0.5)]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useMediaQuery } from "@vueuse/core";
  import { onBeforeUnmount, onMounted, ref } from "vue";

  const parallaxDesktop = ref<HTMLElement | null>(null);
  const parallaxMobile = ref<HTMLElement | null>(null);

  // Respect users who prefer reduced motion — skip the parallax for them.
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Drive the parallax straight off the scroll position, throttled to one write
  // per animation frame. Writing directly to the DOM (instead of a reactive
  // :style binding) avoids re-rendering the component on every scroll event, and
  // translate3d keeps the blurred mockup on its own GPU layer so scrolling
  // composites it instead of repainting.
  let ticking = false;

  function applyParallax() {
    ticking = false;
    const factor = reduceMotion.value ? 0 : 0.4;
    const transform = `translate3d(0, ${-(window.scrollY * factor)}px, 0)`;
    if (parallaxDesktop.value) parallaxDesktop.value.style.transform = transform;
    if (parallaxMobile.value) parallaxMobile.value.style.transform = transform;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(applyParallax);
  }

  onMounted(() => {
    applyParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
  });
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
    mask-image: radial-gradient(
      ellipse at top center,
      rgba(0, 0, 0, 1) 10%,
      rgba(0, 0, 0, 0.8) 25%,
      rgba(0, 0, 0, 0) 60%
    );
    -webkit-mask-image: radial-gradient(
      ellipse at top center,
      rgba(0, 0, 0, 1) 10%,
      rgba(0, 0, 0, 0.8) 25%,
      rgba(0, 0, 0, 0) 60%
    );
  }

  .mask-fade-mobile {
    mask-image: radial-gradient(
      ellipse at top center,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.8) 20%,
      rgba(0, 0, 0, 0) 50%
    );
    -webkit-mask-image: radial-gradient(
      ellipse at top center,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.8) 20%,
      rgba(0, 0, 0, 0) 50%
    );
  }

  .animate-float-desktop {
    animation: floatMockupDesktop 5s ease-in-out infinite alternate;
  }

  .animate-float-mobile {
    animation: floatMockupMobile 5s ease-in-out infinite alternate;
  }

  @keyframes floatMockupDesktop {
    0% {
      transform: rotateX(45deg) rotateY(0deg) rotateZ(-2deg) scale(1) translateY(0);
    }
    100% {
      transform: rotateX(45deg) rotateY(0deg) rotateZ(-2deg) scale(1) translateY(-30px);
    }
  }

  @keyframes floatMockupMobile {
    0% {
      transform: rotateX(40deg) rotateY(0deg) rotateZ(-1deg) scale(1) translateY(0);
    }
    100% {
      transform: rotateX(40deg) rotateY(0deg) rotateZ(-1deg) scale(1) translateY(-20px);
    }
  }
</style>
