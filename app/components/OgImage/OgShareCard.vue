<script setup lang="ts">
/**
 * nuxt-og-image / Satori share card — keep styles inline (no Tailwind in OG tree).
 * v2: solid accent chip (white on crimson), app-icon mark with hairline plate.
 * No em dashes in caller copy.
 */
withDefaults(
  defineProps<{
    title?: string
    description?: string
    chip?: string
    site?: 'cider' | 'taproom'
    accent?: string
  }>(),
  {
    title: 'Cider',
    description: '',
    chip: '',
    site: 'cider',
    accent: '#dc0f54',
  },
)
</script>

<template>
  <div
    :style="{
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '48px 72px',
      backgroundColor: '#09090a',
      backgroundImage: `radial-gradient(circle at 85% 15%, ${accent}66 0%, transparent 55%)`,
      color: '#fff',
      fontFamily: site === 'taproom' ? 'Satoshi, Inter, sans-serif' : 'Inter, sans-serif',
      position: 'relative',
    }"
  >
    <div
      :style="{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '6px',
        background: `linear-gradient(90deg, ${accent}, ${accent}26)`,
      }"
    />

    <div :style="{ display: 'flex', alignItems: 'center', gap: '20px' }">
      <div
        :style="{
          display: 'flex',
          width: '72px',
          height: '72px',
          borderRadius: '18px',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#121214',
          boxShadow: `inset 0 0 0 1px rgba(200,200,200,0.16), 0 0 0 1px ${accent}33, 0 8px 28px rgba(0,0,0,0.45)`,
        }"
      >
        <img
          :src="site === 'taproom' ? '/site-icon.png' : '/icon.png'"
          width="56"
          height="56"
          :style="{ borderRadius: '14px' }"
        />
      </div>
      <div :style="{ fontSize: '28px', fontWeight: '600', letterSpacing: '-0.02em' }">
        {{ site === 'taproom' ? 'Taproom' : 'Cider' }}
      </div>
    </div>

    <div :style="{ display: 'flex', flexDirection: 'column', gap: '22px' }">
      <div
        v-if="chip"
        :style="{
          display: 'flex',
          alignSelf: 'flex-start',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          borderRadius: '10px',
          fontSize: '15px',
          fontWeight: '700',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#ffffff',
          backgroundColor: accent,
          boxShadow: `0 0 0 1px ${accent}, 0 10px 28px ${accent}40`,
        }"
      >
        <div
          :style="{
            width: '8px',
            height: '8px',
            borderRadius: '999px',
            backgroundColor: '#ffffff',
            opacity: '0.95',
          }"
        />
        {{ chip }}
      </div>
      <div :style="{ fontSize: '54px', fontWeight: '700', lineHeight: '1.1', maxWidth: '980px', letterSpacing: '-0.03em' }">
        {{ title }}
      </div>
      <div
        v-if="description"
        :style="{ fontSize: '26px', fontWeight: '400', color: '#a1a1aa', maxWidth: '900px', lineHeight: '1.35' }"
      >
        {{ description }}
      </div>
    </div>

    <div :style="{ fontSize: '18px', fontWeight: '500', color: '#52525b' }">
      {{ site === 'taproom' ? 'taproom.cider.sh' : 'cider.sh' }}
    </div>
  </div>
</template>
