import { IConversation, IMessage, SENDER } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { QueryClient } from "@tanstack/react-query";
import useMessagesListQuery from "@/hooks/useMessagesListQuery";

// get messages from conversation
export async function getMessages(
  conversationId: string
): Promise<IMessage[] | null> {
  const iconversation = await getConversation(conversationId);
  if (!iconversation) {
    return null;
  }
  const messages = await prisma.iMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
  return messages;
}

// Insert a new conversation into the database
export async function createNewConversation(
  newMessage: string
): Promise<IMessage> {
  console.log("createNewConversation", newMessage);
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
  conversationId: string,
  newMessage: string,
  sender: SENDER
): Promise<IMessage> {
  const iconversation = await getConversation(conversationId);
  if (!iconversation) {
    const messagesInNewConv = await createNewConversation(conversationId);
    return messagesInNewConv;
  }

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
  const queryClient = new QueryClient();
  queryClient.invalidateQueries(useMessagesListQuery(conversationId));
  return iMessage;
}

// Update a message after finish generating message
export async function finishGeneratingMessage(
  conversationId: string,
  iMessageId: string,
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
      isGenerating: false,
    },
  });
  const queryClient = new QueryClient();
  queryClient.invalidateQueries(useMessagesListQuery(conversationId));
  return iMessage;
}

// get conversation by id
export async function getConversation(
  conversationId: string
): Promise<IConversation | null> {
  try {
    const iConversation = await prisma.iConversation.findUnique({
      where: {
        id: conversationId,
      },
    });
    return iConversation;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Update a message after finish generating message
export async function getConversationList(): Promise<IConversation[]> {
  const iConversations = await prisma.iConversation.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  return iConversations;
}
