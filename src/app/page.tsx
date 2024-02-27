import Image from "next/image";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "@/components/home";
import { Welcome } from "@/components/Welcome/Welcome";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";

export default function MainApp() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <Home />
    </>
  );
}
