import { create } from "zustand";
//import { sendMessageToOpenAI } from "../services/chatService";
import { Topic } from "@/lib/types/Topic";

interface ITopicStore {
  topics: Topic[];
  selectedTopicId: string;
  getTopics: () => Promise<void>;
  deleteTopic: (topicId: string) => Promise<void>;
  editTitle: (title: string, topicId: string) => Promise<void>;
  selectTopic: (topicId: string) => Promise<void>;
}
export const useChatStore = create<ITopicStore>((set, get) => ({
  topics: [],
  selectedTopicId: "",
  getTopics: async () => {},
  deleteTopic: async (topicId: string) => {
    set((state) => ({
      //inputValue: message,
    }));
  },
  editTitle: async (title: string) => {
    set((state) => ({
      //inputValue: message,
    }));
  },
  selectTopic: async (topicId: string) => {
    set((state) => ({
      //inputValue: message,
    }));
  },
}));
