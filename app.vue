<template>
  <div class="navbar">
    <NuxtLink to="/">
      <img class="mainlogo" src="~/assets/cider.png" />
    </NuxtLink>
    <div class="navlinks">
      <NuxtLink to="/cider">Cider</NuxtLink>
      <a to="/connect">Connect</a>
      <a to="/cider2">Cider 2</a>
    </div>
  </div>
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
$secondary-color: #FF2654;
$text-color: #DCDCDC;
$footer-text-color: rgb(174, 174, 174);

.navbar {
  height: 60px;
  width: calc(100vw - 120px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  top: 0;
  left: 0;
  z-index: 100;
  .mainlogo {
    width: 50px;
    height: 50px;
    margin-left: 10px;
  }
  .navlinks {
    display: flex;
    gap: 40px;

    a {
      transition: color 0.2s ease;
      &:hover {
        cursor: pointer;
        color: #fff;
        text-decoration: underline #FF2654;
        text-decoration-style: wavy;
        text-underline-offset: 10px;
      }
    }
  }
}

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
  padding-top: 70px;
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

.fullheight {
  height: calc(100vh - (70px + 60px + 100px));
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

.ui-button {
  padding: 1rem;
  width: fit-content;
  border-radius: 5rem;
  border:  .0625rem solid #fff;
  transition: all .2s ease-in-out;
  font-weight: 700;
  text-align: center;
  font-size: 1.125rem;
  background-color: #fff;
}

.ui-button:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.title {
  font-size: 2.75rem;
  line-height: 1.2;
  font-weight: 700;
  margin: 20px 0;
}

.description {
  font-size: 1.4375rem;
  line-height: 1.5;
  font-weight: 400;
  width: calc((4rem * 6) + (2rem * 5));
  text-align: center;
  margin-bottom: 1.75rem;
}

</style>