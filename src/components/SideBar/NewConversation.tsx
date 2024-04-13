"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/stores/chatStore";
import { useShallow } from "zustand/react/shallow";

const NewConversation = () => {
  const router = useRouter();
  const { setConversationId } = useChatStore(
    useShallow((state) => ({
      setConversationId: state.setConversationId,
    }))
  );
  return (
    <div className="">
      <p
        className="cursor-pointer text-blue-500"
        onClick={() => {
          setConversationId(undefined);
          router.replace(`/`);
        }}
      >
        New Conversation
      </p>
    </div>
  );
};

export default NewConversation;
