import { serverQueryContent } from "#content/server";

type SitemapUrlEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

function realLastmod(value: unknown): string | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
  }
  return undefined;
}

export default defineSitemapEventHandler(async (e) => {
  const urls: SitemapUrlEntry[] = [];

  try {
    const contentList = (await serverQueryContent(e).find()) as Array<{
      _path?: string;
      date?: unknown;
      lastmod?: unknown;
      updatedAt?: unknown;
    }>;

    for (const doc of contentList) {
      if (!doc._path) continue;
      const entry: SitemapUrlEntry = {
        loc: doc._path,
        changefreq: "weekly",
        priority: 0.8,
      };
      // Only emit lastmod when the document itself has a real date. Do not use now().
      const lastmod = realLastmod(doc.date ?? doc.lastmod ?? doc.updatedAt);
      if (lastmod) entry.lastmod = lastmod;
      urls.push(entry);
    }
  } catch (contentError) {
    console.warn("Failed to load content URLs for sitemap:", contentError);
  }

  try {
    const config = useRuntimeConfig();
    const riseApiBaseUrl = String(config.public.riseApiUrl || "https://rise.cider.sh");
    const changelogsResponse = await $fetch<{
      changelogs?: Array<{ version?: string; lastUpdated?: unknown }>;
    }>(`${riseApiBaseUrl}/api/v1/changelogs/list`);

    urls.push({
      loc: "/changelogs",
      changefreq: "weekly",
      priority: 0.9,
    });

    for (const changelog of changelogsResponse?.changelogs ?? []) {
      if (!changelog.version) continue;
      const entry: SitemapUrlEntry = {
        loc: `/changelogs/${changelog.version}`,
        changefreq: "monthly",
        priority: 0.7,
      };
      const lastmod = realLastmod(changelog.lastUpdated);
      if (lastmod) entry.lastmod = lastmod;
      urls.push(entry);
    }
  } catch (apiError) {
    console.warn("Failed to fetch changelog URLs for sitemap:", apiError);
  }

  return urls;
});
