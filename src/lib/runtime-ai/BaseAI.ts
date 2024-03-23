import { StreamingTextResponse } from "ai";

import { ChatCompetitionOptions, ChatStreamPayload } from "./types";

export interface RuntimeAI {
  baseURL?: string;

  chat(
    payload: ChatStreamPayload,
    options?: ChatCompetitionOptions
  ): Promise<StreamingTextResponse>;
}
