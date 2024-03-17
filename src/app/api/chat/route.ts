import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: "process.env.OPENAI_API_KEY",
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  try {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json();

    // Request the OpenAI API for the response based on the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

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
      return NextResponse.json(errorMessage, { status: status || 500 });
    } else {
      throw error;
    }
  }
}
