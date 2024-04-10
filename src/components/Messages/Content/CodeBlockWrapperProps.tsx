"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";

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
    <div style={{ position: "relative" }}>
      <SyntaxHighlighter
        lineProps={{
          style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
        }}
        PreTag="pre"
        wrapLines={true}
        children={children}
        language={language}
        style={coldarkCold}
      />
      <Button
        color={copied ? "teal" : "gray"}
        style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        onClick={copyToClipboard}
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
    </div>
  );
};

export default CodeBlockWrapper;
