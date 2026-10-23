import { CHANGELOG_SWR_SECONDS, RISE_PROXY_STALE_SECONDS } from "../../shared/changelog-freshness";

export const riseChangelogCacheOptions = {
  maxAge: CHANGELOG_SWR_SECONDS,
  swr: true,
  staleMaxAge: RISE_PROXY_STALE_SECONDS,
};

export function riseApiBaseUrl() {
  const config = useRuntimeConfig();
  return String(config.public.riseApiUrl || "https://rise.cider.sh").replace(/\/+$/, "");
}

export function riseChangelogUrl(path: string) {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${riseApiBaseUrl()}/api/v1/changelogs${suffix}`;
}
