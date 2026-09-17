export default defineEventHandler(async (event) => {
  return sendRedirect(event, '/__og-image__/static/about/og.png', 301)
})
