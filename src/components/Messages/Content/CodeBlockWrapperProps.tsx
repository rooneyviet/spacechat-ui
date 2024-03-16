import React, { useState } from "react";
import { Box, Button } from "@mantine/core";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockWrapperProps {
  language: string;
  children: string;
}

const CodeBlockWrapper: React.FC<CodeBlockWrapperProps> = ({
  language,
  children,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Box style={{ position: "relative" }}>
      <SyntaxHighlighter language={language} style={atomDark} PreTag="div">
        {children}
      </SyntaxHighlighter>
      <Button
        size="xs"
        color={copied ? "teal" : "gray"}
        style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        onClick={copyToClipboard}
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
    </Box>
  );
};

export default CodeBlockWrapper;
