import { getMessages } from "@/lib/database/message-database";
import { prisma } from "../../lib/prisma";

function useMessagesListQuery(conversationId: string) {
  const queryKey = ["messages", conversationId];

  const queryFn = async () => {
    return await getMessages(conversationId);
  };
  return { queryKey, queryFn };
}

export default useMessagesListQuery;
