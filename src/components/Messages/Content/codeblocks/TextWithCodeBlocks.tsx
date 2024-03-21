import React from "react";
import RemarkMarkdown from "./RemarkMarkdown";

const codeBlockRegex = /```([\w-]+)?\n([\s\S]*?)\n```/g;

interface HighlightedTextProps {
  text: string;
}

const renderMarkdown = ({ text }: HighlightedTextProps) => {
  const parts = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    const [fullMatch, language, code] = match;

    // Add any normal text before the code block
    if (match.index > lastIndex) {
      parts.push(
        <RemarkMarkdown
          key={`text-${lastIndex}`}
          markdown={text.slice(lastIndex, match.index)}
          isCodeBlock={false}
        />
      );
      console.log("Normal text:", text.slice(lastIndex, match.index));
    }

    // Add the code block
    parts.push(
      <RemarkMarkdown
        key={`code-${match.index}`}
        markdown={fullMatch}
        isCodeBlock={true}
        language={language || "plaintext"}
      />
    );
    console.log("Code block:", fullMatch);

    lastIndex = match.index + fullMatch.length;
  }

  // Add any remaining normal text after the last code block
  if (lastIndex < text.length) {
    parts.push(
      <RemarkMarkdown
        key={`text-${lastIndex}`}
        markdown={text.slice(lastIndex)}
        isCodeBlock={false}
      />
    );
  }

  return parts;
};

export default renderMarkdown;
