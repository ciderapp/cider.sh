export default defineEventHandler(async (event) => {
  return sendRedirect(event, '/__og-image__/static/learn-more/og.png', 301)
})
