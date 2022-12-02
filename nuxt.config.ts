// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['animate.css/animate.min.css'],
  typescript: {
    shim: false
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    head: { 
      title: "Cider Collective",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ]
    } 
  },
});