"use client";
import { useChatStore } from "@/stores/chatStore";
import React from "react";
import MessageItem from "./MessageItem";
import { Box } from "@mantine/core";

const MessagesList = () => {
  const { messages } = useChatStore();
  return (
    <>
      <Box
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          flexGrow: 1,
          padding: "1rem",
        }}
      >
        {messages.map((message, index) => (
          <MessageItem message={message} />
        ))}
      </Box>
    </>
  );
};

export default MessagesList;
