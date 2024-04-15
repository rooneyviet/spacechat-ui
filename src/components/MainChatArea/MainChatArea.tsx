//"use client";
import React from "react";
import MessageInput from "./MessageInput";
import MessagesList from "./MessagesList";
import { prisma } from "../../../lib/prisma";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import useMessagesListQuery from "@/hooks/useMessagesListQuery";
import { IMessage } from "@prisma/client";

const MainChatArea = async ({
  params,
  searchParams,
}: {
  params: { conversationId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const conversationId = params.conversationId;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<IMessage[] | null>(
    useMessagesListQuery(conversationId)
  );

  return (
    <div className="flex h-screen flex-col p-2.5">
      <div className="flex-grow overflow-y-auto overflow-x-hidden p-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MessagesList />
        </HydrationBoundary>
      </div>

      {/* <MessageInput /> */}
    </div>
  );
};

export default MainChatArea;
