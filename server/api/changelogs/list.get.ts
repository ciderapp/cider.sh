export default defineCachedEventHandler(async () => {
  try {
    return await $fetch(riseChangelogUrl("list"));
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch changelogs list",
    });
  }
}, {
  name: "rise-changelog-list",
  ...riseChangelogCacheOptions,
});
