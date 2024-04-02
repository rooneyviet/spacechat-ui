"use client";

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import CopyIcon from "../CopyIcon";

interface RemarkMarkdownProps {
  markdown: string;
}

const RemarkMarkdown = ({ markdown }: RemarkMarkdownProps) => {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
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

  return (
    <div style={{ position: "relative" }}>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        ref={(el) => {
          if (el) {
            const codeBlocks = el.querySelectorAll("pre");
            codeBlocks.forEach((codeBlock) => {
              const code = codeBlock.querySelector("code")?.innerText || "";
              const copyButtonContainer = document.createElement("div");
              copyButtonContainer.classList.add("copy-button-container");
              codeBlock.appendChild(copyButtonContainer);
              const root = createRoot(copyButtonContainer);
              root.render(<CopyIcon text={code} />);
            });
          }
        }}
      />
    </div>
  );
};

export default RemarkMarkdown;
