import { create } from "zustand";
import { sendMessageToOpenAI } from "@/services/chatService";
import { IMessage, SENDER } from "@prisma/client";
import { QueryClient } from "@tanstack/react-query";
//import { useRouter } from "next/dist/client/router";
import { devtools } from "zustand/middleware";

interface IChatStore {
  messages: IMessage[];
  inputValue: string;
  currentConversationId?: string;
  isWelcomePage: boolean;
}

interface IChatActions {
  setMessages: (messages: IMessage[]) => void;
  setInputValue: (message: string) => void;
  userSendMessage: (message: string) => Promise<void>;
  generatingLastMessage: (message: string, isError: boolean) => Promise<void>;
  setConversationId: (conversationId?: string) => void;
  setIsWelcomePage: (isWelcomePage: boolean) => void;
  resetChat: () => void;
}

const initialState: IChatStore = {
  messages: [],
  inputValue: "",
  currentConversationId: undefined,
  isWelcomePage: false,
};
export const useChatStore = create<IChatStore & IChatActions>()(
  devtools(
    (set, get) => ({
      ...initialState,
      resetChat: () => {
        set((state) => ({
          ...initialState,
        }));
      },
      setIsWelcomePage: (isWelcomePage: boolean) =>
        set((state) => ({
          isWelcomePage,
        })),
      setMessages: (initMessages: IMessage[]) => {
        set((state) => ({
          messages: initMessages,
        }));
      },
      setConversationId: (conversationId?: string) => {
        set((state) => ({
          currentConversationId: conversationId,
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
                conversationId: get().currentConversationId,
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

          if (!get().currentConversationId || get().isWelcomePage) {
            set((state) => ({
              currentConversationId: iUserMessage.conversationId?.toString(),
            }));
          }
        }
        console.log("currentConversationId111", get().currentConversationId);

        for await (const response of sendMessageToOpenAI(
          get().messages,
          message,
          get().currentConversationId
        )) {
          get().generatingLastMessage(
            response.content,
            response.isError ?? false
          );
        }
      },
      generatingLastMessage: async (
        newWord: string,
        isError: boolean = false
      ) => {
        console.log("generatingLastMessage", newWord);
        set((state) => {
          const lastMessage = state.messages.at(-1);
          if (lastMessage && lastMessage.sender === SENDER.assistant) {
            console.log("generatingLastMessage1", newWord);
            lastMessage.content += newWord;
            lastMessage.updatedAt = new Date();
            lastMessage.isError = isError;
          }
          return { messages: state.messages };
        });
      },
    }),
    { enabled: true }
  )
);
