<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from '@booploops/pod-router'
import NIcon from './NIcon.vue'
import MenuToggle from './MenuToggle.vue'

const route = useRoute()
const productsOpen = ref(false)
const searchFocused = ref(false)
const mobileMenuOpen = ref(false)
let closeTimeout: ReturnType<typeof setTimeout> | null = null

function openProducts() {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  productsOpen.value = true
}

function scheduleCloseProducts() {
  closeTimeout = setTimeout(() => {
    productsOpen.value = false
  }, 150)
}

function handleSearchShortcut(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    const input = document.querySelector<HTMLInputElement>('.search-bar input')
    input?.focus()
  }
}

onMounted(() => window.addEventListener('keydown', handleSearchShortcut))
onUnmounted(() => window.removeEventListener('keydown', handleSearchShortcut))

function navigateAndClose(path: string) {
  route.navigate(path)
  productsOpen.value = false
  mobileMenuOpen.value = false
}

function mobileNavigate(path: string) {
  route.navigate(path)
  mobileMenuOpen.value = false
}

const navLinks = [
  { label: 'Changelog', path: '/changelog' },
  { label: 'Documentation', path: '/docs' },
  { label: 'Marketplace', path: 'https://marketplace.cider.sh', external: true },
  { label: 'Taproom', path: 'https://taproom.cider.sh', external: true },
]
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner">
      <div class="navbar-left">
        <a class="cc" href="/" @click.prevent="route.navigate('/')">
          <img src="/images/cider-collective.jpg" alt="Cider Collective" class="cc-logo" />
          <span class="cc-text">Cider Collective</span>
        </a>
      </div>

      <nav class="navbar-center">
        <div
          class="nav-item has-dropdown"
          @mouseenter="openProducts"
          @mouseleave="scheduleCloseProducts"
        >
          <button class="nav-link" :class="{ active: productsOpen }">
            Products
            <NIcon name="chevron-down" :size="10" class="chevron" />
          </button>
          <Transition name="dropdown">
            <div
              v-if="productsOpen"
              class="dropdown"
              @mouseenter="openProducts"
              @mouseleave="scheduleCloseProducts"
            >
              <a
                class="dropdown-item"
                href="/products/cider"
                @click.prevent="navigateAndClose('/products/cider')"
              >
                <div class="dropdown-item-title">Cider Client</div>
                <div class="dropdown-item-desc">Available for Windows, macOS, and Linux!</div>
              </a>
              <a
                class="dropdown-item"
                href="/products/remote"
                @click.prevent="navigateAndClose('/products/remote')"
              >
                <div class="dropdown-item-title">Cider Remote</div>
                <div class="dropdown-item-desc">Easily control your music from your phone or tablet.</div>
              </a>
            </div>
          </Transition>
        </div>

        <a
          v-for="link in navLinks"
          :key="link.path"
          class="nav-link"
          :href="link.path"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          @click="link.external ? undefined : ($event.preventDefault(), route.navigate(link.path))"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="navbar-right">
        <div class="search-bar" :class="{ focused: searchFocused }">
          <NIcon name="search" :size="14" class="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            @focus="searchFocused = true"
            @blur="searchFocused = false"
          />
          <kbd class="search-kbd">Ctrl K</kbd>
        </div>

        <div class="social-links">
          <a href="#" target="_blank" rel="noopener" aria-label="GitHub" class="social-btn">
            <NIcon name="github" :size="18" />
          </a>
          <a href="#" target="_blank" rel="noopener" aria-label="X (Twitter)" class="social-btn">
            <NIcon name="x" :size="15" />
          </a>
          <a href="#" target="_blank" rel="noopener" aria-label="Discord" class="social-btn">
            <NIcon name="discord" :size="18" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener"
            aria-label="Open Collective"
            class="social-btn"
          >
            <NIcon name="openCollective" :size="18" />
          </a>
        </div>

        <button
          class="mobile-menu-btn"
          aria-label="Toggle menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <MenuToggle :open="mobileMenuOpen" />
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <div class="mobile-menu-section">
          <span class="mobile-menu-label">Products</span>
          <a
            class="mobile-menu-link"
            href="/products/cider"
            @click.prevent="mobileNavigate('/products/cider')"
          >
            Cider Client
          </a>
          <a
            class="mobile-menu-link"
            href="/products/remote"
            @click.prevent="mobileNavigate('/products/remote')"
          >
            Cider Remote
          </a>
        </div>
        <div class="mobile-menu-section">
          <a
            v-for="link in navLinks"
            :key="link.path"
            class="mobile-menu-link"
            :href="link.path"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            @click="link.external ? undefined : ($event.preventDefault(), mobileNavigate(link.path))"
          >
            {{ link.label }}
          </a>
        </div>
        <div class="mobile-menu-section mobile-socials">
          <a href="#" target="_blank" rel="noopener" aria-label="GitHub" class="social-btn">
            <NIcon name="github" :size="18" />
          </a>
          <a href="#" target="_blank" rel="noopener" aria-label="X (Twitter)" class="social-btn">
            <NIcon name="x" :size="15" />
          </a>
          <a href="#" target="_blank" rel="noopener" aria-label="Discord" class="social-btn">
            <NIcon name="discord" :size="18" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener"
            aria-label="Open Collective"
            class="social-btn"
          >
            <NIcon name="openCollective" :size="18" />
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  background: rgba(5, 5, 5, 0.7);
  border-bottom: none;
}

