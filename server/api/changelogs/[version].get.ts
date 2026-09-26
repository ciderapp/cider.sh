export default defineCachedEventHandler(async (event) => {
  const version = getRouterParam(event, 'version');
  const riseApiBaseUrl = 'https://rise.cider.sh';
  
  if (!version) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Version parameter is required'
    });
  }
  
  try {
    const response = await $fetch(`${riseApiBaseUrl}/api/v1/changelogs/${version}`);
    return response;
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Changelog for version ${version} not found`
    });
  }
}, {
  // Release pages render on the server now; cache so link-heavy pages do not hammer Rise.
  name: "rise-changelog",
  maxAge: 60 * 5,
  getKey: (event) => getRouterParam(event, "version") ?? "none",
});
