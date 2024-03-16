import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { sendMessageToOpenAI } from "../services/chatService";
import { Message } from "@/lib/types/Message";

interface IChatStore {
  messages: Message[];
  sendMessage: (message: string) => Promise<void>;
  generatingLastMessage: (message: string) => Promise<void>;
}

export const useChatStore = create<IChatStore>((set, get) => ({
  messages: [],
  sendMessage: async (message) => {
    console.log("sendMessage", message);
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
    const response = await sendMessageToOpenAI(message);
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
    for await (const chunk of response) {
      console.log(chunk.choices[0]?.delta?.content || "");
      get().generatingLastMessage(chunk.choices[0]?.delta?.content || "");
    }
    //get().generatingLastMessage(message);
  },
  generatingLastMessage: async (newWord: string) => {
    console.log("generatingLastMessage", newWord);
    // set((state) => {
    //   const lastMessage = state.messages.at(-1);
    //   if (lastMessage) {
    //     state.messages[state.messages.length - 1] = lastMessage + newWord;
    //   }
    //   return { messages: state.messages };
    // });
    set((state) => {
      const lastMessage = state.messages.at(-1);
      if (lastMessage && lastMessage.sender === "assistant") {
        lastMessage.content += newWord;
        lastMessage.updatedAt = new Date();
      }
      return { messages: state.messages };
    });
  },
}));
