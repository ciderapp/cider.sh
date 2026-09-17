<script setup lang="ts">
/**
 * OgShareCard — cryptofyre greenlit (Sep 2026)
 *
 * layout="home": Win11 single-hero product window
 *   - r=8, 1px #2a2a2e inner border, ~128px side margins
 *   - contain (no L/R crop), larger/lower centered bare lockup
 *   - crimson glow / immersive mesh backdrop
 *
 * layout="secondary" (default for non-home):
 *   - text-forward + optional Nucleo outline icon left of title
 *   - larger bare lockup, footer #c4c4cc with path URL
 *   - cider: crimson mesh; taproom: crimson/pink + charcoal gray mesh
 *
 * Never use em dashes in title/description/footer.
 * No HOME chip. No icon plate/ring. No status-dot.
 */
withDefaults(
  defineProps<{
    title?: string
    description?: string
    /** Footer URL including path, e.g. cider.sh/downloads */
    footer?: string
    site?: 'cider' | 'taproom'
    accent?: string
    /** home | secondary */
    layout?: 'home' | 'secondary'
    /** public path to real product shot (home only), e.g. /client-interface.png */
    image?: string
    /** public path to Nucleo PNG (secondary), e.g. /og-icons/downloads.png */
    icon?: string
    /** Brand mark path override */
    mark?: string
    /** Mesh backdrop path override */
    mesh?: string
  }>(),
  {
    title: 'Cider',
    description: '',
    footer: '',
    site: 'cider',
    accent: '#dc0f54',
    layout: 'secondary',
    image: '',
    icon: '',
    mark: '',
    mesh: '',
  },
)

const brand = (site: string) => (site === 'taproom' ? 'Taproom' : 'Cider')
const defaultMark = (site: string) =>
  site === 'taproom' ? '/site-icon.png' : '/icon.png'
const defaultMesh = (site: string) =>
  site === 'taproom' ? '/og-mesh/taproom.png' : '/og-mesh/cider.png'
const defaultFooter = (site: string, footer: string) =>
  footer || (site === 'taproom' ? 'taproom.cider.sh' : 'cider.sh')
</script>

<template>
  <!-- ========== HOME / ROOT ========== -->
  <div
    v-if="layout === 'home'"
    :style="{
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#050506',
      color: '#fff',
      fontFamily: site === 'taproom' ? 'Satoshi, Inter, sans-serif' : 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }"
  >
    <img
      :src="mesh || defaultMesh(site)"
      width="1200"
      height="630"
      :style="{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '1200px',
        height: '630px',
        objectFit: 'cover',
      }"
    />

    <!-- Larger / lower centered bare lockup -->
    <div
      :style="{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginTop: '46px',
        zIndex: '1',
      }"
    >
      <img :src="mark || defaultMark(site)" width="68" height="68" />
      <div
        :style="{
          fontSize: '44px',
          fontWeight: '650',
          letterSpacing: '-0.03em',
        }"
      >
        {{ brand(site) }}
      </div>
    </div>

    <!-- Win11 floating window: r=8, 1px dark gray border, ~128px side margins -->
    <div
      :style="{
        position: 'relative',
        zIndex: '1',
        marginTop: '28px',
        width: '944px',
        height: '420px',
        borderRadius: '8px',
        border: '1px solid #2a2a2e',
        overflow: 'hidden',
        display: 'flex',
        backgroundColor: '#09090a',
        boxShadow: '0 24px 64px rgba(0,0,0,0.65)',
      }"
    >
      <img
        v-if="image"
        :src="image"
        width="944"
        height="420"
        :style="{
          width: '944px',
          height: '420px',
          objectFit: 'contain',
          objectPosition: 'center',
          borderRadius: '8px',
        }"
      />
    </div>
  </div>

  <!-- ========== SECONDARY (text-forward) ========== -->
  <div
    v-else
    :style="{
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#09090b',
      color: '#fff',
      fontFamily: site === 'taproom' ? 'Satoshi, Inter, sans-serif' : 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }"
  >
    <img
      :src="mesh || defaultMesh(site)"
      width="1200"
      height="630"
      :style="{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '1200px',
        height: '630px',
        objectFit: 'cover',
      }"
    />

    <div
      :style="{
        position: 'relative',
        zIndex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '630px',
        padding: '52px 72px 52px 72px',
      }"
    >
      <!-- Larger bare lockup -->
      <div :style="{ display: 'flex', alignItems: 'center', gap: '14px' }">
        <img :src="mark || defaultMark(site)" width="64" height="64" />
        <div
          :style="{
            fontSize: '34px',
            fontWeight: '650',
            letterSpacing: '-0.02em',
          }"
        >
          {{ brand(site) }}
        </div>
      </div>

      <!-- Nucleo + title block -->
      <div :style="{ display: 'flex', alignItems: 'flex-start', gap: '22px', marginBottom: '48px' }">
        <img
          v-if="icon"
          :src="icon"
          width="58"
          height="58"
          :style="{ marginTop: '8px', flexShrink: '0' }"
        />
        <div :style="{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '920px' }">
          <div
            :style="{
              fontSize: '64px',
              fontWeight: '700',
              letterSpacing: '-0.035em',
              lineHeight: '1.05',
            }"
          >
            {{ title }}
          </div>
          <div
            v-if="description"
            :style="{
              fontSize: '26px',
              fontWeight: '400',
              color: '#a1a1aa',
              lineHeight: '1.35',
            }"
          >
            {{ description }}
          </div>
        </div>
      </div>

      <!-- High-contrast footer with path -->
      <div :style="{ fontSize: '22px', fontWeight: '500', color: '#c4c4cc' }">
        {{ defaultFooter(site, footer) }}
      </div>
    </div>
  </div>
</template>
