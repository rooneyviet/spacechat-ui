import { IMessage, SENDER } from "@prisma/client";
import { NextResponse } from "next/server";
import {
  createNewConversation,
  insertNewMessage,
  finishGeneratingMessage,
} from "@/lib/database/message-database";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { conversationId, newUserMessage } = await req.json();
  //let conversationIdNum: number | undefined = Number(conversationId);
  try {
    // Insert the last user message into the database
    const iUserMessage: IMessage = conversationId
      ? await insertNewMessage(conversationId, newUserMessage, SENDER.user)
      : await createNewConversation(newUserMessage);

    // Insert empty AI Message
    const assistantIMessage: IMessage = await insertNewMessage(
      conversationId,
      "",
      SENDER.assistant
    );

    // Respond with the stream
    return NextResponse.json({ iUserMessage, assistantIMessage });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
