//"use client";
import React from "react";
import { SideBarSimple } from "./NavBarSimple/SideBarSimple";
import ChatScreen from "./MainChatArea/MainChatArea";
import { Welcome } from "./Welcome/Welcome";
import MessageInput from "./MainChatArea/MessageInput";

const Home = () => {
  return (
    <main className="flex h-screen flex-col">
      <div className="flex-grow">
        <Welcome />
      </div>
      <div>
        <MessageInput />
      </div>
    </main>
  );
};

export default Home;
