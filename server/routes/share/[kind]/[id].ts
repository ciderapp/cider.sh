export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const kind = getRouterParam(event, "kind");

  if (kind === "album") await sendRedirect(event, `https://album.link/i/${id}`);
  else if (kind === "song") await sendRedirect(event, `https://song.link/i/${id}`);
  else await sendRedirect(event, `/404`);
});
