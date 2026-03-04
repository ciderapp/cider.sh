<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const slides = [
  {
    src: '/images/client-immersive.png',
    alt: 'Cider Immersive View',
    label: 'Immersive',
  },
  {
    src: '/images/client-comfy.png',
    alt: 'Cider Comfy View',
    label: 'Comfy',
  },
  {
    src: '/images/client-compact.png',
    alt: 'Cider Compact View',
    label: 'Compact',
  },
]

const current = ref(0)
let interval: ReturnType<typeof setInterval> | null = null
let isHovered = false

function next() {
  current.value = (current.value + 1) % slides.length
}

function goTo(index: number) {
  current.value = index
  resetAutoplay()
}

function resetAutoplay() {
  if (interval) clearInterval(interval)
  if (!isHovered) {
    interval = setInterval(next, 5000)
  }
}

function onEnter() {
  isHovered = true
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

function onLeave() {
  isHovered = false
  resetAutoplay()
}

onMounted(() => {
  interval = setInterval(next, 5000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})

function getPosition(index: number): 'left' | 'center' | 'right' {
  const diff = (index - current.value + slides.length) % slides.length
  if (diff === 0) return 'center'
  if (diff === 1) return 'right'
  return 'left'
}

const slideStates = computed(() =>
  slides.map((slide, i) => ({
    ...slide,
    index: i,
    position: getPosition(i),
  })),
)
</script>

<template>
  <div class="carousel" @mouseenter="onEnter" @mouseleave="onLeave">
    <div class="carousel-stage">
      <div
        v-for="slide in slideStates"
        :key="slide.index"
        class="carousel-slide"
        :class="slide.position"
        @click="slide.position !== 'center' && goTo(slide.index)"
      >
        <img :src="slide.src" :alt="slide.alt" loading="lazy" />
      </div>
    </div>

    <div class="carousel-controls">
      <button
        v-for="(s, i) in slides"
        :key="i"
        class="carousel-dot"
        :class="{ active: i === current }"
        :aria-label="`Show ${s.label} view`"
        @click="goTo(i)"
      >
        <span class="dot-label">{{ s.label }}</span>
        <span class="dot-track">
          <span v-if="i === current" class="dot-fill" />
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.carousel-stage {
  position: relative;
  height: 0;
  padding-bottom: 42%;
  perspective: 1200px;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 50%;
  width: 68%;
  transform-style: preserve-3d;
  transition:
    transform 0.6s var(--ease-out-expo),
    opacity 0.6s var(--ease-out-expo),
    filter 0.6s var(--ease-out-expo);
  will-change: transform, opacity, filter;
  background: transparent;
}

.carousel-slide img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
}

.carousel-slide.center {
  transform: translateX(-50%) translateZ(0);
  opacity: 1;
  filter: blur(0);
  z-index: 3;
  cursor: default;
}

.carousel-slide.left {
  transform: translateX(-88%) translateZ(-180px) rotateY(8deg);
  opacity: 0.5;
  filter: blur(4px);
  z-index: 1;
  cursor: pointer;
}

.carousel-slide.right {
  transform: translateX(-12%) translateZ(-180px) rotateY(-8deg);
  opacity: 0.5;
  filter: blur(4px);
  z-index: 1;
  cursor: pointer;
}

.carousel-slide.left:hover,
.carousel-slide.right:hover {
  opacity: 0.65;
  filter: blur(2px);
}

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.carousel-dot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  cursor: pointer;
}

.dot-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-tertiary);
  transition: color 0.2s;
}

.carousel-dot.active .dot-label {
  color: var(--color-text-primary);
}

.carousel-dot:hover .dot-label {
  color: var(--color-text-secondary);
}

.dot-track {
  width: 40px;
  height: 3px;
  border-radius: 2px;
  background: var(--color-surface-hover);
  overflow: hidden;
  position: relative;
}

.dot-fill {
  position: absolute;
  inset: 0;
  background: var(--color-accent);
  border-radius: 2px;
  animation: dot-progress 5s linear forwards;
}

.carousel:hover .dot-fill {
  animation-play-state: paused;
}

@keyframes dot-progress {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .carousel-slide {
    width: 80%;
  }

  .carousel-slide.left {
    transform: translateX(-82%) translateZ(-120px) rotateY(6deg);
  }

  .carousel-slide.right {
    transform: translateX(-18%) translateZ(-120px) rotateY(-6deg);
  }
}
</style>
