import React, { useState, useEffect } from "react";
import MarkdownRenderer from "../MarkdownRenderer";
import { Box, Button } from "@mantine/core";

interface RemarkMarkdownProps {
  markdown: string;
}

const RemarkMarkdown = ({ markdown }: RemarkMarkdownProps) => {
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
    </Box>
  );
};

export default RemarkMarkdown;
