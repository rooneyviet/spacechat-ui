"use client";

import React, { useEffect, useState } from "react";
import MessageItem from "@/components/MainChatArea/MessageItem";
import { Box } from "@mantine/core";
import { IMessage } from ".prisma/client";
import { prisma } from "../../../lib/prisma";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import useMessagesListQuery from "@/hooks/useMessagesListQuery";
import { useChatStore } from "@/stores/chatStore";

async function getMessages(conversationId: number): Promise<IMessage[]> {
  const messages = await prisma.iMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });

  return messages;
}

const MessagesList = () => {
  const { setConversationId, setMessages, messages } = useChatStore();

  const params = useParams<{ conversationId: string }>();
  const conversationId = params.conversationId;
  const { data } = useQuery(useMessagesListQuery(Number(conversationId)));

  useEffect(() => {
    if (conversationId) {
      setConversationId(conversationId);
    }
  }, [conversationId, setConversationId]);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data, setMessages]);

  return (
    <>
      <div className="flex-grow overflow-y-auto overflow-x-hidden p-4">
        {messages.map((message, index) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </>
  );
};

export default MessagesList;
