//"use client";
import React, { Suspense } from "react";
import { Box } from "@mantine/core";
import MessageInput from "./MessageInput";
import MessagesList from "./MessagesList";
import SkeletonLoading from "../Messages/Content/SkeletonLoading";

const ChatScreen = ({
  params,
  searchParams,
}: {
  params: { conversationId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "10px",
      }}
    >
      <div className="flex-grow overflow-y-auto overflow-x-hidden p-4">
        <Suspense fallback={<SkeletonLoading />}>
          <MessagesList params={params} searchParams={searchParams} />
        </Suspense>
      </div>

      <MessageInput />
    </Box>
  );
};

export default ChatScreen;
