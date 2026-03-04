<script setup lang="ts">
import ShowcaseCarousel from '@/components/ShowcaseCarousel.vue'
import AmbientOrbs from '@/components/AmbientOrbs.vue'
import NIcon from '@/components/NIcon.vue'

const techStack = [
  { name: 'Vue.js', icon: 'vue', size: 24 },
  { name: 'Quasar', icon: 'quasar', size: 24 },
  { name: 'Socket.io', icon: 'socket-io', size: 24 },
  { name: '.NET', icon: 'dotnet', size: 24 },
  { name: 'Electron', icon: 'electron', size: 24 },
]

const features = [
  {
    title: 'Engineered Audio',
    description:
      'Audio Spatialization, Adrenaline Processor\u2122, and parametric equalizers are just some of the features actively developed by our dedicated audio engineer, Maikiwi.',
    icon: 'waveform-lines',
  },
  {
    title: 'Built on Our Own Terms',
    description:
      'Our in-house replacement for MusicKit.js eliminates the bugs and limitations of the stock library, providing a reliable, fast, and fully controlled solution.',
    icon: 'house-settings',
  },
  {
    title: 'Platform-Tuned Performance',
    description:
      'We use native .NET/WPF on Windows with WebView2 for zero bloat and maximum performance. On Linux and macOS, our lean, DRM-compliant Electron build is optimized for similar speed.',
    icon: 'bolt-lightning',
  },
  {
    title: 'Advanced Playback',
    description:
      'Features such as crossfade, Automix, and Dolby Atmos support enable seamless transitions and spatial audio for an immersive listening experience.',
    icon: 'infinity',
  },
  {
    title: 'Endlessly Extensible',
    description:
      'Last.fm and Discord Rich Presence integration, CSS snippets, community plugins, themes, and more settings than you\'ll know what to do with. A Marketplace and open ecosystem that makes Cider entirely yours.',
    icon: 'diagram-venn',
  },
  {
    title: 'And Much More',
    description:
      'Cider Remote, local playback, lyrics support, library management, and a steady stream of new features. We\u2019re just getting started.',
    icon: 'circle-plus',
  },
]

const testimonialRows = [
  [
    {
      author: 'Kai',
      position: 'Proud Cider User',
      quote:
        'After making the switch to Apple Music mid-2022, a Windows music client was all I needed to solidify the switch. Cider brings that and more to the table, with integrations for Last.fm, Spotify, and Discord, making it THE definitive music client for chronically online peeps.',
    },
    {
      author: 'Bjorn',
      position: 'Apple Enthusiast',
      quote:
        "I'm a huge believer in trying a product before paying for it. I have to say, this is 100% worth $3.99 to play Apple Music. This does exactly what you need, is extremely smooth and not full of bloatware. Recommend this for anyone who is sick of iTunes, but loves Apple Music on their iPhone.",
    },
    {
      author: 'Daniel',
      position: 'Cider User',
      quote:
        'The only real drawback to Apple Music for me was the lack of a decent app for Windows. This seems to be a godsend for Window users. About 3 minutes into the trial period I knew this was the solution I was hoping for.',
    },
    {
      author: 'Filler Generated Testimonial',
      position: 'Music Lover',
      quote:
        'Switched from Spotify to Apple Music and was dreading the desktop experience. Cider made that worry disappear overnight. Clean, fast, and genuinely enjoyable to use every day.',
    },
    {
      author: 'Filler Generated Testimonial',
      position: 'Audio Nerd',
      quote:
        'The Adrenaline Processor alone makes Cider worth it. Pair that with the equalizer and spatial audio and you have something that sounds better than any other desktop player I have tried.',
    },
    {
      author: 'Filler Generated Testimonial',
      position: 'Crossfade Fan',
      quote:
        'Crossfade and Automix make my playlists feel like a DJ set. I genuinely cannot go back to listening to music with gaps between tracks anymore.',
    },
  ],
  [
    {
      author: 'SoNothing',
      position: 'UI Enthusiast (aka Nit-picker)',
      quote:
        'Cider completely changes the game for the desktop Apple Music experience. Gone are the blindingly ugly light mode of iTunes and the awful performance on official clients, replaced by an <b>absolute</b> beauty that zips around like a supercar. I for one welcome our new music overlords.',
    },
    {
      author: 'RylanFM',
      position: 'New Cider Enthusiast',
      quote:
        "I was a bit skeptical having never even heard of Cider until the afternoon I got it. A couple weeks in and I can confidently say that this is one of the best purchases I have ever made. The UI is so clean and intuitive. I have a vertical monitor and immersive mode looks amazing. Everyone in the Discord server was so kind and helped me get it set up in just a few minutes. I highly recommend giving Cider a try!",
    },
    {
      author: 'Filler Generated Testimonial',
      position: 'Power User',
      quote:
        'Between the marketplace plugins, CSS theming, and Discord Rich Presence, Cider feels like a platform, not just a player. I have spent way too many hours customizing it and I regret nothing.',
    },
    {
      author: 'Filler Generated Testimonial',
      position: 'Linux Enthusiast',
      quote:
        'Finally a music player on Linux that does not feel like an afterthought. Cider runs beautifully, the UI is gorgeous, and having Last.fm scrobbling built in is the cherry on top.',
    },
    {
      author: 'Filler Generated Testimonial',
      position: 'Longtime Supporter',
      quote:
        'Been using Cider since v1 and the progress has been unreal. The team listens to the community, ships fast, and every update makes the app noticeably better.',
    },
    {
      author: 'Filler Generated Testimonial',
      position: 'Remote User',
      quote:
        'Cider Remote is a game changer. I control my music from my phone while working and it just works. No lag, no fuss. Exactly what I needed.',
    },
  ],
]
</script>

