//"use client";
import React from "react";
import { SideBarSimple } from "./NavBarSimple/SideBarSimple";
import { Box, Flex, Grid, GridCol } from "@mantine/core";
import ChatScreen from "./MainChatArea/MainChatArea";

const Home = () => {
  return (
    <div
      style={{
        overflowX: "hidden",
        overflowY: "hidden",
        width: "100vw",
        maxWidth: "100vw",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box style={{ width: "300px" }}>
        <SideBarSimple />
      </Box>
      <Box style={{ flexGrow: 1, overflow: "hidden" }}>
        <ChatScreen />
      </Box>
    </div>
  );
};

export default Home;
