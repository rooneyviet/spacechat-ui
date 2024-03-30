"use client";
import { useChatStore } from "@/stores/chatStore";
import { Box, Grid, Textarea, GridCol } from "@mantine/core";
import React from "react";
import { Button } from "../ui/button";

const MessageInput = () => {
  const { inputValue, sendMessage, setInputValue } = useChatStore();
  const handleSendMessage = () => {
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
