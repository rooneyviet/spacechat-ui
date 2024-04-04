import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript, Box } from "@mantine/core";
//import { theme } from "@/theme";
import "./globals.css";
import RightSidebar from "@/components/SideBar/RightSideBar";
import LeftSidebar from "@/components/SideBar/LeftSidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryClientProvider>
            <MantineProvider>
              <div className="max-w-screen flex w-screen flex-row items-center space-x-4 overflow-x-hidden overflow-y-hidden">
                <div className="w-64">
                  <LeftSidebar />
                </div>
                <Separator orientation="vertical" />
                <Box className="flex-grow overflow-hidden">{children}</Box>
                <Separator orientation="vertical" />
                <Box className="w-64">
                  <RightSidebar />
                </Box>
              </div>
            </MantineProvider>
          </ReactQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
