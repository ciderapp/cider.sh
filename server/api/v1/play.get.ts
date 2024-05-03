export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const path = event.path;
  if (query.id && query.s) {
    return await sendRedirect(event, `cider://play/s/${query.id}`);
  } else if (path.includes("album") && path.split("?")[2]) {
    return await sendRedirect(event, `cider://play/s/${path.split("?")[2].slice(2, 12)}`);
  } else if (path.includes("album")) {
    return await sendRedirect(event, `cider://play/a/${path.split("/").pop()}`);
  } else if (path.includes("playlist")) {
    return await sendRedirect(event, `cider://play/p/${path.split("/").pop()}`);
  }
  return "Not Found / Invalid Request";
});
