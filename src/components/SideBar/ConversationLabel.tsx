"use client";

import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { useParams, useRouter } from "next/navigation";
import { useTopicStore } from "@/stores/topicStore";
import { IConversation } from "@prisma/client";

interface ConversationLabelProps {
  conversation: IConversation;
}

const ConversationLabel = ({ conversation }: ConversationLabelProps) => {
  const router = useRouter();
  const params = useParams<{ conversationId: string }>();
  const { selectedTopicId, selectTopic } = useTopicStore();
  useEffect(() => {
    if (params.conversationId === conversation.id.toString()) {
      console.log("params", params);
      selectTopic(params.conversationId);
    }
  }, [params.conversationId, conversation.id, selectTopic]);

  return (
    <>
      <Label
        className={`${
          selectedTopicId === conversation.id.toString() ? "text-blue-500" : ""
        } cursor-pointer`}
        onClick={() => {
          router.replace(`/chat/${conversation.id.toString()}`);
          selectTopic(conversation.id.toString());
        }}
      >
        {conversation.title || `Conversation ${conversation.id}`}
      </Label>
    </>
  );
};

export default ConversationLabel;
