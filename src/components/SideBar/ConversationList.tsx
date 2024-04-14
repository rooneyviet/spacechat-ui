//"use client";

import React from "react";
import { prisma } from "../../../lib/prisma";
import ConversationLabel from "./ConversationLabel";
import { getConversationList } from "@/lib/database/message-database";

interface ConversationListProps {
  params: { conversationId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ConversationList = async () => {
  const iConversations = await getConversationList();

  return (
    <div className="p-4">
      <ul className="flex flex-col gap-2">
        {iConversations.map((conversation) => (
          <li key={conversation.id}>
            <ConversationLabel conversation={conversation} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
