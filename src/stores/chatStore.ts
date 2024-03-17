import { create } from "zustand";
import { Message } from "@/lib/types/Message";
import { sendMessageToOpenAI } from "@/services/chatService";
import { TextResponse } from "@/lib/types/TextResponse";

interface IChatStore {
  messages: Message[];
  inputValue: string;
  setInputValue: (message: string) => void;
  sendMessage: (message: string) => Promise<void>;
  generatingLastMessage: (message: string, isError: boolean) => Promise<void>;
}
export const useChatStore = create<IChatStore>((set, get) => ({
  messages: [],
  inputValue: "",
  setInputValue: (message: string) => {
    set((state) => ({
      inputValue: message,
    }));
  },
  sendMessage: async (message) => {
    //console.log("sendMessage", message);
    set((state) => ({
      messages: [
        ...state.messages,
        {
          content: message,
          sender: "user",
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    }));

    set((state) => ({
      messages: [
        ...state.messages,
        {
          content: "",
          sender: "assistant",
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    }));

    for await (const response of sendMessageToOpenAI(get().messages)) {
      get().generatingLastMessage(response.content, response.isError ?? false);
    }
  },
  generatingLastMessage: async (newWord: string, isError: boolean = false) => {
    //console.log("generatingLastMessage", newWord);
    set((state) => {
      const lastMessage = state.messages.at(-1);
      if (lastMessage && lastMessage.sender === "assistant") {
        lastMessage.content += newWord;
        lastMessage.updatedAt = new Date();
        lastMessage.isError = isError;
      }
      return { messages: state.messages };
    });
  },
}));
