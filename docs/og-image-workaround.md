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

## Current Solution

### Automated (Preferred)

The project includes a robust postinstall script that automatically handles this:

```json
{
  "scripts": {
    "postinstall": "nuxt prepare && node scripts/fix-unenv-path.mjs"
  }
}
```

The script (`scripts/fix-unenv-path.mjs`):
- ✅ Checks if unenv package exists (skips if not needed)
- ✅ Creates directories as needed
- ✅ Detects existing correct symlinks (idempotent)
- ✅ Handles Windows and Unix-like systems
- ✅ Never fails the install (logs warnings instead)
- ✅ Provides manual fix instructions on failure

### Manual Fix

If the automated script fails, run:

```bash
# On Unix/Linux/macOS:
pnpm run fix-unenv

# Or manually:
mkdir -p node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/runtime
ln -sf ../mock node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/runtime/mock

# On Windows (PowerShell as Admin):
New-Item -ItemType Directory -Force -Path node_modules\.pnpm\unenv@2.0.0-rc.24\node_modules\unenv\dist\runtime\runtime
New-Item -ItemType Junction -Path node_modules\.pnpm\unenv@2.0.0-rc.24\node_modules\unenv\dist\runtime\runtime\mock -Target node_modules\.pnpm\unenv@2.0.0-rc.24\node_modules\unenv\dist\runtime\mock
```

## Testing

Verify the workaround:
```bash
# Check the symlink exists and points correctly
ls -la node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/runtime/mock
# Should show: mock -> ../mock

# Test the build
pnpm run build
```

## Why Not a Better Fix?

### Option 1: Patch nuxt-og-image
- **Status**: Not feasible - we use the version bundled with `@nuxtjs/seo@2.0.3`
- **Reason**: Can't easily patch transitive dependencies in pnpm without ejecting from @nuxtjs/seo

### Option 2: Override unenv version
- **Status**: Not effective - unenv@2.0.0-rc.24 is the latest
- **Reason**: The issue is in nuxt-og-image's import path, not unenv itself

### Option 3: Fork @nuxtjs/seo
- **Status**: Too heavy - would need to maintain fork
- **Reason**: Overkill for a one-line import path issue

### Option 4: Use pnpm patch
- **Status**: Possible but complex
- **Reason**: Would require patching node_modules/.pnpm/.../nuxt-og-image at install time
- **Drawback**: Patches stored in repo, harder to maintain

### Chosen Solution: Symlink with Robust Script
- ✅ Simple, declarative fix
- ✅ Automated via postinstall
- ✅ Idempotent and safe
- ✅ Easy to understand and maintain
- ✅ Non-invasive (doesn't modify node_modules content)
- ✅ Works across platforms

## Permanent Solution

This workaround will be removed when one of these occurs:

1. **nuxt-og-image** fixes the import path (likely in a future version)
2. **@nuxtjs/seo** upgrades to a newer nuxt-og-image
3. **unenv** restructures to match the expected path
4. **Nuxt 4** stabilizes and resolves dependency conflicts

## Impact on CI/CD

The workaround is automatically applied during `pnpm install`, so:
- ✅ Works on local development machines
- ✅ Works on CI/CD pipelines (GitHub Actions, etc.)
- ✅ Works on deployment platforms (Vercel, Netlify, Cloudflare Pages, etc.)
- ✅ No manual intervention required

## Monitoring

If the script logs warnings during install:
```
⚠ Unenv workaround: incorrect symlink exists
⚠ Unenv workaround: path exists but is not a symlink
```

Try:
1. Delete `node_modules` and reinstall: `rm -rf node_modules && pnpm install`
2. Run the fix manually: `pnpm run fix-unenv`
3. Check the GitHub issue tracker for updates

## References

- Related: https://github.com/nuxt/image/issues/
- Unenv repo: https://github.com/unjs/unenv
- Nuxt OG Image: https://github.com/nuxt-modules/og-image

