"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useTopicStore } from "@/stores/topicStore";

const NewConversation = () => {
  const router = useRouter();
  const { selectTopic } = useTopicStore();
  return (
    <div className="">
      <p
        className="cursor-pointer text-blue-500"
        onClick={() => {
          router.replace(`/`);
          selectTopic(undefined);
        }}
      >
        New Conversation
      </p>
    </div>
  );
};

export default NewConversation;
