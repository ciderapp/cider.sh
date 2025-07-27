import { serverQueryContent } from "#content/server";


export default defineEventHandler(async (e) => {
  try {
    const urls = [];
    
    const contentList = (await serverQueryContent(e).find()) as any[];
    contentList.forEach((c) => {
      urls.push({
        loc: c._path,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8
      });
    });
    
    try {
      const riseApiBaseUrl = 'https://rise.cider.sh';
      const changelogsResponse = await $fetch<{changelogs: any[]}>(`${riseApiBaseUrl}/api/v1/changelogs/list`);
      
      urls.push({
        loc: '/changelogs',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly', 
        priority: 0.9
      });
      
      if (changelogsResponse?.changelogs) {
        changelogsResponse.changelogs.forEach((changelog: any) => {
          urls.push({
            loc: `/changelogs/${changelog.version}`,
            lastmod: new Date(changelog.lastUpdated).toISOString(),
            changefreq: 'monthly',
            priority: 0.7
          });
        });
      }
    } catch (apiError) {
      console.warn('Failed to fetch changelog URLs for sitemap:', apiError);
    }
    
    return urls;
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return [];
  }
});
