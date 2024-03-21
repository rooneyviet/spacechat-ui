import React, { useState } from "react";
import { IconCheck, IconCopy, IconCopyCheck } from "@tabler/icons-react";
import { Tooltip } from "@mantine/core";

interface CopyIconProps {
  text: string;
}

const CopyIcon: React.FC<CopyIconProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  //   cursor: pointer;
  //   opacity: 0.6;
  //   transition: opacity 0.2s;

  return (
    <Tooltip
      style={{
        position: "absolute",
        top: "-30px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        visibility: "hidden",
        opacity: 0,
        transition: "opacity 0.2s",
      }}
      label={copied ? "Copied!" : "Copy"}
      position="top"
      withArrow
    >
      <button className="copy-button" onClick={handleCopy}>
        {copied ? (
          <IconCopyCheck size={24} color="white" />
        ) : (
          <IconCopy size={24} color="white" />
        )}
      </button>
    </Tooltip>
  );
  // return (
  //   <button
  //     style={{
  //       position: "absolute",
  //       top: "0.5rem",
  //       right: "0.5rem",
  //       cursor: "pointer",
  //       opacity: "0.4",
  //       border: "none",
  //       borderRadius: "4px",
  //       background: "rgba(0, 0, 0, 0)",
  //       padding: "4px",
  //     }}
  //     className={`copy-icon ${copied ? "Copied" : ""}`}
  //     onClick={handleCopy}
  //   >
  //     {copied ? <IconCheck /> : <IconCopy />}
  //   </button>
  // );
};

export default CopyIcon;
