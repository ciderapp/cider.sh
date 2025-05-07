export default defineEventHandler(async (event) => {
  const type = getRouterParam(event, "type");
  const id = getRouterParam(event, "id");

  switch (type) {
    case "songs":
      return await sendRedirect(event, `cider://play/s/${id}`);
    case "albums":
      return await sendRedirect(event, `cider://play/a/${id}`);
    case "playlists":
      return await sendRedirect(event, `cider://play/p/${id}`);
  }
  return `Uh Oh!\nCannot find the resource with type ${type} and id ${id}.\n\n\nPlease send a report to Discord(discord.gg/applemusic) - tag @yazninja if possible, thanks`;
});
