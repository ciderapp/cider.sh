<template>
  <span class="inline-flex flex-col">
    <span class="sr-only">{{ value }}</span>
    <span class="flex items-end gap-1 lg:gap-1.5" aria-hidden="true">
      <template v-for="(cell, i) in cells" :key="i">
        <span v-if="cell.glyphs" class="sg-flap">
          <span class="sg-flap__roll" :style="{ animationDelay: cell.delay }">
            <span v-for="(glyph, g) in cell.glyphs" :key="g" class="sg-flap__glyph">{{ glyph }}</span>
          </span>
        </span>
        <span v-else class="px-0.5 text-[46px] font-extrabold leading-[0.8] text-signal lg:text-[76px]">{{ cell.char }}</span>
      </template>
    </span>
  </span>
</template>

<script lang="ts" setup>
  const props = defineProps<{ value: string }>();

  // Deterministic "random" glyphs so server and client render the same markup.
  const pool = "AKMRSTVXZ0123456789#/+BCDEFGHJLNPQUWY";

  const cells = computed(() => {
    let slot = 0;
    return props.value.split("").map((char) => {
      if (!/[0-9A-Z]/i.test(char)) return { char };
      const i = slot++;
      const glyphs = Array.from({ length: 5 }, (_, k) => pool[(i * 7 + k * 5 + 11) % pool.length]);
      glyphs.push(char);
      return { char, glyphs, delay: `${(0.3 + i * 0.08).toFixed(2)}s` };
    });
  });
</script>
