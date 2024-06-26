import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider } from "@mantine/core";
//import { theme } from "@/theme";
import "./globals.css";
import RightSidebar from "@/components/SideBar/RightSideBar";
import LeftSidebar from "@/components/SideBar/LeftSidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import MessageInput from "@/components/MainChatArea/MessageInput";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <ColorSchemeScript /> */}
        {/* <link rel="shortcut icon" href="/favicon.svg" /> */}
        {/* <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        /> */}
      </head>
      <body>
        <ReactQueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="max-w-screen flex w-screen flex-row items-center space-x-4 overflow-hidden">
              <div className="w-52 flex-shrink-0">
                <LeftSidebar />
              </div>
              <Separator orientation="vertical" className="mx-4 h-screen" />
              <div className="flex-grow overflow-hidden">
                <div className="flex h-screen flex-col p-2.5">
                  <div className="flex-grow overflow-hidden p-4">
                    {children}
                  </div>
                  <MessageInput />
                </div>
              </div>
              <Separator orientation="vertical" className="mx-4 h-screen" />
              <div className="w-52 flex-shrink-0">
                <RightSidebar />
              </div>
            </div>
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
