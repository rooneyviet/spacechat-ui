import { prisma } from "../../lib/prisma";

async function getMessages(conversationId: number) {
  const messages = await prisma.iMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
  return messages;
}

function useMessagesListQuery(conversationId: number) {
  const queryKey = ["messages", conversationId];

  const queryFn = async () => {
    return await getMessages(conversationId);
  };
  return { queryKey, queryFn };
}

export default useMessagesListQuery;
