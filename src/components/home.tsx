//"use client";
import React from "react";
import { Welcome } from "./Welcome/Welcome";

const Home = () => {
  return (
    <main className="flex h-screen flex-col">
      <div className="flex-grow">
        <Welcome />
      </div>
    </main>
  );
};

export default Home;
