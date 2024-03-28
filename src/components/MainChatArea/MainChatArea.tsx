//"use client";
import React from "react";
import { Box } from "@mantine/core";
import MessageInput from "./MessageInput";
import MessagesList from "./MessagesList";

const ChatScreen = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  console.log(params);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "10px",
      }}
    >
      <MessagesList />

      <MessageInput />
    </Box>
  );
};

export default ChatScreen;
