import RemarkMarkdown from "./RemarkMarkdown";

interface HighlightedTextProps {
  text: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text }) => {
  const regex = /```(?:(\w+)\n)?\n?([\s\S]*?)\n?```/g;
  const parts: JSX.Element[] = [];
  const uniqueParts = new Set<string>();

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, language, code] = match;
    const preMatch = text.slice(lastIndex, match.index);

    if (preMatch) {
      const textKey = `text-${lastIndex}`;
      if (!uniqueParts.has(textKey)) {
        //parts.push(<span key={lastIndex}>{preMatch}</span>);
        parts.push(
          <RemarkMarkdown
            key={textKey}
            markdown={preMatch}
            isCodeBlock={false}
          />
        );
        uniqueParts.add(textKey);
      }
    }

    const codeKey = `code-${match.index}`;
    if (!uniqueParts.has(codeKey)) {
      parts.push(
        <RemarkMarkdown
          key={codeKey}
          markdown={fullMatch}
          isCodeBlock={true}
          language={language || "plaintext"}
        />
      );
      uniqueParts.add(codeKey);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    const textKey = `text-${lastIndex}`;
    if (!uniqueParts.has(textKey)) {
      //parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
      parts.push(
        <RemarkMarkdown
          key={textKey}
          markdown={text.slice(lastIndex)}
          isCodeBlock={false}
        />
      );
      uniqueParts.add(textKey);
    }
  }

  return <div>{parts}</div>;
};

export default HighlightedText;
