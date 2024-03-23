import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { unified } from "unified";

export default async function markdownToHtml(markdown: string) {
  const file = await unified()
    .use(remarkParse) // Convert into markdown ASTß
    .use(remarkRehype) // Transform to HTML AST
    //.use(rehypeSanitize) // Sanitize HTML input
    .use(remarkGfm)
    // .use(rehypePrism, {
    //   ignoreMissing: false,
    // })
    .use(remarkHtml)
    .use(rehypePrettyCode, {
      // See Options section below.
      //grid: true,
      theme: "catppuccin-latte",
      //keepBackground: false,
      defaultLang: {
        block: "plaintext",
        inline: "plaintext",
      },
    })
    .use(rehypeStringify)
    .process(markdown);
  return file.toString();
}
