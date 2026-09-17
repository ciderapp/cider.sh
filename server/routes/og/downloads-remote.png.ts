export default defineEventHandler(async (event) => {
  return sendRedirect(event, '/__og-image__/static/downloads/remote/og.png', 301)
})
