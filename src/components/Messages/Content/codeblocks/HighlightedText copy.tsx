import RemarkMarkdown from "./RemarkMarkdown";

interface HighlightedTextProps {
  text: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text }) => {
  const regex = /```(?:(\w+)\n)?\n?([\s\S]*?)\n?```/g;
  const parts: JSX.Element[] = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, language, code] = match;
    const preMatch = text.slice(lastIndex, match.index);

    if (preMatch) {
      //parts.push(<span key={lastIndex}>{preMatch}</span>);
      parts.push(
        <RemarkMarkdown
          key={`text-${lastIndex}`}
          markdown={text.slice(lastIndex, match.index)}
          isCodeBlock={false}
        />
      );
    }

    parts.push(
      //<CodeBlock key={match.index} language={language} code={code.trim()} />
      <RemarkMarkdown
        key={`code-${match.index}`}
        markdown={fullMatch}
        isCodeBlock={true}
        language={language || "plaintext"}
      />
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    //parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    parts.push(
      <RemarkMarkdown
        key={`text-${lastIndex}`}
        markdown={text.slice(lastIndex)}
        isCodeBlock={false}
      />
    );
  }

  return <div>{parts}</div>;
};

export default HighlightedText;
