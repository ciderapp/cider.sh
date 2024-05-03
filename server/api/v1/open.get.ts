export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  if (query.id && query.s) {
    return await sendRedirect(event, `cider://open/s/${query.id}`);
  }
  return await sendRedirect(event, `cider://${event.path.split("?")[1]}`);
});
