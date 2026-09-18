export default defineEventHandler(async (event) => {
  return sendProxy(event, '/__og-image__/static/og.png')
})
