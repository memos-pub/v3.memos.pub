export interface BlogSource {
  owner: string;
  repo: string;
  path: string;
}

export const getBlogSources = (slugs: string[]): BlogSource[] => {
  const [owner, repo, ...segments] = slugs;
  const path = segments.join("/");

  if (!owner) throw Error("Owner not found");
  if (!repo) throw Error("Repo not found");

  // Previously we support trying repo = owner (profile repo) but no longer
  return [{ owner, repo, path }];
};
