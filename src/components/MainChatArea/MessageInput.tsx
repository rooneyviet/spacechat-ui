"use client";
import { useChatStore } from "@/stores/chatStore";
import { Box, Grid, Textarea, Button } from "@mantine/core";
import React from "react";

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
        borderTop: "1px solid #FCA5A5",
        backgroundColor: "#FEE2E2",
      }}
    >
      <Grid>
        <Grid.Col span="auto">
          <Textarea
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
            placeholder="Type a message..."
            onKeyDown={onKeyDownEvent}
            disabled={false}
            autosize
            autoComplete="off"
            maxRows={5}
            style={{ flexGrow: 1 }}
          />
        </Grid.Col>
        <Grid.Col span="content">
          <Button color="red" onClick={handleSendMessage}>
            Send
          </Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default MessageInput;
