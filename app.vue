<template>
  <div class="page">
    <NuxtPage />
  </div>
  <div class="footer">
    <div class="footer-cont">
      <div>Made with 💖 by Cider Collective</div>
      <div class="flex gap">
        <a href="https://github.com/ciderapp/Cider">Github</a>
        <a href="https://docs.cider.sh/">Docs</a>
        <a href="https://opencollective.com/ciderapp">Donate</a>
        <NuxtLink to="/cider/faq">FAQ</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$primary-color: #161616;
$text-color: #DCDCDC;
$footer-text-color: rgb(174, 174, 174);

body {
  background-color: $primary-color;
  margin: 0;
  font-family: "Inter", sans-serif;
  text-rendering: optimizeLegibility;
  color: $text-color;
}

a {
  text-decoration: none;
  color: $footer-text-color;
}

.page {
  min-height: 100vh;
}

.footer {
  padding: 3rem 0;
  width: 100%;
  font-size: 0.875rem;
  color: $footer-text-color;
}

.footer-cont {
  width: 70rem;
  margin: 0 auto;
  display: flex;
  text-align: center;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.gap {
  gap: 1rem;
}

.flex {
    display: flex;
}

.center {
    justify-content: center;
    align-items: center;
}

.column {
    flex-direction: column;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}



</style>