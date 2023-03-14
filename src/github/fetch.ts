import "server-only";
import { getGitHubToken } from "./token";

interface Options {
  raw: boolean;
}

const defaultOptions: Options = {
  raw: false,
};

export class GitHubError extends Error {
  gh_code: number;
  gh_message: string;
  constructor(res: Response, body: any) {
    super("Failed to fetch from GitHub");
    this.name = "GitHub Error";
    this.gh_message = body.message;
    this.gh_code = res.status;
  }
}

export const fetchGitHub = async <Result = unknown>(
  path: string,
  optionsInit?: Partial<Options>
): Promise<Result> => {
  const options: Options = { ...defaultOptions, ...optionsInit };

  const token = getGitHubToken();
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    Accept: `application/vnd.github${options.raw ? ".raw" : ""}+json`,
  };
  const url = `https://api.github.com/${path}`;
  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new GitHubError(res, await res.json());
  }

  const isResRaw = res.headers.get("content-type")?.includes("github.raw");
  return isResRaw ? res.text() : res.json();
};
