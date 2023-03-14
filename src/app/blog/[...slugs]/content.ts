import { fetchGitHub } from "@/github/fetch";
import { BlogSource } from "./source";

// Raw types

interface RawFolderItem {
  name: string;
  path: string;
  type: string;
}

type RawFolder = RawFolderItem[];

type RawContent = string | RawFolder | {}; // {} is submodule

// Good types

export interface BlogContentItem {
  name: string;
  type: string;
}

export interface BlogContentFile {
  type: "file";
  value: string;
}

export interface BlogContentFolder {
  type: "folder";
  items: BlogContentItem[];
  readme: null | string;
}

export type BlogContent = BlogContentFile | BlogContentFolder;

//

const isFolder = (raw: RawContent): raw is RawFolder => {
  return Array.isArray(raw);
};

const toItem = (raw: RawFolderItem): BlogContentItem => ({
  name: raw.name,
  type: raw.type,
});

const fetchReadme = async (source: BlogSource): Promise<string | null> => {
  const { owner, repo, path } = source;
  const url = `repos/${owner}/${repo}/readme/${path}`;
  try {
    return await fetchGitHub<string>(url, { raw: true });
  } catch (e) {
    return null;
  }
};

type RawResult = [BlogSource, RawContent];

const fetchRaw = async (source: BlogSource): Promise<RawResult> => {
  const { owner, repo, path } = source;

  const fetch = async (path: string): Promise<RawResult> => {
    const source: BlogSource = { owner, path: path, repo };
    const url = `repos/${owner}/${repo}/contents/${path}`;
    const raw = await fetchGitHub<RawContent>(url, { raw: true });
    return [source, raw];
  };

  const promises = [path, `${path}.md`].map(fetch);
  return await Promise.any(promises);
};

export const fetchBlogContent = async (
  initSource: BlogSource
): Promise<{
  source: BlogSource;
  content: BlogContent;
}> => {
  const [[source, raw], readme] = await Promise.all([
    fetchRaw(initSource),
    fetchReadme(initSource),
  ]);

  let content: BlogContent;
  if (typeof raw === "string") {
    content = { type: "file", value: raw };
  } else if (isFolder(raw)) {
    content = { type: "folder", items: raw.map(toItem), readme };
  } else {
    throw Error("Unknown type");
  }

  return { source, content };
};
