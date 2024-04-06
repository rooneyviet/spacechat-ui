"use client";
import { useChatStore } from "@/stores/chatStore";
import { Box, Grid, Textarea, GridCol } from "@mantine/core";
import React from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { prisma } from "../../../lib/prisma";
import { SENDER } from "@prisma/client";
import { useParams } from "next/navigation";

const MessageInput = () => {
  const {
    inputValue,
    userSendMessage: sendMessage,
    setInputValue,
  } = useChatStore();
  const params = useParams<{ conversationId?: string }>();
  const conversationId = params.conversationId;

  // const fetcher = async (url: string) => {
  //   const res = await fetch(url);
  //   return res.json();
  // };

  const handleSendMessage = async () => {
    // const response = await fetch("/api/conversation", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ inputValue, conversationId }),
    // });

    // if (!response.ok) {
    //   throw new Error("Failed to create conversation and message");
    // }

    //const data = await response.json();
    sendMessage(inputValue);
    setInputValue("");
  };

  const onKeyDownEvent = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <Box
      style={{
        padding: "1rem",
        borderTop: "1px solid ",
        //backgroundColor: "#FEE2E2",
      }}
    >
      <Grid>
        <GridCol span="auto">
          <Textarea
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
            placeholder="Type a message..."
            onKeyDown={onKeyDownEvent}
            disabled={false}
            autosize
            autoComplete="off"
            //maxRows={5}
            style={{ flexGrow: 1 }}
          />
        </GridCol>
        <GridCol span="content">
          <Button onClick={handleSendMessage}>Send</Button>
        </GridCol>
      </Grid>
    </Box>
  );
};

export default MessageInput;
