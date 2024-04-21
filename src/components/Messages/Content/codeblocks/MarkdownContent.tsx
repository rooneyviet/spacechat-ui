import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import supersub from "remark-supersub";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import type { PluggableList } from "unified";
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
      className="w-full"
      rehypePlugins={rehypePlugins}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "txt");
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
                "!whitespace-pre-wrap rounded-md p-1 italic text-red-300 dark:text-red-300"
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
