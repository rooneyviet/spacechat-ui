"use client";

import React, { useEffect } from "react";
import MessageItem from "@/components/MainChatArea/MessageItem";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import useMessagesListQuery from "@/hooks/useMessagesListQuery";
import { useChatStore } from "@/stores/chatStore";
import { Welcome } from "../Welcome/Welcome";
import { IMessage } from "@prisma/client";
import { useShallow } from "zustand/react/shallow";

const MessagesList = () => {
  const { setMessages } = useChatStore(
    useShallow((state) => ({
      setMessages: state.setMessages,
      //messages: state.messages,
    }))
  );

  //const messages = useChatStore((state) => state.messages);
  //const { setMessages } = useChatStore();
  const { messages } = useChatStore();
  const params = useParams<{ conversationId: string }>();

  const router = useRouter();
  const conversationId = params.conversationId;

  const { data } = useQuery<IMessage[] | null>(
    useMessagesListQuery(conversationId)
  );

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [setMessages]);

  return (
    <>
      <div className="flex-grow overflow-y-auto overflow-x-hidden p-4">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageItem key={message.id} message={message} />
          ))
        ) : (
          <Welcome />
        )}
      </div>
    </>
  );
};

export default MessagesList;
