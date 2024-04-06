import { create } from "zustand";
import { Message } from "@/lib/types/Message";
import { sendMessageToOpenAI } from "@/services/chatService";
import { IMessage, SENDER } from "@prisma/client";
import { QueryClient, useQuery } from "@tanstack/react-query";
//import { useRouter } from "next/dist/client/router";
import Router, { useRouter } from "next/router";

interface IChatStore {
  messages: IMessage[];
  inputValue: string;
  conversationId?: string;
  setMessages: (messages: IMessage[]) => void;
  setInputValue: (message: string) => void;
  userSendMessage: (message: string) => Promise<void>;
  generatingLastMessage: (message: string, isError: boolean) => Promise<void>;
  setConversationId: (conversationId?: string) => void;
}
export const useChatStore = create<IChatStore>((set, get) => ({
  messages: [],
  inputValue: "",
  conversationId: undefined,
  setMessages: (initMessages: IMessage[]) => {
    set((state) => ({
      messages: initMessages,
    }));
  },
  setConversationId: (conversationId?: string) => {
    set((state) => ({
      conversationId: conversationId,
    }));
  },
  setInputValue: (message: string) => {
    set((state) => ({
      inputValue: message,
    }));
  },
  userSendMessage: async (message) => {
    const queryClient = new QueryClient();
    const response = await queryClient.fetchQuery({
      queryKey: ["chat", message],
      queryFn: async () => {
        const res = await fetch("/api/user-send-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conversationId: get().conversationId,
            newUserMessage: message,
          }),
        });
        return res;
      },
    });

    if (response?.ok) {
      const {
        iUserMessage,
        assistantIMessage,
      }: { iUserMessage: IMessage; assistantIMessage: IMessage } =
        await response?.json();

      set((state) => ({
        messages: [...state.messages, iUserMessage, assistantIMessage],
      }));

      if (!get().conversationId) {
        //const router = useRouter();
        //router.replace(`/chat/${iUserMessage.conversationId}`);
      }
    }

    for await (const response of sendMessageToOpenAI(
      get().messages,
      message,
      get().conversationId
    )) {
      get().generatingLastMessage(response.content, response.isError ?? false);
    }
  },
  generatingLastMessage: async (newWord: string, isError: boolean = false) => {
    //console.log("generatingLastMessage", newWord);
    set((state) => {
      const lastMessage = state.messages.at(-1);
      if (lastMessage && lastMessage.sender === SENDER.assistant) {
        lastMessage.content += newWord;
        lastMessage.updatedAt = new Date();
        lastMessage.isError = isError;
      }
      return { messages: state.messages };
    });
  },
}));
