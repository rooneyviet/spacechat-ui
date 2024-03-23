import { Timestamps } from "./Timestamps";

export type Message = Partial<Timestamps> & {
  sender: "user" | "assistant" | "system";
  id: ReturnType<typeof crypto.randomUUID>;
  content: string;
  //score?: -1 | 0 | 1;
  interrupted?: boolean;
  isError?: boolean;
};
