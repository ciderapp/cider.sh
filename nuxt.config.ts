// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  devtools: { enabled: true, timeline: { enabled: true } },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@vee-validate/nuxt",
    "@morev/vue-transitions/nuxt",
    "@nuxt/content",
    "nuxt-swiper",
    "@nuxt/image",
  ],
  content: {
    ignores: ["/1.client-releases/images", "\\.html$", "CNAME"],
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "github-light",
        // Theme used if `html.dark`
        dark: "github-dark",
        // Theme used if `html.sepia`
        sepia: "monokai",
      },
    },
    experimental: {
      search: {
        options: {
          fields: ["title", "content", "titles"],
          storeFields: ["title", "content", "titles"],
          searchOptions: {
            prefix: true,
            fuzzy: 0.2,
            boost: {
              title: 4,
              content: 2,
              titles: 1,
            },
          },
        },
      },
    },
    navigation: { fields: ["icon", "releaseNo", "tags"] },
    markdown: {
      toc: { depth: 5, searchDepth: 4 },
      anchorLinks: { depth: 3 },
    },
    sources: {
      documentation: {
        prefix: "/docs",
        driver: "github",
        repo: "ciderapp/cider-docs",
        branch: "nuxt",
        dir: "/",
      },
      changelogs: {
        prefix: "/changelogs",
        driver: "github",
        repo: "ciderapp/changes",
        branch: "main",
        dir: "/",
      },
    },
  },
  routeRules: {
    "/": { prerender: true },
    "/downloads": { redirect: "/downloads/client" },
    "/downloads/client": { prerender: true },
    "/changelogs": { prerender: true },
    "/changelogs/**": { isr: 60 },
    "/docs": { redirect: "/docs/other/rpc" },
    "/docs/**": { isr: 60 },
    "/downloads/remote": { prerender: true },
    "/marketplace": { redirect: "https://marketplace.cider.sh" },
    "/o": { redirect: "/api/v1/open" },
    "/p": { redirect: "/api/v1/play" },
  },
  css: ["~/assets/css/styles.scss"],

  tailwindcss: {
    exposeConfig: true,
  },

  colorMode: {
    preference: "dark",
    fallback: "dark",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },

  typescript: {
    shim: false,
  },

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
    ],
  },
});