.navbar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  z-index: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    color-mix(in srgb, var(--color-accent) 20%, transparent) 15%,
    color-mix(in srgb, var(--color-accent) 70%, transparent) 35%,
    color-mix(in srgb, var(--color-accent) 40%, transparent) 50%,
    color-mix(in srgb, var(--color-accent) 70%, transparent) 65%,
    color-mix(in srgb, var(--color-accent) 20%, transparent) 85%,
    transparent 100%
  );
  opacity: 0.75;
  pointer-events: none;
}

.navbar-inner {
  display: flex;
  align-items: center;
  height: var(--navbar-height);
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
  gap: 24px;
}

.navbar-left {
  flex-shrink: 0;
}

.cc {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cc-logo {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  object-fit: cover;
}

.cc-text {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.navbar-center {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 1;
  justify-content: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  font-size: 13.5px;
  font-weight: 450;
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  transition:
    color 0.15s,
    background 0.15s;
  white-space: nowrap;
  user-select: none;
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-text-primary);
  background: var(--color-surface-hover);
}

.chevron {
  transition: transform 0.2s var(--ease-out-expo);
  margin-top: 1px;
}

.nav-item.has-dropdown:hover .chevron,
.nav-link.active .chevron {
  transform: rotate(180deg);
}

.nav-item {
  position: relative;
  z-index: 1;
}

.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 280px;
  padding: 6px;
  background: color-mix(in srgb, transparent, rgb(20 20 20) 85%);
  border: none;
  border-radius: var(--radius-md);
  box-shadow:
    inset 0 0 0 1px rgb(255 255 255 / 10%),
    rgba(0, 0, 0, 0.05) 0px 1px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(255, 255, 255, 0.1) 0px -0.5px 0px 0px inset,
    0 16px 48px rgba(0, 0, 0, 0.5);
}

.dropdown::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
      90deg,
      transparent 0%,
      color-mix(in srgb, transparent, rgb(255 255 255 / 40%) 70%) 40%,
      color-mix(in srgb, transparent, var(--color-accent) 9%) 100%
    ),
    linear-gradient(
      180deg,
      color-mix(in srgb, transparent, var(--color-accent) 12%) 50%,
      color-mix(in srgb, transparent, rgb(255 255 255 / 40%) 70%) 70%
    );
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  opacity: 0.75;
  pointer-events: none;
}

.dropdown-item {
  display: block;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  transition: background 0.12s;
}

.dropdown-item:hover {
  background: var(--color-surface-hover);
}

.dropdown-item-title {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.dropdown-item-desc {
  font-size: 12px;
  color: var(--color-text-tertiary);
  margin-top: 1px;
}

.dropdown-enter-active {
  transition: all 0.18s var(--ease-out-expo);
}
.dropdown-leave-active {
  transition: all 0.12s ease-in;
}
.dropdown-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-6px) scale(0.97);
}
.dropdown-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 10px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition:
    border-color 0.2s,
    background 0.2s;
  min-width: 180px;
}

.search-bar.focused {
  border-color: var(--color-border-hover);
  background: var(--color-surface-hover);
}

.search-icon {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}

.search-bar input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--color-text-primary);
  font-size: 13px;
  font-family: var(--font-sans);
  min-width: 0;
}

.search-bar input::placeholder {
  color: var(--color-text-tertiary);
}

.search-kbd {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 11px;
  font-family: var(--font-sans);
  font-weight: 500;
  color: var(--color-text-tertiary);
  background: rgba(255, 255, 255, 0.06);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  white-space: nowrap;
  pointer-events: none;
  line-height: 1.4;
}

.social-links {
  display: flex;
  align-items: center;
  gap: 2px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  color: var(--color-text-tertiary);
  transition:
    color 0.15s,
    background 0.15s;
}

.social-btn:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-hover);
}

.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  transition:
    color 0.15s,
    background 0.15s;
}

.mobile-menu-btn:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-hover);
}

/* Mobile menu panel */

.mobile-menu {
  padding: 12px 24px 20px;
  border-top: 1px solid var(--color-border);
  background: rgba(5, 5, 5, 0.95);
  backdrop-filter: blur(32px) saturate(180%);
  -webkit-backdrop-filter: blur(32px) saturate(180%);
}

.mobile-menu-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 0;
}

.mobile-menu-section + .mobile-menu-section {
  border-top: 1px solid var(--color-border);
}

.mobile-menu-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-tertiary);
  padding: 4px 8px;
}

.mobile-menu-link {
  padding: 8px 8px;
  font-size: 14px;
  font-weight: 450;
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  transition:
    color 0.15s,
    background 0.15s;
}

.mobile-menu-link:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-hover);
}

.mobile-socials {
  flex-direction: row;
  gap: 4px;
}

.mobile-menu-enter-active {
  transition: all 0.2s var(--ease-out-expo);
}
.mobile-menu-leave-active {
  transition: all 0.15s ease-in;
}
.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 900px) {
  .search-bar {
    min-width: 140px;
  }

  .search-kbd {
    display: none;
  }
}

@media (max-width: 768px) {
  .navbar-center {
    display: none;
  }

  .navbar-right .social-links {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .navbar-inner {
    justify-content: space-between;
  }
}
</style>
