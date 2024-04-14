"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/stores/chatStore";
import { useShallow } from "zustand/react/shallow";

const NewConversation = () => {
  const router = useRouter();
  const { resetChat } = useChatStore(
    useShallow((state) => ({
      resetChat: state.resetChat,
    }))
  );
  return (
    <div className="">
      <p
        className="cursor-pointer text-blue-500"
        onClick={() => {
          resetChat();
          router.replace(`/`);
        }}
      >
        New Conversation
      </p>
    </div>
  );
};

export default NewConversation;
