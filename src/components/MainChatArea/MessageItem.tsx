import React from "react";
import RemarkMarkdown from "../Messages/Content/codeblocks/RemarkMarkdown";
//import { Message } from "@/lib/types/Message";
//import "@/styles/codeBlock.css";
import "@/styles/prism.css";
import { IMessage, SENDER } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import MarkdownContent from "../Messages/Content/codeblocks/MarkdownContent";

interface MessageItemProps {
  message: IMessage;
}

const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <div className="flex items-start space-x-4" key={message.id}>
      <Avatar className="h-12 w-12">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-start">
        <Label className="text-lg font-bold text-sky-500">
          {message.sender === SENDER.user ? "You" : "AI"}
        </Label>
        <div
          style={{
            backgroundColor: message.isError ? "#FEE2E2" : "transparent",
            width: "100%",
          }}
        >
          {/* <div className="code-block-container">
            <RemarkMarkdown markdown={message.content} />
          </div> */}
          <MarkdownContent content={message.content} />
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
