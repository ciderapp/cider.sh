<template>
  <!-- <div class="carousel" @onMouseEnter="isHovered = true" @onMouseLeave="isHovered = false"> -->
  <div class="carousel" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="images" ref="carouselRef" @scroll="handleScroll">
      <NuxtImg
        v-for="(image, index) in props.images"
        :src="image"
        :key="index"
        format="webp"
        :class="`carousel-image ${getImageClass(index)}`"
        @click="handleImageClick(index)"
      />
    </div>
    <div class="carousel-indicators">
      <div
        v-for="(_, index) in props.images"
        :key="index"
        :class="['indicator', { active: index === currentIndex }]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from "vue";

  const props = defineProps<{
    images: string[];
  }>();

  const currentIndex = ref(0);
  const isHovered = ref(false);
  const imageCount = props.images.length;
  const carouselRef = ref<HTMLElement | null>(null);
  let autoplayInterval: number | null = null;
  const isMobile = ref(false);

  function getImageClass(index: number) {
    if (isMobile.value) return "carousel-image--mobile";
    if (index === currentIndex.value) return "carousel-image--center";
    else if (index === (currentIndex.value - 1 + imageCount) % imageCount)
      return "carousel-image--left";
    else if (index === (currentIndex.value + 1) % imageCount) return "carousel-image--right";
    return "carousel-image--hidden";
  }

  const handleImageClick = (index: number) => {
    if (!isMobile.value) {
      index === (currentIndex.value - 1 + imageCount) % imageCount ? goToPrev() : goToNext();
    }
  };

  function goToPrev() {
    currentIndex.value = (currentIndex.value - 1 + imageCount) % imageCount;
  }
  function goToNext() {
    currentIndex.value = (currentIndex.value + 1) % imageCount;
  }

  function handleScroll() {
    if (carouselRef.value && isMobile.value) {
      const scrollPosition = carouselRef.value.scrollLeft;
      const imageWidth = carouselRef.value.offsetWidth * 0.8;
      currentIndex.value = Math.round(scrollPosition / imageWidth);
    }
  }

  function startAutoplay() {
    autoplayInterval = window.setInterval(() => {
      if (!isHovered.value && !isMobile.value) {
        goToNext();
      }
    }, 5000);
  }

  function updateIsMobile() {
    isMobile.value = window.innerWidth <= 768;
  }

  onMounted(() => {
    updateIsMobile();
    startAutoplay();
    window.addEventListener("resize", updateIsMobile);
  });

  onUnmounted(() => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
    window.removeEventListener("resize", updateIsMobile);
  });
</script>
