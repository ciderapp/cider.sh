export default defineEventHandler(async (event) => {
  return sendRedirect(event, '/__og-image__/static/changelogs/og.png', 301)
})
