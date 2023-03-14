import { BlogConfig, fetchBlogConfig } from "./config";
import { BlogContent, fetchBlogContent } from "./content";
import { BlogSource, getBlogSources } from "./source";

export interface BlogPage {
  source: BlogSource;
  content: BlogContent;
  config: BlogConfig;
}

const fetchStrict = async (initSource: BlogSource): Promise<BlogPage> => {
  const [{ content, source }, config] = await Promise.all([
    fetchBlogContent(initSource),
    fetchBlogConfig(initSource),
  ]);
  return { config, content, source };
};

export const fetchBlogPage = async (slugs: string[]): Promise<BlogPage> => {
  const sources = getBlogSources(slugs);
  const promises = sources.map(fetchStrict);
  const page = await Promise.any(promises);
  return page;
};
