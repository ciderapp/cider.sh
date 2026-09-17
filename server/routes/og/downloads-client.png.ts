export default defineEventHandler(async (event) => {
  return sendRedirect(event, '/__og-image__/static/downloads/client/og.png', 301)
})
