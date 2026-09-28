/**
 * Cloudflare Pages 308-redirects trailing slashes on prerendered HTML files
 * because nitro.prerender.autoSubfolderIndex is false (about.html, not
 * about/index.html). ISR routes such as /changelogs/<version> are served by
 * the worker instead, so they need the same redirect here.
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  const { pathname, search } = url;

  if (pathname === "/" || !pathname.endsWith("/")) return;

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_nuxt/") ||
    pathname.startsWith("/__") ||
    pathname.includes(".")
  ) {
    return;
  }

  return sendRedirect(event, `${pathname.replace(/\/+$/, "")}${search}`, 308);
});
