//"use client";

import React from "react";
import MessageItem from "@/components/MainChatArea/MessageItem";
import { Box } from "@mantine/core";
import { IMessage } from ".prisma/client";
import { prisma } from "../../../lib/prisma";
import { QueryClient } from "@tanstack/react-query";

interface MessagesListProps {
  params: { conversationId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getMessages(conversationId: number) {
  const messages = await prisma.iMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
  return messages;
}

const MessagesList = async ({ params, searchParams }: MessagesListProps) => {
  //console.log("MessagesList", params);
  const conversationId = Number(params.conversationId);
  // const messages = await prisma.iMessage.findMany({
  //   where: { conversationId },
  //   orderBy: { createdAt: "asc" },
  // });
  const queryClient = new QueryClient();
  const messages = await queryClient.fetchQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      return await getMessages(conversationId);
    },
  });
  console.log(conversationId);
  //const { messages } = useChatStore();
  //const messages: IMessage[] = [];
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
