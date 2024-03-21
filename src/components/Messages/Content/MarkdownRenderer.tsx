import React from "react";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  //const codeBlockRegex = /<pre><code(.*?)>(.*?)<\/code><\/pre>/gs;
  const codeBlockRegex =
    /<figure data-rehype-pretty-code-figure=""><pre(.*?)>(.*?)<\/pre><\/figure>/gs;
  const renderCodeBlock = (match: string, attrs: string, code: string) => {
    return (
      <div style={{ position: "relative" }}>
        <pre>
          <code {...parseAttrs(attrs)}>{code}</code>
        </pre>
        <button
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            cursor: "pointer",
          }}
        >
          Copy
        </button>
      </div>
    );
  };

  const parseAttrs = (attrs: string) => {
    const parsedAttrs: { [key: string]: string } = {};
    attrs.split(" ").forEach((attr) => {
      const [key, value] = attr.split("=");
      parsedAttrs[key] = value.replace(/"/g, "");
    });
    return parsedAttrs;
  };

  if (!content) {
    return <></>; // or you can render a loading state or a fallback component
  }

  console.log("content", content);

  const renderedContent = content.split(codeBlockRegex).flatMap((part) => {
    if (part.startsWith('<figure data-rehype-pretty-code-figure="">')) {
      const [, attrs, code] = codeBlockRegex.exec(part) || [];
      console.log("startsWith");
      return renderCodeBlock(part, attrs, code);
    }

    console.log("it gone here is wrong");
    return <span dangerouslySetInnerHTML={{ __html: part }} />;
  });

  return <div>{renderedContent}</div>;
};

export default MarkdownRenderer;
