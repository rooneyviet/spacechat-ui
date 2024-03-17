import { Message } from "@/lib/types/Message";
import { decodeStream } from "@/utils/decodeStream";

export async function* sendMessageToOpenAI(messages: Message[]) {
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
      //   content: messages[messages.length - 1].content,
      // },
    ];
    console.log(messagesToSend);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messagesToSend,
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
      yield chunkValue;
    }

    //decodeStream(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
