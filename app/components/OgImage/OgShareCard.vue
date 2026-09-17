<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: '#09090a',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }"
  >
    <!-- Background gradient -->
    <div
      :style="{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '800px',
        height: '800px',
        background: `radial-gradient(circle at center, ${accent || '#dc0f54'}40 0%, transparent 70%)`,
        transform: 'translate(20%, -20%)',
      }"
    />

    <!-- Content -->
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '60px',
        position: 'relative',
        zIndex: 1,
      }"
    >
      <!-- Top section -->
      <div :style="{ display: 'flex', flexDirection: 'column', gap: '20px' }">
        <!-- Chip badge -->
        <div
          v-if="chip"
          :style="{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: `${accent || '#dc0f54'}20`,
            border: `1px solid ${accent || '#dc0f54'}40`,
            color: accent || '#dc0f54',
            padding: '8px 20px',
            borderRadius: '9999px',
            fontSize: '18px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            width: 'fit-content',
          }"
        >
          {{ chip }}
        </div>

        <!-- Title -->
        <div
          :style="{
            fontSize: '72px',
            fontWeight: '800',
            lineHeight: '1.1',
            color: '#ffffff',
            maxWidth: '900px',
          }"
        >
          {{ title }}
        </div>

        <!-- Description -->
        <div
          :style="{
            fontSize: '28px',
            lineHeight: '1.4',
            color: '#a1a1aa',
            maxWidth: '800px',
          }"
        >
          {{ description }}
        </div>
      </div>

      <!-- Bottom section with logo and site name -->
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
      >
        <!-- Cider logo and text -->
        <div :style="{ display: 'flex', alignItems: 'center', gap: '16px' }">
          <!-- Cider icon (simplified circle with play icon concept) -->
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="24" :fill="accent || '#dc0f54'" />
            <circle cx="24" cy="24" r="18" fill="#09090a" />
            <circle cx="24" cy="24" r="10" :fill="accent || '#dc0f54'" />
          </svg>

          <div
            :style="{
              fontSize: '24px',
              fontWeight: '600',
              color: '#ffffff',
            }"
          >
            {{ site || 'cider' }}
          </div>
        </div>

        <!-- URL -->
        <div
          :style="{
            fontSize: '20px',
            color: '#71717a',
          }"
        >
          cider.sh
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  chip?: string
  site?: string
  accent?: string
}>()
</script>
