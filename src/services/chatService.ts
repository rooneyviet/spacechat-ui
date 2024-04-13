import { TextResponse } from "@/lib/types/TextResponse";
import { QueryClient } from "@tanstack/react-query";
import { IMessage } from "@prisma/client";

export async function* sendMessageToOpenAI(
  messages: IMessage[],
  newUserMessage: string,
  conversationId?: string
): AsyncGenerator<TextResponse, void, unknown> {
  try {
    // Send a POST request to the API Chat route
    const messagesToSend = [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      ...messages.slice(0, -1).map((message) => ({
        role: message.sender,
        content: message.content,
      })),
      // {
      //   role: "user",
      //   content: newUserMessage,
      // },
    ];
    const queryClient = new QueryClient();
    const response = await queryClient.fetchQuery({
      queryKey: ["chat", messagesToSend],
      queryFn: async () => {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messagesToSend: messagesToSend,
            messages: messages,
            conversationId: conversationId,
            newUserMessage: newUserMessage,
          }),
        });
        return res;
      },
    });

    if (response.ok) {
      const data = response.body;
      if (!data) return;

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let decodeStream = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        decodeStream += chunkValue;
        yield { content: chunkValue };
      }
      console.log("decodeStream", decodeStream);
    } else {
      // Handle error response
      const errorMessage = await response?.json();
      console.log("errorMessage", errorMessage.content);
      yield {
        content:
          errorMessage.content ??
          "Something wrong with your request. Please check API key and try again.",
        isError: true,
      };
    }

    //decodeStream(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
