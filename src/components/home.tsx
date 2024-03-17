//"use client";
import React from "react";
import { SideBarSimple } from "./NavBarSimple/SideBarSimple";
import { Grid, GridCol } from "@mantine/core";
import ChatScreen from "./MainChatArea/MainChatArea";

const Home = () => {
  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Grid>
        <GridCol span="content">
          <SideBarSimple />
        </GridCol>
        <GridCol span="auto">
          <ChatScreen />
        </GridCol>
      </Grid>
    </div>
  );
};

export default Home;
