import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  ssr: true,

  experimental: {
    viewTransition: true,
  },

  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },

  devtools: { enabled: true, timeline: { enabled: true } },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxt/image",
    // "@nuxt/fonts",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
    "nuxt-swiper",
    "radix-vue/nuxt",
    "@vueuse/motion/nuxt",
    "@nuxtjs/i18n",
    // Override the Tailwind PostCSS plugin to point directly at tailwind.config.js
    // instead of the generated .nuxt/tailwind/postcss.mjs, which uses import.meta
    // and breaks when jiti loads it in a non-module context.
    (_options, nuxt) => {
      nuxt.hook("modules:done", () => {
        const postcssPlugins = nuxt.options.postcss?.plugins as Record<string, unknown> | undefined;
        if (
          postcssPlugins?.tailwindcss &&
          typeof postcssPlugins.tailwindcss === "string" &&
          (postcssPlugins.tailwindcss as string).includes(".nuxt/tailwind/postcss.mjs")
        ) {
          postcssPlugins.tailwindcss = path.join(nuxt.options.rootDir, "tailwind.config.js");
        }
      });
    },
  ],

  i18n: {
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'es', file: 'es.json', name: 'Español' },
      { code: 'fr', file: 'fr.json', name: 'Français' },
      { code: 'de', file: 'de.json', name: 'Deutsch' },
      { code: 'ja', file: 'ja.json', name: '日本語' },
      { code: 'ko', file: 'ko.json', name: '한국어' },
      { code: 'zh', file: 'zh.json', name: '中文' },
      { code: 'ru', file: 'ru.json', name: 'Русский' },
      { code: 'it', file: 'it.json', name: 'Italiano' },
      { code: 'tr', file: 'tr.json', name: 'Türkçe' },
      { code: 'pl', file: 'pl.json', name: 'Polski' },
      { code: 'nl', file: 'nl.json', name: 'Nederlands' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default'
  },

  content: {
    ignores: ["/changelogs/images", "\\.html$", "CNAME"],
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
    navigation: { fields: ["icon"] },
    markdown: {
      toc: { depth: 5, searchDepth: 4 },
      anchorLinks: { depth: 3 },
      // https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
      remarkPlugins: [
        "remark-gfm",
        "remark-code-blocks"
      ],
    },
    sources: {
      
    },
  },



  routeRules: {
    "/": { prerender: true },
    "/downloads": { redirect: "/downloads/client" },
    "/downloads/client": { prerender: true },
    "/changelogs": { prerender: true },
    "/changelogs/**": { isr: 60 },
    "/downloads/remote": { prerender: true },
    "/remote": { redirect: "/downloads/remote" },
    "/marketplace": { redirect: "https://marketplace.cider.sh" },
    "/taproom": { redirect: "https://taproom.cider.sh" },
    "/o": { redirect: "/api/v1/open" },
    "/p": { redirect: "/api/v1/play" },
  },

  css: ["~/assets/css/styles.scss"],

  tailwindcss: {
    exposeConfig: false,
    editorSupport: true,
    viewer: false,
  },

  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "dark",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    storageKey: "nuxt-color-mode",
  },

  runtimeConfig: {
    public: {
      riseApiUrl: process.env.RISE_API_URL || 'https://rise.cider.sh',
    },
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

  compatibilityDate: "2024-11-01",
});
