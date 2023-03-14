import { fetchGitHub } from "@/github/fetch";

export interface BlogConfig {
  // Nothing for now. This fake config enforces the "partial" code to work.
  foo: boolean;
}

interface Props {
  owner: string;
  repo: string;
}

const defaultConfig: BlogConfig = {
  foo: true,
};

export const fetchBlogConfig = async (props: Props): Promise<BlogConfig> => {
  const { owner, repo } = props;
  const url = `repos/${owner}/${repo}/contents/memos.pub.json`;
  let partial: Partial<BlogConfig> = {};
  try {
    const text = await fetchGitHub<string>(url, { raw: true });
    partial = JSON.parse(text) as Partial<BlogConfig>;
  } catch (e) {
    partial = {};
  }
  return { ...defaultConfig, ...partial };
};
