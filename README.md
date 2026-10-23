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

## Changelogs

Release notes are markdown files in [`ciderapp/Cider-2`](https://github.com/ciderapp/Cider-2/tree/main/changelogs). [Rise](https://rise.cider.sh) copies those files into its database on process start or when something calls `POST /api/v1/changelogs/refresh`. This site then reads Rise (`/api/changelogs/list`, `/latest`, `/:version`).

`/changelogs` and `/changelogs/**` are not prerendered. They use Nitro SWR (60 seconds) so new Rise entries show up without a Cloudflare Pages rebuild. Marketing pages stay prerendered; the header release strip refetches after hydration.

The `Refresh changelogs` GitHub Action runs hourly (and on `workflow_dispatch` / `repository_dispatch` type `changelog-updated`) and calls `scripts/refresh-changelogs.mjs`.

Optional repository secrets and variables:

```
RISE_API_URL                  # variable, defaults to https://rise.cider.sh
RISE_MANAGEMENT_KEY           # secret, Bearer token if Rise starts requiring auth on /refresh
CLOUDFLARE_PAGES_DEPLOY_HOOK  # secret, only if you also want a scheduled Pages rebuild
```

A deploy hook is not required for the list or version pages to update. Add one only if you want prerendered OG images or other build-time output refreshed on the same schedule.

To notify this repo from Cider-2 when a changelog file lands, send a `repository_dispatch` event with type `changelog-updated`.
