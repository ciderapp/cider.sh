#!/usr/bin/env node
/**
 * Ask Rise to re-read ciderapp/Cider-2/changelogs, then confirm the public
 * list still has a latest entry. Optionally ping a Cloudflare Pages deploy hook.
 *
 * Env:
 *   RISE_API_URL                 default https://rise.cider.sh
 *   RISE_MANAGEMENT_KEY          optional Bearer token for POST /refresh
 *   CLOUDFLARE_PAGES_DEPLOY_HOOK optional URL to trigger a Pages rebuild
 */
const riseBase = (process.env.RISE_API_URL || "https://rise.cider.sh").replace(/\/+$/, "");
const managementKey = process.env.RISE_MANAGEMENT_KEY || "";
const deployHook = process.env.CLOUDFLARE_PAGES_DEPLOY_HOOK || "";

function authHeaders() {
  if (!managementKey) return {};
  return { Authorization: `Bearer ${managementKey}` };
}

async function readJson(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Expected JSON from ${response.url}, got: ${text.slice(0, 200)}`);
  }
}

async function refreshRise() {
  const url = `${riseBase}/api/v1/changelogs/refresh`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...authHeaders(),
    },
  });
  const body = await readJson(response);
  if (!response.ok) {
    throw new Error(`Rise refresh failed (${response.status}): ${body.error || JSON.stringify(body)}`);
  }
  console.log(`Rise refresh: ${body.message || "ok"}`);
}

async function assertLatestPresent() {
  const listResponse = await fetch(`${riseBase}/api/v1/changelogs/list`);
  const list = await readJson(listResponse);
  if (!listResponse.ok) {
    throw new Error(`Rise list failed (${listResponse.status})`);
  }
  const versions = (list.changelogs || []).map((item) => item.version).filter(Boolean);
  if (versions.length === 0) {
    throw new Error("Rise changelog list is empty after refresh");
  }

  const latestResponse = await fetch(`${riseBase}/api/v1/changelogs/latest`);
  const latest = await readJson(latestResponse);
  if (!latestResponse.ok || !latest.version) {
    throw new Error(`Rise latest failed (${latestResponse.status})`);
  }
  if (!versions.includes(latest.version)) {
    throw new Error(`Latest version ${latest.version} is missing from the Rise list`);
  }
  console.log(`Rise latest: ${latest.version} (${versions.length} entries)`);
  return latest.version;
}

async function pingDeployHook() {
  if (!deployHook) {
    console.log("No CLOUDFLARE_PAGES_DEPLOY_HOOK set; skipping Pages rebuild");
    return;
  }
  const response = await fetch(deployHook, { method: "POST" });
  if (!response.ok) {
    throw new Error(`Cloudflare deploy hook failed (${response.status})`);
  }
  console.log("Cloudflare Pages deploy hook accepted");
}

try {
  await refreshRise();
  await assertLatestPresent();
  await pingDeployHook();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
