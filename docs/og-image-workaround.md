# OG Image Build Workaround

## Issue

The `nuxt-og-image@4.2.0` module (bundled with `@nuxtjs/seo@2.0.3`) has a bug where it imports from:
```
unenv/dist/runtime/runtime/mock/empty.mjs
```

But the actual file is at:
```
unenv/dist/runtime/mock/empty.mjs
```

This causes build failures during the Nitro prerender phase.

## Workaround

Create a symlink before building:

```bash
mkdir -p node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/runtime
ln -s ../mock node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/runtime/mock
```

## Automated Solution

Add to `package.json`:

```json
{
  "scripts": {
    "postinstall": "mkdir -p node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/runtime && ln -sf ../mock node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/runtime/mock || true"
  }
}
```

The `|| true` ensures the script doesn't fail if the symlink already exists.

## Permanent Solution

Wait for one of these:
1. nuxt-og-image upgrades to a newer unenv version that fixes the path
2. @nuxtjs/seo updates to a newer nuxt-og-image version
3. The project upgrades Nuxt to v4+ which may resolve the dependency conflict

## Testing

Verify the symlink works:
```bash
ls -la node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/runtime/mock
# Should show: mock -> ../mock
```

Build should now complete:
```bash
pnpm run build
```
