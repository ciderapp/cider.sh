import { serverQueryContent } from "#content/server";
import { asSitemapUrl, defineSitemapEventHandler } from "#imports";
import { defineEventHandler } from "h3";
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

export default defineSitemapEventHandler(async (e) => {
  const contentList = (await serverQueryContent(e).find()) as ParsedContent[];
  console.log(contentList);
  return contentList.map((c) => {
    return asSitemapUrl({
      loc: `${c._path}`,
      // lastmod: updatedAt,
    });
  });
});
