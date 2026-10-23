/**
 * Reuse the SSR payload only while hydrating. After that, refetch so
 * prerendered shells (home, downloads) pick up newer Rise releases.
 */
export function payloadDuringHydration() {
  return {
    getCachedData(key: string, nuxtApp: ReturnType<typeof useNuxtApp>, ctx?: { cause?: string }) {
      if (ctx?.cause === "refresh") return undefined;
      if (nuxtApp.isHydrating) {
        return nuxtApp.payload.data[key];
      }
      return undefined;
    },
  };
}
