import React, { useState, useEffect } from "react";
import MarkdownRenderer from "../MarkdownRenderer";
import { Box, Button } from "@mantine/core";

interface RemarkMarkdownProps {
  markdown: string;
  language?: string;
  fullmatch?: string;
  isCodeBlock: boolean;
}

const RemarkMarkdown = ({
  markdown,
  isCodeBlock,
  language,
}: RemarkMarkdownProps) => {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const fetchHtml = async () => {
      const response = await fetch(
        `/api/markdown?markdown=${encodeURIComponent(markdown)}`
      );
      const data = await response.json();
      setHtml(data.html);
    };

    fetchHtml();
  }, [markdown]);

  //return <MarkdownRenderer content={html} />;
  return (
    <Box style={{ position: "relative" }}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {isCodeBlock && (
        <Button
          size="xs"
          color={copied ? "teal" : "gray"}
          style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
          onClick={copyToClipboard}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      )}
    </Box>
  );
};

export default RemarkMarkdown;
