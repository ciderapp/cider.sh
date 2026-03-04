<script setup lang="ts">
import { ref } from 'vue'

const stats = [
  {
    value: '7.1K+',
    label: 'GitHub Stars',
    description:
      'Cider Classic has earned over 7.1K stars on GitHub. We know our stuff.',
  },
  {
    value: '600%',
    label: 'Enjoyment Factor',
    description:
      'Cider is filled with cool quirks and features. Many more yet to come.',
  },
  {
    value: '10+',
    label: 'Open-Source Integrations',
    description:
      'We offer first-party integrations for Discord and Last.fm with much more available through plugins made by the community.',
  },
]

const comparisonClients = ['Cider', 'Cider Classic', 'Apple Music Web', 'macOS Apple Music App', 'Windows Apple Music App']

const comparisonFeatures = [
  { name: 'iCloud Library', values: [true, true, true, true, true] },
  { name: 'Apple Music Sing', values: [true, true, true, true, false] },
  { name: 'Seamless Library Browsing', values: [true, false, false, true, false] },
  { name: 'Community Driven', values: [true, true, false, false, false] },
  { name: 'Built-in integrations for Last.fm and Discord', values: [true, true, false, false, false] },
  { name: 'Community driven themes and plugins', values: [true, true, false, false, false] },
  { name: 'Audio Enhancements', values: [true, true, false, false, false] },
  { name: 'Constant Updates and New Features', values: [true, false, false, false, false] },
]

const faqs = [
  {
    q: 'Is lossless audio supported?',
    a: 'Unfortunately, we do not support lossless audio at this time. This is not currently possible in the MusicKit.js library due to there being no ability to decrypt the lossless music.',
  },
  {
    q: 'Do you collect my data?',
    a: 'No! We have a strict no data collection policy. We do not collect any personal data.',
  },
  {
    q: 'Is it free to use?',
    a: 'Cider is a paid application available on itch.io, through donation, or the Microsoft Store. Purchasing through itch.io or through donation will allow you to get the latest updates and features through Taproom.',
  },
  {
    q: 'Can I customize with my own theme?',
    a: 'Absolutely! We provide a powerful theming system that lets you create your own custom theme or choose from a selection of approved community themes available on the Cider Marketplace.',
  },
  {
    q: 'Is signing into Cider safe?',
    a: 'Yes. We only use the Apple Music API to access your library. Your credentials are never stored or transmitted through our servers.',
  },
  {
    q: 'Is there a free trial available?',
    a: 'Unfortunately, we do not offer a free trial at this time.',
  },
  {
    q: 'Can I transfer my Cider license from one store to another?',
    a: 'No, unfortunately, we do not support transferring licenses between stores. If you have purchased Cider from itch.io, you will need to purchase it again from the Microsoft Store and vice versa \u2014 so make sure you purchase from the store you want to use. Itch.io will give you the best available builds.',
  },
  {
    q: 'What platforms does Cider support?',
    a: 'Cider runs on Windows, macOS, and Linux. On Windows we use a native .NET/WPF backend with WebView2, while macOS and Linux use an optimized, DRM-compliant Electron build.',
  },
]

const openFaq = ref<number | null>(null)

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}
</script>

