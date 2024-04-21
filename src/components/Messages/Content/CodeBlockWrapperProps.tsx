"use client";
import { Button } from "@/components/ui/button";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";
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
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <div className="relative w-full">
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
        variant="ghost"
        style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        onClick={copyToClipboard}
      >
        {copied ? (
          <IconCopyCheck size={24} color="black" />
        ) : (
          <IconCopy
            size={24}
            color="black"
            className={`opacity-40 hover:opacity-100`}
          />
        )}
      </Button>
    </div>
  );
};

export default CodeBlockWrapper;
