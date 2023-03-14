import { parseMarkdown } from "@/markdown/parse";
import { BlogPage, fetchBlogPage } from "./fetch";

interface Props {
  params: { slugs: string[] };
}

const parse = async (page: BlogPage): Promise<string> => {
  const { content } = page;
  const markdown =
    content.type === "file"
      ? content.value // file
      : content.readme ?? "Empty"; // folder
  const { html } = await parseMarkdown(markdown);
  return html;
};

const Page = async (props: Props): Promise<JSX.Element> => {
  const { params } = props;

  const page = await fetchBlogPage(params.slugs);
  const html = await parse(page);

  return (
    <div>
      <pre>{JSON.stringify(params, null, 2)}</pre>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(page, null, 2)}
      </pre>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default Page;
