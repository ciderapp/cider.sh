<div align="center">
<picture>
    <img src="./public/icon.png" width="128px">
</picture>
</div>
<h1 align="center">
Cider Website
</h1>

This repository contains the source code for the Cider Website. This website outlines our app and all the details surrounding it.

Cider's website is built with [Nuxt](https://nuxt.com/) (Vue.js), [Radix-Vue](https://www.radix-vue.com/), and [Tailwind CSS](https://tailwindcss.com/).

If you are interested in contributing to this project, please read the [Contributing Guidelines](./CONTRIBUTING.md).

## Cloudflare Pages

Production builds must use `https://cider.sh` as the canonical host for sitemap, robots, and Open Graph URLs. Set this environment variable on the **production** Cloudflare Pages project:

```
NUXT_SITE_URL=https://cider.sh
```

Do not use `CF_PAGES_URL` for production SEO. That variable is the per-deploy `*.pages.dev` URL and will make Google Search Console (property `cider.sh`) discover 0 pages. The Nuxt config already falls back to `https://cider.sh` if `NUXT_SITE_URL` is unset.
