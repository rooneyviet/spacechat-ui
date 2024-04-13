import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { IMessage } from "@prisma/client";
import { finishGeneratingMessage } from "@/lib/database/message-database";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages, messagesToSend, conversationId } = await req.json();
  const lastMessage: IMessage = messages.at(-1);

  console.log("lastMessage", lastMessage, conversationId, lastMessage.id);
  //let conversationIdNum: number | undefined = Number(conversationId);
  // Extract the `messages` from the body of the request

  try {
    // Request the OpenAI API for the response based on the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: messagesToSend,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      onStart: async () => {
        // This callback is called when the stream starts
        // You can use this to save the prompt to your database
        //await savePromptToDatabase(prompt);
      },
      onToken: async (token: string) => {
        // This callback is called for each token in the stream
        // You can use this to debug the stream or save the tokens to your database
        console.log(token);
      },
      onCompletion: async (completion: string) => {
        // This callback is called when the stream completes
        // You can use this to save the final completion to your database
        //await saveCompletionToDatabase(completion);
        console.log("completion", completion);
        await finishGeneratingMessage(
          conversationId,
          lastMessage.id,
          completion,
          false
        );
      },
    });

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Check if the error is an APIError
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      //console.log("error", error);
      console.log("errorMessage", message);
      console.log("errorStatus", status);
      // Return an error message as the last message in the chat
      const errorMessage = {
        content: message,
      };

      await finishGeneratingMessage(
        conversationId,
        lastMessage.id,
        message,
        true
      );
      return NextResponse.json(errorMessage, { status: status || 500 });
    } else {
      console.log("ERRRRRRROR", error);
      throw error;
    }
  }
}
