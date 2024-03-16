"use client";
import React from "react";
import { SideBarSimple } from "./NavBarSimple/SideBarSimple";
import { Grid } from "@mantine/core";
import ChatScreen from "./MainChatArea/MainChatArea";

const Home = () => {
  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Grid>
        <Grid.Col span="content">
          <SideBarSimple />
        </Grid.Col>
        <Grid.Col span="auto">
          <ChatScreen />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Home;
