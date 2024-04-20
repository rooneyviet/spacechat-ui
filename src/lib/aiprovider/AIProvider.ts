import { AIStreamCallbacksAndOptions } from "ai";

interface AIProvider {
  createChatCompletion(options: any): Promise<any>;
  createStream(
    response: any,
    callbacks: AIStreamCallbacksAndOptions
  ): ReadableStream;
}

export default AIProvider;
