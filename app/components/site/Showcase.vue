<template>
  <div ref="root" class="sg-showcase">
    <!-- Ambient light: the same image, blurred, so the glow takes its colors from the app -->
    <img v-if="src" :src="src" alt="" aria-hidden="true" class="sg-showcase__glow" />
    <div class="sg-showcase__frame" :class="bleed && 'sg-showcase__frame--bleed'">
      <div class="sg-shot" :class="bleed ? 'rounded-[inherit]' : 'rounded-[4px]'">
        <template v-if="video && src">
          <video
            ref="player"
            :poster="src"
            :width="width"
            :height="height"
            :aria-label="alt"
            muted
            loop
            playsinline
            disablepictureinpicture
            preload="none"
            class="block h-auto w-full"
            @play="playing = true"
            @pause="playing = false"
          >
            <source v-if="video.webm" :src="video.webm" type="video/webm; codecs=av01.0.08M.08" />
            <source v-if="video.mp4" :src="video.mp4" type="video/mp4; codecs=avc1.640028" />
          </video>
          <button
            type="button"
            class="sg-showcase__toggle"
            :aria-label="playing ? 'Pause video' : 'Play video'"
            @click="toggle"
          >
            <Icon :name="playing ? 'lucide:pause' : 'lucide:play'" class="h-4 w-4" aria-hidden="true" />
          </button>
        </template>
        <img
          v-else-if="src"
          :src="src"
          :alt="alt"
          :width="width"
          :height="height"
          :loading="loading"
          decoding="async"
          class="block h-auto w-full"
          :class="bleed && '![transform:none]'"
        />
        <div
          v-else
          class="flex flex-col items-center justify-center gap-3 bg-ink-raised p-6 text-center"
          :style="{ aspectRatio: `${width} / ${height}` }"
          role="img"
          :aria-label="alt"
        >
          <Icon name="lucide:image" class="h-6 w-6 text-chalk-mute" aria-hidden="true" />
          <span class="font-label text-[11px] text-chalk-mute">{{ alt }}</span>
        </div>
        <span class="sg-shot__bezel" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      /** The screenshot, or with `video`, its poster frame */
      src?: string;
      alt: string;
      width: number;
      height: number;
      loading?: "eager" | "lazy";
      /** Drop the dark frame band, for full-screen captures that have no window edge of their own */
      bleed?: boolean;
      /**
       * A short muted clip that plays in place of the screenshot: AV1 WebM, with H.264 MP4 for
       * browsers without AV1. A video, not an animated image: a fraction of the size, decoded in
       * hardware, and it can be paused.
       */
      video?: { webm?: string; mp4?: string };
    }>(),
    { src: undefined, loading: "lazy", video: undefined }
  );

  // With no src at all, the frame shows a labelled placeholder of what belongs in it.

  const root = ref<HTMLElement | null>(null);
  const player = ref<HTMLVideoElement | null>(null);
  const playing = ref(false);
  // Set by the pause button, so scrolling back into view doesn't restart it
  const userPaused = ref(false);
  const visible = ref(false);

  function sync() {
    const el = player.value;
    if (!el) return;
    if (visible.value && !userPaused.value) {
      // Muted, so autoplay is allowed; a refusal just leaves the poster up
      el.play().catch(() => {});
    } else if (!el.paused) {
      el.pause();
    }
  }

  function toggle() {
    const el = player.value;
    if (!el) return;
    if (el.paused) {
      userPaused.value = false;
      el.play().catch(() => {});
    } else {
      userPaused.value = true;
      el.pause();
    }
  }

  let observer: IntersectionObserver | undefined;
  onMounted(() => {
    if (!props.video) return;
    // Motion that starts on its own waits for a press when the visitor asked for less of it
    userPaused.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Loads and plays only while on screen, and stops using the CPU once scrolled past
    observer = new IntersectionObserver(
      ([entry]) => {
        visible.value = !!entry?.isIntersecting;
        sync();
      },
      { threshold: 0.25 }
    );
    if (root.value) observer.observe(root.value);
  });
  onBeforeUnmount(() => observer?.disconnect());
</script>
