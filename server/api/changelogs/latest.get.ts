export default defineEventHandler(async (event) => {
  const riseApiBaseUrl = 'https://rise.cider.sh';
  
  try {
    const response = await $fetch(`${riseApiBaseUrl}/api/v1/changelogs/latest`);
    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch latest changelog'
    });
  }
}); 