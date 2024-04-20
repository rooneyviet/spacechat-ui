import Anthropic from "@anthropic-ai/sdk";
import AIProvider from "./AIProvider";
import { AIStreamCallbacksAndOptions, AnthropicStream } from "ai";

class AnthropicProvider implements AIProvider {
  private anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }

  async createChatCompletion(options: any): Promise<any> {
    return this.anthropic.messages.create(options);
  }

  createStream(
    response: any,
    callbacks: AIStreamCallbacksAndOptions
  ): ReadableStream {
    return AnthropicStream(response, callbacks);
  }
}

export default AnthropicProvider;
