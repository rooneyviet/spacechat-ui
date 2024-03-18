"use client";
import React from "react";
import {
  Paper,
  Button,
  TextInput,
  Box,
  Grid,
  Avatar,
  Text,
  Textarea,
} from "@mantine/core";
import { useChatStore } from "@/stores/chatStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlockWrapper from "../Messages/Content/CodeBlockWrapperProps";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatScreen = () => {
  //const [inputValue, setInputValue] = useState("");
  const { messages, inputValue, sendMessage, setInputValue } = useChatStore();

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
    <Box style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box style={{ overflowY: "auto", flexGrow: 1, padding: "1rem" }}>
        {messages.map((message, index) => (
          <Paper
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "flex-start",
            }}
            key={message.id}
          >
            <Avatar
              src={
                message.sender === "user" ? "/user-logo.png" : "/ai-logo.png"
              }
              alt={message.sender}
              mr="sm"
            />
            <Box>
              <Text fw={800} c="blue">
                {message.sender === "user" ? "You" : "AI"}
              </Text>
              <Box
                style={{
                  backgroundColor: message.isError ? "#FEE2E2" : "transparent",
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  //children={message.content}
                  components={{
                    code({ node, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");

                      return match ? (
                        <CodeBlockWrapper language={match[1]}>
                          {String(children).replace(/\n$/, "")}
                        </CodeBlockWrapper>
                      ) : (
                        <code className={className}>{children}</code>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

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
    </Box>
  );
};

export default ChatScreen;
