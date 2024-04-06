import { IMessage, SENDER } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { QueryClient } from "@tanstack/react-query";
import useMessagesListQuery from "@/hooks/useMessagesListQuery";

// Insert a new conversation into the database
export async function createNewConversation(
  newMessage: string
): Promise<IMessage> {
  console.log("createNewConversation");
  const newConversation = await prisma.iConversation.create({
    data: {
      title: "New Conversation1",
      messages: {
        create: [
          {
            sender: SENDER.user,
            content: newMessage,
          },
        ],
      },
    },
  });

  const iMessages = await prisma.iMessage.findMany({
    where: {
      conversationId: newConversation.id,
    },
  });

  //const queryClient = new QueryClient();
  //queryClient.invalidateQueries(useMessagesListQuery(newConversation.id));
  return iMessages[0];
}

// Insert a new message into the database
export async function insertNewMessage(
  conversationId: number,
  newMessage: string,
  sender: SENDER
): Promise<IMessage> {
  console.log("insertNewMessage");
  const isGenerating = sender === SENDER.assistant;
  const iMessage = await prisma.iMessage.create({
    data: {
      content: newMessage,
      conversationId: conversationId,
      sender: sender,
      isGenerating: isGenerating,
      isError: false,
    },
  });
  //const queryClient = new QueryClient();
  //queryClient.invalidateQueries(useMessagesListQuery(conversationId));
  return iMessage;
}

// Update a message after finish generating message
export async function finishGeneratingMessage(
  conversationId: number,
  iMessageId: number,
  generatedContent: string,
  isError: boolean
): Promise<IMessage> {
  const iMessage = await prisma.iMessage.update({
    where: {
      id: iMessageId,
    },
    data: {
      content: generatedContent,
      isError: isError,
    },
  });
  const queryClient = new QueryClient();
  queryClient.invalidateQueries(useMessagesListQuery(conversationId));
  return iMessage;
}
