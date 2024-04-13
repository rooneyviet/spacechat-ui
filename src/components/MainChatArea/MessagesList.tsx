"use client";

import React, { useEffect, useState } from "react";
import MessageItem from "@/components/MainChatArea/MessageItem";
import { Box } from "@mantine/core";
import { IMessage } from ".prisma/client";
import { prisma } from "../../../lib/prisma";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import useMessagesListQuery from "@/hooks/useMessagesListQuery";
import { useChatStore } from "@/stores/chatStore";
import { useShallow } from "zustand/react/shallow";

const MessagesList = () => {
  // const { setMessages, messages } = useChatStore(
  //   useShallow((state) => ({
  //     setConversationId: state.setConversationId,
  //     setMessages: state.setMessages,
  //     messages: state.messages,
  //     currentConversationId: state.currentConversationId,
  //   }))
  // );
  const { setMessages, messages } = useChatStore();

  const params = useParams<{ conversationId?: string }>();

  const router = useRouter();
  const conversationId = params.conversationId;
  if (!conversationId) return <div>No conversation id</div>;
  const { data } = useQuery(useMessagesListQuery(conversationId));

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
