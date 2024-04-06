"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useTopicStore } from "@/stores/topicStore";
import { useChatStore } from "@/stores/chatStore";

const NewConversation = () => {
  const router = useRouter();
  const { selectTopic } = useTopicStore();
  const { setConversationId, setMessages, messages } = useChatStore();
  return (
    <div className="">
      <p
        className="cursor-pointer text-blue-500"
        onClick={() => {
          router.replace(`/`);
          setConversationId(undefined);
          selectTopic(undefined);
        }}
      >
        New Conversation
      </p>
    </div>
  );
};

export default NewConversation;
