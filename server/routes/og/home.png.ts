export default defineEventHandler(async (event) => {
  // Redirect to the auto-generated OG image
  return sendRedirect(event, '/__og-image__/static/og.png', 301)
})
