import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript, Box } from "@mantine/core";
import { theme } from "@/theme";
import "./globals.css";
import RightSidebar from "@/components/SideBar/RightSideBar";
import LeftSidebar from "@/components/SideBar/LeftSidebar";
import { ThemeProvider } from "@/components/theme-provider";

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
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MantineProvider>
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
              <Box style={{ width: "250px" }}>
                <LeftSidebar />
              </Box>
              <Box style={{ flexGrow: 1, overflow: "hidden" }}>{children}</Box>
              <Box style={{ width: "250px" }}>
                <RightSidebar />
              </Box>
            </div>
          </MantineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

{
  /* <MantineProvider theme={theme}>{children}</MantineProvider>; */
}
