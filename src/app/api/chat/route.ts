import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { IMessage } from "@prisma/client";
import { finishGeneratingMessage } from "@/lib/database/message-database";
import AIProvider from "@/lib/aiprovider/AIProvider";
import OpenAIProvider from "@/lib/aiprovider/OpenAIProvider";
import AnthropicProvider from "@/lib/aiprovider/AnthropicProvider";

// Function to create the appropriate AI provider based on the user's selection
function getAIProvider(provider: string): AIProvider {
  switch (provider) {
    case "openai":
      return new OpenAIProvider();
    case "anthropic":
      return new AnthropicProvider();
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
}

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages, messagesToSend, conversationId } = await req.json();
  const lastMessage: IMessage = messages.at(-1);

  console.log("lastMessage", lastMessage, conversationId, lastMessage.id);

  const model = "gpt-3.5-turbo";
  const provider = "openai";
  const aiProvider: AIProvider = getAIProvider(provider);

  try {
    // Request the OpenAI API for the response based on the prompt
    const response = await aiProvider.createChatCompletion({
      model,
      stream: true,
      messages: messagesToSend,
    });

    // Convert the response into a friendly text-stream
    //const stream = OpenAIStream(response);
    const stream = aiProvider.createStream(response, {
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
