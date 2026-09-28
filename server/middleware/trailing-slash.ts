/**
 * Cloudflare Pages 308-redirects trailing slashes on prerendered HTML files
 * because nitro.prerender.autoSubfolderIndex is false (about.html, not
 * about/index.html). ISR routes such as /changelogs/<version> are served by
 * the worker instead, so they need the same redirect here.
 *
 * Do not treat every "." as a file. Changelog versions like 4.0.27 contain dots.
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  const { pathname, search } = url;

  if (pathname === "/" || !pathname.endsWith("/")) return;

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_nuxt/") ||
    pathname.startsWith("/__")
  ) {
    return;
  }

  const withoutSlash = pathname.replace(/\/+$/, "");
  // Skip real static files (/foo.png/), not dotted version segments (/4.0.27/).
  if (/\.[a-zA-Z][a-zA-Z0-9]{1,4}$/.test(withoutSlash)) {
    return;
  }

  return sendRedirect(event, `${withoutSlash}${search}`, 308);
});
