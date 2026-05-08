import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

export async function markdownToHtml(content: string): Promise<string> {
  const result = await remark().use(gfm).use(html).process(content);
  return result.toString();
}
