<script setup lang="ts">
withDefaults(defineProps<{ title?: string; description?: string; chip?: string; site?: 'cider' | 'taproom'; accent?: string }>(), { title: 'Cider', description: '', chip: '', site: 'cider', accent: '#dc0f54' })
</script>
<template>
  <div :style="{ width: '1200px', height: '630px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px 72px', backgroundColor: '#09090a', backgroundImage: `radial-gradient(circle at 85% 15%, ${accent}59 0%, transparent 55%)`, color: '#fff', fontFamily: 'Inter, sans-serif', position: 'relative' }">
    <div :style="{ position: 'absolute', top: '0', left: '0', right: '0', height: '6px', background: `linear-gradient(90deg, ${accent}, ${accent}26)` }" />
    <div :style="{ display: 'flex', alignItems: 'center', gap: '20px' }">
      <img src="/icon.png" width="64" height="64" :style="{ borderRadius: '14px' }" />
      <div :style="{ fontSize: '28px', fontWeight: '600' }">Cider</div>
    </div>
    <div :style="{ display: 'flex', flexDirection: 'column', gap: '20px' }">
      <div v-if="chip" :style="{ display: 'flex', alignSelf: 'flex-start', padding: '8px 16px', borderRadius: '999px', fontSize: '16px', fontWeight: '600', letterSpacing: '0.04em', textTransform: 'uppercase', color: accent, backgroundColor: `${accent}2e`, border: `1px solid ${accent}8c` }">{{ chip }}</div>
      <div :style="{ fontSize: '54px', fontWeight: '700', lineHeight: '1.1', maxWidth: '980px' }">{{ title }}</div>
      <div v-if="description" :style="{ fontSize: '26px', fontWeight: '400', color: '#a1a1aa', maxWidth: '900px', lineHeight: '1.35' }">{{ description }}</div>
    </div>
    <div :style="{ fontSize: '18px', fontWeight: '500', color: '#52525b' }">cider.sh</div>
  </div>
</template>
