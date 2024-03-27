import { Paper, Avatar, Box, Text } from "@mantine/core";
import React from "react";
import RemarkMarkdown from "../Messages/Content/codeblocks/RemarkMarkdown";
import { Message } from "@/lib/types/Message";
import "@/styles/codeBlock.css";
import "@/styles/prism.css";

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <Paper
      style={{
        marginBottom: "10px",
        display: "flex",
        alignItems: "flex-start",
      }}
      key={message.id}
    >
      <Avatar
        src={message.sender === "user" ? "/user-logo.png" : "/ai-logo.png"}
        alt={message.sender}
        mr="sm"
      />
      <Box>
        <Text fw={800} c="blue">
          {message.sender === "user" ? "You" : "AI"}
        </Text>
        <Box
          style={{
            backgroundColor: message.isError ? "#FEE2E2" : "transparent",
            width: "100%",
          }}
        >
          <div className="code-block-container">
            <RemarkMarkdown markdown={message.content} />
          </div>
        </Box>
      </Box>
    </Paper>
  );
};

export default MessageItem;
