export default defineCachedEventHandler(async (event) => {
  const version = getRouterParam(event, "version");

  if (!version) {
    throw createError({
      statusCode: 400,
      statusMessage: "Version parameter is required",
    });
  }

  try {
    return await $fetch(riseChangelogUrl(version));
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: `Changelog for version ${version} not found`,
    });
  }
}, {
  // Release pages render on the server now; cache so link-heavy pages do not hammer Rise.
  name: "rise-changelog",
  getKey: (event) => getRouterParam(event, "version") ?? "none",
  ...riseChangelogCacheOptions,
});
