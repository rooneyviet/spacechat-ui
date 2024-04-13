"use client";

import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { useParams, useRouter } from "next/navigation";
import { useTopicStore } from "@/stores/topicStore";
import { IConversation } from "@prisma/client";
import { useChatStore } from "@/stores/chatStore";
import { useShallow } from "zustand/react/shallow";

interface ConversationLabelProps {
  conversation: IConversation;
}

const ConversationLabel = ({ conversation }: ConversationLabelProps) => {
  const router = useRouter();
  const params = useParams<{ conversationId?: string }>();
  const { currentConversationId, setConversationId } = useChatStore(
    useShallow((state) => ({
      currentConversationId: state.currentConversationId,
      setConversationId: state.setConversationId,
    }))
  );
  useEffect(() => {
    if (params.conversationId === conversation.id.toString()) {
      console.log("params", params);
      setConversationId(params.conversationId);
    }
  }, [params.conversationId, conversation.id, setConversationId]);

  return (
    <>
      <Label
        className={`${
          currentConversationId === conversation.id.toString()
            ? "text-blue-500"
            : ""
        } cursor-pointer`}
        onClick={() => {
          setConversationId(conversation.id.toString());
          router.replace(`/chat/${conversation.id.toString()}`);
        }}
      >
        {conversation.title || `Conversation ${conversation.id}`}
      </Label>
    </>
  );
};

export default ConversationLabel;
