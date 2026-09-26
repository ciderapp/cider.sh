<template>
  <div ref="root">
    <div class="sg-showcase grid">
      <!-- Ambient light follows the active screenshot -->
      <img
        v-for="(slide, index) in slides"
        :key="`glow-${slide.src}`"
        :src="slide.src"
        alt=""
        aria-hidden="true"
        class="sg-showcase__glow transition-opacity duration-700"
        :style="index === active ? undefined : { opacity: 0 }"
      />
      <!-- Holds the padded frame's space, so an edge-to-edge slide never moves the page -->
      <div class="sg-showcase__frame invisible [grid-area:1/1]" aria-hidden="true">
        <div :style="{ aspectRatio: `${width} / ${height}` }" />
      </div>
      <div
        :id="panelId"
        class="sg-showcase__frame touch-pan-y select-none self-start transition-[padding] duration-700 ease-out [grid-area:1/1]"
        :class="bleed && 'sg-showcase__frame--bleed'"
        role="tabpanel"
        :aria-labelledby="`${panelId}-tab-${active}`"
        @pointerdown="onPointerDown"
        @pointerup="onPointerUp"
        @pointercancel="swipeStart = null"
      >
        <div
          class="sg-shot transition-[border-radius] duration-700"
          :class="bleed ? 'rounded-[inherit]' : 'rounded-[4px]'"
          :style="{ aspectRatio: `${width} / ${height}` }"
        >
          <img
            v-for="(slide, index) in slides"
            :key="slide.src"
            :src="slide.src"
            :alt="slide.alt"
            :width="width"
            :height="height"
            :loading="index === 0 ? loading : 'lazy'"
            :fetchpriority="index === 0 && loading === 'eager' ? 'high' : undefined"
            :aria-hidden="index === active ? undefined : 'true'"
            decoding="async"
            draggable="false"
            class="absolute inset-0 block h-full w-full transition-opacity duration-700 ease-out"
            :class="[index === active ? 'opacity-100' : 'opacity-0', slide.bleed && '![transform:none]']"
          />
          <span class="sg-shot__bezel" aria-hidden="true" />
        </div>
      </div>
    </div>

    <div
      role="tablist"
      aria-label="Screenshots"
      class="mt-5 flex flex-wrap gap-2 md:mt-6"
      @keydown.right.prevent="select(active + 1, { focus: true })"
      @keydown.left.prevent="select(active - 1, { focus: true })"
    >
      <button
        v-for="(slide, index) in slides"
        :id="`${panelId}-tab-${index}`"
        :key="slide.label"
        ref="tabs"
        type="button"
        role="tab"
        :aria-selected="index === active"
        :aria-controls="panelId"
        :tabindex="index === active ? 0 : -1"
        class="sg-focus relative inline-flex h-10 items-center overflow-hidden rounded-full border px-4 font-label text-xs transition-colors"
        :class="index === active ? 'border-chalk bg-chalk text-ink' : 'border-ink-edge text-chalk-dim hover:border-chalk-mute hover:text-chalk'"
        @click="select(index, {})"
      >
        {{ slide.label }}
        <!-- Time left on this slide while the carousel plays by itself -->
        <span
          v-if="index === active && playing"
          :key="`progress-${cycle}`"
          class="sg-progress absolute inset-x-0 bottom-0 h-[3px] origin-left bg-signal"
          :style="{ animationDuration: `${interval}ms` }"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      /** `bleed` drops the dark frame band for full-screen captures that have no window edge */
      slides: Array<{ src: string; alt: string; label: string; bleed?: boolean }>;
      width: number;
      height: number;
      interval?: number;
      loading?: "eager" | "lazy";
    }>(),
    { interval: 6000, loading: "lazy" }
  );

  const panelId = useId();
  // Full-screen captures have no window edge, so the frame drops its dark padding for them
  const bleed = computed(() => !!props.slides[active.value]?.bleed);
  const root = ref<HTMLElement>();
  const tabs = ref<HTMLButtonElement[]>([]);
  const active = ref(0);
  // Bumped on every change so the progress bar restarts
  const cycle = ref(0);

  // It advances by itself until someone picks a slide, and only while it is on screen, the tab
  // is visible, and the visitor hasn't asked for reduced motion.
  const touched = ref(false);
  const inView = ref(false);
  const visibility = useDocumentVisibility();
  const motion = usePreferredReducedMotion();
  const playing = computed(
    () => !touched.value && inView.value && visibility.value === "visible" && motion.value !== "reduce"
  );

  useIntersectionObserver(root, ([entry]) => {
    inView.value = !!entry?.isIntersecting;
  });

  // Passing options means a person chose the slide, which stops it advancing by itself
  function select(index: number, byUser?: { focus?: boolean }) {
    const count = props.slides.length;
    active.value = (index + count) % count;
    cycle.value++;
    if (byUser) touched.value = true;
    if (byUser?.focus) tabs.value[active.value]?.focus();
  }

  let timer: ReturnType<typeof setTimeout> | undefined;
  watch(
    [playing, cycle],
    () => {
      clearTimeout(timer);
      if (playing.value) timer = setTimeout(() => select(active.value + 1), props.interval);
    },
    { flush: "post" }
  );
  onBeforeUnmount(() => clearTimeout(timer));

  // Swipe on touch screens (or drag with a mouse) to move between slides
  const swipeStart = ref<number | null>(null);
  function onPointerDown(event: PointerEvent) {
    swipeStart.value = event.clientX;
  }
  function onPointerUp(event: PointerEvent) {
    if (swipeStart.value === null) return;
    const distance = event.clientX - swipeStart.value;
    swipeStart.value = null;
    if (Math.abs(distance) < 40) return;
    select(active.value + (distance < 0 ? 1 : -1), {});
  }
</script>
