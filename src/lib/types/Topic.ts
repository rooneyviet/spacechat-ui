import { Timestamps } from "./Timestamps";

export type Topic = Partial<Timestamps> & {
  id: ReturnType<typeof crypto.randomUUID>;
  title: string;

  // // needed for conversation trees
  // ancestors?: Message["id"][];

  // // goes one level deep
  // children?: Message["id"][];
};
