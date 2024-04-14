"use client";

import React, { useEffect } from "react";
import MessageItem from "@/components/MainChatArea/MessageItem";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import useMessagesListQuery from "@/hooks/useMessagesListQuery";
import { useChatStore } from "@/stores/chatStore";
import { Welcome } from "../Welcome/Welcome";
import { IMessage } from "@prisma/client";

const MessagesList = () => {
  // const { setMessages, messages } = useChatStore(
  //   useShallow((state) => ({
  //     setConversationId: state.setConversationId,
  //     setMessages: state.setMessages,
  //     messages: state.messages,
  //     currentConversationId: state.currentConversationId,
  //   }))
  // );
  //const { setMessages } = useChatStore();
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
    //console.log("isError", isLoading, error, isError);
  }, [messages, setMessages]);

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
