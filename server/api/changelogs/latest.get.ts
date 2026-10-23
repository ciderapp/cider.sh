export default defineCachedEventHandler(async () => {
  try {
    return await $fetch(riseChangelogUrl("latest"));
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch latest changelog",
    });
  }
}, {
  name: "rise-changelog-latest",
  ...riseChangelogCacheOptions,
});
