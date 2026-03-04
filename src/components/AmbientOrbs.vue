<script setup lang="ts"></script>

<template>
  <div class="orbs" aria-hidden="true">
    <div class="orb orb-1" />
    <div class="orb orb-2" />
    <div class="orb orb-3" />
  </div>
</template>

<style scoped>
.orbs {
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px;
  height: 700px;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 70%);
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  will-change: transform;
  opacity: 0.35;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: var(--color-accent);
  top: 5%;
  left: 15%;
  animation: drift-1 18s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: #6366f1;
  top: 10%;
  right: 10%;
  animation: drift-2 22s ease-in-out infinite;
}

.orb-3 {
  width: 350px;
  height: 350px;
  background: #f0a0aa;
  top: 25%;
  left: 45%;
  animation: drift-3 20s ease-in-out infinite;
}

@keyframes drift-1 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(40px, 30px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 60px) scale(0.95);
  }
  75% {
    transform: translate(30px, -20px) scale(1.02);
  }
}

@keyframes drift-2 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(-50px, 40px) scale(0.97);
  }
  50% {
    transform: translate(30px, -30px) scale(1.06);
  }
  75% {
    transform: translate(-20px, -50px) scale(0.98);
  }
}

@keyframes drift-3 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(60px, -40px) scale(1.04);
  }
  50% {
    transform: translate(-40px, -20px) scale(0.96);
  }
  75% {
    transform: translate(20px, 50px) scale(1.03);
  }
}

@media (max-width: 768px) {
  .orb-1 {
    width: 300px;
    height: 300px;
  }
  .orb-2 {
    width: 250px;
    height: 250px;
  }
  .orb-3 {
    width: 200px;
    height: 200px;
  }
}
</style>
