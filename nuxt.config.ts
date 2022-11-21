// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['animate.css/animate.min.css'],
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
});
