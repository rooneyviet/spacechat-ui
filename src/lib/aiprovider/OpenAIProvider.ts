import OpenAI from "openai";
import AIProvider from "./AIProvider";
import { AIStreamCallbacksAndOptions, OpenAIStream } from "ai";

class OpenAIProvider implements AIProvider {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async createChatCompletion(options: any): Promise<any> {
    return this.openai.chat.completions.create(options);
  }

  createStream(
    response: any,
    callbacks: AIStreamCallbacksAndOptions
  ): ReadableStream {
    return OpenAIStream(response, callbacks);
  }
}

export default OpenAIProvider;
