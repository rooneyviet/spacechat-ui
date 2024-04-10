import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import supersub from "remark-supersub";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import type { PluggableList } from "unified";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import CodeBlockWrapper from "../CodeBlockWrapperProps";

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent = ({ content }: MarkdownContentProps) => {
  const rehypePlugins: PluggableList = [
    [rehypeKatex, { output: "mathml" }],
    [rehypeRaw],
  ];

  return (
    <ReactMarkdown
      remarkPlugins={[
        supersub,
        remarkGfm,
        [remarkMath, { singleDollarTextMath: true }],
      ]}
      rehypePlugins={rehypePlugins}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "txt");
          console.log("match code", match);
          return match ? (
            <CodeBlockWrapper
              language={match[1]}
              children={String(children).replace(/\n$/, "")}
            />
          ) : (
            <code
              {...rest}
              className={cn(
                className,
                "!whitespace-pre-wrap rounded-md p-1 text-xs text-red-500 dark:text-red-400"
              )}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownContent;
