import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

test("changelog routes are SWR, not prerendered or Vercel ISR", () => {
  const config = read("nuxt.config.ts");
  const freshness = read("shared/changelog-freshness.ts");

  assert.match(freshness, /CHANGELOG_SWR_SECONDS = 60/);
  const rulesBlock = freshness.slice(freshness.indexOf("export const changelogRouteRules"));
  assert.match(rulesBlock, /prerender:\s*false/);
  assert.match(rulesBlock, /swr:\s*CHANGELOG_SWR_SECONDS/);
  assert.doesNotMatch(rulesBlock, /\bisr\s*:/);

  assert.match(config, /changelogRouteRules/);
  assert.match(config, /changelogPrerenderIgnore/);
  assert.doesNotMatch(config, /"\/changelogs":\s*\{\s*prerender:\s*true/);
  assert.doesNotMatch(config, /"\/changelogs\/\*\*":\s*\{\s*isr:/);
});

test("Rise proxy handlers use the shared short cache, not a five-minute lock", () => {
  const helper = read("server/utils/rise-changelogs.ts");
  const files = [
    "server/api/changelogs/list.get.ts",
    "server/api/changelogs/latest.get.ts",
    "server/api/changelogs/[version].get.ts",
  ];

  assert.match(helper, /maxAge:\s*CHANGELOG_SWR_SECONDS/);
  assert.doesNotMatch(helper, /maxAge:\s*60\s*\*\s*5/);

  for (const file of files) {
    const source = read(file);
    assert.match(source, /riseChangelogCacheOptions/, `${file} should use shared cache options`);
    assert.match(source, /riseChangelogUrl\(/, `${file} should use the Rise URL helper`);
    assert.doesNotMatch(source, /maxAge:\s*60\s*\*\s*5/, `${file} should not hardcode a 5 minute cache`);
    assert.doesNotMatch(source, /https:\/\/rise\.cider\.sh/, `${file} should not hardcode the Rise host`);
  }
});

test("scheduled workflow asks Rise to create or update changelog rows", () => {
  const workflow = read(".github/workflows/refresh-changelogs.yml");
  const script = read("scripts/refresh-changelogs.mjs");

  assert.match(workflow, /cron:\s*"17 \* \* \* \*"/);
  assert.match(workflow, /repository_dispatch/);
  assert.match(workflow, /scripts\/refresh-changelogs\.mjs/);
  assert.match(script, /\/api\/v1\/changelogs\/refresh/);
  assert.match(script, /\/api\/v1\/changelogs\/latest/);
  assert.match(script, /changelogs\/list/);
});

test("latest-release and changelog pages refetch after hydration", () => {
  const latest = read("app/composables/useLatestRelease.ts");
  const index = read("app/pages/changelogs/index.vue");
  const detail = read("app/pages/changelogs/[...id].vue");

  assert.match(latest, /payloadDuringHydration\(/);
  assert.match(index, /payloadDuringHydration\(/);
  assert.match(detail, /payloadDuringHydration\(/);
});