<template>
  <main class="home">
    <section class="hero">
      <AmbientOrbs />
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="hero-line">Listening to music</span>
          <span class="hero-line hero-line--accent">Redefined</span>
        </h1>
        <p class="hero-subtitle">
          Cider is a cross-platform Apple Music experience built on Vue.js and written from the
          ground up with performance in mind.
        </p>
        <div class="hero-actions">
          <a href="/products/cider" class="btn btn-primary">Get Cider</a>
          <a href="/learn-more" class="btn btn-ghost" aria-label="Learn more about Cider">Learn More</a>
        </div>
      </div>
    </section>

    <section class="showcase">
      <ShowcaseCarousel />
    </section>

    <section class="tech-stack">
      <p class="tech-stack-label">Built with amazing frameworks and libraries</p>
      <div class="tech-stack-icons">
        <div v-for="tech in techStack" :key="tech.name" class="tech-item" :title="tech.name">
          <NIcon :name="tech.icon" :size="tech.size" />
        </div>
      </div>
    </section>

    <section class="features-intro">
      <div class="section-inner">
        <span class="section-eyebrow">Why Cider</span>
        <h2 class="section-title">Built for the Modern Music Lover</h2>
        <p class="section-subtitle">
          A powerful music player that lets you listen to your favorite tracks with style. Modern
          design, intuitive interface, zero distractions.
        </p>
      </div>
    </section>

    <section class="features">
      <div class="features-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <div class="feature-icon">
            <NIcon :name="feature.icon" :size="22" />
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section class="testimonials">
      <div class="section-inner">
        <span class="section-eyebrow">Testimonials</span>
        <h2 class="section-title">Don't just take our word for it</h2>
        <p class="section-subtitle">
          Hear from the people who use Cider every day.
        </p>
      </div>
      <div class="marquee-wrap">
        <div
          v-for="(row, i) in testimonialRows"
          :key="i"
          class="marquee-row"
          :class="'marquee-row--' + i"
        >
          <div class="marquee-track">
            <template v-for="copy in 3" :key="copy">
              <blockquote
                v-for="(t, j) in row"
                :key="copy + '-' + j"
                class="testimonial-card"
                :aria-hidden="copy > 1 || undefined"
              >
                <p class="testimonial-quote" v-html="'&ldquo;' + t.quote + '&rdquo;'" />
                <footer class="testimonial-footer">
                  <span class="testimonial-author">{{ t.author }}</span>
                  <span class="testimonial-position">{{ t.position }}</span>
                </footer>
              </blockquote>
            </template>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-inner">
        <h2 class="cta-title">Ready to switch?</h2>
        <p class="cta-subtitle">
          Join thousands of music lovers who have already made Cider their daily driver.
        </p>
        <div class="hero-actions">
          <a href="/products/cider" class="btn btn-primary" aria-label="Download Cider">Download Cider</a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  padding-top: var(--navbar-height);
}

.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 64px;
  text-align: center;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 720px;
}

.hero-title {
  display: flex;
  flex-direction: column;
  font-size: clamp(42px, 7vw, 76px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.035em;
  margin-bottom: 24px;
}

.hero-line--accent {
  background: linear-gradient(135deg, var(--color-accent), #f0a0aa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: clamp(16px, 2vw, 19px);
  font-weight: 400;
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 540px;
  margin: 0 auto 40px;
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

.showcase {
  padding: 48px 24px;
}

.tech-stack {
  padding: 0 24px 48px;
  text-align: center;
}

.tech-stack-label {
  font-size: 13px;
  color: var(--color-text-tertiary);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.tech-stack-icons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.tech-item {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  opacity: 0.7;
  transition: opacity 0.2s;
}

.tech-item:hover {
  opacity: 1;
}

.features-intro {
  padding: 48px 24px;
  text-align: center;
}

.section-inner {
  max-width: 600px;
  margin: 0 auto;
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

.features {
  padding: 48px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  position: relative;
  padding: 28px 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition:
    background 0.2s,
    border-color 0.2s;
}

.feature-card:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-border-hover);
}

.feature-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
  z-index: 1;
}

.feature-icon::before {
  content: '';
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(180, 40, 50, 0.5) 0%, transparent 70%);
  filter: blur(16px);
  z-index: -1;
  opacity: 0.4;
  transform: scale(0.8);
  transition:
    opacity 0.4s ease,
    transform 0.4s var(--ease-out-expo),
    filter 0.4s ease;
}

.feature-card:hover .feature-icon::before {
  opacity: 1;
  transform: scale(1.4);
  filter: blur(22px);
}

.feature-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

.feature-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.testimonials {
  padding: 48px 0;
  text-align: center;
}

.testimonials .section-inner {
  padding: 0 24px;
  margin-bottom: 40px;
}

.marquee-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}

.marquee-row {
  overflow: hidden;
}

.marquee-track {
  display: flex;
  align-items: start;
  gap: 16px;
  width: max-content;
  animation: marquee-scroll 60s linear infinite;
}

.marquee-row--1 .marquee-track {
  animation-duration: 75s;
}

.marquee-row:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}

.testimonial-card {
  flex-shrink: 0;
  width: 380px;
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  text-align: left;
  transition:
    background 0.2s,
    border-color 0.2s;
}

.testimonial-card:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-border-hover);
}

.testimonial-quote {
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.testimonial-footer {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.testimonial-author {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.testimonial-position {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

@media (max-width: 560px) {
  .testimonial-card {
    width: 300px;
  }
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
