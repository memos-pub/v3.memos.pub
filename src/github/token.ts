import "server-only";

const LIST = process.env.GITHUB_PAT_LIST;
if (!LIST) throw Error("GITHUB_PAT_LIST not found");

const tokens = LIST.split(",");
if (tokens.length < 2) throw Error("Need at least 2 tokens");

export const getGitHubToken = (): string => {
  const index = Math.floor(Math.random() * tokens.length);
  return tokens[index];
};