<template>
  <main class="learn-more">
    <section class="hero-sm">
      <div class="hero-sm-content">
        <span class="section-eyebrow">Learn More</span>
        <h1 class="hero-sm-title">The perfect client for Apple Music users</h1>
        <p class="hero-sm-subtitle">
          Cider not only provides a refreshing alternative to Apple's official music client, but it
          also transforms your entire music experience with its emphasis on design and user
          experience. Here's everything you need to know.
        </p>
      </div>
    </section>

    <section class="stats-section">
      <div class="stats-strip">
        <div v-for="(stat, i) in stats" :key="stat.label" class="stat-item">
          <div class="stat-glow">
            <span class="stat-value">{{ stat.value }}</span>
          </div>
          <span class="stat-label">{{ stat.label }}</span>
          <p class="stat-desc">{{ stat.description }}</p>
          <div v-if="i < stats.length - 1" class="stat-divider" />
        </div>
      </div>
    </section>

    <section class="comparison-section">
      <div class="section-inner">
        <span class="section-eyebrow">Comparison</span>
        <h2 class="section-title">See how Cider stacks up</h2>
        <p class="section-subtitle">
          A side-by-side look at what you get with Cider versus the alternatives.
        </p>
      </div>
      <div class="comparison-table-wrap">
        <table class="comparison-table">
          <thead>
            <tr>
              <th class="feature-col">Feature</th>
              <th
                v-for="client in comparisonClients"
                :key="client"
                class="product-col"
                :class="{ 'product-col--cider': client === 'Cider' }"
              >
                {{ client }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in comparisonFeatures" :key="f.name">
              <td class="feature-name">{{ f.name }}</td>
              <td v-for="(val, ci) in f.values" :key="ci" class="check-cell">
                <span v-if="val" class="check check--yes">&#10003;</span>
                <span v-else class="check check--no">&#10005;</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="faq-section">
      <div class="section-inner">
        <span class="section-eyebrow">FAQ</span>
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-subtitle">
          Got questions? We've got answers.
        </p>
      </div>
      <div class="faq-list">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="faq-item"
          :class="{ 'faq-item--open': openFaq === i }"
        >
          <button class="faq-trigger" @click="toggleFaq(i)">
            <span class="faq-question">{{ faq.q }}</span>
            <span class="faq-chevron">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
          <div class="faq-answer-wrap">
            <p class="faq-answer">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-inner">
        <h2 class="cta-title">Ready to try Cider?</h2>
        <p class="cta-subtitle">
          Join thousands of music lovers who have already made the switch.
        </p>
        <div class="hero-actions">
          <a href="#" class="btn btn-primary">Download Cider</a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.learn-more {
  min-height: 100vh;
  padding-top: var(--navbar-height);
}

.hero-sm {
  padding: 80px 24px 48px;
  text-align: center;
}

.hero-sm-content {
  max-width: 640px;
  margin: 0 auto;
}

.hero-sm-title {
  font-size: clamp(36px, 6vw, 60px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.035em;
  margin-bottom: 16px;
}

.hero-sm-subtitle {
  font-size: clamp(16px, 2vw, 19px);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.section-inner {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 40px;
}

.section-eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  margin-bottom: 12px;
}

.section-title {
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: clamp(15px, 1.8vw, 17px);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.stats-section {
  padding: 48px 24px;
}

.stats-strip {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  max-width: 1100px;
  margin: 0 auto;
}

.stat-item {
  flex: 1;
  position: relative;
  text-align: center;
  padding: 24px 32px;
}

.stat-glow {
  position: relative;
  display: inline-block;
  margin-bottom: 12px;
}

.stat-glow::before {
  content: '';
  position: absolute;
  inset: -16px -24px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(250, 88, 106, 0.2) 0%, transparent 70%);
  filter: blur(18px);
  z-index: -1;
}

.stat-value {
  display: block;
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  background: linear-gradient(135deg, var(--color-accent), #f0a0aa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stat-desc {
  font-size: 13px;
  color: var(--color-text-tertiary);
  line-height: 1.6;
  max-width: 220px;
  margin: 0 auto;
}

.stat-divider {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 80px;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--color-border) 30%,
    var(--color-border) 70%,
    transparent
  );
}

@media (max-width: 900px) {
  .stats-strip {
    flex-wrap: wrap;
  }

  .stat-item {
    flex: 0 0 50%;
  }

  .stat-divider {
    display: none;
  }
}

@media (max-width: 480px) {
  .stat-item {
    flex: 0 0 100%;
  }
}

.comparison-section {
  padding: 48px 24px;
}

.comparison-table-wrap {
  max-width: 1100px;
  margin: 0 auto;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  overflow: hidden;
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.comparison-table thead {
  background: var(--color-surface);
}

.comparison-table th {
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
}

.product-col {
  text-align: center !important;
  min-width: 100px;
  white-space: nowrap;
}

.product-col--cider {
  color: var(--color-accent) !important;
}

.comparison-table td {
  padding: 14px 20px;
  border-bottom: 1px solid var(--color-border);
}

.comparison-table tbody tr:last-child td {
  border-bottom: none;
}

.comparison-table tbody tr {
  transition: background 0.15s;
}

.comparison-table tbody tr:hover {
  background: var(--color-surface);
}

.feature-name {
  color: var(--color-text-primary);
  font-weight: 500;
}

.check-cell {
  text-align: center;
}

.check {
  font-size: 16px;
  font-weight: 700;
}

.check--yes {
  color: var(--color-accent);
}

.check--no {
  color: var(--color-text-tertiary);
  opacity: 0.5;
}

.faq-section {
  padding: 48px 24px;
}

.faq-list {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.faq-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition:
    background 0.2s,
    border-color 0.2s;
}

.faq-item:hover {
  border-color: var(--color-border-hover);
}

.faq-item--open {
  background: var(--color-surface-hover);
}

.faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  text-align: left;
  cursor: pointer;
}

.faq-question {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.faq-chevron {
  flex-shrink: 0;
  color: var(--color-text-tertiary);
  transition: transform 0.25s var(--ease-out-expo);
}

.faq-item--open .faq-chevron {
  transform: rotate(180deg);
}

.faq-answer-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s var(--ease-out-expo);
}

.faq-item--open .faq-answer-wrap {
  grid-template-rows: 1fr;
}

.faq-answer {
  overflow: hidden;
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  padding: 0 20px;
}

.faq-item--open .faq-answer {
  padding-bottom: 20px;
}

.cta-section {
  padding: 48px 24px;
  text-align: center;
}

.cta-inner {
  max-width: 560px;
  margin: 0 auto;
}

.cta-title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}

.cta-subtitle {
  font-size: clamp(15px, 1.8vw, 17px);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 28px;
  font-size: 14px;
  font-weight: 500;
  border-radius: var(--radius-full);
  transition:
    background 0.2s,
    transform 0.15s var(--ease-out-expo),
    box-shadow 0.2s;
  user-select: none;
}

.btn:active {
  transform: scale(0.97);
}

.btn-primary {
  background: var(--color-accent);
  color: #fff;
}

.btn-primary:hover {
  background: #fb6b7b;
  box-shadow: 0 4px 24px rgba(250, 88, 106, 0.25);
}

.btn-ghost {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
}

.btn-ghost:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-border-hover);
}

@media (max-width: 480px) {
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
  }
}
</style>
