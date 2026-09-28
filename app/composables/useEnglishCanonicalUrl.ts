/**
 * Canonical and og:url for the current page.
 *
 * Locale-prefixed routes (for example /es/about) currently fall back to English
 * copy, so they must canonical to the unprefixed English URL. Query strings and
 * trailing slashes are stripped.
 */
export function useEnglishCanonicalUrl() {
  const site = useSiteConfig();
  const route = useRoute();
  const switchLocalePath = useSwitchLocalePath();

  const canonicalUrl = computed(() => {
    const origin = String(site.url || "https://cider.sh").replace(/\/+$/, "");
    const localized = switchLocalePath("en") || route.path;
    const pathOnly = String(localized).split("#")[0].split("?")[0];
    const path = pathOnly.replace(/\/+$/, "") || "/";
    return path === "/" ? origin : `${origin}${path}`;
  });

  return { canonicalUrl };
}
