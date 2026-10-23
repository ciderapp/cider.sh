/**
 * How long changelog HTML and Rise proxy responses may stay stale.
 * ISR (`isr: 60`) only revalidates on Vercel/Netlify. Cloudflare Pages needs
 * Nitro SWR plus an explicit ban on prerendering these routes, otherwise the
 * build writes static HTML that never picks up new Rise entries.
 */
export const CHANGELOG_SWR_SECONDS = 60;

export const RISE_PROXY_STALE_SECONDS = CHANGELOG_SWR_SECONDS * 10;

export const changelogRouteRules = {
  "/changelogs": {
    swr: CHANGELOG_SWR_SECONDS,
    prerender: false,
  },
  "/changelogs/**": {
    swr: CHANGELOG_SWR_SECONDS,
    prerender: false,
  },
} as const;

export const changelogPrerenderIgnore = ["/changelogs", "/changelogs/**"] as const;
