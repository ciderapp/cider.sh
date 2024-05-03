<template>
  <!-- <div class="carousel" @onMouseEnter="isHovered = true" @onMouseLeave="isHovered = false"> -->
  <div class="carousel" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="images">
      <NuxtImg
        v-for="(image, index) in props.images"
        :src="image"
        :key="index"
        format="webp"
        :class="`carousel-image ${getImageClass(index)}`"
        @click="index === (currentIndex - 1 + imageCount) % imageCount ? goToPrev() : goToNext()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    images: string[];
  }>();

  let currentIndex = ref(0);
  let isHovered = ref(false);
  let imageCount = props.images.length || 0;

  function getImageClass(index: number) {
    if (index === currentIndex.value) return "carousel-image--center";
    else if (index === (currentIndex.value - 1 + imageCount) % imageCount)
      return "carousel-image--left";
    else if (index === (currentIndex.value + 1) % imageCount) return "carousel-image--right";
    return "carousel-image--hidden";
  }

  function goToPrev() {
    currentIndex.value = (currentIndex.value - 1 + imageCount) % imageCount;
  }
  function goToNext() {
    currentIndex.value = (currentIndex.value + 1) % imageCount;
  }

  onMounted(() => {
    setInterval(() => {
      if (!isHovered.value) {
        currentIndex.value = (currentIndex.value + 1) % imageCount;
      }
    }, 5000);
  });
</script>
