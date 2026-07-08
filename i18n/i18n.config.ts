// Vue I18n configuration, auto-detected by @nuxtjs/i18n from the i18n dir.
// Without an explicit fallback, vue-i18n's default is `fallbackLocale: false`,
// so any locale whose file is empty or only partially translated renders raw
// keys (e.g. "hero.title") instead of text. Falling back to the default locale
// (`en`, the only fully-populated file) fills those gaps with English.
export default defineI18nConfig(() => ({
  fallbackLocale: "en",
}));
