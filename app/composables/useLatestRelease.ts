interface LatestRelease {
  version: string;
  shortDesc: string;
}

/**
 * Latest Cider release from Rise, shared by the header's release strip.
 * Resolves to null when Rise is unreachable so the strip just hides.
 */
export function useLatestRelease() {
  return useAsyncData("latest-release", async () => {
    try {
      const response = await $fetch<LatestRelease>("/api/changelogs/latest");
      return { version: response.version, shortDesc: response.shortDesc };
    } catch (error) {
      console.error("Failed to fetch latest release:", error);
      return null;
    }
  });
}
