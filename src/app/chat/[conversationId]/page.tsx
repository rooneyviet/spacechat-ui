import ChatScreen from "@/components/MainChatArea/MainChatArea";
import React from "react";

const ChatPage = ({
  params,
  searchParams,
}: {
  params: { conversationId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return <ChatScreen params={params} searchParams={searchParams} />;
};

export default ChatPage;
