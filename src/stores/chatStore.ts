import { create } from "zustand";
import { devtools } from "zustand/middleware";
//import { sendMessageToOpenAI } from "../services/chatService";
import { Message } from "@/lib/types/Message";
import { useChat } from "ai/react";
import { decodeStream } from "@/utils/decodeStream";

interface IChatStore {
  messages: Message[];
  inputValue: string;
  setInputValue: (message: string) => void;
  sendMessage: (message: string) => Promise<void>;
  generatingLastMessage: (message: string) => Promise<void>;
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

    try {
      // Send a POST request to the API Chat route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      });

      const data = response.body;
      if (!data) return;

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        get().generatingLastMessage(chunkValue);
        //setResponse((prev) => prev + chunkValue);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // for await (const chunk of response) {
    //   console.log(chunk.choices[0]?.delta?.content || "");
    //   get().generatingLastMessage(chunk.choices[0]?.delta?.content || "");
    // }
    //get().generatingLastMessage(message);
  },
  generatingLastMessage: async (newWord: string) => {
    console.log("generatingLastMessage", newWord);
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
