<template>
  <div class="navbar">
    <NuxtLink to="/">
      <img class="mainlogo" src="~/assets/cider.png" />
    </NuxtLink>
    <div class="navlinks">
      <NuxtLink to="/cider" :class="{active: $route.path === '/cider'}">Cider</NuxtLink>
      <NuxtLink to="/connect" :class="{active: $route.path === '/connect'}">Connect</NuxtLink>
      <NuxtLink to="/cider2" :class="{active: $route.path === '/cider2'}">Cider 2</NuxtLink>
    </div>
  </div>
  <div class="page">
    <NuxtPage />
  </div>
  <div class="footer">
    <div class="footer-cont">
      <div>Made with 💖 by Cider Collective</div>
      <div class="flex gap">
        <a href="https://github.com/ciderapp/">Github</a>
        <a href="https://docs.cider.sh/">Docs</a>
        <a href="https://opencollective.com/ciderapp">Donate</a>
        <NuxtLink to="/cider/faq">FAQ</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  }
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

$primary-color: #161616;
$secondary-color: #ff2654;
$text-color: #dcdcdc;
$footer-text-color: rgb(174, 174, 174);

.active {
  color: white;
}

.navbar {
  height: 60px;
  width: 100vw;
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
        text-decoration: underline #ff2654;
        text-decoration-style: wavy;
        text-underline-offset: 10px;
      }
    }
  }
}

body, html {
  max-width: 100%;
  overflow-x: hidden;
}

body {
  background-color: $primary-color;
  margin: 0;
  font-family: 'Lato', sans-serif;
  text-rendering: optimizeLegibility;
  color: $text-color;
}

div {
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: $footer-text-color;
}

.page {
  min-height: calc(100vh - 60px);
}

.footer {
  padding: 3rem 0;
  width: 100%;
  font-size: 0.875rem;
  color: $footer-text-color;
}

.footer-cont {
  width: 100%;
  box-sizing: border-box;
  padding: 0 60px;
  display: flex;
  text-align: center;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.fullheight {
  height: 100%;
  min-height: 100%;
}

.gap {
  gap: 1rem;
}

.flex {
  display: flex;
}

.center {
  align-items: center;
}

.middle {
  justify-content: center;
}

.column {
  flex-direction: column;
}

.padding {
  padding: 120px 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.ui-button {
  padding: 1rem;
  width: fit-content;
  border-radius: 5rem;
  border: 0.0625rem solid #fff;
  transition: all 0.2s ease-in-out;
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

@media only screen and (max-width: 768px) {
  .description {
    width: 90%;
  }

  .navbar {
    padding: 0 20px;
  }

  .footer-cont {
    flex-wrap: wrap;
    justify-content: center;
    div {
      padding: 0.5rem 0;
    }
  }
}
</style>
