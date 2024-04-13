import { prisma } from "../../lib/prisma";

async function getMessages(conversationId: string) {
  const messages = await prisma.iMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
  return messages;
}

function useMessagesListQuery(conversationId: string) {
  const queryKey = ["messages", conversationId];

  const queryFn = async () => {
    return await getMessages(conversationId);
  };
  return { queryKey, queryFn };
}

export default useMessagesListQuery;
